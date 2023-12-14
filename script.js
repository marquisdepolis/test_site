function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: ", id_token); // Debugging line
    fetch('/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from server: ", data); // Debugging line
        if(data.loggedIn) {
            localStorage.setItem('token', data.token); // Store token
            window.location.href = '/path-after-login'; // Redirect the user
        } else {
            updateUI(false);
        }
    });
}

function updateUI(loggedIn, googleUser = null) {
    let message = loggedIn ? `Welcome, ${googleUser.getBasicProfile().getName()}` : 'Please log in';
    document.getElementById('status-message').innerText = message;
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('token'); // Clear token
        window.location.href = '/path-after-logout'; // Redirect the user
    });
}

window.onload = function() {
    let token = localStorage.getItem('token');
    if(token) {
        updateUI(true);
    } else {
        updateUI(false);
    }
}
