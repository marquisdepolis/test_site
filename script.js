function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser); // Confirm onSignIn is triggered
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ', id_token); // Confirm the token is received

    fetch('/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
    })
    .then(data => {
        console.log('Server response', data); // Log the server response
        if (data.loggedIn) {
            // Update UI or redirect as needed
            window.location.href = 'welcome.html'; // Redirect to a welcome page or update the UI
        } else {
            document.getElementById('status-message').innerText = 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
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
        window.location.href = 'protected.html'; // Redirect to the protected path
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
