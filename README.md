## ASTEROIDS APP

### Example:

ASTEROIDS Application

An application used to track asteroids based on the NASA API, built with React and TailwindCSS.
This application is using in addition a backend for frontend. The repository can be found [here](https://github.com/CyrielleAlbert/asteroid-backend-kotlin)

## Project Status

What has been implemented so far:

- Home page with DatePicker

There are several important missing features:

- Limitation on which start date /end date the user picks so that it is always a week
- FE error handling of errors in the query to the backend
- Accessibility
- Frontend caching
- Minifying bundle files and code-splitting to reduce size of the bundle file and improve performance
- Tests

## Installation and Setup Instructions

### Requirements:

`Node v.18`

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To build the application:

`npm run build`

If you are not running the Kotlin server locally, the app will be using mock data, you can run this script to start the frontend:

`npm run start:mock`

If you run the Kotlin server locally, you can rung this command to use the API:

`npm start`

To Visit App:

[http://localhost:3001](http://localhost:3001)

Figma sketches:

[https://www.figma.com/file/u2d84nwSs8V74jhQa8s6X2/Asteroid](https://www.figma.com/file/u2d84nwSs8V74jhQa8s6X2/Asteroid?type=design&node-id=1%3A13&mode=design&t=xHQ4Jgg8NFUcfb0g-1)
