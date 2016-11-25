# Solinor Wage Calculator

[![Build Status](https://travis-ci.org/Kaltsoon/solinor-wage-calculator.svg?branch=master)](https://travis-ci.org/Kaltsoon/solinor-wage-calculator)

Demo: [https://dashboard.heroku.com/apps/solinor-wage-calculator/settings](https://solinor-wage-calculator.herokuapp.com/)

## How to use?

Drag a csv file to "Drag a csv file here" box and press "Calculate wages" button. A modal will open soon after with the calculated wages. If an error occurs, an error message will appear and modal won't open.

## How to develop?

Server side code can be cound in the `server` folder and client side code can be found in the `client` folder. `gulpfile.js` file contains several useful tasks for developing, you can ran the the default task which launches nodemon with JavaScript and SASS processing tasks by running `npm run-script dev`.
