import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds, IProjectPageService } from 'azure-devops-extension-api';
import axios from 'axios';
import { ReplaceFieldParameters } from './parameter-replacement';

export async function LoadDataFromService() {
  const inputs = SDK.getConfiguration().witInputs;
  const address = inputs.RestServiceAddress + '';
  const password = inputs.RestServicePassword;
  const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
  const project = await (await projectService.getProject()).name;

  let params: any = {};
  if (inputs.RestCallParameters) {
    try {
      params = JSON.parse(await ReplaceFieldParameters(inputs.RestCallParameters));
    } catch (err) {
      console.log(err);
      return;
    }
  }

  const reqConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  reqConfig['auth'] = { username: 'Basic', password: password };

  const req = axios.create(reqConfig);

  const newAddress = address.replace('{project}',project);

  return req.get(newAddress,
    {
      params: params
    }
  ).catch(err => {
    console.log(err);
    throw err;
  });
}