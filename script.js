function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());

    // Display user information
    var userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = 'Hello, ' + profile.getName();
    userInfoDiv.style.display = 'block';

    // Further steps to integrate Gmail API will go here
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('signin-button', {
        'scope': 'email profile https://www.googleapis.com/auth/gmail.readonly',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}

// Ensure the API client is loaded and then call renderButton()
function startApp() {
    gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
            client_id: 'process.env.CLIENT_ID.apps.googleusercontent.com', // Replace with your client ID
            cookiepolicy: 'single_host_origin',
        });
        renderButton();
    });
}

startApp();
