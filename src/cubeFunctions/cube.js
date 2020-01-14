// Functions to generate/manipulate cube

const cube = {
    // Generates the inital solved state of rubiksObject
    generateSolved : function (_x,_y,_z){
        const tempArr = [];
        const middles = [];
        const tempMiddles = [
          [], // white
          [], // yellow
          [], // blue
          [], // green
          [], // orange
          []  // red
        ];
    
        for(let j = 0; j < _y; j++){      // Move back along the y-axis
          for(let k = _z-1; k >= 0; k--){ // Move down through the z-axis
            for(let i = 0; i < _x; i++){  // Traverse across the x-axis
              let side0 = "black";
              let side1 = "black";
              let side2 = "black";
              let side3 = "black";
              let side4 = "black";
              let side5 = "black";
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
                if(j===0) tempMiddles[0].push(tempArr.length);
                if(j===_y-1) tempMiddles[1].push(tempArr.length);
                if(k===_z-1) tempMiddles[2].push(tempArr.length);
                if(k===0) tempMiddles[3].push(tempArr.length);
                if(i===0) tempMiddles[4].push(tempArr.length);
                if(i===_x-1) tempMiddles[5].push(tempArr.length);
              }
    
              else if(tempCount===2) tempType = "edge";
              else if(tempCount===3) tempType = "corner";
    
              tempArr.push([side0,side1,side2,side3,side4,side5, // piece colors
                            i,j,k, // Current position x,y,z
                            i,j,k, // Solved position x,y,z
                            tempType]);
            }
          }
        }
        
        for(let i = 0; i < 6; i++){
          for(let j = 0; j < (_x-2)*(_x-2); j++){
            middles.push(tempMiddles[i][j]);
          }
        }
        return {tempArr,middles};
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