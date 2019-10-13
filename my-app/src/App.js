import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container";
//import Row from "./components/Row";
//import Column from "./components/Column";
import Images from "./images.json";
//import Card from "./components/Card";
import * as THREE from "three";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    cubes : [],
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
    ],
    speed : 10,
    randomize : false,
    start : 10,
    end : 0,
    turnDirection : 0,
    face : 0,
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

  rotateFace = (cubeFace,direction) => {
    //this.reloadCubes();
    let rubiksObject = this.state.rubiksObject;
    let degrees = 90;
    if(direction < 0)  degrees *=-1;

    // Side 0 (white center piece)
    if (cubeFace === 0){
        for(let i = 0; i <= 26; i++){
            if (rubiksObject[i][7] === 0){
                let newPoint = this.rotatePoint2(1,1,degrees,rubiksObject[i][6],rubiksObject[i][8]);
                rubiksObject[i][6] = newPoint.p1;
                rubiksObject[i][8] = newPoint.p2;
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
        //this.reloadCubes(); 
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
        //this.reloadCubes();
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
        //this.reloadCubes();
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
        //this.reloadCubes();
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
        //this.reloadCubes();
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
        //this.reloadCubes();
    }
    this.setState({rubiksObject : rubiksObject}, () =>{
      this.reloadCubes();
    });
    
};

  increaseSpeed = () => {
    this.setState({speed : this.state.speed+1});
  }
  decreaseSpeed = () => {
    if(this.state.speed>1)
      this.setState({speed : this.state.speed-1});
  }

  rotateZeroLeft = () => {
    this.setState({face : 0, turnDirection : 0, end : this.state.end + 90}, () => {
      this.rotateFace(0,0);
    });
  }

  rotateZeroRight = () => {
    this.setState({face : 0, turnDirection : -1, end : this.state.end + 90}, () => {
      this.rotateFace(0,-1);
    });
    
  }

  rotateOneLeft = () => {
    this.setState({face : 1, turnDirection : 0, end : this.state.end + 90});
    this.rotateFace(1,0);
  }

  rotateOneRight = () => {
    this.setState({face : 1, turnDirection : -1, end : this.state.end + 90});
    this.rotateFace(1,-1);
    
  }

  rotateTwoLeft = () => {
    this.setState({face : 2, turnDirection : 0, end : this.state.end + 90});
    this.rotateFace(2,0);
    //this.rotateOneRight();
   // this.rotateOneLeft();
  }

  rotateTwoRight = () => {
    this.setState({face : 2, turnDirection : -1, end : this.state.end + 90});
    this.rotateFace(2,-1);
    //this.rotateOneRight();
    //this.rotateOneLeft();
  }

  rotateThreeLeft = () => {
    this.setState({face : 3, turnDirection : 0, end : this.state.end + 90});
    this.rotateFace(3,0);
  }

  rotateThreeRight = () => {
    this.setState({face : 3, turnDirection : -1, end : this.state.end + 90});
    this.rotateFace(3,-1);
  }

  rotateFourLeft = () => {
    this.setState({face : 4, turnDirection : 0, end : this.state.end + 90});
    this.rotateFace(4,0);
  }

  rotateFourRight = () => {
    this.setState({face : 4, turnDirection : -1, end : this.state.end + 90});
    this.rotateFace(4,-1);
  }

  rotateFiveLeft = () => {
    this.setState({face : 5, turnDirection : 0, end : this.state.end + 90});
    this.rotateFace(5,0);
  }

  rotateFiveRight = () => {
    this.setState({face : 5, turnDirection : -1, end : this.state.end + 90});
    this.rotateFace(5,-1);
  }

  rotationArray = [
    this.rotateZeroLeft,
    this.rotateZeroRight,
    this.rotateOneLeft,
    this.rotateOneRight,
    this.rotateTwoLeft,
    this.rotateTwoRight,
    this.rotateThreeLeft,
    this.rotateThreeRight,
    this.rotateFourLeft,
    this.rotateFourRight,
    this.rotateFiveLeft,
    this.rotateFiveRight
  ];

  rotate = (face,direction) => {
    this.setState({face : face, turnDirection : direction, end : this.state.end + 90}, () =>{
      this.rotateFace(face,direction);
    });
  }

  scramble = () => {
    //for(let i = 0; i<25;i++){
      //let temp;
      //setTimeout(function(){
        this.rotationArray[Math.floor((Math.random() * 12))]();
        //temp();
    //}, 2000);
    //}
  }

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

  logPiece = () => {
    console.log(this.state.rubiksObject[8]);
    console.log(this.state.cubes[8]);
  }

  componentDidMount() {
    
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, .1, 1000 );
    //camera.zoom *= .1;
    //camera.updateProjectionMatrix();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let tempCubes = [];
    for(let i = 0; i <=26; i++){
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
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

    this.setState({cubes : tempCubes}, () => {
      for(let i = 0; i <=26; i++){
        scene.add( this.state.cubes[i] );
      }
      renderer.render( scene, camera );
      animate();
    });

    camera.position.z = 10;
    camera.position.y = -5;
    camera.position.x = -5;
    
    var rotate = this.rotatePoint;
    
    //let face = 0;
    var animate = () => {
      //this.reloadCubes();
      let cubes = this.state.cubes;
      //console.log(cubes);
      requestAnimationFrame( animate );
      let turnDirection = this.state.turnDirection;
      let speed = this.state.speed;
      let start = this.state.start;
      let face = this.state.face;
      let randomize = this.state.randomize;
      //console.log(this.state.end);
      //let tempCubes = this.state;
      
      if(start<=this.state.end){

        //console.log(turnDirection);
        //console.log(this.state.end);
        this.setState({start : start+speed});
        //if (start === 100) face = 2;

        /*if(randomize === true && (start)%90===0){
          face = Math.floor((Math.random() * 2));
          turnDirection = Math.floor((Math.random() * 2)) -1;
        }*/

        //Rotate white center piece Face

        if(face === 0){
          for(let i = 0; i<27;i++){
            if(cubes[i].position.y === 0){
              //console.log(cubes[i].rotation)
              // Turn piece based on rotation direction
              /*if(turnDirection<0)
                cubes[i].rotation.y += .1745*speed/10;
              else
                cubes[i].rotation.y -= .1745*speed/10;*/

              // Calculate circular movement
              let newPoint = rotate(1,1,turnDirection,cubes[i].position.x,cubes[i].position.z,10*speed/10);

              // fix rounding errors
              if(start % 90 === 0){
                //console.log(cubes[i].rotation.y);
                //console.log(start);
                //tempCubes[i].rotation.y = Math.abs(tempCubes[i].rotation.y.toFixed(4));
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
               
                //this.reloadCubes();
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

              /*if(turnDirection<0)
                cubes[i].rotation.z -= .1745*speed/10;
              else 
                cubes[i].rotation.z += .1745*speed/10;*/

              let newPoint = rotate(1,1,turnDirection,cubes[i].position.x,cubes[i].position.y,10*speed/10);
              
              if(start % 90 === 0){
                //console.log(tempCubes[i].rotation.z)
                newPoint.p1 = Math.round(newPoint.p1);
                newPoint.p2 = Math.round(newPoint.p2);
                /*while(scene.children.length > 0){ 
                  scene.remove(scene.children[0]); 
                }*/
                //this.reloadCubes();
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

              /*if(turnDirection<0)
                tempCubes[i].rotation.x -= .1745*speed/10;
              else 
                tempCubes[i].rotation.x += .1745*speed/10;*/

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

              /*if(turnDirection<0)
                tempCubes[i].rotation.y += .1745*speed/10;
              else 
                tempCubes[i].rotation.y -= .1745*speed/10;*/

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

              /*if(turnDirection<0)
                tempCubes[i].rotation.x -= .1745*speed/10;
              else 
                tempCubes[i].rotation.x += .1745*speed/10;*/

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

              /*if(turnDirection<0)
                tempCubes[i].rotation.z -= .1745*speed/10;
              else 
                tempCubes[i].rotation.z += .1745*speed/10;*/

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

        if(randomize === true && (start)%90===0){
          this.setState({face: Math.floor((Math.random() * 2))});
          //turnDirection = Math.floor((Math.random() * 2)) -1;
        }

        
      }
      
      //else this.setState({randomize : false});

      renderer.render( scene, camera );
      
    };
    //renderer.render( scene, camera );
    //animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  // Renders html to the index.html page
  render() {
    return (
      <div className="App">
        <Navbar
        title="Rubik's Cube"
        />
        <Container></Container>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={this.rotateZeroLeft}>Rotate 0 (white middle) left</button> <button onClick={this.rotateZeroRight}>Rotate 0 right</button>
        <br></br>
        <button onClick={this.rotateOneLeft}>Rotate 1 (blue middle) left</button> <button onClick={this.rotateOneRight}>Rotate 1 right</button>
        <br></br>
        <button onClick={this.rotateTwoLeft}>Rotate 2 (red middle) left</button> <button onClick={this.rotateTwoRight}>Rotate 2 right</button>
        <br></br>
        <button onClick={this.rotateThreeLeft}>Rotate 3 (yellow middle) left</button> <button onClick={this.rotateThreeRight}>Rotate 3 right</button>
        <br></br>
        <button onClick={this.rotateFourLeft}>Rotate 4 (orange middle) left</button> <button onClick={this.rotateFourRight}>Rotate 4 right</button>
        <br></br>
        <button onClick={this.rotateFiveLeft}>Rotate 5 (green middle) left</button> <button onClick={this.rotateFiveRight}>Rotate 5 right</button>
        <br></br>
        <button onClick={this.scramble}>SCRAMBLE</button>
      </div>
    );
  }
}

export default App;