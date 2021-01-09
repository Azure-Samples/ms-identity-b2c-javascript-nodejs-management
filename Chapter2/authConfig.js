const msalConfig = {
    auth: {
        clientId: "c8e050fe-4f73-4db0-9218-3415a17b5a65",
        authority: "https://login.microsoftonline.com/35d7f68e-13d3-4472-9258-5614389dc6bc/",
        clientSecret: "S7X8i.g2C923.e~mm_aeYZZr2Dem~n2DmY"
   } 
};

// With client credentials flows permissions need to be granted in the portal by a tenant administrator. 
// The scope is always in the format "<resource>/.default"
const tokenRequest = {
    scopes: [ "https://graph.microsoft.com/.default" ],
};

// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphUsersEndpoint: "https://graph.microsoft.com/v1.0/users",
};

module.exports = {
    msalConfig: msalConfig,
    tokenRequest: tokenRequest,
    graphConfig: graphConfig
};
