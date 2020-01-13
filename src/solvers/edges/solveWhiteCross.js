function solveWhiteCross(rubiksObject,cubeDimension,moveStringToArray){

    let moveString = "";
    let cube = rubiksObject;
    let space = "";
    let solvedEdges = 0;

    let dim = cubeDimension;

    if(dim === 2) solvedEdges = 4;

    let pieceOne = Math.floor(dim/2);
    let pieceTwo = dim * pieceOne;
    let pieceThree = pieceTwo + (dim -1);
    let pieceFour = dim * dim - Math.ceil(dim/2);

    for(let i = 0; i < cube.length; i++){
      if(moveString.length) space = " ";
      if(cube[i].includes("white")){

        let emptyCount = 0;
        let whiteSide = -1;
        let cubeX = cube[i][6];
        let cubeY = cube[i][7];
        let cubeZ = cube[i][8];
        

        for(let j = 0; j < 6; j++){
          if (cube[i][j] === "black") emptyCount++;
          else {
            if(cube[i][j] === "white") whiteSide = j;
          }
        }

        // If edge piece
        if(emptyCount === 4) {
          if(i===pieceOne && solvedEdges === 0 ){
            if(cubeX===1 && cubeY===0 && cubeZ===2)
              !whiteSide ? solvedEdges++ : moveString+= space + "01U' 01R' 01F'";
            
            else if(cubeX===2 && cubeY===0 && cubeZ===1)
              !whiteSide ? moveString+= space + "01F'" : moveString+= space + "01R 01U";
            
            else if(cubeX===1 && cubeY===0 && cubeZ===0)
              !whiteSide ? moveString+= space + "01F2" : moveString+= space + "01D 01R 01F'";

            else if(cubeX===0 && cubeY===0 && cubeZ===1)
              !whiteSide ? moveString+= space + "01F" : moveString+= space + "01L' 01U'";

            //If piece one is in y section 1
            else if(cubeX===0 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01L 01F" : moveString+= space + "01U'";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01R' 01F'" : moveString+= space + "01U";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===0)
              whiteSide===2 ? moveString+= space + "01D' 01F2" : moveString+= space + "01R 01F'";
            
            else if(cubeX===0 && cubeY===1 && cubeZ===0)
              whiteSide===4 ? moveString+= space + "01D 01F2" : moveString+= space + "01L' 01F";
            

            //If piece one is in y section 2
            else if(cubeX===1 && cubeY===2 && cubeZ===2)
              whiteSide===3 ? moveString+= space + "01U2" : moveString+= space + "01B 01L 01U'";
            
            else if(cubeX===2 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01R2 01F'" : moveString+= space + "01R' 01U";
            
            else if(cubeX===1 && cubeY===2 && cubeZ===0)
              whiteSide===3 ? moveString+= space + "01B2 01U2" : moveString+= space + "01B' 01L 01U'";
            
            else if(cubeX===0 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01B' 01U2" : moveString+= space + "01L 01U'";
            
          }
          if(i===pieceTwo && solvedEdges === 1){
            
            if(cubeX===0 && cubeY===0 && cubeZ===1)
              !whiteSide ? solvedEdges++ : moveString+= space + "01L' 01R 01U' 01R'";
            
            else if(cubeX===1 && cubeY===0 && cubeZ===0)
              !whiteSide ? moveString+= space + "01D' 01F' 01D 01F" : moveString+= space + "01D' 01L'";
            
            else if(cubeX===2 && cubeY===0 && cubeZ===1)
              !whiteSide ? moveString+= space + "01R 01F2 01R' 01F2" : moveString+= space + "01R 01F 01U 01F'";
            

            //If piece two is in y section 1
            if(cubeX===0 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01L" : moveString+= space + "01F 01U' 01F'";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01F2 01R' 01F2" : moveString+= space + "01U 01F' 01U'";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===0)
              whiteSide===2 ? moveString+= space + "01F' 01D' 01F" : moveString+= space + "01F2 01R 01F2";
            
            else if(cubeX===0 && cubeY===1 && cubeZ===0)
              whiteSide===4 ? moveString+= space + "01F' 01D 01F" : moveString+= space + "01L'";
            

            //If piece two is in y section 2
            if(cubeX===1 && cubeY===2 && cubeZ===2)
              whiteSide===3 ? moveString+= space + "01F 01U2 01F'" : moveString+= space + "01U' 01L 01U";
            
            else if(cubeX===2 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01B2 01L2" : moveString+= space + "01R' 01F 01U 01F'";
            
            else if(cubeX===1 && cubeY===2 && cubeZ===0)
              whiteSide===3 ? moveString+= space + "01F' 01D2 01F" : moveString+= space + "01D 01L'";
            
            else if(cubeX===0 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01L2" : moveString+= space + "01B' 01U' 01L 01U";
            
          }
          if(i===pieceThree && solvedEdges === 2){
  
            if(cubeX===1 && cubeY===0 && cubeZ===0)
              !whiteSide ? moveString+= space + "01D 01F 01D' 01F'" : moveString+= space + "01D 01R";
            
            else if(cubeX===2 && cubeY===0 && cubeZ===1)
              !whiteSide ? solvedEdges++ : moveString+= space + "01R 01F' 01U 01F";
            
            
            //If piece three is in y section 1
            if(cubeX===0 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01F2 01L 01F2" : moveString+= space + "01F' 01U' 01F";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01R'" : moveString+= space + "01F' 01U 01F";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===0)
              whiteSide===2 ? moveString+= space + "01F 01D' 01F'" : moveString+= space + "01R";
            
            else if(cubeX===0 && cubeY===1 && cubeZ===0)
              whiteSide===4 ? moveString+= space + "01F 01D 01F'" : moveString+= space + "01F2 01L' 01F2";
            

            //If piece three is in y section 2
            if(cubeX===1 && cubeY===2 && cubeZ===2)
              whiteSide===3 ? moveString+= space + "01F' 01U2 01F" : moveString+= space + "01U 01R' 01U'";
            
            else if(cubeX===2 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01R2" : moveString+= space + "01R' 01F' 01U 01F";
            
            else if(cubeX===1 && cubeY===2 && cubeZ===0)
              whiteSide===3 ? moveString+= space + "01F 01D2 01F'" : moveString+= space + "01D' 01L";
            
            else if(cubeX===0 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01B2 01R2" : moveString+= space + "01B' 01U 01R' 01U'";
            
          }
          if(i===pieceFour && solvedEdges === 3){
  
            if(cubeX===1 && cubeY===0 && cubeZ===0)
              !whiteSide ? solvedEdges++ : moveString+= space + "01D 01F' 01R 01F";
            
            //If piece four is in y section 1
            if(cubeX===0 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01F 01L 01F'" : moveString+= space + "01F2 01U' 01F2";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===2)
              whiteSide===1 ? moveString+= space + "01F' 01R' 01F" : moveString+= space + "01F2 01U 01F2";
            
            else if(cubeX===2 && cubeY===1 && cubeZ===0)
              whiteSide===2 ? moveString+= space + "01D'" : moveString+= space + "01F' 01R 01F";
            
            else if(cubeX===0 && cubeY===1 && cubeZ===0)
              whiteSide===4 ? moveString+= space + "01D" : moveString+= space + "01F 01L' 01F'";
            

            //If piece four is in y section 2
            if(cubeX===1 && cubeY===2 && cubeZ===2)
              whiteSide===3 ? moveString+= space + "01F2 01U2 01F2" : moveString+= space + "01B 01L' 01D 01L";
            
            else if(cubeX===2 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01F' 01R2 01F" : moveString+= space + "01R 01D' 01R'";
            
            else if(cubeX===1 && cubeY===2 && cubeZ===0)
              whiteSide===3 ? moveString+= space + "01D2" : moveString+= space + "01D' 01F' 01R 01F";
            
            else if(cubeX===0 && cubeY===2 && cubeZ===1)
              whiteSide===3 ? moveString+= space + "01F 01L2 01F'" : moveString+= space + "01L' 01D 01L";
            
          }
        }
      }
    }
    
    const moveArray = moveStringToArray(moveString);

    if(solvedEdges < 4){
        return {moveSet : moveArray};
    } else{
        return {solveState : 2}
    }
}

module.exports = solveWhiteCross;