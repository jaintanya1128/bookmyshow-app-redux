# Book Movie

This repository contains the complete end-to-end code for this application.
<br />

## Folder Details

1. 'client' folder contains all the client end code
2. 'serverside_microservices' folder as the name suggests, contains the complete code for server side which have been broken down into micro-services.
3. 'screen-shots' folder: again as the name, it have few screen-shots of the working model
   <br />

## Client side application details

This part of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
<br />
In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<br />

## Server side microservices

There are total of 3 microservices and 1 internal 3rd part API that have been used for creating the application. This API is used by the movie-micro-service to get the list of movies or details of any perticular movie.

The client side application will only talk to the api-gateway present and this gateway will internally talk to all the micro-service.

### Development Mode:

In each of the microservice project directory and in api-gateway directory, run the command:

#### `npm start`

This will execude them in development mode.<br/>
use postman to execute and test the api using [http://localhost:5000](http://locahost:5000) as api-gateway, however ensure that all the microservices and Mongo DB are up and running

### Production Mode:
