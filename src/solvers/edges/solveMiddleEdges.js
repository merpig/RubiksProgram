function inMiddle(coord,maxCoord,minCoord){
  return coord>minCoord&&coord<maxCoord;
}

function sectionSpliter(edges){
  let splitEdges = [];
  let edgeSegments = edges.length/3;
  const edgeSections = 4;
  let segmentsPerSection = edgeSegments/edgeSections;

  let temp = [];
  for(let i = edgeSegments*2; i < edgeSegments*3;i++){
    temp.push(edges[i]);
    if(temp.length===segmentsPerSection){
      splitEdges.push(temp);
      temp=[];
    }
  }

  return splitEdges;
}

function solveMiddleEdges(rubiksObject,moveStringToArray,edges,dim){
  let moveString = "";
  let cube = rubiksObject;
  let space = "";
  let solvedEdges = 0;
  let moveFromMiddle012 = "01B 01U 01B' 01U' 01B' 01L' 01B 01L";
  let moveFromMiddle212 = "01B 01R 01B' 01R' 01B' 01U' 01B 01U";
  let moveFromMiddle210 = "01B 01D 01B' 01D' 01B' 01R' 01B 01R";
  let moveFromMiddle010 = "01B 01L 01B' 01L' 01B' 01D' 01B 01D";

  let minCoord = 0;
  let maxCoord = dim-1;

  let fourEdgeSections = sectionSpliter(edges);

  let edgeOne = fourEdgeSections[0][0];
  let edgeTwo = fourEdgeSections[1][0];
  let edgeThree = fourEdgeSections[3][0];
  let edgeFour = fourEdgeSections[2][0];


  // console.log("\n\n",fourEdgeSections);
  for(let i = 0; i < cube.length; i++){
    if(moveString.length) space = " ";
    //if(cube[i].includes("green") || cube[i].includes("blue")){
      //let emptyCount = 0;
      let blueSide = -1;
      let greenSide = -1;
      let cubeX = cube[i][6];
      let cubeY = cube[i][7];
      let cubeZ = cube[i][8];

      for(let j = 0; j < 6; j++){
        if (cube[i][j] === "black");
        else {
          if(cube[i][j] === "blue") blueSide = j;
          else if(cube[i][j] === "green") greenSide = j;
        }
      }

      // //if(emptyCount === 4){
      //   console.log("Cube:",cube[i]);
      //   console.log("i:",i);
      //   console.log("Solved Edges:",solvedEdges);
        if(i===edgeOne && solvedEdges === 0){
          //Front
          if(cubeX === minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === maxCoord)
            blueSide === 1 ? solvedEdges++ : moveString+= space + moveFromMiddle012;
          
          else if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === maxCoord) moveString+= space + moveFromMiddle212;
          else if(cubeX === minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord) moveString+= space + moveFromMiddle010;
          else if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord) moveString+= space + moveFromMiddle210;
          //Back
          else if(cubeX === minCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) {
            blueSide === 3 ? moveString+= space + moveFromMiddle012 : moveString+= space + "01B2 01L' 01B' 01L 01B 01U 01B 01U'";
          }
          else if(inMiddle(cubeX,maxCoord,minCoord)&& cubeY === maxCoord && cubeZ === maxCoord) moveString+= space + "01B";
          else if(cubeX === maxCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B2";
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === minCoord) moveString+= space + "01B'";
        }
        if(i===edgeTwo && solvedEdges === 1){
          //Front
          if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === maxCoord){
            blueSide === 1 ? solvedEdges++ : moveString+= space + moveFromMiddle212;
          }
          else if(cubeX === minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord) moveString+= space + moveFromMiddle010;
          else if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord) moveString+= space + moveFromMiddle210;
          //Back
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === maxCoord) {
            blueSide === 1 ? moveString+= space + moveFromMiddle212 : moveString+= space + "01B2 01U' 01B' 01U 01B 01R 01B 01R'";
          }
          else if(cubeX === maxCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B";
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === minCoord) moveString+= space + "01B2";
          else if(cubeX === minCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B'";
        }
        if(i===edgeThree && solvedEdges === 2){
          //Front
          if(cubeX === minCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord){
            greenSide === 5 ? solvedEdges++ : moveString+= space + moveFromMiddle010;
          }
          else if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord) moveString+= space + moveFromMiddle210;
          //Back
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === minCoord){
            greenSide === 5 ? moveString+= space + moveFromMiddle010 : moveString+= space + "01B2 01D' 01B' 01D 01B 01L 01B 01L'";
          }
          else if(cubeX === minCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B";
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === maxCoord) moveString+= space + "01B2";
          else if(cubeX === maxCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B'";
        }
        if(i===edgeFour && solvedEdges === 3){
          //Front
          if(cubeX === maxCoord && inMiddle(cubeY,maxCoord,minCoord) && cubeZ === minCoord){
            greenSide === 5 ? solvedEdges++ : moveString+= space + moveFromMiddle210;
          }
          //Back
          else if(cubeX === maxCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)){
            greenSide === 3 ? moveString+= space + moveFromMiddle210 : moveString+= space + "01B2 01R' 01B' 01R 01B 01D 01B 01D'";
          }
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === minCoord) moveString+= space + "01B";
          else if(cubeX === minCoord && cubeY === maxCoord && inMiddle(cubeZ,maxCoord,minCoord)) moveString+= space + "01B2";
          else if(inMiddle(cubeX,maxCoord,minCoord) && cubeY === maxCoord && cubeZ === maxCoord) moveString+= space + "01B'"; 
        }
      //}
    //}
  }

  const moveArray = moveStringToArray(moveString);

  if(solvedEdges < 4 ) return {moveSet : moveArray};
  else return {solveState : 4};
}

module.exports = solveMiddleEdges;