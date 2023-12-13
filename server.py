from flask import Flask, redirect, request, url_for
import googleapiclient.discovery
import os
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
client_id = os.getenv("GOOGLE_CLIENT_ID")
client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

from flask import session

@app.before_request
def before_request():
    if "user_id" in session:
        user = User.query.get(session["user_id"])
        g.user = user

@app.route("/")
def home():
    if g.user:
        return redirect(url_for("welcome"))

@app.route("/auth/google/callback")
def google_callback():
    # Create a new OAuth2 client
    client = googleapiclient.discovery.build(
        "oauth2", "v2",
        client_id=client_id,
        client_secret=client_secret)

    id_token = request.form.get("id_token")
    access_token = request.form.get("access_token")

    # Use the ID token and access token to authenticate the user.

    # If the user is authenticated, create a session for them.

    # Redirect the user to the home page.

    return redirect(url_for("home"))

@app.route("/auth/google/store_refresh_token", methods=["POST"])
def store_refresh_token():
    refresh_token = request.form.get("refresh_token")

    # Store the refresh token in a database.

    return jsonify({"success": True})

@app.route("/welcome")
def welcome():
    # Check if the user is signed in.

    # If the user is signed in, show the welcome page.

    # If the user is not signed in, redirect them to the home page.

    return render_template("welcome.html")

def get_new_access_token(refresh_token):
    """Gets a new access token from a refresh token."""

    # Create a new OAuth2 client.
    client = googleapiclient.discovery.build(
        "oauth2", "v2",
        client_id=client_id,
        client_secret=client_secret)

    # Use the refresh token to obtain a new access token.
    new_access_token, _ = client.tokeninfo(access_token=refresh_token).execute()

    return new_access_token


if __name__ == "__main__":
    app.run()