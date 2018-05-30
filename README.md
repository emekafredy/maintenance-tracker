# maintenance-tracker

Maintenance tracker is an app that enables employees of an organization request for maintenance, repair or replacement of their work tools. With this app, communication between the employees and the maintenance/repairs department is more effective and requests tracking is done without stress.

# badges
[![Build Status](https://travis-ci.org/emekafredy/maintenance-tracker.svg)](https://travis-ci.org/emekafredy/maintenance-tracker)
[![Coverage Status](https://coveralls.io/repos/github/emekafredy/maintenance-tracker/badge.svg)](https://coveralls.io/github/emekafredy/maintenance-tracker)
[![Maintainability](https://api.codeclimate.com/v1/badges/a79d96ad9d606beaf37b/maintainability)](https://codeclimate.com/github/emekafredy/maintenance-tracker/maintainability)


# Features:


# Users

- Sign up page for new users and Login page for registered users
- Pages for users to create, edit or cancel requests
- User can also see all requests made


# Admin

- Logged in admin can see every employees' requests
- Admin can process employees' requests by either approving or rejecting them
- When request has been resolved, admin can mark as resolved


# Installation

- filepath> git clone https://github.com/emekafredy/maintenance-tracker.git
- npm install
- npm start


# API

- Heroku - https://emeka-m-tracker.herokuapp.com/api/v1

 | Method | Description | Endpoints | Role |
 | ------ | ----------- | --------- | ---- |
 | POST | Users Sign Up | auth/signup | User |
 | POST | Users Login | auth/login | User |
 | GET | Get all requests for a logged-in User | /users/requests | User |
 | POST | Create new request | /users/requests | User |
 | GET | Get a request by ID (ID must be a number) | /users/requests/requestId | User |
 | PUT | Update existing request | /users/requests/requestId | User |
 | GET | Get all Requests | /requests | Admin |
 | PUT | Approve a request | /requests/requestId/approve | Admin |
 | PUT | Disapprove a request | /requests/requestId/disapprove | Admin |
 | PUT |  Resolve a request | /requests/requestId/resolve | Admin |


# API documentation

- Apiary - https://mtracker.docs.apiary.io/#


# UI Template

- https://emekafredy.github.io/maintenance-tracker/UI

# Front-end app
- https://emeka-m-tracker.herokuapp.com/


# Project Management Tool

- https://www.pivotaltracker.com/n/projects/2171557

# Author
- Emeka Samuel Chinedu