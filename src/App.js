import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar";
//import Patterns from "./components/Patterns"
import Speeds from "./components/Speeds"
//import Controls from "./components/Controls"
import MoveInput from "./components/MoveInput"
//import Core from "./components/Core";
//import ColorPicker from "./components/ColorPicker";
import Menu from "./components/MenuWrapper/MenuWrapper";
import * as THREE from "three";
import Stats from "stats.js";
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
    colorPicked: 'blue',
    mouseFace : null,
    mouseDown : false,
    mousePos : null,
    undoIndex : 0,        // Index to keep track of where undo/redo is
    blockMoveLog : false, // Blocks adding move when undoing/redoing a move
    previousPiece : null, // Keeps track of hovered face to not redraw
    rubiksIndex : 0,      // Index to keep track of middles while solving
    middles : [],         // Contains all middle segments
    corners : [],         // Contains all corner segments         
    showStats: false,     // Setting for stats
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
    isValidConfig : false,
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
    activeAlgo:"none"
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

      default:
    }
  }

  // Handles key press event
  keyHandling = e => {
    if(e.keyCode <= 36 || e.keyCode >= 41) this.keyBinds(e.key);
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
    if((this.state.currentFunc==="Solving"||this.state.currentFunc==="Algorithms"||this.state.currentFunc==="Scrambling")&&!bypass) {
      this.setState({moveSet:[[_speed,_rotationSpeed,_name],...this.state.moveSet]})
      return;
    }
    if(this.state.currentFunc !== "None" && !bypass) return;
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

  convertToBlueWhiteEdge(_piece){
    const piece = [..._piece];
    const dim = this.state.cubeDimension;
    const max = dim-1;
    const white=0,blue=dim-1,red=dim-1,yellow=dim-1,orange=0,green=0;

    if(piece[7]===white&&piece[8]===blue) {
      //console.log("we here");
      return {
        colors:[
          piece[0], // piece on left(4) is now on front(0)
          piece[1], // piece on top(1) is still on top(1)
          piece[2], // piece on front(0) is now on right(2)
          piece[3], // piece on right(2) is now on back(3)
          piece[4], // piece on back(3) is now on left(4)
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

    // move piece to blue/white side
    let newValidPiece = this.convertToBlueWhiteEdge([...validPiece]);
    let newManualPiece = this.convertToBlueWhiteEdge([...manualPiece]); 

    //console.log(newValidPiece,newManualPiece);

    if((newValidPiece.colors===newManualPiece.colors&&newValidPiece.position===newManualPiece.position)){
      //console.log("valid");
      return true;
    }
    else if(newValidPiece.colors!==newManualPiece.colors&&newValidPiece.position!==newManualPiece.position){
      //console.log("valid");
      return true;
    }
    else return false;
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
          if(piece.includes("edge")&&!piece.includes("center")){
            validEdgePlacement = this.checkValidMatch(piece,rubik);
          }
          else{
            validEdgePlacement = true;
          }
          if(validEdgePlacement){
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
      //console.log(newGenerated);
      this.reloadTurnedPieces('check');
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
    let duplicateColors = []
    let matchedCount = 0;
    let obj = {};
    let validAmount = this.state.cubeDimension*this.state.cubeDimension;
    let rubiks = [...this.state.rubiksObject];
    let generated = cube.generateSolved(this.state.cubeDimension,this.state.cubeDimension,this.state.cubeDimension);
    let newGenerated = [];

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
      rubiks.forEach(([...rubik],i) => {
        let validPiece = 0;
        piece.slice(0,6).sort().forEach((face,index) =>{
          if(rubik.slice(0,6).sort()[index]===face) {validPiece++;}
        });
        if(validPiece===6&&!checked.includes(pieceIndex)&&!otherChecked.includes(i)){
          let validEdgePlacement = false;
          if(piece.includes("edge")&&!piece.includes("center")){
            validEdgePlacement = this.checkValidMatch(piece,rubik);
          }
          else{
            validEdgePlacement = true;
          }
          if(validEdgePlacement){
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
    });

    
    let invalidAmounts = [];
    if(whiteCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("white");
      //obj.error.push(`Invalid white sticker count.`);
    }
    if(blueCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("blue");
      //obj.error.push(`Invalid blue sticker count.`);
    }
    if(redCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("red");
      //obj.error.push(`Invalid red sticker count.`);
    }
    if(yellowCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("yellow");
      //obj.error.push(`Invalid yellow sticker count.`);
    }
    if(orangeCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("orange");
      //obj.error.push(`Invalid orange sticker count.`);
    }
    if(greenCount!==validAmount){
      if(!obj.error) obj.error = [];
      invalidAmounts.push("green");
      //obj.error.push(`Invalid green sticker count.`);
    }
    if(invalidAmounts.length){
      invalidAmounts=invalidAmounts.join(', ')
      if(!obj.error) obj.error = [];
      obj.error.push(`Invalid ${invalidAmounts} sticker count.`);
    }

    if(duplicateFace){
      //duplicateColors.forEach(color => {
        duplicateColors=duplicateColors.join(', ')
        obj.error.push(`More than one occurence of ${duplicateColors} found on a piece.`);
      //});
    }

    if(matchedCount!==rubiksLength&&this.state.cubeDimension<4){
      if(!obj.error) obj.error = [];
      obj.error.push(`[${matchedCount-1}] out of [${rubiksLength-1}] matched. Missing [${(rubiksLength-1)-(matchedCount-1)}]`);
    }

    if(!obj.error){
      obj.error = [];
      //console.log(generated);
      //console.log(newGenerated);
      const solveData = {...this.generateAllSolveMoves(this.state,newGenerated)};
      //let solveable = solveData.solveable;
      generated.tempArr.forEach((piece,i) => {
        if(piece.slice(0,6).join('')===solveData.rubiksObject[i].slice(0,6).join('')||piece.includes('corner')){}
        else{
          //solveData.solveable=false
          console.log("failed matches");
          console.log(piece.slice(0,6).join(''),solveData.rubiksObject[i].slice(0,6).join(''));
        }
      })
      if(solveData.solveable===false){
        //console.log(solveData);
        obj.error.push(`This configuration of the cube is not solveable.`);
        obj.error.push(`Check that you've entered all pieces correctly.`);
        if(this.state.cubeDimension>3){
          obj.error.push(`There may be a few edge cases on the 4x4, where`);
          obj.error.push(`a valid scramble cube may not work. Sorry for the`);
          obj.error.push(`inconvenience, a fix is on the way. Make a few`);
          obj.error.push(`moves and try again :)`);
        }
      }
      else{
        obj.error = undefined;
      }
    }
    else{
      //obj.error.push('Not solvable');
    }

    //console.log(obj.error);

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

  // Controls camera movements
  // *** Needs to be reworked ***
  rotateCamera = (key) => {
    let y = this.state.cameraY;
    //let x = this.state.cameraX;
    //let z = this.state.cameraZ;
    //let formula = this.state.cubeDimension+2+(y+1)/20;
    if(key === 37){ // left
      this.setState({angle: this.state.angle+.075}); 
    }
    if(key === 38){ // up
      if(y < this.state.cubeDimension+2) this.setState({cameraY: y + .5});
    }
    if(key === 39){ // right
      this.setState({angle: this.state.angle-.075});
    }
    if(key === 40){ // down
      
      if(y > -(this.state.cubeDimension+2)) this.setState({cameraY: y - .5});
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
  algorithm = (moveString,moveName) => {
    if(this.state.currentFunc !== "None") return;
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : moveName, moveSet : moveArray});
  }

  // Refreshes page to reset cube
  reset = () => {
    let cD = this.state.cubeDimension;
    let generated = cube.generateSolved(cD,cD,cD);
    let rubiksObject = generated.tempArr;
    this.setState({rubiksObject,moveSet: [],moveLog: "",currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [],cpErrors:[]},()=>{
      this.reloadTurnedPieces('all');
    });
    //window.location.reload();
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
      //console.log(this.state.rubiksObject);
      //console.log("reloading");
      this.reloadTurnedPieces('cp');
    });
  }

  endColorPicker = () => {
    this.reset();
    this.setState({currentFunc : "None",cpErrors:[]});
  }

  rewindSolve = () => {
    if(this.state.playOne) return;
    if(this.state.prevSet[this.state.prevSet.length-1]===this.state.prevSet[this.state.prevSet.length-2]&&!this.state.autoRewind){
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
      case 'displayStats':
        this.state.showStats ? document.body.children[9].style.display = "none" : document.body.children[9].style.display = "";
        this.setState({showStats : !this.state.showStats});
        break;
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

  calculateTurnAtFace(coord1,compare1,coord2,compare2,piece1,piece2,dir1,dir2){
    if(Math.abs(coord1)>=Math.abs(coord2)&&(Math.abs(coord1)>.1)) 
      return {calculated : compare1?dir1:(dir1+"'"),depth : piece2}
      
    if(Math.abs(coord2)>Math.abs(coord1)&&(Math.abs(coord2)>.1)) {
      return {calculated : compare2?dir2:(dir2+"'"),depth : piece1}
    }
    return null;
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

    //determines the move based on mouse difference from click to new position
    switch(pieceFace){
      case 0:
        turn = this.calculateTurnAtFace(dif.z,dif.z<0,dif.x,dif.x>=0,cD-piece.z,cD-piece.x,"R","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 1:
        turn = this.calculateTurnAtFace(dif.x,dif.x<=0,dif.y,dif.y<0,cD-piece.x,piece.y+1,"F","R");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 2:
        turn = this.calculateTurnAtFace(dif.z,dif.z>0,dif.y,dif.y>0,cD-piece.z,piece.y+1,"F","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 3:
        turn = this.calculateTurnAtFace(dif.z,dif.z>0,dif.x,dif.x<=0,cD-piece.z,cD-piece.x,"R","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 4:
        turn = this.calculateTurnAtFace(dif.z,dif.z<0,dif.y,dif.y<0,cD-piece.z,piece.y+1,"F","U");
        calculated = turn.calculated; depth = turn.depth;
        break;
      case 5:
        turn = this.calculateTurnAtFace(dif.x,dif.x>=0,dif.y,dif.y>0,cD-piece.x,piece.y+1,"F","R");
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
    let tempState = JSON.parse(JSON.stringify(state));
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
        currentIndex=tempState.rubiksIndex;
        if(currentIndex===previousIndex) indexOccurence = indexOccurence+1;
        else indexOccurence = 0;
        
        let moves = solver(tempState.solveState,tempState.rubiksObject,tempState.cubeDimension,this.moveStringToArray,
          tempState.solveMoves,tempState.rubiksIndex,tempState.middles,tempState.edges,tempState.corners);
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
        if((indexOccurence>10 && tempState.solveState<1)||counter>100000) {
          console.log(tempState.solveState);
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
      alert("Sorry for the inconvenience. This error is caused by an infinite loop issue with the solver and has been stopped to prevent freezing the application. The current move set has still been pushed and is playable for debugging purposes. Maybe you can figure out the issue before I can ;)");
      return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:false,solvedSet:[...moveSet],solvedSetIndex:0};
    }
    return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:true,solvedSet:[...moveSet],solvedSetIndex:0};
  }

  animateRotation(tempCubes){
    cube.rotatePieces(cube.rotatePoint,tempCubes);
  }

  windowResized = () => {
    this.setState({resized:true});
  }

  // Initialization and animation functions
  componentDidMount() {

    let cD = this.getSizeFromUrl();
    let generated = cube.generateSolved(cD,cD,cD);
    let rubiksObject = generated.tempArr;
    let tempCubes = [];
    let stats = new Stats();
    const groups = [[],[],[],[],[],[]];
    let previousMousePos = null;
    let piecePos = null;
    let intersected = null;

    // === THREE.JS VARIABLES ===
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let cubeGeometry = new THREE.BoxGeometry(  );
    let geometry = new THREE.PlaneGeometry(1,1);
    //const loader = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2vqlj5dzmGwQfEBy7yNWfDvDVm6mgsA4768bcpsJDmdp9t0g7w&s');
    const loader = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW92XE-j1aJzRMI9kvvMZIf2VikZzzdEI87zl4rWgHMJBNJ9iw7A&s');
    //const loader1 = new THREE.TextureLoader().load('https://cdn0.iconfinder.com/data/icons/arrows-11/100/arrow-1-512.png');
    const loader1 = new THREE.TextureLoader().load('https://cdn2.iconfinder.com/data/icons/communication-language/100/Up_Arrow-01-512.png');
    let material = new THREE.MeshBasicMaterial( {map:loader1,transparent: true,color: 'black', opacity:'.8',side: THREE.DoubleSide} );
    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );

    let windowHeight = window.innerHeight;

    function onMouseMove( event ) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;   
    }
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

    // Bind event listeners to window
    window.addEventListener("keydown", this.keyHandling);
    window.addEventListener("mousemove", onMouseMove, false );
    window.addEventListener("mousedown", this.onMouseDown.bind(this), false );
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false );
    window.addEventListener("resize", () => onWindowResize(this.windowResized), false );
    
    // Set background color and size
    renderer.setClearColor(new THREE.Color("black"),0);
    renderer.domElement.className = "canvas";
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.children[5].appendChild( renderer.domElement );

    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom);
    document.body.children[9].style.display = "none"

    // Prevents bluring
    loader.anisotropy = renderer.capabilities.getMaxAnisotropy();
    loader1.anisotropy = renderer.capabilities.getMaxAnisotropy();

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
    const controls = new OrbitControls( camera , renderer.domElement);
    controls.enableDamping = true;   //damping 
    controls.dampingFactor = 0.15;   //damping inertia
    controls.enableZoom = true;      //Zooming
    controls.autoRotate = false;     //Enable auto rotation
    controls.minDistance = (2+cD);
    controls.maxDistance = (2+cD)+20;
    controls.keys = {
      LEFT: null, //left arrow
      UP: null, // up arrow
      RIGHT: null, // right arrow
      BOTTOM: null // down arrow
    };

    controls.addEventListener("change", () => {
      if (renderer) renderer.render(scene, camera);
    });

    // generate side 4 and 2 move hints
    for(let k = 0; k < cD; k++){
      let tempGroup = new THREE.Group();
      let tempGroupOther = new THREE.Group();
      for(let i = 0; i < 4; i++){
        for(let j = 0; j<cD;j++){
          let tempPlane = new THREE.Mesh( geometry, material );
          let tempPlaneOther = new THREE.Mesh( geometry, material );
          if(i===0){
            tempPlane.translateX(cD-1-k);
            tempPlane.translateZ((cD-1)+.51);
            tempPlane.translateY((cD-1)-j);

            tempPlaneOther.translateX(cD-1-k);
            tempPlaneOther.translateZ((cD-1)+.51);
            tempPlaneOther.translateY((cD-1)-j);
            tempPlaneOther.rotateZ(Math.PI);
          }
          else if(i===1){
            tempPlane.translateX(cD-1-k);
            tempPlane.translateZ((cD-1)-j);
            tempPlane.translateY((cD-1)+.51);
            tempPlane.rotateX(Math.PI/2);
            tempPlane.rotateZ(Math.PI);

            tempPlaneOther.translateX(cD-1-k);
            tempPlaneOther.translateZ((cD-1)-j);
            tempPlaneOther.translateY((cD-1)+.51);
            tempPlaneOther.rotateX(Math.PI/2);
          }
          else if(i===2){
            tempPlane.translateX(cD-1-k);
            tempPlane.translateZ(-.51);
            tempPlane.translateY((cD-1)-j);
            tempPlane.rotateX(Math.PI);

            tempPlaneOther.translateX(cD-1-k);
            tempPlaneOther.translateZ(-.51);
            tempPlaneOther.translateY((cD-1)-j);
          }
          else if(i===3){
            tempPlane.translateX(cD-1-k);
            tempPlane.translateZ((cD-1)-j);
            tempPlane.translateY(-.51);
            tempPlane.rotateX(-Math.PI/2);
            tempPlane.rotateZ(Math.PI);

            tempPlaneOther.translateX(cD-1-k);
            tempPlaneOther.translateZ((cD-1)-j);
            tempPlaneOther.translateY(-.51);
            tempPlaneOther.rotateX(-Math.PI/2);
          }
          tempGroup.add(tempPlane)
          tempGroupOther.add(tempPlaneOther)
        }
      }
      tempGroup.visible = false;
      tempGroupOther.visible = false;
      groups[2].push(tempGroup);
      groups[5].push(tempGroupOther);
    }

    // generate side 0 and 3 move hints
    for(let k = 0; k < cD; k++){
      let tempGroup = new THREE.Group();
      let tempGroupOther = new THREE.Group();
      for(let i = 0; i < 4; i++){
        for(let j = 0; j<cD;j++){
          let tempPlane = new THREE.Mesh( geometry, material );
          let tempPlaneOther = new THREE.Mesh( geometry, material );
          if(i===0){
            tempPlane.translateX((cD-1)-j);
            tempPlane.translateZ((cD-1)+.51);
            tempPlane.translateY(k);
            tempPlane.rotateZ(-Math.PI/2);
            

            tempPlaneOther.translateX((cD-1)-j);
            tempPlaneOther.translateZ((cD-1)+.51);
            tempPlaneOther.translateY(k);
            tempPlaneOther.rotateX(Math.PI);
            tempPlaneOther.rotateZ(Math.PI/2);
          }
          else if(i===1){
            tempPlane.translateX((cD-1)+.51);
            tempPlane.translateZ((cD-1)-j);
            tempPlane.translateY(k);
            tempPlane.rotateX(Math.PI/2);
            tempPlane.rotateZ(Math.PI);
            tempPlane.rotateY(Math.PI/2);

            tempPlaneOther.translateX((cD-1)+.51);
            tempPlaneOther.translateZ((cD-1)-j);
            tempPlaneOther.translateY(k);
            tempPlaneOther.rotateX(Math.PI/2);
            tempPlaneOther.rotateY(Math.PI/2);
          }
          else if(i===2){
            tempPlane.translateX((cD-1)-j);
            tempPlane.translateZ(-.51);
            tempPlane.translateY(k);
            tempPlane.rotateX(Math.PI);
            tempPlane.rotateZ(Math.PI/2);

            tempPlaneOther.translateX((cD-1)-j);
            tempPlaneOther.translateZ(-.51);
            tempPlaneOther.translateY(k);
            tempPlaneOther.rotateZ(-Math.PI/2);
          }
          else if(i===3){
            tempPlane.translateX(-.51);
            tempPlane.translateZ((cD-1)-j);
            tempPlane.translateY(k);
            tempPlane.rotateX(-Math.PI/2);
            tempPlane.rotateZ(Math.PI);
            tempPlane.rotateY(-Math.PI/2);

            tempPlaneOther.translateX(-.51);
            tempPlaneOther.translateZ((cD-1)-j);
            tempPlaneOther.translateY(k);
            tempPlaneOther.rotateX(-Math.PI/2);
            tempPlaneOther.rotateY(Math.PI/2);
            //tempPlaneOther.rotateZ(Math.PI);
          }
          tempGroup.add(tempPlane)
          tempGroupOther.add(tempPlaneOther)
        }
      }
      tempGroup.visible = false;
      tempGroupOther.visible = false;
      
      groups[0].push(tempGroup);     //Clockwise for white, counter for yellow
      groups[3].push(tempGroupOther);//Counter for white, clockwise for yellow
    }

    // generate side 1 and 5 move hints
    for(let k = 0; k < cD; k++){
      let tempGroup = new THREE.Group();
      let tempGroupOther = new THREE.Group();
      for(let i = 0; i < 4; i++){
        for(let j = 0; j<cD;j++){
          let tempPlane = new THREE.Mesh( geometry, material );
          let tempPlaneOther = new THREE.Mesh( geometry, material );
          if(i===0){
            tempPlane.translateX((cD-1)-j);
            tempPlane.translateZ((cD-1)-k);
            tempPlane.translateY((cD-1)+.51);
            tempPlane.rotateZ(-Math.PI/2);
            tempPlane.rotateY(Math.PI/2);
            

            tempPlaneOther.translateX((cD-1)-j);
            tempPlaneOther.translateZ((cD-1)-k);
            tempPlaneOther.translateY((cD-1)+.51);
            tempPlaneOther.rotateX(Math.PI);
            tempPlaneOther.rotateZ(Math.PI/2);
            tempPlaneOther.rotateY(Math.PI/2);
          }
          else if(i===1){
            tempPlane.translateX((cD-1)+.51);
            tempPlane.translateZ((cD-1)-k);
            tempPlane.translateY((cD-1)-j);
            //tempPlane.rotateX(Math.PI/2);
            tempPlane.rotateZ(Math.PI);
            tempPlane.rotateY(Math.PI/2);

            tempPlaneOther.translateX((cD-1)+.51);
            tempPlaneOther.translateZ((cD-1)-k);
            tempPlaneOther.translateY((cD-1)-j);
            //tempPlaneOther.rotateX(Math.PI);
            tempPlaneOther.rotateY(Math.PI/2);
          }
          else if(i===2){
            tempPlane.translateX((cD-1)-j);
            tempPlane.translateZ((cD-1)-k);
            tempPlane.translateY(-.51);
            tempPlane.rotateX(Math.PI/2);
            tempPlane.rotateZ(Math.PI/2);

            tempPlaneOther.translateX((cD-1)-j);
            tempPlaneOther.translateZ((cD-1)-k);
            tempPlaneOther.translateY(-.51);
            tempPlaneOther.rotateX(Math.PI/2);
            tempPlaneOther.rotateZ(-Math.PI/2);
          }
          else if(i===3){
            tempPlane.translateX(-.51);
            tempPlane.translateZ((cD-1)-k);
            tempPlane.translateY((cD-1)-j);
            tempPlane.rotateX(Math.PI);
            tempPlane.rotateZ(Math.PI);
            tempPlane.rotateY(-Math.PI/2);

            tempPlaneOther.translateX(-.51);
            tempPlaneOther.translateZ((cD-1)-k);
            tempPlaneOther.translateY((cD-1)-j);
            tempPlaneOther.rotateX(-Math.PI);
            tempPlaneOther.rotateY(Math.PI/2);
            //tempPlaneOther.rotateZ(Math.PI);
          }
          tempGroup.add(tempPlane)
          tempGroupOther.add(tempPlaneOther)
        }
      }
      tempGroup.visible = false;
      tempGroupOther.visible = false;
      
      groups[1].push(tempGroup);     //Clockwise for white, counter for yellow
      groups[4].push(tempGroupOther);//Counter for white, clockwise for yellow
    }

    groups.forEach(group => scene.add(...group));
    // scene.add(...groups.flat(2)); //issues with new edge

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
      for(let i = 0; i < groups.length;i++)
        groups[i].forEach(group => group.visible = false)

      controls.enabled = true;
      stats.begin();
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

        let previousPiece = this.state.previousPiece;

        // Projects mouse onto scene to find intersected objects
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        let intersects = raycaster.intersectObjects( scene.children );
        if (intersects[0] && intersects[0].object.material.length && !this.state.mouseDown){
          previousMousePos = null;
          piecePos = null;
          intersected = null;
          controls.enabled = false;
          // Get faces to line up properly
          let faceInteresected = intersects[0].faceIndex;
          let tempIndex = -1;
          
          // Assign the intersected face index to be recolored on hover
          
          for(let i = 0; i < 6; i++){
            if(faceInteresected===i*2 || faceInteresected=== i*2+1) {
              tempIndex = i;
              this.setState({mouseFace : i});
              break;
            }
          }

          // Recolors last hovered piece. rgb values of cyan
          if(intersects[0].object.material[tempIndex].opacity!==.8){
               
            if(previousPiece!==null) {
              let previousPiece = this.state.previousPiece;
              previousPiece.opacity=1;
              //this.reloadTurnedPieces(previousPiece);
              this.setState({previousPiece:null});
            }
          }
          
          // Recolor face that mouse is over
          if(intersects[0].object.material[tempIndex] && tempIndex > -1)
            if(intersects[0].object.material[tempIndex].color){
              // store the hovered face for use later
              this.setState({facePosX : intersects[0].object.position.x,
                            facePosY : intersects[0].object.position.y,
                            facePosZ : intersects[0].object.position.z,
                            faceSide : tempIndex });
              intersects[0].object.material[tempIndex].opacity=.8;
              //console.log(intersects[0].object.material[tempIndex].opacity);
              // store the hovered coordinates so that if a different
              // piece is hovered, the previous gets colored back.
              this.setState({previousPiece : intersects[0].object.material[tempIndex]});
            }
        }

        else if(this.state.mouseDown){
          if(this.state.mouseFace === null){
            // dragging mouse on canvas should rotate cube
          } 

          else{
            try{
              let toFace = [2,4,3,0,1,5];
              
              if(previousMousePos === null) {
                previousMousePos = intersects[0].point;
                piecePos = intersects[0].object.position;
                intersected = Math.floor(intersects[0].faceIndex/2);
              }
              else{
                  let calculated = this.calculateTurn(intersects[0].point,previousMousePos,piecePos,toFace[intersected],cD);
                  if(calculated!==null&&!calculated.includes("null")){
                    //console.log(calculated)
                    this.setState({mouseDown: false},()=>{
                      this.algorithm(calculated,"Drag Turn");
                    });
                  }
                
              }
            }catch(e){
              //console.error("Error prevented");
            }
          }
        }

        // 
        else if(this.state.mouseFace !== null){
          if(previousPiece!==null) {
            previousPiece.opacity=1;
            //this.reloadTurnedPieces(previousPiece);
            this.setState({previousPiece:null});
          }

          previousMousePos = null;
          piecePos = null;
          intersected = null;
          this.setState({mouseFace : null});
        }
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
      stats.end();     
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

        <p style={{position:"fixed", top: "100px", left: "10px",color: "white",fontSize:"1rem"}}>Speed: {this.state.currentSpeed}</p>
        <p style={{position:"fixed", top: "75px", right: "10px",color: "white",fontSize:"1.5rem"}}>{this.state.currentFunc === "None" ? "" : this.state.currentFunc}</p>
        <div style={{position:"absolute", top: "75px",marginLeft: "50%",left:"-105px"}}>
          {this.state.currentFunc==="None"||this.state.currentFunc==="Undo"||this.state.currentFunc==="Redo"||this.state.currentFunc==="Drag Turn"?
          [<button key="undo" className="redoUndo" style={{marginRight:"10px",width:"100px",height:"50px",fontSize:"1.5rem"}} onClick={() => this.undo()}>Undo</button>,
          <button key="redo" className="redoUndo" style={{marginRight:"10px",width:"100px",height:"50px",fontSize:"1.5rem"}} onClick={() => this.redo()}>Redo</button>]
          :""
          }
        </div>

        <Speeds //Top left with slider
          onSliderChange={this.onSliderChange}
          isDisabled={this.state.currentFunc==="None"||this.state.currentFunc==="Solving"||this.state.currentFunc==="Algorithms"||this.state.currentFunc==="Scrambling"? false:true}
        />

        { this.state.showMoveInput? 
          <MoveInput
            algorithm = {this.algorithm}
            handleDrag = {this.handleDragInput}
            onStart = {this.onStartInput}
            onStop = {this.onStopInput}
          /> : ""
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
          rewindOne={this.rewindSolve}
          reload={this.reloadTurnedPieces}
          autoJump={this.autoJump}
        />
  
      </div>
    );
  }
}



export default App;