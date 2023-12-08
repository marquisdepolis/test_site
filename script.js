function fetchClientId() {
  fetch('/api/client-id')
    .then(response => response.json())
    .then(data => {
      initializeGoogleSignIn(data.clientId);
    })
    .catch(error => console.error('Error fetching client ID:', error));
}

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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
}

function onFailure(error) {
  console.error('Sign-In Error:', error);
}

fetchClientId();
