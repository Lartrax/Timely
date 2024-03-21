# Proxy service for redirecting to the app from Google login

## Getting started

[Go back](backend/api)

## Info

Why? Because Googel doesn't allow funky urls like `https://tauri.localhost` so we use a proxy to get out hands their hashes.

This is a Bun web server with just some basic javascript to redirect requests and handle hashes

The service takes out it's own hash and redirects to the app with the hash applied

### Endpoint

Base url: `https://proxy.larserik.space`
