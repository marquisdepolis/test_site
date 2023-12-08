let gapiLoadAttempts = 0;

window.onload = function() {
    google.accounts.id.initialize({
        client_id: '149913241851-j6himeafqd5snvi98gt8ah7fa0meitqj.apps.googleusercontent.com',
        callback: onSignIn
    });
    google.accounts.id.renderButton(
        document.getElementById('signin-button'),
        { theme: 'outline', size: 'large' }  // Customization attributes
    );
    google.accounts.id.prompt(); // This will prompt the user to select an account
};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
    console.log('User signed in:', response);

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

function loadGapiAndInit() {
    if (window.gapi) {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: '149913241851-j6himeafqd5snvi98gt8ah7fa0meitqj.apps.googleusercontent.com', // Replace with your actual Client ID
                cookiepolicy: 'single_host_origin',
            }).then(renderButton, function(error) {
                // Log the full error object to the console
                console.error('Error initializing Google Auth:', error);
                // Attempt to log more detailed error information
                console.error('Detailed error message:', error.details);
            });
        });
    } else if (gapiLoadAttempts < 3) {
        gapiLoadAttempts++;
        setTimeout(loadGapiAndInit, 1000); // Retry after 1 second
    } else {
        console.error('Failed to load Google API');
    }
}

// Start the process
loadGapiAndInit();
