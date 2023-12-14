function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

    // Send the ID token to the backend
    fetch('/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => response.json())
    .then(data => {
        if(data.loggedIn) {
            document.getElementById('status-message').innerText = `Welcome, ${profile.getName()}`;
        } else {
            document.getElementById('status-message').innerText = 'Failed to log in';
        }
    });
}
