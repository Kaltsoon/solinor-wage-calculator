# Solinor Wage Calculator

[![Build Status](https://travis-ci.org/Kaltsoon/solinor-wage-calculator.svg?branch=master)](https://travis-ci.org/Kaltsoon/solinor-wage-calculator)

Demo: [https://solinor-wage-calculator.herokuapp.com/](https://solinor-wage-calculator.herokuapp.com/)

## About the structure

The mosts interesting modules of this project are in the `app-modules/helpers/wage/index.js` and `app-modules/wage-file-parser/index.js` files. First file contains all the logic for calculating the wages and the latter streams a csv file line by line and reduce it to wage per person, per month and year. Idea was to minimize the use of memory for large files using streams, but `highland` library also provides excelent api which simplifies the code. 

Tests for these modules can be found in the `__tests__` folder inside each modules root folder. 

## How to use?

Drag a csv file to "Drag a csv file here" box and press "Calculate wages" button. A modal will open soon after with the calculated wages. 

If an error occurs, an error message will appear and modal won't open.

If you prefer a more old school client, feel free to send your file as a HTTP POST request to `https://solinor-wage-calculator.herokuapp.com/api/v1/wage-files` with `Content-Type` header set to `multipart/form-data`.

## How to develop?

Start by cloning / forking this repository.

Server side code can be cound in the `server` folder and client side code can be found in the `client` folder. `gulpfile.js` file contains several useful tasks for developing. You can run the the default task which launches nodemon with JavaScript and SASS processing tasks by running `npm run-script dev`.

If you don't want to put environment variables infront of the command, you can create a `.env` file in the root of the project.

## How to run tests

Run `npm test`.
