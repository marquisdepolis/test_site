window.onload = function() {
    google.accounts.id.initialize({
        client_id: '149913241851-j6himeafqd5snvi98gt8ah7fa0meitqj.apps.googleusercontent.com', // Use your actual Client ID
        callback: onSignIn
    });
    google.accounts.id.renderButton(
        document.getElementById('signin-button'), // Ensure this element exists in your HTML
        { theme: 'outline', size: 'large' }  // Customization attributes
    );
    google.accounts.id.prompt(); // This will prompt the user to select an account
};

function onSignIn(response) {
    // The ID token you need to pass to your backend:
    let id_token = response.credential;

    // Decode the token to get user info (optional, for frontend use)
    const user = JSON.parse(atob(id_token.split('.')[1]));
    console.log('User Email:', user.email);
    // Display user information or a welcome message
    var userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = 'Hello, ' + user.name + '! You are now signed in.';
    userInfoDiv.style.display = 'block';
}

function onFailure(error) {
    console.error('Sign-In Error:', error);
}
