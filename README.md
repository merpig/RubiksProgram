<style>

  #user-content-descriptor {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    color: #24292e;
    border-radius: 6px;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
  }


</style>

<p align="center">
  <img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/icon.png" width="100" height="100">  
</p>
<div align="center">
  <a href="https://merpig.github.io/RubiksProgram"><h1>Rubiks Program</h1></a>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Development version live at [merpig.github.io/RubiksProgram](https://merpig.github.io/RubiksProgram)

Hosted by [ruwix.com](https://ruwix.com/) at [cube-solver.com](https://cube-solver.com)

<hr>

</div>

## Table of Contents

- [How to use](#how-to-use)
  - [Base Functions](#base-functions)
    - [Mouse](#base-functions-mouse)
    - [Keyboard](#base-functions-keyboard)
  - [Base Options](#base-options)
    - [Cubes](#cubes)
    - [Info](#info)
    - [Fullscreen](#fullscreen)
    - [Settings](#settings)
    - [Speed](#speed)
    - [Undo/redo](#undo-redo)
  - [Menu Options](#menu)
    - [Color Picker](#color-picker)
    - [Patterns](#patterns)
    - [Reset](#reset)
    - [Scramble](#scramble)
    - [Solver](#solver)

<hr>

## How to use

### Base Functions
<a id="base-functions-mouse"></a>
<div id="descriptor">

<b>-</b> Mouse 

Left click, hold down, and drag along any slice of the cube to make a turn in the direction you drag your mouse in. On mobile just drag your finger along the slice.

Left click, hold down, and drag anywhere in the space around the cube to rotate the camera. On mobile just drag your finger in that space.

</div>

<a id="base-functions-keyboard"></a>
<div id="descriptor">

<b>-</b> Keyboard

Right arrow will redo a move if you have undone at least one. Hold down to have moves continuously redone.

Left arrow with undo a move if you made at least one. Hold down to have moves continuously undone.

</div><br>

### Base Options
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/basic-options.png" width="100%">

<!-- -->
<a id="cubes"></a>
<div  id="descriptor"
      style="
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        color: #24292e;
        border-radius: 6px;
        font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;"
>

  <p align="center">
    <img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/cubes.png" height="50px" style="display: inline-block;">
  </p>

  <div style="width:100%"></div>

  Shows a drown list of cube sizes 2-10. Select any to generate that sized cube. To access larger cubes (up to 70 if your computer is able to handle it) change the url variable. 
    
  Example of 30x30: https://merpig.github.io/RubiksProgram/id=30
</div>

<a id="info"></a>
<div id="descriptor">

  <p align="center">
    <img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/info.png" height="50px" style="display: inline-block;">
  </p>

  <div style="width:100%"></div>

  Opens a model with basic overview of the application and how to use.
</div>

<a id="fullscreen"></a>


    - Fullscreen

<a id="settings"></a>


    - Settings

<a id="speed"></a>


    - Speed


### Menu Options
<img src="https://raw.githubusercontent.com/merpig/RubiksProgram/master/public/menu-options.png" width="100%">

<a id="color-picker"></a>


    - Color Picker

<a id="patterns"></a>


    - Patterns

<a id="color-picker"></a>


    - Reset

<a id="color-picker"></a>


    - Scramble

<a id="color-picker"></a>


    - Solver

<hr>

<a name="about"></a>
## About this project

### Control the turn speed of moves. Adjust speed with slider



### Builtin pattern functions. Click button to initiate pattern


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
