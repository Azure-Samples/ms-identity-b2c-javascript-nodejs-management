let clientOptions = {
	authProvider: new MyAuthenticationProvider(),
};

const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);

async function getUsers() {
    console.log('Graph API called at: ' + new Date().toString());

    let users = await client.api("/users").get();
    updateUI(users);
}