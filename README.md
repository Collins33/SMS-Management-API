# SMS-Management-API

[![Build Status](https://travis-ci.org/Collins33/SMS-Management-API.svg?branch=develop)](https://travis-ci.org/Collins33/SMS-Management-API)

SMS management API
The API provides a user a way to manage messages he sends and also track who receives the message.

## Getting Started

- git clone https://github.com/Collins33/SMS-Management-API.git
- cd into the project folder
- run `npm install`

## Setting up mongo Atlas

- create an account on mongo DB atlas
- create a mongo atlas database
- ensure the IP security settings allow connctions from everywhere
- copy the connection url given to you.
- create nodemon.json file
- add the password given to you.
- "MONGO_PASSWORD": "xxxxxxxxxxxx"

## Starting the application

- run `npm start`

## endpoints

| Endpoint                          |            FUNCTIONALITY            |
| --------------------------------- | :---------------------------------: |
| POST /api/v1/contact              |    This will create the contact     |
| GET /api/V1/contact               |   This will get all the contacts    |
| GET /api/V1/contact/:contactId    | This will get an individual contact |
| PATCH /api/V1/contact/:contactId  |  This will edit a specific contact  |
| DELETE /api/V1/contact/:contactId |     This will delete a contact      |
| POST /api/api/v1/sms              |       This will create an sms       |
| GET /api/v1/sms                   |     This will get all sms sent      |
| GET /api/v1/sms/:smsId            |     This will get a single sms      |
| DELETE /api/v1/sms/:smsId         |   This will delete a specific sms   |

## Built With

- [NODE/EXPRESS](https://expressjs.com/) - The web framework used
- [npm](https://www.npmjs.com/) - Dependency Management
- [Mongo Atlas](https://www.mongodb.com/cloud/atlas)-Database

## Authors

- **COLLINS NJAU MURU**

## License

This project is licensed under the MIT License
