import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar";
import * as THREE from "three";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    cubes : [],           // Contains visual cube
    rubiksObject : [
      [ "white",  // 0
        "blue",   // 1
        "black",  // 2 
        "black",  // 3
        "orange", // 4
        "black",  // 5
        0,        // x
        0,        // y
        2],       // z
      [ "white",
        "blue",
        "black",
        "black",
        "black",
        "black",
        1,
        0,
        2],
      [ "white",
        "blue",
        "red",
        "black",
        "black",
        "black",
        2,
        0,
        2],
      [ "white",
        "black",
        "black",
        "black",
        "orange",
        "black",
        0,
        0,
        1],
      [ "white",
        "black",
        "black",
        "black",
        "black",
        "black",
        1,
        0,
        1],
      [ "white",
        "black",
        "red",
        "black",
        "black",
        "black",
        2,
        0,
        1],
      [ "white",
        "black",
        "black",
        "black",
        "orange",
        "green",
        0,
        0,
        0],
      [ "white",
        "black",
        "black",
        "black",
        "black",
        "green",
        1,
        0,
        0],
      [ "white",
        "black",
        "red",
        "black",
        "black",
        "green",
        2,
        0,
        0],
      //Second set
      [ "black",
        "blue",
        "black",
        "black",
        "orange",
        "black",
        0,
        1,
        2],
      [ "black",
        "blue",
        "black",
        "black",
        "black",
        "black",
        1,
        1,
        2],
      [ "black",
        "blue",
        "red",
        "black",
        "black",
        "black",
        2,
        1,
        2],
      [ "black",
        "black",
        "black",
        "black",
        "orange",
        "black",
        0,
        1,
        1],
      [ "black",
        "black",
        "black",
        "black",
        "black",
        "black",
        1,
        1,
        1],
      [ "black",
        "black",
        "red",
        "black",
        "black",
        "black",
        2,
        1,
        1],
      [ "black",
        "black",
        "black",
        "black",
        "orange",
        "green",
        0,
        1,
        0],
      [ "black",
        "black",
        "black",
        "black",
        "black",
        "green",
        1,
        1,
        0],
      [ "black",
        "black",
        "red",
        "black",
        "black",
        "green",
        2,
        1,
        0],
      //Last Set
      [ "black",
        "blue",
        "black",
        "yellow",
        "orange",
        "black",
        0,
        2,
        2],
      [ "black",
        "blue",
        "black",
        "yellow",
        "black",
        "black",
        1,
        2,
        2],
      [ "black",
        "blue",
        "red",
        "yellow",
        "black",
        "black",
        2,
        2,
        2],
      [ "black",
        "black",
        "black",
        "yellow",
        "orange",
        "black",
        0,
        2,
        1],
      [ "black",
        "black",
        "black",
        "yellow",
        "black",
        "black",
        1,
        2,
        1],
      [ "black",
        "black",
        "red",
        "yellow",
        "black",
        "black",
        2,
        2,
        1],
      [ "black",
        "black",
        "black",
        "yellow",
        "orange",
        "green",
        0,
        2,
        0],
      [ "black",
        "black",
        "black",
        "yellow",
        "black",
        "green",
        1,
        2,
        0],
      [ "black",
        "black",
        "red",
        "yellow",
        "black",
        "green",
        2,
        2,
        0]
    ],                    // Contains memory cube
    speed : 10,           // Control individual piece rotation speed (don't change)
    rotationSpeed : 200,  // Controls visual rotation speed
    canScramble: true,    // Manual rotations can't happen while this is false
    canMove: true,
    start : 10,           // Start value for a rotation or set of rotations
    end : 0,              // End value for a roation or set of rotations
    turnDirection : 0,    // Dictates whether the rotation is clockwise or counterclockwise
    face : 0,             // The face being turned
    cameraX : 5,
    cameraY : -5,
    cameraZ : 5,
    currentFunc : "None",
    moveLog : "",
    reversing : false
  };

  // For visual cube
  rotatePoint = (c1,c2,direction,p1,p2,rotation) =>{
    let theta = rotation*Math.PI/180;
    if(direction < 0) theta*=-1; 
    return { p1 : (Math.cos(theta) * (p1-c1) - Math.sin(theta) * (p2-c2) + c1),
             p2 :   (Math.sin(theta) * (p1-c1) + Math.cos(theta) * (p2-c2) + c2)}
  }

  // For memory cube
  rotatePoint2 = (c1,c2,direction,p1,p2) =>{
    let theta = Math.PI/2;
    if(direction < 0) theta*=-1; 
    return { p1 : (- Math.sin(theta) * (p2-c2) + c1),
             p2 :   (Math.sin(theta) * (p1-c1) + c2)}
  }

  // rotate colors on face
  rotateFace = (cubeFace,direction) => {

    let rubiksObject = this.state.rubiksObject;
    let degrees = 90;

    if(direction < 0)  degrees *=-1;

    // Side 0 (white center piece)
    if (cubeFace === 0){
        for(let i = 0; i <= 26; i++){

            // white side is y===0
            if (rubiksObject[i][7] === 0){

                // Rotate rubiksObject pieces to new location generated by rotatePoint2
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][6],rubiksObject[i][8]);
                rubiksObject[i][6] = newPoint.p1;
                rubiksObject[i][8] = newPoint.p2;

                // Unfortunately chunky
                // Swaps colors around on the face to match rotations
                if(direction === 0){
                    let tempFace = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][2];
                    rubiksObject[i][2] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][4];
                    rubiksObject[i][4] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][4];
                    rubiksObject[i][4] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][2];
                    rubiksObject[i][2] = tempFace;
                }
            }
        }
    }

    // Side 1 (blue center piece)
    if (cubeFace === 1){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][8] === 2){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][6],rubiksObject[i][7]);
                rubiksObject[i][6] = newPoint.p1;
                rubiksObject[i][7] = newPoint.p2;
                if(direction === 0){
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][2];
                    rubiksObject[i][2] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][4];
                    rubiksObject[i][4] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][4];
                    rubiksObject[i][4] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][2];
                    rubiksObject[i][2] = tempFace;
                }
            }
        }
    }
    
    // Side 2 (red center piece)
    if (cubeFace === 2){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][6] === 2){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][7],rubiksObject[i][8]);
                rubiksObject[i][7] = newPoint.p1;
                rubiksObject[i][8] = newPoint.p2;
                if(direction === 0){
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][1];
                    rubiksObject[i][1] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][5];
                    rubiksObject[i][5] = tempFace;
                }
            }
        }
    }
    
    // Side 3 (yellow center piece)
    if (cubeFace === 3){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][7] === 2){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][6],rubiksObject[i][8]);
                rubiksObject[i][6] = newPoint.p1;
                rubiksObject[i][8] = newPoint.p2;
                if(direction === -1){
                    let tempFace = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][4];
                    rubiksObject[i][4] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][2];
                    rubiksObject[i][2] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][2];
                    rubiksObject[i][2] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][4];
                    rubiksObject[i][4] = tempFace;
                }
            }
        }
    }

    // Side 4 (orange center piece)
    if (cubeFace === 4){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][6] === 0){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][7],rubiksObject[i][8]);
                rubiksObject[i][7] = newPoint.p1;
                rubiksObject[i][8] = newPoint.p2;
                if(direction === -1){
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][1];
                    rubiksObject[i][1] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][5];
                    rubiksObject[i][5] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][5];
                    rubiksObject[i][5] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][1];
                    rubiksObject[i][1] = tempFace;
                }
            }
        } 
    }

    // Side 5 (green center piece)
    if (cubeFace === 5){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][8] === 0){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][6],rubiksObject[i][7]);
                rubiksObject[i][6] = newPoint.p1;
                rubiksObject[i][7] = newPoint.p2;
                if(direction === -1){
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][4];
                    rubiksObject[i][4] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][2];
                    rubiksObject[i][2] = tempFace;
                } else {
                    let tempFace = rubiksObject[i][3];
                    rubiksObject[i][3] = rubiksObject[i][2];
                    rubiksObject[i][2] = rubiksObject[i][0];
                    rubiksObject[i][0] = rubiksObject[i][4];
                    rubiksObject[i][4] = tempFace;
                }
            }
        } 
    }

    this.setState({rubiksObject : rubiksObject}, () =>{

      let reloadCubes = this.reloadCubes;
      let rotationSpeed = this.state.rotationSpeed;
      let moveOn = this.moveOn;
      let scope = this;
      let canMove = this.state.canMove;

      // Necessary to keep rendering conflicts from happening
      setTimeout(function () {
        if(!canMove) scope.setState({currentFunc: "None"});
        reloadCubes();
        moveOn();
      }, rotationSpeed-5);
    });
    
  };

  decreaseSpeed = () => {
    if(this.state.rotationSpeed<1000)
      this.setState({rotationSpeed : this.state.rotationSpeed+50});
  }

  increaseSpeed = () => {
    if(this.state.rotationSpeed>150)
      this.setState({rotationSpeed : this.state.rotationSpeed-50});
  }

  rotateCamera = () => {
    //this.setState({cameraX : this.state.cameraX - 1});
    
  }

  // Control when rotation buttons can be clicked
  rzl = () => {
    if(this.state.canScramble && this.state.canMove) {
      this.setState({currentFunc: "F'"});
      this.rotateCubeFace(0,0);
    }
  }
  rzr = () => {
    if(this.state.canScramble && this.state.canMove) {
      this.setState({currentFunc: "F"});
      this.rotateCubeFace(0,-1);
    }
  }

  rol = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(1,0);}
  ror = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(1,-1);}

  rtwl = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(2,0);}
  rtwr = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(2,-1);}

  rthl = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(3,0);}
  rthr = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(3,-1);}

  rfol = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(4,0);}
  rfor = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(4,-1);}

  rfil = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(5,0);}
  rfir = () => {if(this.state.canScramble && this.state.canMove) this.rotateCubeFace(5,-1);}

  // Changes values in state to trigger face rotation
  rotateCubeFace = (face,direction) => {

    if(!this.state.reversing){
      console.log("adding move")
      let tempMove = "";
      if(face === 0) tempMove += "F";
      else if(face === 1) tempMove += "U";
      else if(face === 2) tempMove += "R";
      else if(face === 3) tempMove += "B";
      else if(face === 4) tempMove += "L";
      else if(face === 5) tempMove += "D";
      if(direction === -1) tempMove += "'";
      if(this.state.moveLog.length > 0)
        this.setState({moveLog : this.state.moveLog + " " + tempMove});
      else
        this.setState({moveLog : this.state.moveLog + tempMove});
    }

    if(this.state.canScramble) this.moveOff();

    // Faces on opposite side of cube rotate backwards
    if(face>2 && direction === -1) direction = 0;

    else if (face>2 && direction === 0) direction = -1;

    // change state so animate function kicks in
    this.setState({face : face, turnDirection : direction, end : this.state.end + 90}, () =>{
      this.rotateFace(face,direction);
    });
  }

  scrambleOn = () => {
    this.setState({canScramble : true});
  }

  scrambleOff = () => {
    this.setState({canScramble : false});
  }

  moveOn = () => {
    this.setState({canMove : true});
  }

  moveOff = () => {
    this.setState({canMove : false});
  }

  // Slows the scramble function down to keep from breaking the cube
  timingScramble = iteration => {

    // put variables in scope of setTimeout
    let rotateCubeFace = this.rotateCubeFace;
    let timingScramble = this.timingScramble;
    let scrambleOn = this.scrambleOn;
    let rotationSpeed = this.state.rotationSpeed;
    let scope = this;
    // use recursion with a timeout to prevent turns from overlapping
    if(iteration>0)
      setTimeout(function () {
        let randFace = Math.floor((Math.random() * 6));
        let randTurn = Math.floor((Math.random() * 2)-1);
        
        rotateCubeFace(randFace, randTurn);
        timingScramble(iteration-1);
      }, rotationSpeed);

    else {
      setTimeout(function () {
        console.log("Scramble finished");
        console.log(rotationSpeed);
        scope.setState({currentFunc: "None"});
        scrambleOn();
      }, rotationSpeed);
    }
  }

  // Slows the solve function down to keep from breaking the cube
  timingSolve = (arr, length, start) => {
    // necessary to define myArr and myArgObj here to be in scope for setTimeout
    let myArr = arr;
    //let myArgObj = argArr;
    console.log(arr);
    //console.log(myArgObj[start]);
    console.log(start);
    console.log(length)
    let len = length;
    let str = start;
    let timingSolve = this.timingSolve;
    setTimeout(function () {
      //if(myArgObj[str] !== [-9,-9]) myArr[str](myArgObj[str][0],myArgObj[str][1]);
      myArr[str]();
      if(str < len-1) {
        timingSolve(myArr,len,str+1);
      }
    }, 500);
  }

  // Converts move string to move array
  moveStringToArray = str => {
    let tempArray = str.split(" ");
    let moveArray = [];

    // Run through split string and create duplicates where needed
    for(let i = 0; i < tempArray.length;i++){
      if(tempArray[i].length === 2 && tempArray[i].slice(1,2)==="2") {
        let tempMove = tempArray[i].slice(0,1);
        moveArray.push(tempMove);
        moveArray.push(tempMove);
      }
      else {
        moveArray.push(tempArray[i]);
      }
    }
    return moveArray;
  }

  // Algorithm for Checkerboard
  checkerBoard = () => {
    let moveString = "U2 D2 R2 L2 F2 B2";
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Checkerboard"});

    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Algorithm for Checkerboard1
  checkerBoard1 = () => {
    let moveString = "U' R2 L2 F2 B2 U' R L F B' U F2 D2 R2 L2 F2 U2 F2 U' F2";
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Checkboard1"});
  
    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Algorithm for Cube in a cube in a cube
  cubeInACube = () => {
    let moveString = "U' L' U' F' R2 B' R F U B2 U B' L U' F U R F'"
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Cube x3"});

    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Algorithm for Cube in a cube
  cubeIn = () => {
    let moveString = "F L F U' R U F2 L2 U' L' B D' B' L2 U";
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Cube x2"});

    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Algorithm for isolating middles
  sixSpots = () => {
    let moveString = "U D' R L' F B' U D'"
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Six Spots"});

    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Algorithm for coss
  cross = () => {
    /*let scope = this;
    if(this.state.moveLog.length) {
      let rotations = this.reverseMoves()+2;
      setTimeout(function () {
        scope.cross();
      }, scope.state.rotationSpeed*rotations);
      return;
    }*/
    
    let moveString = "R2 L' D F2 R' D' R' L U' D R D B2 R' U D2";
    //this.setState({moveLog : moveString});
    const moveArray = this.moveStringToArray(moveString);
    this.setState({currentFunc : "Cross"});

    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
    }
  }

  // Generalized time move function. Takes in move array and creates small delay between moves
  moveSetTimed = (moveArray,length, start) =>{

    // Breaks at faster speeds
    if(this.state.rotationSpeed < 200)
      this.setState({rotationSpeed: 200});

    if(start === 0)
      this.setState({canScramble : false});

    let tempFace = 0;
    let tempDirection = -1;
    if(start <= length){
      if(moveArray[start].length === 2) tempDirection=0;
      
      if(moveArray[start].slice(0,1) === "U") tempFace = 1;
      else if(moveArray[start].slice(0,1) === "F") tempFace = 0;
      else if(moveArray[start].slice(0,1) === "B") tempFace = 3;
      else if(moveArray[start].slice(0,1) === "R") tempFace = 2;
      else if(moveArray[start].slice(0,1) === "L") tempFace = 4;
      else if(moveArray[start].slice(0,1) === "D") tempFace = 5;
    }

    let rotateCubeFace = this.rotateCubeFace;
    let moveSetTimed = this.moveSetTimed;
    let scope = this;
    setTimeout(function () {
      if(start===length+2) {
        scope.setState({reversing : false});
        return;
      }
      if(start <= length) {
        rotateCubeFace(tempFace,tempDirection);
      }
      start = start + 1;
      moveSetTimed(moveArray,length,start);
    }, this.state.rotationSpeed);
    if(start === length+1) {
      this.setState({currentFunc : "None"});
      this.setState({canScramble : true});
      
    }
  }

  // Scrambles the cube
  scramble = () => {
    if(this.state.canScramble){
      this.setState({currentFunc : "Scrambling"});
      this.setState({canScramble : false});
      this.timingScramble(25);
    }
  }



  reverseMoves = () => {
    if(this.state.reversing===true || !this.state.canScramble) return;
    
    console.log(this.state.moveLog);
    if(!this.state.moveLog.length) return;
    this.setState({reversing : true});
    let moveString = this.state.moveLog;
    this.setState({moveLog : ""});
    this.setState({currentFunc : "Reverse Moves"});

    const tempArray = this.moveStringToArray(moveString);
    const moveArray = [];
    for(let i = tempArray.length-1; i >= 0; i--){
      moveArray.push(tempArray[i]);
    }
    
    if(this.state.canScramble){
      this.moveSetTimed(moveArray,moveArray.length-1,0);
      
    }
    
    return moveArray.length;
  }

  // Refreshes page to reset cube
  reset = () => {
    window.location.reload();
  }

  // Incase of rendering conflicts, reload cube color positions
  reloadCubes = () => {
    let cubes = [...this.state.cubes];
    for(let i = 0; i<27;i++){
      let cube = {...cubes[i]};
      cube.material[0].color = new THREE.Color(this.state.rubiksObject[i][2]);
      cube.material[1].color = new THREE.Color(this.state.rubiksObject[i][4]);
      cube.material[2].color = new THREE.Color(this.state.rubiksObject[i][3]);
      cube.material[3].color = new THREE.Color(this.state.rubiksObject[i][0]);
      cube.material[4].color = new THREE.Color(this.state.rubiksObject[i][1]);
      cube.material[5].color = new THREE.Color(this.state.rubiksObject[i][5]);
      cube.rotation.x = 0; cube.rotation.y = 0; cube.rotation.z = 0;
      cubes[i] = cube;
    }
    this.setState({cubes});
  }

  // Primitive function for beginning solve steps
  // Research ways to map out possible moves to find a good move
  solveWhiteCross = () => {
    if(!this.state.canScramble) return;
    let moveArray = [];
    let argArr = [];
    let solved = 0;
    /*for(let i = 0; i < 27; i++){
      if(this.state.rubiksObject[i].includes("white")){
        let emptyCount = 0;
        let whiteSide = -1;
        let otherSide = -1;
        for(let j = 0; j < 6; j++){
          if (this.state.rubiksObject[i][j] === "black") emptyCount++;
          else {
            if(this.state.rubiksObject[i][j] === "white") whiteSide = j;
            else otherSide = j;
          }
        }

        // If edge piece
        if(emptyCount === 4) {
          // Y coord is 0
          if(this.state.rubiksObject[i][7] === 0){
            console.log(this.state.rubiksObject[i]);
            // Check if white side is on white face
            if(whiteSide === 0){
              if(i === 1){
                if(this.state.rubiksObject[i][6] === 0){
                  argArr.push([-9,-9]);
                  moveArray.push(rotationArray[1]);
                }
                else if (this.state.rubiksObject[i][8] === 0){
                  argArr.push([-9,-9],[-9,-9]);
                  moveArray.push(rotationArray[1],rotationArray[1]);
                }
                else if (this.state.rubiksObject[i][6] === 2){
                  argArr.push([-9,-9]);
                  moveArray.push(rotationArray[0]);
                }
              }
            }
            // 
            else {
              if(i === 1){
                //if(whiteSide===1);
                  //
                  // 
                  // Make generalized rotateFace function to take a face and a direction.
                  // May need to check that face rotation matches direction. Set value
                  // in state for counterClockwise and clockwise.
                  //
                  // 
                  argArr.push([whiteSide,0]);
                  moveArray.push(this.rotateCubeFace);
                  //i=0;
                  //
              }
            }
          }
          else if(this.state.rubiksObject[i][7] === 1){
            if(((whiteSide === 1 && otherSide === 4) ||
               (whiteSide === 2 && otherSide === 1) ||
               (whiteSide === 5 && otherSide === 2) ||
               (whiteSide === 4 && otherSide === 5 )) && i === 1){
                argArr.push([otherSide,-1]);
                moveArray.push(this.rotateCubeFace);
                //this.timingSolve(moveArray,argArr,moveArray.length,0);
                //moveArray = [];
                //argArr = [];
                //i--;
              }
             
          }
        }
      }
    }*/
    if(moveArray.length) this.timingSolve(moveArray,moveArray.length,0);
  }

  // Initialization and animation functions
  componentDidMount() {
    
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
    camera.lookAt(new THREE.Vector3(-1,0,0));
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight-10);
    document.body.appendChild( renderer.domElement );

    let tempCubes = [];

    // generate cubes with colors based off rubiksObject
    for(let i = 0; i <=26; i++){
      var geometry = new THREE.BoxGeometry( .95, .95, .95 );
      var cubeMaterials = [ 
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][2], opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][4], opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][3], opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][0], opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][1], opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:this.state.rubiksObject[i][5], opacity:0.8, side: THREE.DoubleSide}), 
      ]; 
      var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    
      tempCubes[i] = new THREE.Mesh(geometry, cubeMaterial);
      tempCubes[i].translateX(this.state.rubiksObject[i][6]/* + this.state.rubiksObject[i][6]/10*/);
      tempCubes[i].translateY(this.state.rubiksObject[i][7]/* + this.state.rubiksObject[i][7]/10)*/);
      tempCubes[i].translateZ(this.state.rubiksObject[i][8]/* + this.state.rubiksObject[i][8]/10)*/); 
    }

    // add cubes to state and then render
    this.setState({cubes : tempCubes}, () => {
      for(let i = 0; i <=26; i++){
        scene.add( this.state.cubes[i] );
        let geo = new THREE.EdgesGeometry(this.state.cubes[i].geometry);
        let mat = new THREE.LineBasicMaterial({
          color : 0x000000, linewidth: 1
        });
        let wireframe = new THREE.LineSegments(geo,mat);
        wireframe.renderOrder = 1;
        this.state.cubes[i].add(wireframe);
        
      }
      renderer.render( scene, camera );
      animate();
    });

    let rotate = this.rotatePoint;
    
    // Function runs continuously to animate cube
    var animate = () => {

      camera.position.z = this.state.cameraZ;
      camera.position.y = this.state.cameraY;
      camera.position.x = this.state.cameraX;
      camera.lookAt(new THREE.Vector3( 1, 1, 1 ));

      // state variables asigned for shorter names
      let cubes = this.state.cubes;
      requestAnimationFrame( animate );
      let turnDirection = this.state.turnDirection;
      let speed = this.state.speed;
      let start = this.state.start;
      let face = this.state.face;
      //let randomize = this.state.randomize;
      
      if(start<=this.state.end){

        this.setState({start : start+speed});

        //Rotate white center piece Face
        if(face === 0){
          for(let i = 0; i<27;i++){
            if(cubes[i].position.y === 0){
              
              // Turn piece based on rotation direction
              if(turnDirection<0)
                cubes[i].rotation.y += .1745*speed/10;
              else
                cubes[i].rotation.y -= .1745*speed/10;

              // Calculate circular movement
              let newPoint = rotate(1,1,turnDirection,cubes[i].position.x,cubes[i].position.z,10*speed/10);

              // corrects rounding errors
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }
              
              // set new locations for face 0
              cubes[i].position.x = newPoint.p1;
              cubes[i].position.z = newPoint.p2;
            }
          }     
        }

        //Rotate blue Face
        if(face === 1){
          for(let i = 0; i<27;i++){
            if(cubes[i].position.z === 2){

              if(turnDirection<0)
                cubes[i].rotation.z -= .1745*speed/10;
              else 
                cubes[i].rotation.z += .1745*speed/10;

              let newPoint = rotate(1,1,turnDirection,cubes[i].position.x,cubes[i].position.y,10*speed/10);
              
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }

              cubes[i].position.x = newPoint.p1;
              cubes[i].position.y = newPoint.p2;
            }
          }
        }

        // red
        if(face === 2){
          for(let i = 0; i<27;i++){
            if(tempCubes[i].position.x === 2){

              if(turnDirection<0)
                tempCubes[i].rotation.x -= .1745*speed/10;
              else 
                tempCubes[i].rotation.x += .1745*speed/10;

              let newPoint = rotate(1,1,turnDirection,tempCubes[i].position.y,tempCubes[i].position.z,10*speed/10);
              
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }

              tempCubes[i].position.y = newPoint.p1;
              tempCubes[i].position.z = newPoint.p2;
            }
          }
        }

        // yellow
        if(face === 3){
          for(let i = 0; i<27;i++){
            if(tempCubes[i].position.y === 2){

              if(turnDirection<0)
                tempCubes[i].rotation.y += .1745*speed/10;
              else 
                tempCubes[i].rotation.y -= .1745*speed/10;

              let newPoint = rotate(1,1,turnDirection,tempCubes[i].position.x,tempCubes[i].position.z,10*speed/10);
              
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }

              tempCubes[i].position.x = newPoint.p1;
              tempCubes[i].position.z = newPoint.p2;
            }
          }
        }

        // orange
        if(face === 4){
          for(let i = 0; i<27;i++){
            if(tempCubes[i].position.x === 0){

              if(turnDirection<0)
                tempCubes[i].rotation.x -= .1745*speed/10;
              else 
                tempCubes[i].rotation.x += .1745*speed/10;

              let newPoint = rotate(1,1,turnDirection,tempCubes[i].position.y,tempCubes[i].position.z,10*speed/10);
              
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }

              tempCubes[i].position.y = newPoint.p1;
              tempCubes[i].position.z = newPoint.p2;
            }
          }
        }

        // green
        if(face === 5){
          for(let i = 0; i<27;i++){
            if(tempCubes[i].position.z === 0){

              if(turnDirection<0)
                tempCubes[i].rotation.z -= .1745*speed/10;
              else 
                tempCubes[i].rotation.z += .1745*speed/10;

              let newPoint = rotate(1,1,turnDirection,tempCubes[i].position.x,tempCubes[i].position.y,10*speed/10);
              
              if(start % 90 === 0){
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
              }

              tempCubes[i].position.x = newPoint.p1;
              tempCubes[i].position.y = newPoint.p2;
            }
          }
        } 
      }
      renderer.render( scene, camera );     
    };
  }

  
  // Renders html to the index.html page
  render() {
    return (
      <div className="App" >
        <Navbar
        title="Rubik's Cube"
        />
        <p style={{position:"fixed", top: "75px", left: "10px",color: "white"}}>Speed: {this.state.rotationSpeed}</p>
        <p style={{position:"fixed", top: "75px", right: "10px",color: "white"}}>Current Function: {this.state.currentFunc}</p>

        {/* Top Left */}
        <button onClick={this.increaseSpeed} style={{position:"fixed", top: "100px", left: "10px",backgroundColor: "white"}}>+ Speed</button>
        <button onClick={this.decreaseSpeed} style={{position:"fixed", top: "130px", left: "10px",backgroundColor: "white"}}>- Speed</button>
        <button onClick={this.rotateCamera} style={{position:"fixed", top: "160px", left: "10px",backgroundColor: "white"}}>Rotate X</button>

        {/* Bottom Left */}
        <button onClick={this.cross} style={{position:"fixed", bottom: "160px", left: "10px",backgroundColor: "white"}}>Cross</button>
        <button onClick={this.checkerBoard} style={{position:"fixed", bottom: "130px", left: "10px",backgroundColor: "white"}}>Checkerboard</button>
        <button onClick={this.checkerBoard1} style={{position:"fixed", bottom: "100px", left: "10px",backgroundColor: "white"}}>Checkerboard1</button>
        <button onClick={this.cubeIn} style={{position:"fixed", bottom: "70px", left: "10px",backgroundColor: "white"}}>Cube x2</button>
        <button onClick={this.cubeInACube} style={{position:"fixed", bottom: "40px", left: "10px",backgroundColor: "white"}}>Cube x3</button>
        <button onClick={this.sixSpots} style={{position:"fixed", bottom: "10px", left: "10px",backgroundColor: "white"}}>Six Spots</button>
        
        {/* Top Right */}
        <button onClick={this.rzl} style={{position:"fixed", top: "100px", right: "50px",backgroundColor: "white"}}>F'</button>
        <button onClick={this.rzr} style={{position:"fixed", top: "100px", right: "10px",backgroundColor: "white"}}>F</button>
        <button onClick={this.rol} style={{position:"fixed", top: "140px", right: "50px",backgroundColor: "blue",color: "white"}}>U'</button>
        <button onClick={this.ror} style={{position:"fixed", top: "140px", right: "10px",backgroundColor: "blue",color: "white"}}>U</button>
        <button onClick={this.rtwl} style={{position:"fixed", top: "180px", right: "50px",backgroundColor: "red",color: "white"}}>R'</button>
        <button onClick={this.rtwr} style={{position:"fixed", top: "180px", right: "10px",backgroundColor: "red",color: "white"}}>R</button>
        <button onClick={this.rthl} style={{position:"fixed", top: "220px", right: "50px",backgroundColor: "yellow"}}>B'</button>
        <button onClick={this.rthr} style={{position:"fixed", top: "220px", right: "10px",backgroundColor: "yellow"}}>B</button>
        <button onClick={this.rfol} style={{position:"fixed", top: "260px", right: "50px",backgroundColor: "orange"}}>L'</button> 
        <button onClick={this.rfor} style={{position:"fixed", top: "260px", right: "10px",backgroundColor: "orange"}}>L</button>
        <button onClick={this.rfil} style={{position:"fixed", top: "300px", right: "50px",backgroundColor: "green",color: "white"}}>D'</button> 
        <button onClick={this.rfir} style={{position:"fixed", top: "300px", right: "10px",backgroundColor: "green",color: "white"}}>D</button>

        {/* Bottom Right */}
        <button onClick={this.scramble} style={{position:"fixed", bottom: "70px", right: "10px",backgroundColor: "white"}}>SCRAMBLE</button>
        <button onClick={this.reverseMoves} style={{position:"fixed", bottom: "40px", right: "10px",backgroundColor: "white"}}>Reverse Moves</button>
        <button onClick={this.reset} style={{position:"fixed", bottom: "10px", right: "10px",backgroundColor: "white"}}>RESET</button>
      
      </div>
      
    );
  }
}

export default App;