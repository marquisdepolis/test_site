function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());

    // Display user information or a welcome message
    var userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = 'Hello, ' + profile.getName() + '! You are now signed in.';
    userInfoDiv.style.display = 'block';
}

function onFailure(error) {
    console.error('Sign-In Error:', error);
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

function startApp() {
    gapi.load('auth2', function(){
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID',
            // ... other configurations
        }).then(function() {
            renderButton();
        }, function(error) {
            console.error('Error initializing Google Auth:', error);
        });
    });
}

if (window.gapi) {
    startApp();
} else {
    window.onload = function() {
        startApp();
    };
}
