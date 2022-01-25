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
import moveFuncs from './cubeFunctions/move';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ColorPickerUIFunctions from "./components/ColorPicker/ColorPickerUIFunctions";

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
    sliderSpeed:40,
    jumpToEnd: false,
    algoUp: false,
    algoDown: false,
    upDateCp: 0
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
      case 'ArrowDown':
        if(this.state.currentFunc==="Algorithms"){
          this.setState({algoDown:true,resized:true});
        }
        break;
      case 'ArrowUp':
        if(this.state.currentFunc==="Algorithms"){
          this.setState({algoUp:true,resized:true});
        }
        break;
      default:
    }
  }

  // Handles key press event
  keyHandling = e => {
    this.keyBinds(e.key);
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
    this.setState({rubiksObject:[...tempObj],isValidConfig:false,upDateCp:this.state.upDateCp+1,cpErrors: []},()=>{
      this.reloadTurnedPieces('cp');
    });
  }

  runCheckColors(){
    let obj = ColorPickerUIFunctions.checkColors(this.state);
    if(obj.error) this.setState({cpErrors:[...obj.error]});
    else if(obj.success) this.setState({isValidConfig:true,cpErrors:[]});
  }

  setColorPickedCube = () => {
    let rubiks = [...this.state.rubiksObject];
    let size = this.state.cubeDimension;
    let generated = cube.generateSolved(size,size,size);
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
            validEdgePlacement = ColorPickerUIFunctions.checkValidMatchEdge(piece,rubik,size);
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
            validMiddlePlacement = ColorPickerUIFunctions.checkValidMatchMiddle(piece,rubik,size);
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

  // Allows the user to undo a move
  undo = () => {
    let undoIndex = this.state.undoIndex;
    let moveString = this.state.moveLog;
    const moveArray = moveFuncs.moveStringToArray(moveString);
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
    
    const moveArray = moveFuncs.moveStringToArray(moveString);
    
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
      let obj = cube.rotateCubeFace(vals[0],vals[1],vals[2],vals[3],blockMoveLog,moveLog,solveMoves,end,solveState);

      obj.currentFunc = e;
      obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);

      this.setState(obj);
    }
  }

  // Small bug, account for double turns
  algorithm = (moveString,moveName) => {
    if(this.state.currentFunc === "Solving"||this.state.currentFunc === "Algorithms"){
      if(this.state.moveSet[0]){
        if(moveFuncs.checkMoveEquivalence(moveString,this.state.moveSet[0],this.state.cubeDimension)){
          this.playOne(this);
        }
      }
      return;
    }
    if(this.state.currentFunc !== "None") return;
    const moveArray = moveFuncs.moveStringToArray(moveString);
    this.setState({currentFunc : moveName, moveSet : moveArray});
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

  // Changes state active function to begin scrambling
  beginScramble = () => {
    
    if(this.state.currentFunc === "None") {
      let moveSet = [];
      while (moveSet.length<25){
        let temp = moveFuncs.generateMove(this.state.cubeDimension);
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

  /* Each piece that's rotated has its rotation disrupted on other planes.
   *
   * This function solves that issue by setting all piece rotations back to zero
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
    let size;
    let parts = window.location.href.split('/');
    let checkID = parts[parts.length-1].slice(0,4);

    if(checkLocal){
      if(parts[2].substr(0,9)==='localhost'){
        return true;
      }
      else {
        return false;
      }
    }

    if(checkID === '#id='){
      size = parseInt(parts[parts.length-1].substr(4));
    }

    if (size <= limit && size >= 1) return size; else return 3;
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

  windowResized = () => {
    this.setState({resized:true});
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
    window.addEventListener("pointermove", onMouseMove.bind(this), false );
    window.addEventListener("pointerdown", onmousedown.bind(this), false );
    // window.addEventListener("touchstart", ontouchstart.bind(this), false);
    // window.addEventListener("pointermove", ontouchmove.bind(this), false);
    // window.addEventListener("touchend", ontouchend, false);
    window.addEventListener("pointerup", ontouchend, false );
    window.addEventListener("resize", () => onWindowResize(this.windowResized), false );
    
    // Set background color and size
    renderer.setClearColor(new THREE.Color("black"),0);
    renderer.domElement.className = "canvas";
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.children[5].appendChild( renderer.domElement );

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

      requestAnimationFrame( animate );

      for(let i = 0; i < groups.length;i++){
        groups[i].forEach(group => group.visible = false)
      }
      // Animate queued rotation
      if(this.state.start<=this.state.end){
        this.setState(cube.rotatePieces(cube.rotatePoint,tempCubes,this.state));
      }

      // Handles move queueing based on function
      else {
        

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
        }

        if(this.state.reload) this.reloadTurnedPieces(this.state.face);
        if(this.state.currentFunc !== "None"){

          // Doesn't work with !==
          if(this.state.currentFunc === "Undo" ||
             this.state.currentFunc === "Redo"){}

          else {
            let moveLog = this.state.moveLog;
            let index = this.state.undoIndex;

            if(index > 0){
              let moveArray = moveFuncs.moveStringToArray(moveLog);

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
                let moveData = moveFuncs.parseMoveArray(this.state.moveSet);


                if(moveData){
                  let obj = cube.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
      
                  obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,tempRubiks);

                  this.setState(obj);
                }
              }
            }
            else{
              this.setState({currentFunc : "None",moves : 0});
            }
            
          }
          else if (this.state.currentFunc==="Solving"||this.state.currentFunc==="Algorithms"){
            
            // Place holder for full solve testing
            if(this.state.autoTarget && !this.state.autoPlay && !this.state.autoRewind) {
              this.setState({autoTarget:false},()=>this.reloadTurnedPieces('check'))
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
                let moveData = moveFuncs.parseMoveArray(moveSet);

                // takes next move data and queues changes to be made to state
                
                if(moveData){
                  obj = cube.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
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
                let data = moveFuncs.convertMoveToData(moveSet[0]);
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
                let moveData = moveFuncs.parseMoveArray(this.state.moveSet);


                if(moveData){
                  let obj = cube.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
      
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
        <div style={{width:"100%",position:"absolute", top: "85px",margin:"auto",display:"flex"}}>
          <div style={{margin:"auto", display:"inline-flex",}}>
          {this.state.currentFunc==="None"||this.state.currentFunc==="Undo"||this.state.currentFunc==="Redo"||this.state.currentFunc==="Drag Turn"?
          [<button key="undo" className="redoUndo" style={{marginRight:"8px",fontSize:"2rem", color: "lightgrey",lineHeight:"2rem"}} onClick={() => this.undo()}>🠔</button>,
          <button key="redo" className="redoUndo" style={{marginLeft:"8px",fontSize:"2rem", color: "lightgrey",lineHeight:"2rem"}} onClick={() => this.redo()}>🠖</button>]
          :""
          }
          </div>
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
          runCheckColors={this.runCheckColors}

          //Solver
          beginSolve={this.beginSolve}
          stopSolve={this.stopSolve}
          playOne={this.playOne}
          rewindOne={this.rewindSolve}
          reload={this.reloadTurnedPieces}
        />
  
      </div>
    );
  }
}



export default App;