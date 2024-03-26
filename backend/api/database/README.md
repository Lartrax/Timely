# Service for communicating with out Postgres database

## Getting started

[Go back](../)

## Info

This is a rust service for running sql queries on our sql database.

### Endpoints

Base url: `https://database.larserik.space`

Create user: `/user/{user_id}/{username}/{email}` POST

Responds with Ok

Update one week of work: `/work/{user_id}` POST

Responds with Ok

Get work `/work/{user_id}/{week}/{year}` GET

Responds with one week of work

Get all work `/work/{user_id}` GET

Repsonds with the dates of all weeks submitted

Get user preferences `/preferences/{user_id}` GET

Responds with the users defined start/end times for work and all their uploaded work codes

Update user preferences `/preferences/{user_id}` POST

Responds with Ok
