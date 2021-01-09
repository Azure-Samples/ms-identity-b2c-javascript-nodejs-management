const MicrosoftGraph = require('@microsoft/microsoft-graph-client')
const MyAuthenticationProvider = require('./authProvider');

require('isomorphic-fetch');

let clientOptions = {
	authProvider: new MyAuthenticationProvider(),
};

const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);

async function getUsers() {
    console.log('Graph API called at: ' + new Date().toString());

    let users = await client.api("/users").get();
    console.log(users);
}

async function getUser() {
    console.log('Graph API called at: ' + new Date().toString());
}

async function updateUser() {
    console.log('Graph API called at: ' + new Date().toString());
}

async function createUser() {
    console.log('Graph API called at: ' + new Date().toString());
}

async function deleteUser() {
    console.log('Graph API called at: ' + new Date().toString());
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    updateUser: updateUser,
    createUser: createUser,
    deleteUser: deleteUser
}