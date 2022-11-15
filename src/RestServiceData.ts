import * as SDK from 'azure-devops-extension-sdk';
import { WorkItemTrackingServiceIds, IWorkItemFormService } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingServices';
import { LoadDataFromService } from './rest-call';
import { AxiosResponse } from 'axios';

export class RestServiceData {

  public data = [];

  public async getSuggestedValues(): Promise<string[]> {
    const jp = require('jsonpath');
    let resp: AxiosResponse<any>;
    try {
      resp = await LoadDataFromService();
    } catch (error) {
      return Promise.resolve([]);
    }
    const jsonquery = SDK.getConfiguration().witInputs.JsonPathQuery;
    if (resp !== undefined && resp.data !== undefined) {

      var arrayData = jp.query(resp.data, jsonquery);

    }
    if (arrayData) {
      if (arrayData.constructor !== Array) {
        console.dir(arrayData);
        console.error('response is not an array ^');
        return Promise.resolve([]);
      }
      this.data = arrayData;
      return [...new Set<string>(arrayData)];
    }
    else {
      // if the values input were not specified as an input, get the suggested values for the field.
      const service = await SDK.getService<IWorkItemFormService>(WorkItemTrackingServiceIds.WorkItemFormService);
      return await service.getAllowedFieldValues(SDK.getConfiguration().witInputs.FieldName) as string[];
    }
  }

}