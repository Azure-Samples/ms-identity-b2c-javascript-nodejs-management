---
page_type: sample
languages:
  - javascript
products:
  - nodejs
  - ms-graph
  - msal-js
  - msal-node
  - azure-active-directory  
  - azure-active-directory-b2c
name: JavaScript single-page application calling Microsoft Graph with delegated permissions to manage Azure AD B2C user accounts
urlFragment: https://github.com/Azure-Samples/ms-identity-b2c-javascript-nodejs-management
description: "This sample demonstrates how to manage Azure AD B2C users via Microsoft Graph in JavaScript applications"
---
# JavaScript application calling Microsoft Graph to manage Azure AD B2C user accounts

## Overview

This chapterwise tutorial demonstrates how to use the [Microsoft Graph API](https://docs.microsoft.com/graph/overview) to perform user account management operations  such as **create**, **read**, **update** and **delete** within an [Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/overview) tenant. The code samples in this tutorial back the [Manage Azure AD B2C user accounts with Microsoft Graph](https://docs.microsoft.com/azure/active-directory-b2c/manage-user-accounts-graph-api) article on [docs.microsoft.com](https://docs.microsoft.com/).

There are two modes of communication you can use when working with the **Microsoft Graph API** to manage resources in your **Azure AD B2C** tenant:

- **Interactive**: Appropriate for run-once tasks, you use an administrator account in the B2C tenant to perform the management tasks. This mode requires an [administrator](https://docs.microsoft.com/azure/active-directory-b2c/user-overview#work-account) to sign-in using their credentials before calling the **Microsoft Graph API**. This is demonstrated in [Chapter 1](./Chapter1).

- **Automated**: For scheduled or continuously run tasks (*background processes*), this method uses a service account that you configure with the permissions required to perform management tasks. You create the **service account** in Azure AD B2C by registering an application that your applications and scripts use for authenticating using its Application (Client) ID and the [OAuth 2.0 client credentials grant](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow). In this case, the application acts as itself to call the **Microsoft Graph API**, not the administrator user as in the previously described interactive method. This is demonstrated in [Chapter 2](./Chapter2).

For more information, see: [Manage Azure AD B2C with Microsoft Graph](https://docs.microsoft.com/azure/active-directory-b2c/microsoft-graph-get-started).

## Contents

| File/folder            | Description                                                       |
|------------------------|-------------------------------------------------------------------|
| [Chapter1](./Chapter1) | A JavaScript single-page application using delegated permissions. |
| [Chapter2](./Chapter2) | A Node.js console application using application permissions.      |
| [ReadmeFiles](./Chapter2)          | Contains diagrams and screenshots.                                |

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
- An **Azure AD B2C** tenant. For more information see: [How to get an Azure AD B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)

We recommend familiarity with the following document: [Working with MSAL.js and Azure AD B2C](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md)

Refer to each chapter for additional prerequisites.

## Setup

From your shell or command line:

```console
    git clone https://github.com/Azure-Samples/ms-identity-b2c-javascript-nodejs-management.git
```

## Next step

Continue to [Chapter 1](./Chapter1).

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

If you find a bug in the sample, raise the issue on [GitHub Issues](../issues).

To provide feedback on or suggest features for Azure Active Directory, visit [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.