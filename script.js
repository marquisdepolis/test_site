function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

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
            document.getElementById('signin-button').style.display = 'none'; // Hide sign-in button
            document.getElementById('status-message').innerText = `Welcome, ${profile.getName()}`;
            // You can add more UI changes here as needed
        } else {
            document.getElementById('status-message').innerText = 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error during fetch: ', error);
        document.getElementById('status-message').innerText = 'An error occurred. Please try again.';
    });
}

function updateUI(loggedIn, googleUser = null) {
    let messageElement = document.getElementById('status-message');
    let signOutButton = document.getElementById('signout-button');
    if(loggedIn) {
        let userName = googleUser.getBasicProfile().getName();
        messageElement.innerText = `Welcome, ${userName}`;
        signOutButton.style.display = 'block'; // Show sign-out button
        window.location.href = '/protected'; // Redirect to the protected path
    } else {
        messageElement.innerText = 'Please log in';
        signOutButton.style.display = 'none'; // Hide sign-out button
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('token'); // Clear token
        updateUI(false); // Update UI to show login button
        window.location.href = '/'; // Redirect to the home page
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
