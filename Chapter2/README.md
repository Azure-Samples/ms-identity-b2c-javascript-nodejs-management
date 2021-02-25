# Node.js console application calling Microsoft Graph with application permissions to manage Azure AD B2C user accounts

 1. [Overview](#overview)
 1. [Scenario](#scenario)
 1. [Contents](#contents)
 1. [Prerequisites](#prerequisites)
 1. [Setup](#setup)
 1. [Registration](#registration)
 1. [Running the sample](#running-the-sample)
 1. [Explore the sample](#explore-the-sample)
 1. [About the code](#about-the-code)
 1. [More information](#more-information)
 1. [Community Help and Support](#community-help-and-support)
 1. [Contributing](#contributing)

## Overview

This sample demonstrates a how to [manage your B2C users with Microsoft Graph](https://docs.microsoft.com/azure/active-directory-b2c/microsoft-graph-get-started) via a Node.js console application (CLI) using [application permissions](https://docs.microsoft.com/azure/active-directory/develop/delegated-and-app-perms) and [client credentials](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow), with the help of [Microsoft Authentication Library of Node.js](https://github.com/AzureAD/microsoft-authentication-library-for-js) (MSAL Node) for authentication and [Microsoft Graph JavaScript SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript) for querying [Microsoft Graph](https://docs.microsoft.com/graph/overview).

## Scenario

1. The client **Node.js CLI** uses MSAL Node to sign-in and obtain a JWT access token from **Azure AD B2C**.
2. The access token is used as a *bearer token* to authorize the application to call **Microsoft Graph** using its own identity.

## Contents

| File/folder           | Description                                                |
|-----------------------|------------------------------------------------------------|
| `bin/authConfig.js`   | Contains the authentication configuration parameters.      |
| `bin/authProvider.js` | Main authentication logic resides here.                    |
| `bin/graph.js`        | Contains an implementation of Graph JavaScript client SDK. |
| `data/users.json`     | Example user accounts in JSON                              |
| `.env`                | Environment variables of authentication credentials.       |

## Prerequisites

- A user account with **admin privileges** in your **Azure AD B2C** tenant.

## Setup

Locate the root folder of the sample in a terminal. Then:

```console
    cd Chapter2
    npm install
```

### Registration

### Choose the Azure AD tenant where you want to create your applications

As a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one Azure AD B2C tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired Azure AD B2C tenant.

### Register the app

1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `b2c-management-console`.
   - Under **Supported account types**, select **Accounts in this organizational directory only**.
1. Select **Register** to create the application.
1. In the app's registration screen, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. Select **Save** to save your changes.
1. In the app's registration screen, select the **Certificates & secrets** blade in the left to open the page where we can generate secrets and upload certificates.
1. In the **Client secrets** section, select **New client secret**:
   - Type a key description (for instance `app secret`),
   - Select one of the available key durations (**In 1 year**, **In 2 years**, or **Never Expires**) as per your security posture.
   - The generated key value will be displayed when you select the **Add** button. Copy the generated value for use in the steps later.
   - You'll need this key later in your code's configuration files. This key value will not be displayed again, and is not retrievable by any other means, so make sure to note it from the Azure portal before navigating to any other screen or blade.
1. In the app's registration screen, select the **API permissions** blade in the left to open the page where we add access to the APIs that your application needs.
   - Select the **Add a permission** button and then,
   - Ensure that the **Microsoft APIs** tab is selected.
   - In the *Commonly used Microsoft APIs* section, select **Microsoft Graph**
   - In the **Application permissions** section, select the **User.ReadWrite.All** in the list. Use the search box if necessary.
   - Select the **Add permissions** button at the bottom.
1. At this stage, the permissions are assigned correctly but since the client app does not allow users to interact, the users' themselves cannot consent to these permissions.
   To get around this problem, we'd let the [tenant administrator consent on behalf of all users in the tenant](https://docs.microsoft.com/azure/active-directory/develop/v2-admin-consent).
   Select the **Grant admin consent for {tenant}** button, and then select **Yes** when you are asked if you want to grant consent for the requested permissions for all account in the tenant. You need to be an the tenant admin to be able to carry out this operation.

#### Configure the code to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `.env` file.
1. Find the key `TENANT_ID` and replace the existing value with the ID of your tenant copied from the Azure portal.
1. Find the key `CLIENT_ID` and replace the existing value with the application ID (clientId) of `b2c-management-console` app copied from the Azure portal.
1. Find the key `CLIENT_SECRET` and replace the existing value with client secret you generated during the app registration.

## Running the sample

Locate the root folder of the sample in a terminal. Then:

```console
    cd Chapter2
    npm install -g
```

This will install the CLI application globally so that it can be called from anywhere. See below for how to call it.

## Explore the sample

Available operations for the application are as follows:

- `getUsers`: makes a GET for all user accounts in the tenant.
- `getUser`: makes a GET request for a particular user account in the tenant by ID.
- `updateUser`: makes a PATCH request to update user account properties.
- `deleteUser`: makes a DELETE request to delete the user account by ID.
- `createUser`: makes a POST request to create a user account. Request payload must conform to guidelines.
- `createUserFromFile`: reads from a JSON file and makes a POST request for each user account found. Request payload must conform to guidelines.

See the table below for required parameters:

```console
    Usage: --op <operation_name> --id <user_id> --user <user_account> --prop <user_account_property> --path <JSON_path>
    
    Options:
      --op,   --operation   operation name                        [string] [required]  
      --id,   --identity    user id                                          [string]  
      --prop, --property    user account property                            [object]
      --user, --property    user account object                              [object]
      --path, --path        JSON file path                                   [string]
```

For instance, if you would like to get a particular user in your tenant, type:

```console
    b2c-management-cli --op getUser --id <ID_OF_THE_USER>
```

> :information_source: Did the sample not work for you as expected? Then please reach out to us using the [GitHub Issues](../../../issues) page.

> :information_source: if you believe your issue is with the B2C service itself rather than with the sample, please file a support ticket with the B2C team by following the instructions [here](https://docs.microsoft.com/en-us/azure/active-directory-b2c/support-options).

## We'd love your feedback!

Were we successful in addressing your learning objective? Consider taking a moment to [share your experience with us](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUOUlINE03TVo4TEM4MVRGUUQ2TlBRUUFBSCQlQCN0PWcu).

## About the code

### Getting and passing access tokens

In [authProvider.js](./App/AuthProvider.js), we initialize an **MSAL** client by passing a configuration object as shown below:

```javascript
    const cca = new msal.ConfidentialClientApplication(authConfig.msalConfig);
```

Then, we create **MyAuthenticationProvider** class that implements `AuthenticationProvider` interface (see for more: [Using Custom Authentication Provider](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md)). This class is used to instantiate a custom token middleware that is needed for enabling **Microsoft Graph JavaScript SDK** client object to communicate with the **Microsoft Graph API**.

```javascript
    class MyAuthenticationProvider {        
      async getAccessToken() {
         return new Promise(async(resolve, reject) => {

               // using MSAL Node acquireTokenByClientCredential public API
               const authResponse = await cca.acquireTokenByClientCredential(authConfig.tokenRequest)
               
               if (authResponse.accessToken && authResponse.accessToken.length !== 0) {
               resolve(authResponse.accessToken);
               } else {
               reject(Error('Error: cannot obtain access token.'));
               }
            });
        }
    }
```

### Querying Microsoft Graph

We first initialize the **Microsoft Graph JavaScript SDK** client:

```javascript
const clientOptions = {
    authProvider: new MyAuthenticationProvider(),
};

const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);
```

After that, we can use for **CRUD** operations on Graph resources. For instance, to update a user account:

```javascript
    async function updateUser(id, prop) {
        try {
            console.log('Graph API called at: ' + new Date().toString());
            return await client.api(`/users/${id}`).patch(prop);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
```

## More information

- [What is Azure Active Directory B2C?](https://docs.microsoft.com/azure/active-directory-b2c/overview)
- [Application types that can be used in Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/application-types)
- [Recommendations and best practices for Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/best-practices)
- [Azure AD B2C session](https://docs.microsoft.com/azure/active-directory-b2c/session-overview)
- [Initialize client applications using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications)
- [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
- [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
- [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)
- [Pass custom state in authentication requests using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request)
- [Prompt behavior in MSAL.js interactive requests](https://docs.microsoft.com/azure/active-directory/develop/msal-js-prompt-behavior)
- [Use MSAL.js to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)

For more information about how OAuth 2.0 protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](https://docs.microsoft.com/azure/active-directory/develop/authentication-flows-app-scenarios).

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-active-directory` `azure-ad-b2c` `ms-identity` `msal`].

If you find a bug in the sample, raise the issue on [GitHub Issues](../../../issues).

To provide feedback on or suggest features for Azure Active Directory, visit [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.