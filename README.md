# Apillon OAuth Demo

This project demonstrates how to implement OAuth authentication using the Apillon API. The client-side JavaScript code opens an OAuth window for the user to authenticate, and the server-side code generates an OAuth session, as well verifies the user's login.

### Client

The client-side code is located in  client/js/script.js. It contains the following key functions:

- `getAuthToken()`: This function sends a GET request to the server to retrieve a session token.
- `openOAuthPopup()`: This function opens a new window where the user can authenticate with Apillon. It uses the session token obtained from  getAuthToken().
- `verifyUserLogin(oauthAuthToken)`: This function sends a POST request to the server to verify the user's login. It is called when the OAuth window sends a message indicating that the user has been verified. If the verification is successful, this function returns the user's account email address on Apillon, which can be further used in your own application.

The client-side code also adds an event listener for the  'message' event. This event is triggered when the OAuth window sends a message to the main window. If the message's origin is  'apillon.io' and the message data indicates that the user has been verified, the OAuth window is closed and `verifyUserLogin()` is called with the user's OAuth token.

### Server

The server-side code is located in  server/server.js. It sets up an Express.js server with two routes:

- `/session-token`: This route handles GET requests by sending a GET request to the Apillon API to retrieve a session token. The token is then sent back to the client.
- `/verify-login:` This route handles POST requests by sending a request to the Apillon API to verify the user's login. The response from the Apillon API is then sent back to the client.  The received token from the OAuth needs to be sent as a body parameter to this method, such that it can be verified through the Apillon API.

### Running  the  Server
To start the server, navigate to the `server` directory and then run the following commands:
- `npm install`
- `npm start`

This will start the server on port 3000.