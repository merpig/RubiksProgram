function inMiddle(coord,maxCoord,minCoord){
  return coord>minCoord&&coord<maxCoord;
}

function sectionSpliter(edges){
  let splitEdges = [];
  let edgeSegments = edges.length/3;
  const edgeSections = 4;
  let segmentsPerSection = edgeSegments/edgeSections;

  let temp = [];
  for(let i = 0; i < edgeSegments;i++){
    temp.push(edges[i]);
    if(temp.length===segmentsPerSection){
      splitEdges.push(temp);
      temp=[];
    }
  }

  return splitEdges;
}

function solveWhiteCross(rubiksObject,cubeDimension,moveStringToArray,edges){

    let moveString = "";
    let cube = rubiksObject;
    let space = "";
    let solvedEdges = 0;

    let dim = cubeDimension;
    const maxCoord = dim-1;
    const minCoord = 0;

    if(dim === 2) {return {solveState : 2};}

    let fourEdgeSections = sectionSpliter(edges);

    let pieceOne = fourEdgeSections[0][0];
    let pieceTwo = fourEdgeSections[3][0];
    let pieceThree = fourEdgeSections[1][0];
    let pieceFour = fourEdgeSections[2][0];

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
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===minCoord && cubeZ===maxCoord)
              !whiteSide ? solvedEdges++ : moveString+= space + "01U' 01R' 01F'";
            
            else if(cubeX===maxCoord && cubeY===minCoord && inMiddle(cubeZ,maxCoord,minCoord))
              !whiteSide ? moveString+= space + "01F'" : moveString+= space + "01R 01U";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===minCoord && cubeZ===minCoord)
              !whiteSide ? moveString+= space + "01F2" : moveString+= space + "01D 01R 01F'";

            else if(cubeX===minCoord && cubeY===minCoord && inMiddle(cubeZ,maxCoord,minCoord))
              !whiteSide ? moveString+= space + "01F" : moveString+= space + "01L' 01U'";

            //If piece one is in y section 1
            else if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01L 01F" : moveString+= space + "01U'";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01R' 01F'" : moveString+= space + "01U";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===2 ? moveString+= space + "01D' 01F2" : moveString+= space + "01R 01F'";
            
            else if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===4 ? moveString+= space + "01D 01F2" : moveString+= space + "01L' 01F";
            

            //If piece one is in y section 2
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===maxCoord)
              whiteSide===3 ? moveString+= space + "01U2" : moveString+= space + "01B 01L 01U'";
            
            else if(cubeX===maxCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01R2 01F'" : moveString+= space + "01R' 01U";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===minCoord)
              whiteSide===3 ? moveString+= space + "01B2 01U2" : moveString+= space + "01B' 01L 01U'";
            
            else if(cubeX===minCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01B' 01U2" : moveString+= space + "01L 01U'";
            
          }
          if(i===pieceTwo && solvedEdges === 1){
            
            if(cubeX===minCoord && cubeY===minCoord && inMiddle(cubeZ,maxCoord,minCoord))
              !whiteSide ? solvedEdges++ : moveString+= space + "01L' 01R 01U' 01R'";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===minCoord && cubeZ===minCoord)
              !whiteSide ? moveString+= space + "01D' 01F' 01D 01F" : moveString+= space + "01D' 01L'";
            
            else if(cubeX===maxCoord && cubeY===minCoord && inMiddle(cubeZ,maxCoord,minCoord))
              !whiteSide ? moveString+= space + "01R 01F2 01R' 01F2" : moveString+= space + "01R 01F 01U 01F'";
            

            //If piece two is in y section 1
            if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01L" : moveString+= space + "01F 01U' 01F'";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01F2 01R' 01F2" : moveString+= space + "01U 01F' 01U'";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===2 ? moveString+= space + "01F' 01D' 01F" : moveString+= space + "01F2 01R 01F2";
            
            else if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===4 ? moveString+= space + "01F' 01D 01F" : moveString+= space + "01L'";
            

            //If piece two is in y section 2
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===maxCoord)
              whiteSide===3 ? moveString+= space + "01F 01U2 01F'" : moveString+= space + "01U' 01L 01U";
            
            else if(cubeX===maxCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01B2 01L2" : moveString+= space + "01R' 01F 01U 01F'";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===minCoord)
              whiteSide===3 ? moveString+= space + "01F' 01D2 01F" : moveString+= space + "01D 01L'";
            
            else if(cubeX===minCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01L2" : moveString+= space + "01B' 01U' 01L 01U";
            
          }
          if(i===pieceThree && solvedEdges === 2){
  
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===minCoord && cubeZ===minCoord)
              !whiteSide ? moveString+= space + "01D 01F 01D' 01F'" : moveString+= space + "01D 01R";
            
            else if(cubeX===maxCoord && cubeY===minCoord && inMiddle(cubeZ,maxCoord,minCoord))
              !whiteSide ? solvedEdges++ : moveString+= space + "01R 01F' 01U 01F";
            
            
            //If piece three is in y section 1
            if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01F2 01L 01F2" : moveString+= space + "01F' 01U' 01F";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01R'" : moveString+= space + "01F' 01U 01F";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===2 ? moveString+= space + "01F 01D' 01F'" : moveString+= space + "01R";
            
            else if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===4 ? moveString+= space + "01F 01D 01F'" : moveString+= space + "01F2 01L' 01F2";
            

            //If piece three is in y section 2
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===maxCoord)
              whiteSide===3 ? moveString+= space + "01F' 01U2 01F" : moveString+= space + "01U 01R' 01U'";
            
            else if(cubeX===maxCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01R2" : moveString+= space + "01R' 01F' 01U 01F";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===minCoord)
              whiteSide===3 ? moveString+= space + "01F 01D2 01F'" : moveString+= space + "01D' 01L";
            
            else if(cubeX===minCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01B2 01R2" : moveString+= space + "01B' 01U 01R' 01U'";
            
          }
          if(i===pieceFour && solvedEdges === 3){
  
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===minCoord && cubeZ===minCoord)
              !whiteSide ? solvedEdges++ : moveString+= space + "01D 01F' 01R 01F";
            
            //If piece four is in y section 1
            if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01F 01L 01F'" : moveString+= space + "01F2 01U' 01F2";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===maxCoord)
              whiteSide===1 ? moveString+= space + "01F' 01R' 01F" : moveString+= space + "01F2 01U 01F2";
            
            else if(cubeX===maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===2 ? moveString+= space + "01D'" : moveString+= space + "01F' 01R 01F";
            
            else if(cubeX===minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ===minCoord)
              whiteSide===4 ? moveString+= space + "01D" : moveString+= space + "01F 01L' 01F'";
            

            //If piece four is in y section 2
            if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===maxCoord)
              whiteSide===3 ? moveString+= space + "01F2 01U2 01F2" : moveString+= space + "01B 01L' 01D 01L";
            
            else if(cubeX===maxCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
              whiteSide===3 ? moveString+= space + "01F' 01R2 01F" : moveString+= space + "01R 01D' 01R'";
            
            else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY===maxCoord && cubeZ===minCoord)
              whiteSide===3 ? moveString+= space + "01D2" : moveString+= space + "01D' 01F' 01R 01F";
            
            else if(cubeX===minCoord && cubeY===maxCoord && inMiddle(cubeZ,maxCoord,minCoord))
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