let oAuthWindow;

const getAuthToken = async () => {
  const response = await fetch('http://localhost:3000/session-token', {
    method: 'GET'
  });
  const { data } = await response.json();
  return data.sessionToken;
}

async function openOAuthPopup() {
  const sessionToken = await getAuthToken();
  oAuthWindow = window.open(
    `https://oauth.apillon.io/?embedded=1&token=${sessionToken}`,
    'Apillon OAuth Form',
    `height=${900} width=${450} resizable=no`
  );
}

window.addEventListener('message', async event => {
  if (!event.origin?.includes('apillon.io')) return;
  if (!event.data.verified) {
    return console.error('Invalid verification');
  }
  // Close OAuth popup window
  oAuthWindow?.close();

  verifyUserLogin(event.data.authToken);
}, false);

async function verifyUserLogin(oAuthToken) {
  const response = await fetch(`http://localhost:3000/verify-login`, {
    method: 'POST',
    body: JSON.stringify({ token: oAuthToken }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  });
  const { data } = await response.json();
  // Handle user email data response here
  console.log({ email: data.email });
}