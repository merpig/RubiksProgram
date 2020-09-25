import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Speeds from "./components/Speeds/Speeds";
import MoveInput from "./components/MoveInput";
import SolverInfo from "./components/SolverInfo/SolverInfo";
import ColorPickerInfo from "./components/ColorPickerInfo/ColorPickerInfo";
import Menu from "./components/MenuWrapper/MenuWrapper";

import * as THREE from "three";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import cube from './cubeFunctions/cube';
import solver from './solvers/solver';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// TODO:
/*
 * 1. Start moving functions to other files: STARTED
 * 
 * 2. UI Rework: Started
 * 
 * 3. Continue working on solvers.
 * 
 * 4. ISSUES:
 *  - Fix issue is yellow solver
 */


class App extends Component {
  state = {
    cubes : [],           // Contains visual cube
    rubiksObject : [],    // Contains memory cube
    blackObject: [],
    speed : 7.5,          // Control individual piece rotation speed (don't change)
    rotationSpeed : 350,  // Controls visual rotation speed
    start : 7.5,          // Start value for a rotation or set of rotations
    end : 0,              // End value for a roation or set of rotations
    turnDirection : 0,    // Dictates whether the rotation is clockwise or counterclockwise
    face : 0,             // The face being turned
    cameraX : 5,          // Camera position x
    cameraY : -5,         // Camera position y
    cameraZ : 2,          // Camera position z
    currentFunc : "None", // Variable used to display current function
    moveLog : "",         // Keeps a log of all moves
    moveSet : [],         // Algorithms queue moves through this variable
    prevSet : [],
    angle : 3.9,          // Camera angle
    cubeDimension : null, // Cube dimensions. Ex: 3 => 3x3x3 cube
    cubeDepth : 1,        // Used to determine rotation depth on cubes greater than 3
    currentSpeed:"Medium",// Displays which speed is selected
    moves : 0,            // Used by scramble functions
    reload : false,       // Lets animate know when to reload the cube (after every move)
    solveState : -1,      // Dictates progression of solve function
    solveMoves : "",      // Keeps track of moves used during solve
    solvedSet: [],
    solvedSetIndex: 0,
    facePosX : null,
    facePosY : null,
    facePosZ : null,
    faceSide : null,
    colorPicked: 'white',
    mouseFace : null,
    mouseDown : false,
    mousePos : null,
    undoIndex : 0,        // Index to keep track of where undo/redo is
    blockMoveLog : false, // Blocks adding move when undoing/redoing a move
    previousPiece : null, // Keeps track of hovered face to not redraw
    rubiksIndex : 0,      // Index to keep track of middles while solving
    middles : [],         // Contains all middle segments
    corners : [],         // Contains all corner segments         
    // showStats: false,     // Setting for stats
    showMoveInput: false,  // Setting for custom move input
    showControls: false,   // Setting for move controls
    showHints: true,
    showGuideArrows: true,
    activeDragsInput: 0,  // Keeps track of draggable input
    deltaPositionInput: {
      x: 100, y: 100
    },
    controlledPositionInput: {
      x: 0, y: 0
    },
    activeDragsControls: 0,// Keeps track of draggable buttons
    deltaPositionControls: {
      x: 100, y: 100
    },
    controlledPositionControls: {
      x: 0, y: 0
    },
    isMulti : false,
    isVisible : false,
    isValidConfig : true,
    hoverData : [],
    showSolveController : false,
    autoPlay : false,
    autoRewind: false,
    autoTarget: false,
    playOne : false,
    generateAllMoves: false,
    isLocal : null,
    cpErrors : [],
    activeMenu : "",
    solveTime:0,
    targetSolveIndex: -1,
    activeAlgo:"None Selected",
    sliderSpeed:40
  };

  // Bind keys to functions
  keyBinds = key => {
    switch (key){

      case 'R':
        this.rotateOneFace(key+"'",[2,0,1]);
        break;
      case 'r':
        this.rotateOneFace(key.toUpperCase(),[2,-1,1]);
        break;

      case 'L':
        this.rotateOneFace(key+"'",[4,0,1]);
        break;
      case 'l':
        this.rotateOneFace(key.toUpperCase(),[4,-1,1]);
        break;

      case 'F':
        this.rotateOneFace(key+"'",[0,0,1]);
        break;
      case 'f':
        this.rotateOneFace(key.toUpperCase(),[0,-1,1]);
        break;

      case 'U':
        this.rotateOneFace(key+"'",[1,0,1]);
        break;
      case 'u':
        this.rotateOneFace(key.toUpperCase(),[1,-1,1]);
        break;

      case 'D':
        this.rotateOneFace(key+"'",[5,0,1]);
        break;
      case 'd':
        this.rotateOneFace(key.toUpperCase(),[5,-1,1]);
        break;

      case 'B':
        this.rotateOneFace(key+"'",[3,0,1]);
        break;
      case 'b':
        this.rotateOneFace(key.toUpperCase(),[3,-1,1]);
        break;

      case '1':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('white');
        }
        break;
      case '2':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('blue');
        }
        break;
      case '3':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('red');
        }
        break;
      case '4':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('yellow');
        }
        break;
      case '5':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('orange');
        }
        break;
      case '6':
        if(this.state.currentFunc==='Color Picker'){
          this.changeColor('green');
        }
        break;
      case 'ArrowLeft':
        if(this.state.currentFunc==='Solving'||this.state.currentFunc==='Algorithms'){
          this.rewindSolve();
        }
        else if(this.state.currentFunc==='None'){
          this.undo();
        }
        break;
      case 'ArrowRight':
        if(this.state.currentFunc==='Solving'||this.state.currentFunc==='Algorithms'){
          if(!this.state.moveSet.length) return;
          if((this.state.moveSet[0]===this.state.moveSet[1]||this.state.moveSet[1]==="stop'")&&!this.state.autoPlay){
            this.setState({
                  autoPlay:true,
                  autoRewind:false,
                  targetSolveIndex:this.state.solvedSetIndex+2});
          }
          else{
              if(this.state.playOne===true) return;
              if(this.state.moveSet[0]&&typeof(this.state.moveSet[0][0])==='string'&&this.state.moveSet[0]!=="'"){
                this.setState({playOne:true,prevSet:[...this.state.prevSet,this.state.moveSet[0]]});
              }
          }
        }
        else if(this.state.currentFunc==='None'){
          this.redo();
        }
        break;
      default:
    }
  }

  // Handles key press event
  keyHandling = e => {
    this.keyBinds(e.key);
  }

  onMouseDown( event ) {
    if(!this.state.mouseDown){
      if(this.state.currentFunc==="Color Picker"&&this.state.previousPiece){
        let toFace = [2,4,3,0,1,5];
        this.changeFaceColor({x:this.state.facePosX,y:this.state.facePosY,z:this.state.facePosZ},toFace[this.state.faceSide],this.state.colorPicked)
      }
      this.setState({mouseDown : true});  
    }
  }

  onMouseUp( event ) {
    this.setState({mouseDown : false});  
  }

  onSliderChange = (value) => {
    this.setState({sliderSpeed:value})
    switch(value){
      case 0:
        this.changeSpeed(1.5,1050,"Slowest");
        break;
      case 10:
        this.changeSpeed(3,750,"Slower")
        break;
      case 20:
        this.changeSpeed(5,500,"Slow")
        break;
      case 30:
        this.changeSpeed(7.5,350,"Medium")
        break;
      case 40:
        this.changeSpeed(10,250,"Fast")
        break;
      case 50:
        this.changeSpeed(15,175,"Faster")
        break;
      case 60:
        this.changeSpeed(30,100,"Fastest")
        break;
      case 70:
        this.changeSpeed(90,20,"Zoomin")
        break;
      default:
        console.log("unexpected behavior");
    }
  }

  // Functions to change speed
  changeSpeed = (_speed,_rotationSpeed,_name,bypass) => {
    this.state.currentFunc!=="None"&&!bypass ?
      this.setState({moveSet:[[_speed,_rotationSpeed,_name],...this.state.moveSet]}):
      this.setState({currentSpeed: _name,speed: _speed, start: _speed, end: 0, rotationSpeed: _rotationSpeed});
  }

  changeColor = (color) => {
    this.setState({colorPicked:color});
  }

  changeFaceColor = (pos,side,color) => {
    let tempObj = [...this.state.rubiksObject]
    for(let i = 0; i < tempObj.length; i++){
      let tempCube = [...tempObj[i]];
      if(tempCube[6]===pos.x && tempCube[7]===pos.y && tempCube[8]===pos.z){
        tempCube[side]=color;
        tempObj[i] = [...tempCube];
        i = tempObj.length;
      }  
    }
    this.setState({rubiksObject:[...tempObj]},()=>{
      this.reloadTurnedPieces('cp');
      let obj = this.checkColors();
      if(obj.error) this.setState({isValidConfig:false,cpErrors:[...obj.error]});
      else if(obj.success) this.setState({isValidConfig:true,cpErrors:[]});
    });
  }

  convertToBlueMiddle(_piece){
    const piece = [..._piece];
    const dim = this.state.cubeDimension;
    const max = dim-1;
    const white=0,blue=dim-1,red=dim-1,yellow=dim-1,orange=0,green=0;

    if(piece[7]===white) {
      return {
        colors:[
          piece[5], // color on bottom(face 5) is now on front(index 0)
          piece[0], // color on front(0) is now on top(1)
          piece[2], // color on right(2) is still on right(2)
          piece[1], // color on top(1) is now on back(3)
          piece[4], // color on left(4) is now on left(4)
          piece[3]  // color on back(3) is now on bottom(5)
        ].join(""),
        position:[
          piece[6],
          piece[8],
          max // becomes top
        ]
      }
    }

    if(piece[8]===blue) {
      return {
        colors:[
          piece[0], // piece on front(0) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[2], // piece on right(2) is now on right(2)
          piece[3], // piece on back(3) is now on back(3)
          piece[4], // piece on left(4) is now on left(4)
          piece[5] // piece on bottom(5) is still on bottom(5)
        ].join(""),
        position:[
          piece[6], // stays same
          piece[7],  // stays same
          max // becomes top
        ]
      }
    }

    if(piece[6]===red) {
      return {
        colors:[
          piece[0], // piece on front(index 0) remains the same
          piece[2], // piece on right(2) is still on top(1)
          piece[5], // piece on bottom(5) is now on right(2)
          piece[3], // piece on back(3) remains the same
          piece[1], // piece on top(1) is now on left(4)
          piece[4]  // piece on left(4) is still on bottom(5)
        ].join(""),
        position:[
          piece[8], 
          piece[7],  
          max // becomes top
        ]
      }
    }

    if(piece[7]===yellow) {
      return {
        colors:[
          piece[1], // piece on front(0) is now on bottom(5)
          piece[3], // piece on top(1) is still on front(0)
          piece[2], // piece on right(2) is now on right(2)
          piece[5], // piece on back(3) is now on top(1)
          piece[4], // piece on left(4) is now on left(4)
          piece[0] // piece on bottom(5) is still on back(3)
        ].join(""),
        position:[
          piece[6], // inverse y becomes x
          max-piece[8],  // y becomes 0
          max // becomes top
        ]
      }
    }

    if(piece[6]===orange) {
      return {
        colors:[
          piece[0], // piece on front(0) is now on front(0)
          piece[4], // piece on top(1) is still on right(2)
          piece[1], // piece on right(2) is now on bottom(5)
          piece[3], // piece on back(3) is now on back(3)
          piece[5], // piece on left(4) is now on top(1)
          piece[2] // piece on bottom(5) is still on left(4)
        ].join(""),
        position:[
          piece[8], // inverse y becomes x
          piece[7],  // y becomes 0
          max // becomes top
        ]
      }
    }

    if(piece[8]===green) {
      return {
        colors:[
          piece[0], // piece on front(0) is now on front(0)
          piece[5], // piece on top(1) is still on bottom(5)
          piece[4], // piece on right(2) is now on left(4)
          piece[3], // piece on back(3) is now on back(3)
          piece[2], // piece on left(4) is now on right(2)
          piece[1] // piece on bottom(5) is still on top(1)
        ].join(""),
        position:[
          max-piece[6], // inverse y becomes x
          piece[7],  // y becomes 0
          max // becomes top
        ]
      }
    }

  }

  convertToBlueWhiteEdge(_piece){
    const piece = [..._piece];
    const dim = this.state.cubeDimension;
    const max = dim-1;
    const white=0,blue=dim-1,red=dim-1,yellow=dim-1,orange=0,green=0;

    // colors according to the solved cube
    if(piece[7]===white&&piece[8]===blue) {
      return {
        colors:[
          piece[0], // piece on front(0) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[2], // piece on right(2) is now on right(2)
          piece[3], // piece on back(3) is now on back(3)
          piece[4], // piece on left(4) is now on left(4)
          piece[5] // piece on bottom(5) is still on bottom(5)
        ].join(""),
        position:[
          piece[6], // inverse y becomes x
          0,  // y becomes 0
          max // becomes top
        ].join("")
      }
    }

    if(piece[6]===orange&&piece[8]===blue) {
      return {
        colors:[
          piece[4], // piece on left(4) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[0], // piece on front(0) is now on right(2)
          piece[2], // piece on right(2) is now on back(3)
          piece[3], // piece on back(3) is now on left(4)
          piece[5] // piece on bottom(5) is still on bottom(5)
        ].join(""),
        position:[
          max-piece[7], // inverse y becomes x
          0,  // y becomes 0
          max // becomes top
        ].join("")
      }
    }

    if(piece[7]===yellow&&piece[8]===blue){
      return {
        colors:[
          piece[3], // piece on back(3) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[4], // piece on left(4) is now on right(2)
          piece[0], // piece on front(0) is now on back(3)
          piece[2], // piece on right(2) is now on left(4)
          piece[5] // piece on bottom(5) is still on bottom(5)
        ].join(""),
        position:[
          dim-(piece[6]+1), // inverse x becomes x
          0,  // y becomes 0
          max // becomes top
        ].join("")
      }
    }

    if(piece[6]===red&&piece[8]===blue){
      return {
        colors:[
          piece[2], // piece on right(2) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[3], // piece on back(3) is now on right(2)
          piece[4], // piece on left(4) is now on back(3)
          piece[0], // piece on front(0) is now on left(4)
          piece[5] // piece on bottom(5) is still on bottom(5)
        ].join(""),
        position:[
          piece[7], // inverse y becomes x
          0,  // y becomes 0
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===orange&&piece[7]===white){
      return {
        colors:[
          piece[0], // piece on front(0) is still on front(0)
          piece[4], // piece on left(4) is now on top(1)
          piece[1], // piece on top(1) is now on right(2)
          piece[3], // piece on back(3) is still on back(3)
          piece[5], // piece on bottom(5) is now on left(4)
          piece[2] // piece on right(2) is now on bottom(5)
        ].join(""),
        position:[
          piece[8], // z becomes x
          0,  // y 0
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===red&&piece[7]===white){
      return {
        colors:[
          piece[0], // piece on front(0) is still on front(0)
          piece[2], // piece on right(2) is now on top(1)
          piece[5], // piece on bottom(5) is now on right(2)
          piece[3], // piece on back(3) is still on back(3)
          piece[1], // piece on top(1) is now on left(4)
          piece[4] // piece on left(4) is now on bottom(5)
        ].join(""),
        position:[
          max-piece[8], // inverse z becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===orange&&piece[7]===yellow){
      return {
        colors:[
          piece[4], // piece on left(4) is now on front(0)
          piece[3], // piece on back(3) is now on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          piece[8], // z becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===red&&piece[7]===yellow){
      return {
        colors:[
          piece[2], // piece on right(2) is now on front(0)
          piece[3], // piece on back(1) is still on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          max-piece[8], // inverse z becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[7]===white&&piece[8]===green){
      return {
        colors:[
          piece[0], // piece on front(0) is still on front(0)
          piece[5], // piece on bottom(5) is now on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          max-piece[6], // inverse x becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===orange&&piece[8]===green){
      return {
        colors:[
          piece[4], // piece on left(4) is now on front(0)
          piece[5], // piece on bottom(5) is now on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          piece[7], // y becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[7]===yellow&&piece[8]===green){
      return {
        colors:[
          piece[3], // piece on back(3) is now on front(0)
          piece[5], // piece on bottom(5) is now on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          piece[6], // x becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }

    if(piece[6]===red&&piece[8]===green){
      return {
        colors:[
          piece[2], // piece on right(2) is now on front(0)
          piece[5], // piece on bottom(5) is now on top(1)
          "black",
          "black",
          "black",
          "black",
        ].join(""),
        position:[
          max-piece[7], // inverse y becomes x
          0,  // y remains the same
          max // becomes tops
        ].join("")
      }
    }
    
    console.log("failed to register piece",piece);
    return null;
  }

  checkValidMatch(validPiece,manualPiece){
    let max = this.state.cubeDimension-1;
    let newValidPiece = this.convertToBlueWhiteEdge([...validPiece]);
    let newManualPiece = this.convertToBlueWhiteEdge([...manualPiece]); 
    if((newValidPiece.colors===newManualPiece.colors&&newValidPiece.position===newManualPiece.position)||validPiece.includes("center")){
      return true;
    }
    else if(newValidPiece.colors!==newManualPiece.colors&&parseInt(newValidPiece.position[0])===max-parseInt(newManualPiece.position[0])){
      //console.log("valid");
      //console.log(newValidPiece,newManualPiece)
      return true;
    }
    else return false;
  }

  checkValidMatchMiddle(validPiece,manualPiece){
    let newValidPiece = this.alignQuadrant(this.convertToBlueMiddle(validPiece));
    let newManualPiece = this.alignQuadrant(this.convertToBlueMiddle(manualPiece));

    if(newValidPiece.colors===newManualPiece.colors&&newValidPiece.position===newManualPiece.position){
      return true;
    }
    
    return false;
  }

  alignQuadrant(_piece){
    let pos = _piece.position;
    let piece = {colors:_piece.colors}
    const dim = this.state.cubeDimension;
    const max = dim-1;
    const X = 0, Y = 1, Z = 2;

    if(pos[X] < Math.floor(dim/2) && pos[Y] >= Math.floor(dim/2)){
      piece.position = [ (max - pos[Y]), pos[X], pos[Z] ].join("");
    }
    else if(pos[X] >= Math.floor(dim/2) && pos[Y] >= Math.ceil(dim/2)){
      piece.position = [ (max - pos[X]), max - pos[Y], pos[Z] ].join("");
    }
    else if(pos[X] >= Math.ceil(dim/2) && pos[Y] < Math.ceil(dim/2)){
      piece.position = [ pos[Y], (max-pos[X]), pos[Z]].join("");
    }
    else piece.position=pos.join("");

    return piece;
  }

  setColorPickedCube = () => {
    let rubiks = [...this.state.rubiksObject];
    let generated = cube.generateSolved(this.state.cubeDimension,this.state.cubeDimension,this.state.cubeDimension);
    let newGenerated = [];
    let checked = [];
    let otherChecked = [];

    generated.tempArr.forEach(([...piece],pieceIndex) =>{
      newGenerated.push([]);
      rubiks.forEach(([...rubik],i) => {
        let validPiece = 0;
        piece.slice(0,6).sort().forEach((face,index) =>{
          if(rubik.slice(0,6).sort()[index]===face) {validPiece++;}
        }); 
        if(validPiece===6&&!checked.includes(pieceIndex)&&!otherChecked.includes(i)){
          let validEdgePlacement = false;
          let validMiddlePlacement = false;
          if(piece.includes("edge")){
            validEdgePlacement = this.checkValidMatch(piece,rubik);
            // A center edge cannot match with a non center edge
            if((piece[13]==="center"&&rubik[13]!=="center")||
              (rubik[13]==="center"&&piece[13]!=="center")){
              validEdgePlacement = false;
            }
            else if (piece[13]==="center"&&rubik[13]==="center"){
              validEdgePlacement = true;
            }
          }
          else if(piece.includes("middle")){
            validMiddlePlacement = this.checkValidMatchMiddle(piece,rubik);
          }
          else{
            validEdgePlacement = true;
            validMiddlePlacement = true;
          }
          if(validEdgePlacement||validMiddlePlacement){
            checked.push(pieceIndex);
            otherChecked.push(i);
            newGenerated[pieceIndex]=[
              ...rubik.slice(0,9),
              ...piece.slice(9,15)
            ];
          }
        }
      }) 
    });

    this.setState({rubiksObject:newGenerated,currentFunc : "None",activeMenu:""},()=>{
      this.reloadTurnedPieces('check');
      this.setState({activeMenu:'Solver'});
      this.beginSolve();
    });
  }

  checkOccurences = (a1, a2) => {
    let success = true;
    let amount = 0;
    let failedColors = [];
    for(var i = 0; i < a1.length; i++) {
      var count = 0;
      for(var z = 0; z < a2.length; z++) {
        if (a2[z] === a1[i]) count++;
      }
      if(count>1) {
        success = false;
        if(!failedColors.includes(a1[i])) failedColors.push(a1[i])
      }

    }
    return {success,failedColors,amount}
  }

  checkColors = () => {
    let rubiksLength = this.state.rubiksObject.length;

    let whiteCount = 0,blueCount = 0,redCount = 0,yellowCount = 0,orangeCount = 0,greenCount = 0;
    let duplicateFace = false;
    let duplicateColors = [];
    let matchedCount = 0;
    let obj = {error:[]};
    let validAmount = this.state.cubeDimension*this.state.cubeDimension;
    let rubiks = [...this.state.rubiksObject];
    let generated = cube.generateSolved(this.state.cubeDimension,this.state.cubeDimension,this.state.cubeDimension);
    let newGenerated = [];
    let invalidMiddleConfig;
    let invalidEdgeConfig;
    for(let i = 0; i < rubiks.length; i++){
      let rubik = [...rubiks[i]];
      const colors = ['white','blue','red','yellow','orange','green'];
      if(rubik.includes('white')) whiteCount+=1;
      if(rubik.includes('blue')) blueCount+=1;
      if(rubik.includes('red')) redCount+=1;
      if(rubik.includes('yellow')) yellowCount+=1;
      if(rubik.includes('orange')) orangeCount+=1;
      if(rubik.includes('green')) greenCount+=1;

      let res = this.checkOccurences(colors,rubik);
      if(!res.success){
        duplicateFace = true;
        let tempColors = []
        res.failedColors.forEach(color => {
          if(!tempColors.includes(color)) {
            tempColors.push(color);
          }
        })
        duplicateColors=tempColors;
      }
    }

    let checked = [];
    let otherChecked = [];
    //For each cube piece in the generated solved cube, find the matching
    //manually inputted piece and overwrite the solved position from the unsolved
    //piece with the solved piece's solved position to a new generated cube. For 
    //edge pieces, an extra check was needed to ensure first half segments weren't
    //getting assigned or assigning to second half segments(becomes unsolvable).
    generated.tempArr.forEach(([...piece],pieceIndex) =>{
      newGenerated.push([]);
      let tempInvalidMatch = [];
      rubiks.forEach(([...rubik],i) => {
        let validPiece = 0;
        piece.slice(0,6).sort().forEach((face,index) =>{
          if(rubik.slice(0,6).sort()[index]===face) {validPiece++;}
        });
        if(validPiece===6&&!checked.includes(pieceIndex)&&!otherChecked.includes(i)){
          let validEdgePlacement = false;
          let validMiddlePlacement = false;
          if(piece.includes("edge")){
            validEdgePlacement = this.checkValidMatch(piece,rubik);
            // A center edge cannot match with a non center edge
            if((piece[13]==="center"&&rubik[13]!=="center")||
              (rubik[13]==="center"&&piece[13]!=="center")){
                validEdgePlacement = false;
            }
            else if (piece[13]==="center"&&rubik[13]==="center"){
              validEdgePlacement = true;
            }
          }
          else if(piece.includes("middle")){
            validMiddlePlacement = this.checkValidMatchMiddle(piece,rubik);
            if(!validMiddlePlacement) tempInvalidMatch.push([piece,rubik]);
          }
          else{
            validEdgePlacement = true;
            validMiddlePlacement = true;
          }
          if(validEdgePlacement||validMiddlePlacement){
            matchedCount++;
            checked.push(pieceIndex);
            otherChecked.push(i);
            newGenerated[pieceIndex]=[
              ...rubik.slice(0,9),
              ...piece.slice(9,15)
            ];
          }
        }
      })
      if(newGenerated[pieceIndex].length===0)
        if(piece[12]==="edge")
          invalidEdgeConfig="Invalid edge configuration.";
        else if(piece[12]==="middle"){
          invalidMiddleConfig = "Invalid middle configuration.";
          console.log("Invalid middle configuration.");
          console.log(tempInvalidMatch);
        }
    });


    
    let invalidAmounts = [];
    if(whiteCount!==validAmount){
      invalidAmounts.push("white");
    }
    if(blueCount!==validAmount){
      invalidAmounts.push("blue");
    }
    if(redCount!==validAmount){
      invalidAmounts.push("red");
    }
    if(yellowCount!==validAmount){
      invalidAmounts.push("yellow");
    }
    if(orangeCount!==validAmount){
      invalidAmounts.push("orange");
    }
    if(greenCount!==validAmount){
      invalidAmounts.push("green");
    }
    if(invalidAmounts.length){
      invalidAmounts=invalidAmounts.join(', ');
      obj.error.push(`Invalid ${invalidAmounts} sticker count.`);
    }

    if(duplicateFace){
      duplicateColors=duplicateColors.join(', ');
      obj.error.push(`More than one occurence of ${duplicateColors} found on a piece.`);
    }

    if(matchedCount!==rubiksLength&&this.state.cubeDimension<4){
      obj.error.push(`[${matchedCount-1}] out of [${rubiksLength-1}] matched. Missing [${(rubiksLength-1)-(matchedCount-1)}]`);
    }

    if(invalidEdgeConfig){
      obj.error.push(invalidEdgeConfig);
    }
    if(invalidMiddleConfig){
      obj.error.push(invalidMiddleConfig);
    }

    if(!obj.error.length){
      const solveData = {...this.generateAllSolveMoves(this.state,newGenerated)};
      if(solveData.solveable===false){
        //console.log(newGenerated);
        obj.error.push(`This configuration of the cube is not solveable,
        please check that you've entered all pieces correctly.`);
      }
      else{
        if(solveData.tempObject){
          //console.log(solveData.tempObject);
          for(let i = 0; i<solveData.tempObject.length; i++){
            if((solveData.tempObject[i].slice(0,6).sort().join("")!==generated.tempArr[i].slice(0,6).sort().join(""))&&solveData.tempObject[i][12]==="corner"){
              // console.log(solveData.tempObject[i].slice(0,6).sort().join(""),generated.tempArr[i].slice(0,6).sort().join(""));
              // obj.error.push(`Invalid corner alignment`);
              // break;
            }
          }
          if(!obj.error.length) obj.error = undefined;
        }
        else{
          obj.error = undefined;
        }
      }
    }

    if(!obj.error) {obj.success = true;obj.newGenerated = newGenerated}
    return obj;
  }

  // Allows the user to undo a move
  undo = () => {
    let undoIndex = this.state.undoIndex;
    let moveString = this.state.moveLog;
    const moveArray = this.moveStringToArray(moveString);
    if(moveString === "") return;

    else if(this.state.currentFunc !== "None") return;

    else if(moveArray.length-1-undoIndex >= 0)
      this.setState({blockMoveLog : true,
                     currentFunc : "Undo",
                     moveSet : [moveArray[moveArray.length-1-undoIndex]],
                     undoIndex : undoIndex + 1});
  }

  // Allows the user to redo a move
  redo = () => {
    if(this.state.currentFunc !== "None") return;
    let undoIndex = this.state.undoIndex;
    let moveString = this.state.moveLog;
    if(moveString === "") return;
    
    const moveArray = this.moveStringToArray(moveString);
    
    let backwardsMove = moveArray[moveArray.length-undoIndex];
    try{
      backwardsMove.includes("'") ? backwardsMove = backwardsMove.substring(0,3) : backwardsMove += "'";
    }catch(err){
      return;
    }

    if(undoIndex > 0)
      this.setState({blockMoveLog : true,
                     currentFunc : "Redo",
                     moveSet : [backwardsMove],
                     undoIndex : undoIndex - 1});
  }

  // Control when single buttons can be clicked
  rotateOneFace = (e,vals) => {
    if (vals.length < 4) vals.push(false);

    if(this.state.currentFunc === "None") {

      let cD = this.state.cubeDimension;
      let rubiksObject = this.state.rubiksObject;
      let blockMoveLog = this.state.blockMoveLog;
      let moveLog = this.state.moveLog;
      let solveMoves = this.state.solveMoves;
      let solveState = this.state.solveState;
      let end = this.state.end;
      let obj = this.rotateCubeFace(vals[0],vals[1],vals[2],vals[3],blockMoveLog,moveLog,solveMoves,end,solveState);

      obj.currentFunc = e;
      obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);

      this.setState(obj);
    }
  }

  // Changes values in state to trigger face rotation
  rotateCubeFace = (face,direction,cubeDepth,isMulti,blockMoveLog,moveLog,solveMoves,end,solveState) => {
    let obj = {};
    if(!blockMoveLog){
      
      let tempMove = "";
      cubeDepth<10 ? tempMove+="0"+cubeDepth : tempMove += cubeDepth;
      if(face === 0) !isMulti ? tempMove += "F" : tempMove += "f";
      else if(face === 1) !isMulti ? tempMove += "U" : tempMove += "u";
      else if(face === 2) !isMulti ? tempMove += "R" : tempMove += "r";
      else if(face === 3) !isMulti ? tempMove += "B" : tempMove += "b";
      else if(face === 4) !isMulti ? tempMove += "L" : tempMove += "l";
      else if(face === 5) !isMulti ? tempMove += "D" : tempMove += "d";
      if(direction === -1) tempMove += "'";

      moveLog&&moveLog.length > 0 ?
        obj.moveLog = (moveLog + " " + tempMove) :
        obj.moveLog = (tempMove);
      
      // Keeps tracks of solver's moves
      if(solveState > -1) 
        obj.solveMoves = (solveMoves.length ? solveMoves + " " + tempMove : solveMoves + tempMove);
    }

    // Faces on opposite side of cube rotate backwards
    if(face>2 && direction === -1) direction = 0;

    else if (face>2 && direction === 0) direction = -1;

    obj.blockMoveLog = false;
    obj.face = face; // used
    obj.turnDirection = direction; // used
    obj.end = end + 90; 
    obj.cubeDepth = cubeDepth; // used
    obj.isMulti = isMulti; // used
    

    return obj;
  }

  // Takes prebuilt algorithms and converts to moves
  // allow for C,c
  // **************************
  // If during solve or algorithm state and the drag move is the same as the
  // next move then allow the move to be queued as playOne

  // Small bug, account for double turns
  algorithm = (moveString,moveName) => {
    if(this.state.currentFunc === "Solving"||this.state.currentFunc === "Algorithms"){
      if(this.state.moveSet[0]){
        if(this.checkMoveEquivalence(moveString,this.state.moveSet[0])){
          this.playOne(this);
        }
      }
      return;
    }
    if(this.state.currentFunc !== "None") return;
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : moveName, moveSet : moveArray});
  }

  // Compares dragged move with the next move in algorithm or solver
  checkMoveEquivalence(dragMove,nextMove){
    // Check both ways a move can be made, on a 3x3 02U is the same as 02D
    if(dragMove===nextMove||this.invertMove(dragMove)===nextMove){
      return true;
    }
    return false;
  }

  // converts a move into it's equivalent other move, 
  // ex: (on a 3x3) 03F === 01B'
  // invertMove("03F") => "01B'"
  invertMove(_move){
    const move =_move.split('');
    let inverted = '';
    let depth;
    if(move[0]==='0'){
      depth = this.state.cubeDimension - parseInt(move[1]) + 1;
    }
    else{
      depth = this.state.cubeDimension - parseInt(move[0]+move[1]) + 1;
    }

    if(depth<10){
      inverted+=`0${depth}`
    }
    else{
      inverted+=`${depth}`
    }

    switch(move[2]){
      case 'F':
        inverted+='B';
        break;
      case 'f':
        inverted+='b';
        break;
      case 'U':
        inverted+='D';
        break;
      case 'u':
        inverted+='d';
        break;
      case 'R':
        inverted+='L';
        break;
      case 'r':
        inverted+='l';
        break;
      case 'B':
        inverted+='F';
        break;
      case 'b':
        inverted+='f';
        break;
      case 'L':
        inverted+='R';
        break;
      case 'l':
        inverted+='r';
        break;
      case 'D':
        inverted+='U';
        break;
      case 'd':
        inverted+='u';
        break;
      default:
    }

    if(move.length<4) inverted+="'";
    
    return inverted;
    
  }

  // Resets the cube and the move log
  reset = () => {
    let cD = this.state.cubeDimension;
    let generated = cube.generateSolved(cD,cD,cD);
    let rubiksObject = generated.tempArr;
    this.setState({rubiksObject,moveSet: [],moveLog: "",currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [],cpErrors:[],activeMenu:"none"},()=>{
      this.reloadTurnedPieces('all');
    });
  }

  // Generates a random move
  generateMove = () => {
    let maxDepth = Math.ceil((this.state.cubeDimension/2));
    let randFace = Math.floor((Math.random() * 6));
    let randTurn = Math.floor((Math.random() * 2)-1);
    let randIsMulti = Math.floor((Math.random() * 2));
    let randDepth = 1;
    let cD = this.state.cubeDimension;

    if(randFace>2&&cD%2) maxDepth-=1;

    if(cD>2) 
      randDepth = Math.floor((Math.random() * maxDepth)) + 1;

    if(randDepth===1) randIsMulti = 0;

    if(randDepth === Math.ceil(cD/2) && cD%2)
      randIsMulti=0;

    return this.convertDataToMove([randFace, randTurn,randDepth,randIsMulti]);
  }

  convertDataToMove = (data) => {
    let move = "";
    let face = ['F','U','R','B','L','D']
    move+=data[2].toString().length<2?"0".concat(data[2]):data[2];
    move+=(data[3]?face[data[0]].toLowerCase():face[data[0]])
    data[1]===-1?move+="":move+="'"
    return move;
  }

  // Changes state active function to begin scrambling
  beginScramble = () => {
    
    if(this.state.currentFunc === "None") {
      let moveSet = [];
      while (moveSet.length<25){
        let temp = this.generateMove();
        if(moveSet[moveSet.length-1]&&
           moveSet[moveSet.length-1].slice(0,3)===temp.slice(0,3)&&
           moveSet[moveSet.length-1].length!==temp.length);
        else if(moveSet[moveSet.length-2]&&
                moveSet[moveSet.length-1]&&
                moveSet[moveSet.length-2]===temp&&
                moveSet[moveSet.length-1]===temp);
        else moveSet.push(temp);
      }
      this.setState({currentFunc : "Scrambling",moveSet});
    }
  }

  // Starts the solve process
  beginSolve = () => {
    if(this.state.currentFunc !== "None") return;
    this.setState({currentFunc : "Solving",solveState : 0,autoPlay : false, playOne : false, solveOnce : true});
  }

  stopSolve = () => {
    this.setState({currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [], moveSet : [],targetSolveIndex:-1,solvedSet:[]});
  }

  beginColorPicker = () => {
    let cD = this.state.cubeDimension;
    if(this.state.currentFunc !== "None") return;
    const blank = [...cube.generateBlank(cD,cD,cD)];
    this.setState({currentFunc : "Color Picker",rubiksObject: [...blank]},()=>{
      this.reloadTurnedPieces('cp');
    });
  }

  endColorPicker = () => {
    this.reset();
    this.setState({currentFunc : "None",cpErrors:[]});
  }

  playOne = props => {
    if(!props.state.moveSet.length) return;
    if((props.state.moveSet[0]===props.state.moveSet[1]||props.state.moveSet[1]==="stop'")&&!props.state.autoPlay){
        props.setState({
            autoPlay:true,
            autoRewind:false,
            targetSolveIndex:props.state.solvedSetIndex+2});
    }
    else{
        if(props.state.playOne===true) return;
        if(props.state.moveSet[0]&&typeof(props.state.moveSet[0][0])==='string'&&props.state.moveSet[0]!=="'"){
            props.setState({playOne:true,prevSet:[...props.state.prevSet,props.state.moveSet[0]]});
        }
    }
  }

  rewindSolve = () => {
    if(this.state.playOne) return;
    if((this.state.prevSet[this.state.prevSet.length-1]===this.state.prevSet[this.state.prevSet.length-2]||this.state.prevSet[this.state.prevSet.length-1]==="stop'")&&!this.state.autoRewind){
      this.setState({
        autoPlay:false,autoRewind:true,targetSolveIndex:this.state.solvedSetIndex-2
      });
      return;
    }
    let newMoveSet = [];
    let tempMoveSet = [...this.state.moveSet];
    let tempPrev = [...this.state.prevSet];
    let lastEl = tempPrev[tempPrev.length-1];
    let popped = tempPrev.pop();
    if(!popped) {
      this.setState({autoRewind:false});
      return;
    }
    popped[popped.length-1]==="'" ? popped=popped.slice(0,3) : popped+="'";
    newMoveSet.push(popped,lastEl,...tempMoveSet);
    this.setState({
      playOne:true,
      prevSet:tempPrev,
      moveSet:newMoveSet,
      solvedSetIndex:this.state.solvedSetIndex-2
    })
  }

  rewindAllSolve = () => {
    if(this.state.playOne) return;
    let newMoveSet = [];
    let tempMoveSet = this.state.moveSet;
    let tempPrev = this.state.prevSet;
    let lastElArray = [];
    let poppedArray = [];
    for(let i = 0; i < tempMoveSet.length; i++){
      let lastEl = tempPrev[tempPrev.length-1];
      let popped = tempPrev.pop();
      if(!popped) return;
      popped[popped.length-1]==="'" ? popped=popped.slice(0,3) : popped+="'";
      poppedArray.push(popped);
      lastElArray.push(lastEl);
    }
    
    newMoveSet.push(...poppedArray,...lastElArray,...tempMoveSet);
    this.setState({
      playOne:true,
      prevSet:tempPrev,
      moveSet:newMoveSet
    })
  }

  handleDragInput = (e, ui) => {
    const {x, y} = this.state.deltaPositionInput;
    this.setState({
      deltaPositionInput: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStartInput = () => {
    this.setState({activeDragsInput: this.state.activeDragsInput+1});
  };

  onStopInput = () => {
    this.setState({activeDragsInput: this.state.activeDragsInput-1});
  };

  handleDragControls = (e, ui) => {
    const {x, y} = this.state.deltaPositionControls;
    this.setState({
      deltaPositionControls: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStartControls = () => {
    this.setState({activeDragsControls: this.state.activeDragsControls+1});
  };

  onStopControls = () => {
    this.setState({activeDragsControls: this.state.activeDragsControls-1});
  };

  convertMoveToData = (move) => {
    if(move.length < 2) return false;
    let data = [];
    let face = ['F','U','R','B','L','D']
    data.push(face.indexOf(move[2].toUpperCase()));
    move.length < 4 ? data.push(-1) : data.push(0);
    move[0]==='0' ? data.push(parseInt(move[1])) : data.push(parseInt(move.substring(0, 2)))
    move[2].toUpperCase() === move[2] ? data.push(false) : data.push(true);
    return data;
  }

  mouseOver = (name,data,e) => {
    if(this.state.showHints)
      this.setState({
        isVisible: true,
        hoverData: data
      });
  }

  mouseLeave = () => {
    this.setState({
      isVisible: false,
      hoverData: []
    });
  }

  // Converts move string to move array
  // handle move short hand characters. ex: fx => 01Fx 02Fx; x = "" or "'" or "2"
  moveStringToArray = str => {
    let tempArray = str.split(" ");
    let moveArray = [];

    // Run through split string and create duplicates where needed
    // Handle other short hands
    for(let i = 0; i < tempArray.length;i++){
      if(tempArray[i].length === 4 && tempArray[i].slice(3,4)==="2") {
        let tempMove = tempArray[i].slice(0,3);
        moveArray.push(tempMove);
        moveArray.push(tempMove);
      }
      else {
        moveArray.push(tempArray[i]);
      }
    }
    return moveArray;
  }

  // Generalized move function. Takes in array of moves and parse the moves
  parseMoveArray = (moveArray) =>{
    //if(typeof moveArray === 'string') moveArray = [moveArray];
    let shifted = moveArray.shift();

    let tempFace = 0;
    let tempDirection = -1;
    let tempDepth = 1;
    let tempIsMulti = false;

    if(shifted){
      if(shifted.length === 4) tempDirection=0;
      tempDepth = parseInt(shifted.slice(0,2));

      if(shifted.slice(2,3) === shifted.slice(2,3).toLowerCase()){
        tempIsMulti = true;
      }

      if(shifted.slice(2,3).toUpperCase() === "U") tempFace = 1;
      else if(shifted.slice(2,3).toUpperCase() === "F") tempFace = 0;
      else if(shifted.slice(2,3).toUpperCase() === "B") tempFace = 3;
      else if(shifted.slice(2,3).toUpperCase() === "R") tempFace = 2;
      else if(shifted.slice(2,3).toUpperCase() === "L") tempFace = 4;
      else if(shifted.slice(2,3).toUpperCase() === "D") tempFace = 5;

      return [tempFace,tempDirection,tempDepth,tempIsMulti];
    }
  }

  /* Each piece that's rotated has it's rotation disrupted on other planes.
   *
   * This function solves that issue by setting all piece rotation back to zero
   * and then placing colors to look as though the piece were still rotated.
   * 
   * Some optimizations have been added. Undersides and insides of some pieces
   * appear white instead of black initially but does not disrupt the rest of
   * the cube. Likely won't be changed since that optimization greatly improves
   * run time.
   */
  reloadTurnedPieces = (pos) => {
    let cubes = [...this.state.cubes];
    
    for(let i = 0; i<this.state.rubiksObject.length;i++){
      
      let tempCube = {...cubes[i]};
      let rotation = tempCube.rotation;


      if(pos === tempCube.position){
        tempCube.opacity=1;
        cubes[i] = tempCube;
      }

      else if((rotation.x !== 0 || rotation.y !== 0 ||rotation.z !== 0) || 
           (pos==='all'||pos==='cp'||pos==='check')){
        if(pos==='all'||pos==='cp') {
          tempCube.position.x=this.state.rubiksObject[i][9];
          tempCube.position.y=this.state.rubiksObject[i][10];
          tempCube.position.z=this.state.rubiksObject[i][11];
        }
        if(pos==='check') {
          tempCube.position.x=this.state.rubiksObject[i][6];
          tempCube.position.y=this.state.rubiksObject[i][7];
          tempCube.position.z=this.state.rubiksObject[i][8];
        }
        tempCube.material[0].color = new THREE.Color(this.state.rubiksObject[i][2]);
        tempCube.material[1].color = new THREE.Color(this.state.rubiksObject[i][4]);
        tempCube.material[2].color = new THREE.Color(this.state.rubiksObject[i][3]);
        tempCube.material[3].color = new THREE.Color(this.state.rubiksObject[i][0]);
        tempCube.material[4].color = new THREE.Color(this.state.rubiksObject[i][1]);
        tempCube.material[5].color = new THREE.Color(this.state.rubiksObject[i][5]);
        
        tempCube.rotation.x = 0; tempCube.rotation.y = 0; tempCube.rotation.z = 0;
        cubes[i] = tempCube;
        
      }
    }

    this.setState({cubes,reload : false});
  }

  // Changes the settings by passing setting to change and new val for the setting
  changeSettings (settingToChange,newVals) {
    switch(settingToChange){
      // case 'displayStats':
      //   this.state.showStats ? document.body.children[9].style.display = "none" : document.body.children[9].style.display = "";
      //   this.setState({showStats : !this.state.showStats});
      //   break;
      case 'displayMoveInput':
        this.setState({showMoveInput:!this.state.showMoveInput});
        break;
      case 'displayControls':
        this.setState({showControls:!this.state.showControls});
        break;
      case 'displayHints':
        this.setState({showHints:!this.state.showHints});
        break;
      default:
        console.log("Invalid Setting");
    }
  }
  
  // Remove event listener on compenent unmount	
  componentWillUnmount() {    
    window.removeEventListener("keydown", this.keyHandling);
  }

  // Gets the url to be parsed
  getSizeFromUrl(checkLocal) {
    let limit = 75;
    let cD;
    
    let parts = window.location.href.split('/');
    let checkID = parts[parts.length-1][0]+parts[parts.length-1][1]+parts[parts.length-1][2];

    if(checkLocal){
      if(parts[2].substr(0,9)==='localhost'){
        return true;
      }
      else {
        return false;
      }
    }

    if(checkID === 'id='){
      cD = parseInt(parts[parts.length-1].substr(3));
    }

    if (cD <= limit && cD >= 1) return cD; else return 3;
  }

  calculateTurn(current,previous,piece,pieceFace,cD){

    let calculated = null;
    let depth = null;
    let turn = null;

    // difference in initial mouse down location and current mouse down
    const dif = { 
      x: (previous.x-current.x), 
      y: (previous.y-current.y), 
      z: (previous.z-current.z)
    }

    if(current.x===previous.x && current.y === previous.y && current.z===previous.z){
      return null;
    }

    function calculateTurnAtFace(coord1,compare1,coord2,compare2,piece1,piece2,dir1,dir2){
      if(Math.abs(coord1)>=Math.abs(coord2)&&(Math.abs(coord1)>.05)) 
        return {calculated : compare1?dir1:(dir1+"'"),depth : piece2}
        
      if(Math.abs(coord2)>Math.abs(coord1)&&(Math.abs(coord2)>.05)) {
        return {calculated : compare2?dir2:(dir2+"'"),depth : piece1}
      }
      return {calculated:null,depth:null};
    }

    //determines the move based on mouse difference from click to new position
    switch(pieceFace){
      case 0:
        turn = calculateTurnAtFace(dif.z,dif.z<0,dif.x,dif.x>=0,cD-piece.z,cD-piece.x,"R","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 1:
        turn = calculateTurnAtFace(dif.x,dif.x<=0,dif.y,dif.y<0,cD-piece.x,piece.y+1,"F","R");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 2:
        turn = calculateTurnAtFace(dif.z,dif.z>0,dif.y,dif.y>0,cD-piece.z,piece.y+1,"F","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 3:
        turn = calculateTurnAtFace(dif.z,dif.z>0,dif.x,dif.x<=0,cD-piece.z,cD-piece.x,"R","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 4:
        turn = calculateTurnAtFace(dif.z,dif.z<0,dif.y,dif.y<0,cD-piece.z,piece.y+1,"F","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 5:
        turn = calculateTurnAtFace(dif.x,dif.x>=0,dif.y,dif.y>0,cD-piece.x,piece.y+1,"F","R");
        calculated = turn.calculated; depth = turn.depth;
        break;
      default:
    }

    //console.log("{ turn: " + calculated + " } , { depth: " + depth + " }");
    return ((depth<10? "0" : "") + depth+calculated);
  }

  // Proto function for feature to be built later
  calculateTheta(){

  }

  menuSetState = (obj) =>{
    //console.log(obj);
    this.setState(obj,()=>{
      if(obj.activeAlgo){
        this.reloadTurnedPieces('all');
      }
    });
  }

  autoJump = (state,moves) =>{

    let tempState = {...state};
    tempState.moveSet = moves;
    
    while(tempState.moveSet.length){
        //console.log(tempState.rubiksObject);
        let cD = tempState.cubeDimension;
        let blockMoveLog = tempState.blockMoveLog;
        let moveLog = tempState.moveLog;
        let solveMoves = tempState.solveMoves;
        let rubiksObject = tempState.rubiksObject;
        let end = tempState.end;
        let solveState = tempState.solveState;
        let moveData = 
          this.parseMoveArray(tempState.moveSet); // generates data for next move
        let obj = 
          this.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
        obj.rubiksObject = 
          cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);
        tempState = {...tempState,...obj};
    }
    return [...tempState.rubiksObject];
  }

  generateAllSolveMoves = (state,rubiksObject) =>{
    let beforeObject = rubiksObject.map(e=>[...e]);
    //console.log(beforeObject);
    let tempState = {...state}, solvedSet = "";
    let currentIndex = null;
    let previousIndex = null;
    let indexOccurence = 0;
    let error = false;
    let counter = 0;
    if(tempState.currentFunc === 'Color Picker'){
      tempState.solveState = 0;
      tempState.currentFunc = "Solving";
      tempState.rubiksObject = rubiksObject.map(e=>[...e]);
    }
    while(tempState.currentFunc==="Solving"){
      
      if(!tempState.moveSet || !tempState.moveSet.length) {
        //console.log(tempState.rubiksIndex);
        currentIndex=tempState.rubiksIndex;
        if(currentIndex===previousIndex) indexOccurence = indexOccurence+1;
        else indexOccurence = 0;
        let moves;
        moves = solver(tempState.solveState,tempState.rubiksObject,tempState.cubeDimension,this.moveStringToArray,
          tempState.solveMoves,tempState.rubiksIndex,tempState.middles,tempState.edges,tempState.corners);
        if (!moves) moves = {};
        if(moves.moveSet && moves.moveSet[0]==='stop'){
          if(this.state.currentFunc==="Solving"){
            moves.solveMoves = tempState.solveMoves + ` ${moves.moveSet[0]}`;
            moves.moveSet.pop();
          }
          else moves.moveSet.pop();
        }
        
        if(moves.moveSet){
          let temp = [];
          for(let i = 0; i<moves.moveSet.length; i++){
            
            if(moves.moveSet[i]===''||moves.moveSet[i]===' '||moves.moveSet[i][0]==="N"||moves.moveSet[i]==="'");
            else temp.push(moves.moveSet[i]);
          }
          moves.moveSet = temp;
        }
        if((indexOccurence>10 && tempState.solveState<1)||counter>10000||(moves.moveSet&&moves.moveSet[0]==='error')) {

          console.log(indexOccurence,currentIndex,previousIndex,tempState.rubiksIndex);
          console.log(moves);
          error = true;
          //console.log(JSON.stringify({beforeObject}));
          moves.currentFunc="None";
        }
        if(moves.currentFunc && moves.currentFunc==="None") solvedSet = tempState.solveMoves;
        counter++;
        tempState = {...tempState,...moves};
        previousIndex=currentIndex;
      }
      else{
        let cD = tempState.cubeDimension;
        let blockMoveLog = tempState.blockMoveLog;
        let moveLog = tempState.moveLog;
        let solveMoves = tempState.solveMoves;
        let rubiksObject = tempState.rubiksObject;
        let end = tempState.end;
        let solveState = tempState.solveState;
        let moveData = this.parseMoveArray(tempState.moveSet); // generates data for next move
        let obj = this.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
        obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);
        tempState = {...tempState,...obj};
      }
    }
    let splitSet = solvedSet.split(" ");
    if(splitSet[0][0]==="N"||splitSet[0][0]==="'") splitSet.shift();
    let moveSet = []
    splitSet.forEach(e => e[e.length-1]==="'"? moveSet.push(e.replace("'","")):moveSet.push(e+"'"));

    //console.log(moveSet);
    for(let i = 0; i<moveSet.length; i++){
      if(moveSet[i]===''||moveSet[i]===' '||moveSet[i][0]==="N"||moveSet[i]==="'"||moveSet[i]===undefined){
        //console.log("removed invalid move");
        moveSet.splice(i,1);
      }
    }

    let maxDepth = Math.floor(tempState.cubeDimension/2);
    moveSet = moveSet.map(move=>{
      if(move==="stop'") return move;
      //console.log(move);
      let dataMove = this.convertMoveToData(move);
      if(parseInt(dataMove[2])>maxDepth&&!dataMove[3]){
        //console.log("Found over reaching move: [ " + move + " ]");
        dataMove[2]=(tempState.cubeDimension-dataMove[2])+1
        if(parseInt(dataMove[0])===0) dataMove[0] = 3;
        else if(parseInt(dataMove[0])===1) dataMove[0] = 5;
        else if(parseInt(dataMove[0])===2) dataMove[0] = 4;
        else if(parseInt(dataMove[0])===3) dataMove[0] = 0;
        else if(parseInt(dataMove[0])===4) dataMove[0] = 2;
        else if(parseInt(dataMove[0])===5) dataMove[0] = 1;
        dataMove[1]===0?dataMove[1]=-1:dataMove[1]=0;

        //console.log("Converted to: [ " + this.convertDataToMove(dataMove) + " ]");
        return this.convertDataToMove(dataMove);
      }
      return this.convertDataToMove(dataMove);
    })
    
    //console.log(moveSet.length);


    let moveSetLength = 0;
    while(moveSet.length!==moveSetLength){
      moveSetLength = moveSet.length;
      for(let i = 0; i < moveSet.length-2; i++){
        
        if(moveSet[i].substring(0,3)===moveSet[i+1].substring(0,3) && moveSet[i].length!==moveSet[i+1].length){
          moveSet.splice(i,2);
        }
      }

      for(let i = 0; i < moveSet.length-2; i++){
        if(moveSet[i]===moveSet[i+1] && moveSet[i]===moveSet[i+2]){
          if(moveSet[i].length===3){moveSet[i]+="'"}
          else{moveSet[i]=moveSet[i].substring(0,3)}
          moveSet.splice(i+1,2);
        }
      }
      //console.log(moveSet.length);
    }

    

    if(moveSet[0]==="stop'"&&moveSet[1]==="stop'"&&moveSet.length===2) moveSet = [];
  
    if(error) {
      //alert("Sorry for the inconvenience. This error is caused by an infinite loop issue with the solver and has been stopped to prevent freezing the application. The current move set has still been pushed and is playable for debugging purposes. Maybe you can figure out the issue before I can ;)");
      return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:false,solvedSet:[...moveSet],solvedSetIndex:0};
    }
    return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:true,solvedSet:[...moveSet],solvedSetIndex:0,tempObject:tempState.rubiksObject};
  }

  animateRotation(tempCubes){
    cube.rotatePieces(cube.rotatePoint,tempCubes);
  }

  windowResized = () => {
    this.setState({resized:true});
  }

  menuToggle(el){
    let menu = document.querySelector(".menuWrapper")||document.querySelector(".menuWrapperOptions");

    menu.style.display==="none"?menu.style.display="inline":menu.style.display="none";

    console.log(el.target.innerHTML);
    
    (el.target.innerHTML==="˅")?
      el.target.innerHTML="˄":el.target.innerHTML="˅";
  }

  // Initialization and animation functions
  componentDidMount() {

    // Initial set up variables
    let cD = this.getSizeFromUrl();
    let generated = cube.generateSolved(cD,cD,cD);
    let rubiksObject = generated.tempArr;
    let tempCubes = [];
    
    let previousPiece = null;
    let previousPieceIndex = null;
    let ignoreChange = false;

    // === THREE.JS VARIABLES ===
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let cubeGeometry = new THREE.BoxGeometry(  );
    let loader = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW92XE-j1aJzRMI9kvvMZIf2VikZzzdEI87zl4rWgHMJBNJ9iw7A&s');
    let moveHintImage = new THREE.TextureLoader().load('https://cdn2.iconfinder.com/data/icons/communication-language/100/Up_Arrow-01-512.png');
    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
    let windowHeight = window.innerHeight;

    const groups = cube.generateMoveHints(moveHintImage,cD);

    let calculateTurn = this.calculateTurn;
    let algorithmFunc = this.algorithm;

    function onWindowResize(resized) {
      camera.aspect = window.innerWidth / window.innerHeight;
      
      // adjust the FOV
      camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
      
      camera.updateProjectionMatrix();
      camera.lookAt( scene.position );

      renderer.setSize( window.innerWidth, window.innerHeight-10 );
      renderer.render( scene, camera );
      resized();
    }

    function ontouchstart( event ){
      controls.enabled = true;
      ignoreChange = false;
      mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;


      // Projects mouse onto scene to find intersected objects
      raycaster.setFromCamera( mouse, camera );

      // Calculate objects intersecting the picking ray
      let intersects = raycaster.intersectObjects( scene.children );

      // Check if anything is intersected
      if(intersects.length){
        ignoreChange = true;
        controls.saveState();
        controls.enabled = false;
        let faceInteresected = intersects[0].faceIndex;
        let tempIndex = -1;
        for(let i = 0; i < 6; i++){
          if(faceInteresected===i*2 || faceInteresected=== i*2+1) {
            tempIndex = i;
            //this.setState({mouseFace : i});
            break;
          }
        }
        if(this.state.currentFunc==="Color Picker"){
          let toFace = [2,4,3,0,1,5];
          this.changeFaceColor({x:intersects[0].object.position.x,y:intersects[0].object.position.y,z:intersects[0].object.position.z},toFace[tempIndex],this.state.colorPicked)
        }
        if(intersects[0].object.material[tempIndex] && tempIndex > -1){
          if(intersects[0].object.material[tempIndex].color){
            previousPiece = intersects[0];
            previousPieceIndex = tempIndex;
            intersects[0].object.material[tempIndex].opacity=.8;
          }
        }
      }
      else{
        controls.enabled = true;
        previousPiece = null;
        previousPieceIndex = null;
      }
    }

    function onmousedown( event ){
      controls.enabled = true;
      ignoreChange = false;

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // Projects mouse onto scene to find intersected objects
      raycaster.setFromCamera( mouse, camera );

      // Calculate objects intersecting the picking ray
      let intersects = raycaster.intersectObjects( scene.children );

      // Check if anything is intersected
      if(intersects.length){
        ignoreChange = true;
        controls.saveState();
        controls.enabled = false;
        let faceInteresected = intersects[0].faceIndex;
        let tempIndex = -1;
        for(let i = 0; i < 6; i++){
          if(faceInteresected===i*2 || faceInteresected=== i*2+1) {
            tempIndex = i;
            //this.setState({mouseFace : i});
            break;
          }
        }
        if(this.state.currentFunc==="Color Picker"){
          let toFace = [2,4,3,0,1,5];
          this.changeFaceColor({x:intersects[0].object.position.x,y:intersects[0].object.position.y,z:intersects[0].object.position.z},toFace[tempIndex],this.state.colorPicked)
        }
        if(intersects[0].object.material[tempIndex] && tempIndex > -1){
          if(intersects[0].object.material[tempIndex].color){
            previousPiece = intersects[0];
            previousPieceIndex = tempIndex;
            intersects[0].object.material[tempIndex].opacity=.8;
          }
        }
      }
      else{
        controls.enabled = true;
        previousPiece = null;
        previousPieceIndex = null;
      }
    }

    function ontouchmove( event ){
      
      if(previousPiece) controls.enabled = false;
      mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

      // Projects mouse onto scene to find intersected objects
      raycaster.setFromCamera( mouse, camera );

      // calculate objects intersecting the picking ray
      let intersects = raycaster.intersectObjects( scene.children );

      if(previousPiece){
        if(intersects.length){
          let current = intersects[0].point;
          let toFace = [2,4,3,0,1,5];
          let tempPrev = {...previousPiece.point};
          let tempPos = {...previousPiece.object.position};
          let intersected = Math.floor(previousPiece.faceIndex/2);
          let calculated = calculateTurn(current,tempPrev,tempPos,toFace[intersected],cD);
          //console.log(calculated);
          if(calculated!==null&&!calculated.includes("null")){
            //console.log("Drag turn");
            algorithmFunc(calculated,"Drag Turn");
            previousPiece.object.material[previousPieceIndex].opacity=1;
            previousPiece = null;
            previousPieceIndex = null;
          }
        }
      }
    }

    function onMouseMove( event ) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // Projects mouse onto scene to find intersected objects
      raycaster.setFromCamera( mouse, camera );

      // calculate objects intersecting the picking ray
      let intersects = raycaster.intersectObjects( scene.children );

      if(previousPiece){
        if(intersects.length){
          let current = intersects[0].point;
          let toFace = [2,4,3,0,1,5];
          let tempPrev = {...previousPiece.point};
          let tempPos = {...previousPiece.object.position};
          let intersected = Math.floor(previousPiece.faceIndex/2);
          let calculated = calculateTurn(current,tempPrev,tempPos,toFace[intersected],cD);
          //console.log(calculated);
          if(calculated!==null&&!calculated.includes("null")){

            // if(this.state.currentFunc==="Solving"){
            //   console.log("attempted move during solve state");
            // }

            algorithmFunc(calculated,"Drag Turn");
            previousPiece.object.material[previousPieceIndex].opacity=1;
            previousPiece = null;
            previousPieceIndex = null;
          }
        }
      }
    }

    function ontouchend( event ){
      if(previousPiece) previousPiece.object.material[previousPieceIndex].opacity=1;
      if(ignoreChange) controls.reset();
      ignoreChange = false;
      previousPiece = null;
      controls.enabled = true;
    }

    // Bind event listeners to window
    window.addEventListener("keydown", this.keyHandling, false);
    window.addEventListener("mousemove", onMouseMove.bind(this), false );
    window.addEventListener("mousedown", onmousedown.bind(this), false );
    window.addEventListener("touchstart", ontouchstart.bind(this), false);
    window.addEventListener("touchmove", ontouchmove.bind(this), false);
    window.addEventListener("touchend", ontouchend, false);
    window.addEventListener("mouseup", ontouchend, false );
    window.addEventListener("resize", () => onWindowResize(this.windowResized), false );
    
    // Set background color and size
    renderer.setClearColor(new THREE.Color("black"),0);
    renderer.domElement.className = "canvas";
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.children[5].appendChild( renderer.domElement );

    // stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild( stats.dom);
    // document.body.children[9].style.display = "none"

    // Prevents bluring
    loader.anisotropy = renderer.capabilities.getMaxAnisotropy();
    moveHintImage.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // generate cubes with face colors based off memory cube
    for(let i = 0; i < rubiksObject.length; i++){

      // Store x,y,z of memory cube in easier to read variables
      let cubeX = rubiksObject[i][6];
      let cubeY = rubiksObject[i][7];
      let cubeZ = rubiksObject[i][8];

      // Map textures to each face to look nice and then color over
      const cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1, color:rubiksObject[i][2], side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1, color:rubiksObject[i][4], side: THREE.FrontSide}), 
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1, color:rubiksObject[i][3], side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1,}), 
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1, color:rubiksObject[i][1], side: THREE.FrontSide}), 
        new THREE.MeshBasicMaterial({ map: loader ,transparent: true,opacity:1, color:rubiksObject[i][5], side: THREE.FrontSide}), 
      ];
    
      // Add the new cube to temp cubes
      tempCubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterials);
      //group.add( tempCubes[i] );
      // position piece based off memory cube
      tempCubes[i].translateX(cubeX);
      tempCubes[i].translateY(cubeY);
      tempCubes[i].translateZ(cubeZ); 
    }

    // Translate cube so center of cube is 0,0,0
    scene.translateX(.5-cD/2);
    scene.translateY(.5-cD/2);
    scene.translateZ(.5-cD/2);

    // Allows for drag to rotate camera
    let controls = new OrbitControls( camera , renderer.domElement);
    controls.enabled = true;
    controls.enableDamping = true;   //damping 
    controls.dampingFactor = 0.15;   //damping inertia
    controls.enableZoom = true;      //Zooming
    controls.autoRotate = false;     //Enable auto rotation
    controls.minDistance = (2+cD);
    controls.maxDistance = (2+cD)+20;
    controls.enablePan = false;
    controls.keys = {
      LEFT: null, //left arrow
      UP: null, // up arrow
      RIGHT: null, // right arrow
      BOTTOM: null // down arrow
    };

    controls.addEventListener("change", (e) => {
      if (renderer) renderer.render(scene, camera);
    });

    groups.forEach(group => scene.add(...group));

    // add cubes to state and then render
    this.setState({
      cubes : tempCubes,
      cubeDimension : cD,
      cameraZ : -(2+cD),
      cameraX : (2+cD),
      cameraY : -(2+cD),
      rubiksObject,
      middles: generated.middles,
      edges: generated.edges,
      corners: generated.corners,
      currentFunc: 'Reset',
      generatedButtons: cube.generateButtonData(this.getSizeFromUrl())
    }, () => {
      //let cubeGroup = new THREE.Group();
      // Callback required to wait for setState to finish
      for(let i = 0; i < rubiksObject.length; i++){
        // Logic to only render outer pieces since inside pieces aren't ever used
        if((this.state.cubes[i].position.x === 0 || this.state.cubes[i].position.x === this.state.cubeDimension-1) ||
            (this.state.cubes[i].position.y === 0 || this.state.cubes[i].position.y === this.state.cubeDimension-1)||
            (this.state.cubes[i].position.z === 0 || this.state.cubes[i].position.z === this.state.cubeDimension-1)){
          scene.add( this.state.cubes[i] );
        } 
      }

      //scene.add( cubeGroup);

      camera.position.z = this.state.cameraZ;// * Math.sin( this.state.angle );
      camera.position.y = this.state.cameraY;
      camera.position.x = this.state.cameraX;// * Math.cos( this.state.angle );

      renderer.render( scene, camera );
      animate();
    });

    // Function runs continuously to animate cube
    let animate = () => {

      // clear visible move hints
      for(let i = 0; i < groups.length;i++){
        groups[i].forEach(group => group.visible = false)
      }

      // stats.begin();
      requestAnimationFrame( animate );

      // Mouse stuff here
      // Consider moving into another function to unclutter animate
      // Very expensive operation
      if(this.state.currentFunc === "Color Picker" || this.state.currentFunc === "None"|| this.state.currentFunc === "Solving"|| this.state.currentFunc === "Algorithms") {

        //check here that data isn't the same as previous so not running this every time
        // Data on move button triggers visual move hints
        if(this.state.isVisible){
          let [hFace,hDir,hDepth,hMulti] = this.state.hoverData;
          if(hFace<3){
            if(hDir === -1){
              if(!hMulti){
                groups[hFace][hDepth-1].visible=true;
              }
              else
                for(let i = 0; i <= hDepth-1; i++){
                  groups[hFace][i].visible=true;
                }
            }
            else {
              if(!hMulti){
                groups[hFace+3][hDepth-1].visible=true;
              }
              else
              for(let i = 0; i <= hDepth-1; i++){
                groups[hFace+3][i].visible=true;
              }
            }
          }
          else{
            if(hFace===3) hFace=0;
            if(hFace===4) hFace=2;
            if(hFace===5) hFace=1;

            if(hDir === -1){
              if(!hMulti){
                groups[hFace+3][(groups[hFace+3].length-1)-(hDepth-1)].visible=true;
              }
              else
                for(let i = groups[hFace+3].length-1; i >= (groups[hFace+3].length-1)-(hDepth-1); i--){
                  groups[hFace+3][i].visible=true;
                }
            }
            else {
              if(!hMulti){
                groups[hFace][(groups[hFace].length-1)-(hDepth-1)].visible=true;
              }
              else
                for(let i = groups[hFace].length-1; i >= (groups[hFace+3].length-1)-(hDepth-1); i--){
                  groups[hFace][i].visible=true;
                }
            }
          }
        }

        // let previousPiece = this.state.previousPiece;

        // // Projects mouse onto scene to find intersected objects
        // raycaster.setFromCamera( mouse, camera );

        // // calculate objects intersecting the picking ray
        // let intersects = raycaster.intersectObjects( scene.children );
        // // 
      }
      
      // Animate queued rotation
      if(this.state.start<=this.state.end){
        this.setState(cube.rotatePieces(cube.rotatePoint,tempCubes,this.state));
      }

      // Handles move queueing based on function
      else {
        if(this.state.reload) this.reloadTurnedPieces(this.state.face);
        if(this.state.currentFunc !== "None"){

          // Doesn't work with !==
          if(this.state.currentFunc === "Undo" ||
             this.state.currentFunc === "Redo"){}

          // Keeps undo/redo updated with other moves
          // find the error in this logic
          else {
            let moveLog = this.state.moveLog;
            let index = this.state.undoIndex;

            if(index > 0){
              let moveArray = this.moveStringToArray(moveLog);

              if(this.state.currentFunc[0]==='0' || this.state.currentFunc[0]==='1' ||
                 this.state.currentFunc[1]==='1' || this.state.currentFunc[1]==='2' || this.state.currentFunc[1]==='3'){
                let tempVal = moveArray[moveArray.length-1];
                for(let i = 0; i <= index; i++){
                  moveArray.pop();
                }
                moveArray.push(tempVal);
              }

              else{
                for(let i = 0; i < index; i++){
                  moveArray.pop();
                }
              }

              moveLog = moveArray.join(" ");
              this.setState({undoIndex:0,moveLog});
            }
          }

          // Moves based on active function
          if (this.state.currentFunc==="Scrambling"){
            if(this.state.moveSet&&this.state.moveSet.length){
              let cD = this.state.cubeDimension;
              let tempRubiks = this.state.rubiksObject;
              let blockMoveLog = this.state.blockMoveLog;
              let moveLog = this.state.moveLog;
              let solveMoves = this.state.solveMoves;
              let solveState = this.state.solveState;
              let end = this.state.end;


              if(typeof(this.state.moveSet[0][0])==='number') {
                //console.log("changing speed");
                let moveSet=this.state.moveSet;
                this.changeSpeed(...moveSet[0],true);
                moveSet.shift();
                this.setState({moveSet});
              }
              else{
                let moveData = this.parseMoveArray(this.state.moveSet);


                if(moveData){
                  let obj = this.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
      
                  obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,tempRubiks);

                  this.setState(obj);
                }
              }
            }
            else{
              this.setState({currentFunc : "None",moves : 0});
            }

            // let randFace = Math.floor((Math.random() * 6));
            // let randTurn = Math.floor((Math.random() * 2)-1);
            // let randIsMulti = Math.floor((Math.random() * 2));
            // this.state.moves < 25 ?
            //   this.scramble(randFace,randTurn,randIsMulti) :
            //   this.setState({currentFunc : "None",moves : 0});
          }
          else if (this.state.currentFunc==="Solving"||this.state.currentFunc==="Algorithms"){
            
            // Place holder for full solve testing
            if(this.state.autoTarget && !this.state.autoPlay && !this.state.autoRewind) {
              this.setState({autoTarget:false},()=>this.reloadTurnedPieces('check'))
            }

            else if(this.state.solveOnce){
              this.setState({solveOnce:false},()=>{
                let a = performance.now();
                this.setState(this.generateAllSolveMoves(this.state,this.state.rubiksObject));
                let b = performance.now();
                //console.log('It took ' + ((b - a)/1000).toFixed(3) + ' seconds to solve.');
                this.setState({solveTime:((b - a)/1000).toFixed(3)})
              });

            }
            // If there are no moves queued, check to see if more moves can be queued
            else if(!this.state.moveSet.length){
            }
            // If playone or autoplay is true, progress accordingly
            else if(this.state.playOne){
              let cD = this.state.cubeDimension;
              let tempRubiks = this.state.rubiksObject;
              let blockMoveLog = this.state.blockMoveLog;
              let moveLog = this.state.moveLog;
              let solveMoves = this.state.solveMoves;
              let moveSet = this.state.moveSet;
              let end = this.state.end;
              let solveState = this.state.solveState;
              let obj = {};

              if(typeof(moveSet[0][0])==='number') {
                this.changeSpeed(...moveSet[0],true);
                moveSet.shift();
                obj.moveSet=moveSet;
              }
              else{

                // generates data for next move
                let moveData = this.parseMoveArray(moveSet);

                // takes next move data and queues changes to be made to state
                
                if(moveData){
                  obj = this.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
                }

                // Turn off play one so only runs once
                if(this.state.playOne) obj.playOne = false;

                // hides move the hint during the move
                this.mouseLeave();
                
                // store the object here
                if(moveData){
                  obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,tempRubiks);
                  obj.solvedSetIndex = this.state.solvedSetIndex+1;
                }

                //console.log(obj);
              }
              this.setState(obj);
            }
            // Show hint over next move
            else if(this.state.moveSet.length){
              let moveSet = this.state.moveSet;
              let obj = {};
              if(typeof(moveSet[0][0])==='number') {
                //console.log("changing speed");
                this.changeSpeed(...moveSet[0],true);
                moveSet.shift();
                obj.moveSet=moveSet;
              }
              else{
                let data = this.convertMoveToData(moveSet[0]);
                if(data){
                  this.mouseOver(this.state.moveSet[0],data);
                }
              }
              if(obj.length){
                this.setState({obj});
              }   
            }
          }

          else if(this.state.currentFunc==="Color Picker"){
            // Code here for color picker interface
          }
          else if(this.state.currentFunc==='Reset'){
            this.reset();
          }
          else {
            if(this.state.moveSet.length){
              let cD = this.state.cubeDimension;
              let tempRubiks = this.state.rubiksObject;
              let blockMoveLog = this.state.blockMoveLog;
              let moveLog = this.state.moveLog;
              let solveMoves = this.state.solveMoves;
              let solveState = this.state.solveState;
              let end = this.state.end;


              if(typeof(this.state.moveSet[0][0])==='number') {
                //console.log("changing speed");
                let moveSet=this.state.moveSet;
                this.changeSpeed(...moveSet[0],true);
                moveSet.shift();
                this.setState({moveSet});
              }
              else{
                let moveData = this.parseMoveArray(this.state.moveSet);


                if(moveData){
                  let obj = this.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
      
                  obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,tempRubiks);

                  this.setState(obj);
                }
              }

            } 
            else{
              this.setState({currentFunc:"None"}); 
            }
          }
        }
      }
      
      controls.update();
      renderer.render( scene, camera );
      // stats.end();     
    };
  }

  // Renders html to the index.html page
  render() {
    
    return (
      <div className="App" style={{width:"max-content"}}>
        
        <Navbar
          title="Rubik's Cube"
          changeSettings={this.changeSettings.bind(this)}
          isLocal={this.getSizeFromUrl(true)}
          state={this.state}
        />

        {this.state.currentFunc==="Color Picker"?<></>:<p style={{position:"fixed", top: "110px", left: "10px",color: "lightgrey",fontSize:"1rem"}}>Speed: {this.state.currentSpeed}</p>}
        <div style={{width:"100px",position:"absolute", top: "75px",marginLeft: "50%",left:"-50px"}}>
          {this.state.currentFunc==="None"||this.state.currentFunc==="Undo"||this.state.currentFunc==="Redo"||this.state.currentFunc==="Drag Turn"?
          [<button key="undo" className="redoUndo" style={{border:"none",marginRight:"2px",display:"inline-block", width:"45%",height:"50px",fontSize:"1rem",background: "url(https://image.flaticon.com/icons/svg/889/889590.svg)",backgroundRepeat:"no-repeat"}} onClick={() => this.undo()}></button>,
          <button key="redo" className="redoUndo" style={{border:"none",marginLeft:"2px",display:"inline-block", width:"45%",height:"50px",fontSize:"1rem",background: "url(https://image.flaticon.com/icons/svg/889/889578.svg)",backgroundRepeat:"no-repeat"}} onClick={() => this.redo()}></button>]
          :""
          }
        </div>

        {this.state.currentFunc==="Color Picker"?[]:<Speeds //Top left with slider
          onSliderChange={this.onSliderChange}
          speed={this.state.sliderSpeed}
        />}
        { this.state.showMoveInput? 
          <MoveInput
            algorithm = {this.algorithm}
            handleDrag = {this.handleDragInput}
            onStart = {this.onStartInput}
            onStop = {this.onStopInput}
          /> : []
        }
        {this.state.currentFunc==="Solving"?
            <SolverInfo
              solvedSetLength={this.state.solvedSet.length}
              prevSetLength={this.state.prevSet.length}
            />:[]
        }
        {this.state.currentFunc==="Color Picker"?
            <ColorPickerInfo
              colorPicked={this.state.colorPicked}
            />:[]
        }

        <Menu 
          state = {this.state}
          setState = {this.menuSetState}
          beginScramble = {this.beginScramble}
          disableHover={this.state.showGuideArrows}

          //Controls
          generatedButtons={this.state.generatedButtons}
          size={this.getSizeFromUrl()}
          rotateOneFace={this.rotateOneFace}
          mouseEnter= {this.mouseOver}
          mouseLeave= {this.mouseLeave}

          //Color Picker
          beginColorPicker={this.beginColorPicker}
          endColorPicker={this.endColorPicker}
          colorPicked={this.state.colorPicked}
          changeColor={this.changeColor}
          isValidConfig={this.state.isValidConfig}
          setColorPickedCube={this.setColorPickedCube}
          cpErrors={this.state.cpErrors}

          //Solver
          beginSolve={this.beginSolve}
          stopSolve={this.stopSolve}
          playOne={this.playOne}
          rewindOne={this.rewindSolve}
          reload={this.reloadTurnedPieces}
          autoJump={this.autoJump}
        />

        {/* <button className="menuToggle cpButton" onClick={this.menuToggle}>˅</button> */}

        {/* add button-> center bottom hide/show menu. let user make rotations for solve moves with swipes */}
  
      </div>
    );
  }
}



export default App;