# Rest Data Mapping Picklist

#### Forked from [Dedac](https://github.com/Dedac/RestDataMappingPicklist)

#### Changes
1. Changed from field query to jsonpath query, find it more flexible.
2. Don't show error message if user removes the field value
3. Only allow LOV to be from Azure Devops 

#### An Azure DevOps Work Item Form Extension

This is an extension for Azure DevOps to load Rest data into a simple picklist.

https://marketplace.visualstudio.com/items?itemName=dedac.RestDataMappingPicklist

You can map additional data from the same rest call to other fields in the Work Item

Build the dev version and run locally
1. Build and  the Dev Extension 
    ```
    npm run build-dev
    npm run package-dev
    ```
1. Upload the Visual Studio Marketplace and invite a test organization
1. Setup a local signing certificate here are some sample [instructions](https://gist.github.com/pgilad/63ddb94e0691eebd502deee207ff62bd)  
    (you can skip this step, but when you serve-dev navigate to `https://localhost:44300/webpack-dev-server` and accept that you are going somewhere 'unsafe')
1. Build and run the extension locally 
    ```
    npm run serve-dev
    ```
1. Install the extension in a work item and configure it
1. Enjoy testing the extension


To Build and package the control for production, simply run 

```
npm run build
```

And upload to the visual studio marketplace, or use `npm run gallery-publish` with your valid token
