# Spm 'Sport pour meufs' app

## Description
This app was created during our Ironhack web dev training.

It was designed for women who wants to join a sport team and for clubs who want to promote their teams and events around women sport.

## Setup

This app has 2 repositories : [Api](https://github.com/abwashere/SPM-app-server),
[Front](https://github.com/abwashere/SPM-app-client).

Use npm to install packages.
```bash
cd SPM-app-client
npm install
```

#### Configure frontend environmental variables

1) Create a **`.env`** file in the repo's root folder.

2)  Set those variables:

REACT_APP_BACKEND_URL="http://localhost:<your-server-port>"

REACT_APP_MAPBOX_TOKEN="your-own-mapbox-token" *
**See : 
[https://docs.mapbox.com/help/tutorials/get-started-tokens-api/](https://docs.mapbox.com/help/tutorials/get-started-tokens-api/)*

## Available Scripts - client side

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!