import * as THREE from "three";

// Functions to generate/manipulate cube
const cube = {
    // Generates the inital solved state of rubiksObject
    generateSolved : function (_x,_y,_z){
        const size = _z;
        const half = Math.floor(size/2);
        const tempArr = [];
        const middles = [];
        const edges = [];
        const corners = [];
        const tempMiddles = [
          [], // white
          [], // yellow
          [], // blue
          [], // green
          [], // orange
          []  // red
        ];
        const tempEdges = [
          [[],[],[],[]], // white edges
          [[],[],[],[]], // middle edges
          [[],[],[],[]]
        ]
    
        for(let j = 0; j < _y; j++){      // Move back along the y-axis
          for(let k = _z-1; k >= 0; k--){ // Move down through the z-axis
            for(let i = 0; i < _x; i++){  // Traverse across the x-axis
              let side0 = "black";
              let side1 = "black";
              let side2 = "black";
              let side3 = "black";
              let side4 = "black";
              let side5 = "black";
              let edgeType = null;
              let middleType = null;
              if(i===_x-1) side2 = "red";
              else if (i===0) side4 ="orange";
              if(j===_y-1) side3 = "yellow";
              else if (j===0) side0 ="white";
              if(k===_z-1) side1 = "blue";
              else if (k===0) side5 ="green";
              let tempCount = 0;
              if(j===0 || j === _y-1) tempCount++;
              if(k===0 || k === _z-1) tempCount++;
              if(i===0 || i === _x-1) tempCount ++;
              let tempType = "none";
    
              if(tempCount===1) {
                tempType = "middle";
                if(size%2){
                  if((j===half&&k===half)||
                     (j===half&&i===half)||
                     (i===half&&k===half)){
                    middleType="center"
                  }
                }
                if(j===0) {tempMiddles[0].push(tempArr.length);middleType=tempMiddles[0].length+1}
                if(j===_y-1) {tempMiddles[1].push(tempArr.length);middleType=tempMiddles[1].length+1}
                if(k===_z-1) {tempMiddles[2].push(tempArr.length);middleType=tempMiddles[2].length+1}
                if(i===0) {tempMiddles[3].push(tempArr.length);middleType=tempMiddles[3].length+1}
                if(k===0) {tempMiddles[4].push(tempArr.length);middleType=tempMiddles[4].length+1}
                if(i===_x-1) {tempMiddles[5].push(tempArr.length);middleType=tempMiddles[5].length+1}
              }
    
              else if(tempCount===2) {
                // do stuff in here to populate edges
                tempType = "edge";
                if(j === 0){
                  if(k===_z-1){
                    if(_x%2&&tempEdges[0][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(_x%2&&tempEdges[0][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(_x%2&&tempEdges[0][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(_x%2&&tempEdges[0][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][3].push(tempArr.length);
                  }
                } else if(j === _y-1){
                  if(k===_z-1){
                    if(_x%2&&tempEdges[1][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(_x%2&&tempEdges[1][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(_x%2&&tempEdges[1][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(_x%2&&tempEdges[1][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][3].push(tempArr.length);
                  }
                } else {
                  if(k===_z-1 && i===0){
                    if(_x%2&&tempEdges[2][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][0].push(tempArr.length);
                  }
                  else if(k===_z-1 && i===_x-1){
                    if(_x%2&&tempEdges[2][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][1].push(tempArr.length);
                  }
                  else if(k===0 && i===_x-1){
                    if(_x%2&&tempEdges[2][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][2].push(tempArr.length);
                  }
                  else if(k===0 && i===0){
                    if(_x%2&&tempEdges[2][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][3].push(tempArr.length);
                  }
                }
              }
              else if(tempCount===3) {
                tempType = "corner";
                corners.push(tempArr.length);
              }
    
              tempArr.push([side0,side1,side2,side3,side4,side5, // piece colors
                            i,j,k, // Current position x,y,z
                            i,j,k, // Solved position x,y,z
                            tempType,
                            edgeType,
                            middleType
                          ]);
            }
          }
        }

        // for(let i = 0; i < size-2; i++){
        //   let row = [];
        //   for(let j = 0; j < size-2; j++){
        //     row.push(tempMiddles[3][i*(size-2)+j])
        //   }
        //   console.log(row);
        // }
        // Restructure last 3 middles for cubes 6x6 and greater
        if(size >= 6){
          let middleEdgeLength = size-2-1;
          // loop through last 3 middles
          for(let k = 3; k < 6; k++){
            let middleCorners = [];
            let middleRestructure = [];
            let middleIndex = 0;

            // generate empty arrays for each ring layer in middle
            for(let i = 0; i < (half-1); i++) {
              middleRestructure.push([]);
            }
            
            // loop through each empty layer and populate
            middleRestructure.forEach((layer,index) =>{
              // treat 1d array as 2d matrix
              for(let i = 0; i<= middleEdgeLength; i++){
                for (let j = 0; j<= middleEdgeLength; j++){
                  if((i===index||middleEdgeLength-i===index)
                  &&(j>=index&&j<=middleEdgeLength-index)
                  ){
                    // pushes top row of ring
                    ((j===0+index||j===middleEdgeLength-index)&&
                      ((j<Math.ceil(middleEdgeLength/2)-1)||
                      (j>Math.ceil(middleEdgeLength/2)+(size%2?1:0))))?
                    middleCorners.push(tempMiddles[k][middleIndex]):
                    layer.push(tempMiddles[k][middleIndex]);
                  }
                  else if((i>index&&middleEdgeLength-i>index)
                  &&(j===index||j===middleEdgeLength-index)
                  ){
                    // pushes sides of ring
                    layer.push(tempMiddles[k][middleIndex]);
                  }
                  else if(index===half-2&&i===j&&i===middleEdgeLength/2){
                    // pushes last middle into center ring
                    layer.push(tempMiddles[k][middleIndex]);
                  }
                  middleIndex+=1;
                }
              }
              middleIndex=0;
            });
            let temp = middleRestructure[middleRestructure.length-1];
            middleRestructure[middleRestructure.length-1]=middleCorners;
            middleRestructure.push(temp);
            middleRestructure.reverse();
            //console.log(middleRestructure.flat(2));
            tempMiddles[k] = middleRestructure.flat(2);
          }
        }

        
        for(let i = 0; i < 6; i++){
          for(let j = 0; j < (_x-2)*(_x-2); j++){
            middles.push(tempMiddles[i][j]);
          }
        }

        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 4; j++){
            edges.push(...tempEdges[i][j]);
          }
        }
        return {tempArr,middles,edges,corners};
    },

    generateBlank : function (_x,_y,_z){
      const size = _x;
      const half = Math.floor(size/2);
      const tempArr = [];
      // const middles = [];
      // const edges = [];
      const corners = [];
      const tempMiddles = [
        [], // white
        [], // yellow
        [], // blue
        [], // green
        [], // orange
        []  // red
      ];
      const tempEdges = [
        [[],[],[],[]], // white edges
        [[],[],[],[]], // middle edges
        [[],[],[],[]]
      ]
  
      for(let j = 0; j < _y; j++){      // Move back along the y-axis
        for(let k = _z-1; k >= 0; k--){ // Move down through the z-axis
          for(let i = 0; i < _x; i++){  // Traverse across the x-axis
            let side0 = "black";
            let side1 = "black";
            let side2 = "black";
            let side3 = "black";
            let side4 = "black";
            let side5 = "black";
            let edgeType = null;
            let middleType = null;
              // if(i===_x-1) side2 = "white";
              // else if (i===0) side4 ="white";
              // if(j===_y-1) side3 = "white";
              // else if (j===0) side0 ="white";
              // if(k===_z-1) side1 = "white";
              // else if (k===0) side5 ="white";
              if(i===_x-1) side2 = "red";
              else if (i===0) side4 ="orange";
              if(j===_y-1) side3 = "yellow";
              else if (j===0) side0 ="white";
              if(k===_z-1) side1 = "blue";
              else if (k===0) side5 ="green";
              let tempCount = 0;
              if(j===0 || j === _y-1) tempCount++;
              if(k===0 || k === _z-1) tempCount++;
              if(i===0 || i === _x-1) tempCount ++;
              let tempType = "none";
    
              if(tempCount===1) {
                tempType = "middle";
                if(size%2){
                  if((j===half&&k===half)||
                     (j===half&&i===half)||
                     (i===half&&k===half)){
                    middleType="center"
                  }
                }
                if(j===0) {tempMiddles[0].push(tempArr.length);middleType=tempMiddles[0].length+1}
                if(j===_y-1) {tempMiddles[1].push(tempArr.length);middleType=tempMiddles[1].length+1}
                if(k===_z-1) {tempMiddles[2].push(tempArr.length);middleType=tempMiddles[2].length+1}
                if(i===0) {tempMiddles[3].push(tempArr.length);middleType=tempMiddles[3].length+1}
                if(k===0) {tempMiddles[4].push(tempArr.length);middleType=tempMiddles[4].length+1}
                if(i===_x-1) {tempMiddles[5].push(tempArr.length);middleType=tempMiddles[5].length+1}
              }
    
              else if(tempCount===2) {
                // do stuff in here to populate edges
                tempType = "edge";

                if(j === 0){
                  if(k===_z-1){
                    if(_x%2&&tempEdges[0][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(_x%2&&tempEdges[0][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(_x%2&&tempEdges[0][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(_x%2&&tempEdges[0][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[0][3].push(tempArr.length);
                  }
                } else if(j === _y-1){
                  if(k===_z-1){
                    if(_x%2&&tempEdges[1][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(_x%2&&tempEdges[1][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(_x%2&&tempEdges[1][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(_x%2&&tempEdges[1][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[1][3].push(tempArr.length);
                  }
                } else {
                  if(k===_z-1 && i===0){
                    if(_x%2&&tempEdges[2][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][0].push(tempArr.length);
                  }
                  else if(k===_z-1 && i===_x-1){
                    if(_x%2&&tempEdges[2][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][1].push(tempArr.length);
                  }
                  else if(k===0 && i===_x-1){
                    if(_x%2&&tempEdges[2][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][2].push(tempArr.length);
                  }
                  else if(k===0 && i===0){
                    if(_x%2&&tempEdges[2][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    tempEdges[2][3].push(tempArr.length);
                  }
                }
              }
              else if(tempCount===3) {
                tempType = "corner";
                corners.push(tempArr.length);
              }
  
            tempArr.push([side0,side1,side2,side3,side4,side5, // piece colors
                          i,j,k, // Current position x,y,z
                          i,j,k, // solved position x,y,z
                          tempType,
                          edgeType,
                          middleType
                        ]);
          }
        }
      }
      //console.log(tempArr);
      return tempArr;
    },

    generateButtonData : function(size){
        let numLayers = Math.floor(size/2);
        let centerLayer = Math.ceil(size/2);
        const faces = ['F','U','R','B','L','D'];
        const buttons = {
          center : [], // Center rotations
          single : [], // Single layer
          multi : []  // Multi layer
        };

        if(size%2)
          buttons.center.push(
            {clockwise: {name:"C1",data:[0,-1,centerLayer,false]},
             counter: {name:"C1'",data:[0,0,centerLayer,false]}},
            {clockwise: {name:"C2",data:[1,-1,centerLayer,false]},
            counter: {name:"C2'",data:[1,0,centerLayer,false]}},
            {clockwise: {name:"C3",data:[2,-1,centerLayer,false]},
            counter: {name:"C3'",data:[2,0,centerLayer,false]}}
          )

        for (let i = 0; i < numLayers; i++){
          for(let j = 0; j < faces.length; j++){
            let baseNameSingle = ((i<10? "0" : "") + (i+1) + faces[j]);
            let baseNameMulti = ((i<10? "0" : "") + (i+1) + faces[j].toLowerCase());

            buttons.single.push({
              clockwise: {face:faces[j], name:baseNameSingle, data:[j,-1,i+1,false]},
              counter: {face:faces[j], name:baseNameSingle+"'",data:[j,0,i+1,false]}
            });
            if(i>0){
              buttons.multi.push({
                clockwise: {face:faces[j],name:baseNameMulti, data:[j,-1,i+1,true]},
                counter: {face:faces[j],name:baseNameMulti+"'",data:[j,0,i+1,true]}
              });
            }
          }
        }

        return buttons;
    },

    generateMoveHints : function(image,cD){
      const groups = [[],[],[],[],[],[]];
      const geometry = new THREE.PlaneGeometry(1,1);
      const material = new THREE.MeshBasicMaterial( {
        map:image,
        transparent: true,
        color: 'black',
        opacity:'.8',
        side: THREE.DoubleSide
      });

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
      return groups;
    },

    // For visual cube
    rotatePoint : function (c1,c2,direction,p1,p2,rotation){
        let theta = rotation*Math.PI/180;
        if(direction < 0) theta*=-1; 
        return { p1 : (Math.cos(theta) * (p1-c1) - Math.sin(theta) * (p2-c2) + c1),
                 p2 : (Math.sin(theta) * (p1-c1) + Math.cos(theta) * (p2-c2) + c2)}
    },

    // rotate pieces attached to face (visual cube)
    /**
     * 
     * Possible Optimization!
     * 
     * Instead of turning each piece individually,
     * group the pieces to be turned and then turn the group.
     * - Pros
     *    - Less Code
     *    - Easier on the renderer
     * 
     * - Cons
     *    - Not sure where to attempt implementation
     * 
     * Development Stage: Trial
     * 
     * - Resources
     *    - https://jsfiddle.net/of1vfhzz/1/
     *    - https://stackoverflow.com/questions/37779104/how-can-i-rotate-around-the-center-of-a-group-in-three-js
     */
    rotatePieces : function (rotate,tempCubes,state,setState){

      // state variables asigned for shorter names
      let centerPoint = state.cubeDimension/2-.5;
      let cubes = state.cubes;
      let turnDirection = state.turnDirection;
      let speed = state.speed;
      let start = state.start;
      let face = state.face;
      let cubeDepth = state.cubeDepth;
      let isMulti = state.isMulti;

      
      //Rotate white center piece Face
      if(face === 0){
        for(let i = 0; i<state.rubiksObject.length;i++){

          //implement isMulti for all of these comparisons
          if((isMulti || cubes[i].position.y > cubeDepth-2) && cubes[i].position.y < cubeDepth){
            
            // Turn piece based on rotation direction
            turnDirection<0 ? cubes[i].rotation.y += .1745*speed/10 : cubes[i].rotation.y -= .1745*speed/10;

            // Calculate circular movement
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,cubes[i].position.x,cubes[i].position.z,speed);

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
      // blue
      if(face === 1){
        for(let i = 0; i<state.rubiksObject.length;i++){
          if((isMulti || cubes[i].position.z < state.cubeDimension + 1 - cubeDepth) && cubes[i].position.z > state.cubeDimension - 1 - cubeDepth){
            turnDirection<0 ? cubes[i].rotation.z -= .1745*speed/10 : cubes[i].rotation.z += .1745*speed/10;
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,cubes[i].position.x,cubes[i].position.y,10*speed/10);
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
        for(let i = 0; i<state.rubiksObject.length;i++){
          if((isMulti || tempCubes[i].position.x < state.cubeDimension + 1 - cubeDepth) && cubes[i].position.x > state.cubeDimension - 1 - cubeDepth){
            turnDirection<0 ? tempCubes[i].rotation.x -= .1745*speed/10 : tempCubes[i].rotation.x += .1745*speed/10;
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,tempCubes[i].position.y,tempCubes[i].position.z,10*speed/10);
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
        for(let i = 0; i<state.rubiksObject.length;i++){
          if((isMulti || tempCubes[i].position.y < state.cubeDimension + 1 - cubeDepth) && cubes[i].position.y > state.cubeDimension - 1 - cubeDepth){
            turnDirection<0 ? tempCubes[i].rotation.y += .1745*speed/10 : tempCubes[i].rotation.y -= .1745*speed/10;
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,tempCubes[i].position.x,tempCubes[i].position.z,10*speed/10);
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
        for(let i = 0; i<state.rubiksObject.length;i++){
          if((isMulti || tempCubes[i].position.x > cubeDepth-2) && cubes[i].position.x < cubeDepth){
            turnDirection<0 ? tempCubes[i].rotation.x -= .1745*speed/10 : tempCubes[i].rotation.x += .1745*speed/10;
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,tempCubes[i].position.y,tempCubes[i].position.z,10*speed/10);              
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
        for(let i = 0; i<state.rubiksObject.length;i++){
          if((isMulti || tempCubes[i].position.z > cubeDepth-2) && cubes[i].position.z < cubeDepth){
            turnDirection<0 ? tempCubes[i].rotation.z -= .1745*speed/10 : tempCubes[i].rotation.z += .1745*speed/10;
            let newPoint = rotate(centerPoint,centerPoint,turnDirection,tempCubes[i].position.x,tempCubes[i].position.y,10*speed/10);
            if(start % 90 === 0){
              newPoint.p1 = Math.round(newPoint.p1);
              newPoint.p2 = Math.round(newPoint.p2);
            }
            tempCubes[i].position.x = newPoint.p1;
            tempCubes[i].position.y = newPoint.p2;
          }
        }
      } 

      return {start : start+speed,reload : true};
    },
    
    // For memory cube
    rotatePoint2 : function (c1,c2,direction,p1,p2){
        let theta = Math.PI/2;
        if(direction < 0) theta*=-1; 
        return { p1 : (- Math.sin(theta) * (p2-c2) + c1),
                 p2 :   (Math.sin(theta) * (p1-c1) + c2)}
    },

    // Memory cube rotation (only rotates by 90 degrees at a time)
    rotateFace : function (cubeFace,direction,cubeDepth,isMulti,cD,object){
      let cubeDimension = cD;
      let centerPoint = cD/2-.5;
      let rubiksObject = [...object];
      let degrees = 90;
  
      if(direction < 0)  degrees *=-1;
  
      // Side 0 (white center piece)
      if (cubeFace === 0){ 
          for(let i = 0; i < rubiksObject.length; i++){
  
              // white side is y===0.
              if ((isMulti || rubiksObject[i][7] > cubeDepth-2) &&
                  rubiksObject[i][7] < cubeDepth){
  
                  // Rotate rubiksObject pieces to new location generated by rotatePoint2
                  let newPoint = cube.rotatePoint2(centerPoint,
                                                   centerPoint,
                                                   degrees,
                                                   rubiksObject[i][6],
                                                   rubiksObject[i][8]);
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
          for(let i = 0; i < rubiksObject.length; i++){
              if ((isMulti || rubiksObject[i][8] < cubeDimension+1-cubeDepth) &&
                  rubiksObject[i][8]>cubeDimension-1-cubeDepth){
                  let newPoint = cube.rotatePoint2(centerPoint,
                                                   centerPoint,
                                                   degrees,
                                                   rubiksObject[i][6],
                                                   rubiksObject[i][7]);
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
          for(let i = 0; i < rubiksObject.length; i++){
              if ((isMulti || rubiksObject[i][6] < cubeDimension+1-cubeDepth) &&
                  rubiksObject[i][6]>cubeDimension-1-cubeDepth){
                  let newPoint = cube.rotatePoint2(centerPoint,
                                                   centerPoint,
                                                   degrees,
                                                   rubiksObject[i][7],
                                                   rubiksObject[i][8]);
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
          for(let i = 0; i < rubiksObject.length; i++){
              if ((isMulti || rubiksObject[i][7] < cubeDimension+1-cubeDepth) && rubiksObject[i][7]>cubeDimension-1-cubeDepth){
                  let newPoint = cube.rotatePoint2(centerPoint,centerPoint,degrees,rubiksObject[i][6],rubiksObject[i][8]);
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
          for(let i = 0; i < rubiksObject.length; i++){
              if ((isMulti || rubiksObject[i][6] > cubeDepth-2) && rubiksObject[i][6] < cubeDepth){
                  let newPoint = cube.rotatePoint2(centerPoint,centerPoint,degrees,rubiksObject[i][7],rubiksObject[i][8]);
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
          for(let i = 0; i < rubiksObject.length; i++){
              if ((isMulti || rubiksObject[i][8] > cubeDepth-2) && rubiksObject[i][8] < cubeDepth){
                  let newPoint = cube.rotatePoint2(centerPoint,centerPoint,degrees,rubiksObject[i][6],rubiksObject[i][7]);
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
  
      return rubiksObject;
    },

    // Changes values in state to trigger face rotation
    rotateCubeFace : function (face,direction,cubeDepth,isMulti,blockMoveLog,moveLog,solveMoves,end,solveState) {
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
}

export default cube;