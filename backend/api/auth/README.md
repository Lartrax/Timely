# Service for authenticating with Google

## Getting started

[Go back](../)

## Info

This service uses Google OAuth to generate a user token used to store user data in our database

### Endpoints

Base url: `https://auth.larserik.space`

Generate redirect: `/generate_redirect/{redirect_url}` GET

Responds with a url to Google login

Get user: `/get_user/{access_token}` GET

Responds with user information e.g. id, username, email, profile-picture
