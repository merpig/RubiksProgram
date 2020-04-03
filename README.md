<p align="center">
  <img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/icon.png" width="100" height="100">  
</p>
    
[Click Here for Live site](https://merpig.github.io/RubiksProgram)
  
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

## Using the app

### Control the turn speed of moves. Adjust speed with slider
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/speed.png" width="200"> 


### Builtin pattern functions. Click button to initiate pattern
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/patterns.png" width="200"> 

### Move buttons. Click a button to initiate turn. Hover over button to see what it will turn
  - key:
    - Upper case letters  (F,U,R,B,L,D) signify single layer turns
    - Lower case letters turn multiple layers at a time.
    - 01...NN before the letter signify the depth of the turn
    - ' signifies counter clockwise turn
    - 04f' is equivalent to 01F' 02F' 03F' 04F'
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/movebuttons.png" width="200"> 

### Input field to enter moves
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/input.png" width="200"> 

### Basic cube functions
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/core.png" width="200"> 

## Resources

- [Threejs](https://www.npmjs.com/package/three) - Library for displaying 3D graphics in the browser
- [OrbitControls](https://www.npmjs.com/package/three-orbitcontrols) - "Orbit controls allow the camera to orbit around a target."
- [Stats](https://www.npmjs.com/package/stats-js) - "This class provides a simple info box that will help you monitor your code performance."

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify