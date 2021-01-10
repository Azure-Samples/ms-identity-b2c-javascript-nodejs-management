class MyAuthenticationProvider {

	/**
	 * This method will get called before every request to the msgraph server
	 * This should return a Promise that resolves to an accessToken (in case of success) or rejects with error (in case of failure)
	 * Basically this method will contain the implementation for getting and refreshing accessTokens
	 */
    
	async getAccessToken() {
        return new Promise(async(resolve, reject) => {
            const authResponse = await getTokenPopup(tokenRequest); 

            if (authResponse.accessToken && authResponse.accessToken.length !== 0) {
              resolve(authResponse.accessToken);
            } else {
              reject(Error("Error: cannot obtain access token."));
            }
          });
    }
}