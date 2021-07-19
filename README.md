# Daily Planner using React and Firebase

Daily Planner is a react.js application that uses firebase as the backend for database and hosting.

## Prerequisites
* Firebase account
* node
* npm
---
## Steps to run as development mode
  Create Firebase project and get the SDK config.

```bash
$ git clone https://github.com/BharathKumarMurugan/daily-planner-react-firebase.git

$ cd daily-planner-react-firebase/

$ npm install

$ npm start # to run application in development mode
```
---
## Steps to deploy the application
```bash
$ npm install -g firebase-tools

$ firebase init # select Hosting option

$ npm run build

$ firebase deploy
```