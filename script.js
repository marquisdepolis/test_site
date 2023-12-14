function onSignIn(googleUser) {
    console.log('User signed in.'); // For debugging
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    
    console.log('ID Token: ', id_token); // For debugging

    fetch('/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server: ', data); // For debugging
        if (data.loggedIn) {
            console.log('User is logged in'); // For debugging
            document.getElementById('signin-button').style.display = 'none'; // Hide sign-in button
            document.getElementById('status-message').innerText = 'Welcome, ' + profile.getName();
        } else {
            console.log('User is not logged in'); // For debugging
            document.getElementById('status-message').innerText = 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error during fetch: ', error);
        document.getElementById('status-message').innerText = 'An error occurred. Please try again.';
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.'); // For debugging
        document.getElementById('signin-button').style.display = 'block'; // Show sign-in button
        document.getElementById('status-message').innerText = 'Please log in.';
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

window.onload = function() {
    let token = localStorage.getItem('token');
    if(token) {
        updateUI(true);
    } else {
        updateUI(false);
    }
}
