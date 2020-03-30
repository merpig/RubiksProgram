// Functions to generate/manipulate cube

const cube = {
    // Generates the inital solved state of rubiksObject
    generateSolved : function (_x,_y,_z){
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
                    if(tempEdges[0][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][0].length+1);
                    }
                    else if(_x%2&&tempEdges[0][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][0].length+1);
                    }
                    tempEdges[0][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(tempEdges[0][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][1].length+1);
                    }
                    else if(_x%2&&tempEdges[0][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][1].length+1);
                    }
                    tempEdges[0][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(tempEdges[0][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][2].length+1);
                    }
                    else if(_x%2&&tempEdges[0][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][2].length+1);
                    }
                    tempEdges[0][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(tempEdges[0][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][3].length+1);
                    }
                    else if(_x%2&&tempEdges[0][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][3].length+1);
                    }
                    tempEdges[0][3].push(tempArr.length);
                  }
                } else if(j === _y-1){
                  if(k===_z-1){
                    if(tempEdges[1][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][0].length+1);
                    }
                    else if(_x%2&&tempEdges[1][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][0].length+1);
                    }
                    tempEdges[1][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(tempEdges[1][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][1].length+1);
                    }
                    else if(_x%2&&tempEdges[1][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][1].length+1);
                    }
                    tempEdges[1][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(tempEdges[1][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][2].length+1);
                    }
                    else if(_x%2&&tempEdges[1][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][2].length+1);
                    }
                    tempEdges[1][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(tempEdges[1][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][3].length+1);
                    }
                    else if(_x%2&&tempEdges[1][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][3].length+1);
                    }
                    tempEdges[1][3].push(tempArr.length);
                  }
                } else {
                  if(k===_z-1 && i===0){
                    if(tempEdges[2][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][0].length+1);
                    }
                    else if(_x%2&&tempEdges[2][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[2][0].length+1);
                    }
                    tempEdges[2][0].push(tempArr.length);
                  }
                  else if(k===_z-1 && i===_x-1){
                    if(tempEdges[2][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][1].length+1);
                    }
                    else if(_x%2&&tempEdges[2][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][1].length+1);
                    }
                    tempEdges[2][1].push(tempArr.length);
                  }
                  else if(k===0 && i===_x-1){
                    if(tempEdges[2][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][2].length+1);
                    }
                    else if(_x%2&&tempEdges[2][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][2].length+1);
                    }
                    tempEdges[2][2].push(tempArr.length);
                  }
                  else if(k===0 && i===0){
                    if(tempEdges[2][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][3].length+1);
                    }
                    else if(_x%2&&tempEdges[2][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][3].length+1);
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
        //console.log(tempArr);
        return {tempArr,middles,edges,corners};
    },

    generateBlank : function (_x,_y,_z){
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
              if(i===_x-1) side2 = "white";
              else if (i===0) side4 ="white";
              if(j===_y-1) side3 = "white";
              else if (j===0) side0 ="white";
              if(k===_z-1) side1 = "white";
              else if (k===0) side5 ="white";
              let tempCount = 0;
              if(j===0 || j === _y-1) tempCount++;
              if(k===0 || k === _z-1) tempCount++;
              if(i===0 || i === _x-1) tempCount ++;
              let tempType = "none";
    
              if(tempCount===1) {
                tempType = "middle";
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
                    if(tempEdges[0][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][0].length+1);
                    }
                    else if(_x%2&&tempEdges[0][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][0].length+1);
                    }
                    tempEdges[0][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(tempEdges[0][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][1].length+1);
                    }
                    else if(_x%2&&tempEdges[0][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][1].length+1);
                    }
                    tempEdges[0][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(tempEdges[0][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][2].length+1);
                    }
                    else if(_x%2&&tempEdges[0][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][2].length+1);
                    }
                    tempEdges[0][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(tempEdges[0][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[0][3].length+1);
                    }
                    else if(_x%2&&tempEdges[0][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[0][3].length+1);
                    }
                    tempEdges[0][3].push(tempArr.length);
                  }
                } else if(j === _y-1){
                  if(k===_z-1){
                    if(tempEdges[1][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][0].length+1);
                    }
                    else if(_x%2&&tempEdges[1][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][0].length+1);
                    }
                    tempEdges[1][0].push(tempArr.length);
                  }
                  else if(i===_x-1){
                    if(tempEdges[1][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][1].length+1);
                    }
                    else if(_x%2&&tempEdges[1][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][1].length+1);
                    }
                    tempEdges[1][1].push(tempArr.length);
                  }
                  else if(k===0){
                    if(tempEdges[1][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][2].length+1);
                    }
                    else if(_x%2&&tempEdges[1][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][2].length+1);
                    }
                    tempEdges[1][2].push(tempArr.length);
                  }
                  else if(i===0){
                    if(tempEdges[1][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[1][3].length+1);
                    }
                    else if(_x%2&&tempEdges[1][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[1][3].length+1);
                    }
                    tempEdges[1][3].push(tempArr.length);
                  }
                } else {
                  if(k===_z-1 && i===0){
                    if(tempEdges[2][0].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][0].length+1);
                    }
                    else if(_x%2&&tempEdges[2][0].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                        edgeType="secondHalf"+(tempEdges[2][0].length+1);
                    }
                    tempEdges[2][0].push(tempArr.length);
                  }
                  else if(k===_z-1 && i===_x-1){
                    if(tempEdges[2][1].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][1].length+1);
                    }
                    else if(_x%2&&tempEdges[2][1].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][1].length+1);
                    }
                    tempEdges[2][1].push(tempArr.length);
                  }
                  else if(k===0 && i===_x-1){
                    if(tempEdges[2][2].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][2].length+1);
                    }
                    else if(_x%2&&tempEdges[2][2].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][2].length+1);
                    }
                    tempEdges[2][2].push(tempArr.length);
                  }
                  else if(k===0 && i===0){
                    if(tempEdges[2][3].length+1<Math.floor(_x/2)){
                      edgeType="firstHalf"+(tempEdges[2][3].length+1);
                    }
                    else if(_x%2&&tempEdges[2][3].length+1===Math.floor(_x/2)){
                      edgeType="center";
                    }
                    else{
                      edgeType="secondHalf"+(tempEdges[2][3].length+1);
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

    // For visual cube
    rotatePoint : function (c1,c2,direction,p1,p2,rotation){
        let theta = rotation*Math.PI/180;
        if(direction < 0) theta*=-1; 
        return { p1 : (Math.cos(theta) * (p1-c1) - Math.sin(theta) * (p2-c2) + c1),
                 p2 : (Math.sin(theta) * (p1-c1) + Math.cos(theta) * (p2-c2) + c2)}
    },
    
    // For memory cube
    rotatePoint2 : function (c1,c2,direction,p1,p2){
        let theta = Math.PI/2;
        if(direction < 0) theta*=-1; 
        return { p1 : (- Math.sin(theta) * (p2-c2) + c1),
                 p2 :   (Math.sin(theta) * (p1-c1) + c2)}
    }
}

export default cube;