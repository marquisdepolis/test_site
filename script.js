// Function to fetch the Client ID from the server
function fetchClientId() {
  fetch('/api/client-id')
    .then(response => response.json())
    .then(data => {
      initializeGoogleSignIn(data.clientId);
    })
    .catch(error => console.error('Error fetching client ID:', error));
}

// Function to initialize Google Sign-In
function initializeGoogleSignIn(clientId) {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: clientId,
      cookiepolicy: 'single_host_origin',
    }).then(() => {
      renderButton();
    });
  });
}

// Function to render the Google Sign-In button
function renderButton() {
  gapi.signin2.render('signin-button', {
    scope: 'email profile https://www.googleapis.com/auth/gmail.readonly',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSignIn,
    onfailure: onFailure
  });
}

// Function to handle successful sign-ins
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
}

// Function to handle sign-in failures
function onFailure(error) {
  console.error('Sign-In Error:', error);
}

// Start the app
fetchClientId();
