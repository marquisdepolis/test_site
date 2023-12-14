function onSignIn(googleUser) {
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
            localStorage.setItem('token', data.token); // Store token
            updateUI(true, googleUser);
        } else {
            updateUI(false);
        }
    });
}

function updateUI(loggedIn, googleUser = null) {
    let message = loggedIn ? `Welcome, ${googleUser.getBasicProfile().getName()}` : 'Please log in';
    document.getElementById('status-message').innerText = message;
}

window.onload = function() {
    let token = localStorage.getItem('token');
    if(token) {
        updateUI(true);
    } else {
        updateUI(false);
    }
}
