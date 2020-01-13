function solveMiddleEdges(rubiksObject,moveStringToArray){
  let moveString = "";
  let cube = rubiksObject;
  let space = "";
  let solvedEdges = 0;
  let moveFromMiddle012 = "01B 01U 01B' 01U' 01B' 01L' 01B 01L";
  let moveFromMiddle212 = "01B 01R 01B' 01R' 01B' 01U' 01B 01U";
  let moveFromMiddle210 = "01B 01D 01B' 01D' 01B' 01R' 01B 01R";
  let moveFromMiddle010 = "01B 01L 01B' 01L' 01B' 01D' 01B 01D";

  for(let i = 0; i < 27; i++){
    if(moveString.length) space = " ";
    if(cube[i].includes("green") || cube[i].includes("blue")){
      let emptyCount = 0;
      let blueSide = -1;
      let greenSide = -1;
      let cubeX = cube[i][6];
      let cubeY = cube[i][7];
      let cubeZ = cube[i][8];

      for(let j = 0; j < 6; j++){
        if (cube[i][j] === "black") emptyCount++;
        else {
          if(cube[i][j] === "blue") blueSide = j;
          else if(cube[i][j] === "green") greenSide = j;
        }
      }

      if(emptyCount === 4){
        if(i===9 && solvedEdges === 0){
          //Front
          if(cubeX === 0 && cubeY === 1 && cubeZ === 2)
            blueSide === 1 ? solvedEdges++ : moveString+= space + moveFromMiddle012;
          
          else if(cubeX === 2 && cubeY === 1 && cubeZ === 2) moveString+= space + moveFromMiddle212;
          else if(cubeX === 0 && cubeY === 1 && cubeZ === 0) moveString+= space + moveFromMiddle010;
          else if(cubeX === 2 && cubeY === 1 && cubeZ === 0) moveString+= space + moveFromMiddle210;
          //Back
          else if(cubeX === 0 && cubeY === 2 && cubeZ === 1) {
            blueSide === 3 ? moveString+= space + moveFromMiddle012 : moveString+= space + "01B2 01L' 01B' 01L 01B 01U 01B 01U'";
          }
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 2) moveString+= space + "01B";
          else if(cubeX === 2 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B2";
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 0) moveString+= space + "01B'";
        }
        if(i===11 && solvedEdges === 1){
          //Front
          if(cubeX === 2 && cubeY === 1 && cubeZ === 2){
            blueSide === 1 ? solvedEdges++ : moveString+= space + moveFromMiddle212;
          }
          else if(cubeX === 0 && cubeY === 1 && cubeZ === 0) moveString+= space + moveFromMiddle010;
          else if(cubeX === 2 && cubeY === 1 && cubeZ === 0) moveString+= space + moveFromMiddle210;
          //Back
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 2) {
            blueSide === 1 ? moveString+= space + moveFromMiddle212 : moveString+= space + "01B2 01U' 01B' 01U 01B 01R 01B 01R'";
          }
          else if(cubeX === 2 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B";
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 0) moveString+= space + "01B2";
          else if(cubeX === 0 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B'";
        }
        if(i===15 && solvedEdges === 2){
          //Front
          if(cubeX === 0 && cubeY === 1 && cubeZ === 0){
            greenSide === 5 ? solvedEdges++ : moveString+= space + moveFromMiddle010;
          }
          else if(cubeX === 2 && cubeY === 1 && cubeZ === 0) moveString+= space + moveFromMiddle210;
          //Back
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 0){
            greenSide === 5 ? moveString+= space + moveFromMiddle010 : moveString+= space + "01B2 01D' 01B' 01D 01B 01L 01B 01L'";
          }
          else if(cubeX === 0 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B";
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 2) moveString+= space + "01B2";
          else if(cubeX === 2 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B'";
        }
        if(i===17 && solvedEdges === 3){
          //Front
          if(cubeX === 2 && cubeY === 1 && cubeZ === 0){
            greenSide === 5 ? solvedEdges++ : moveString+= space + moveFromMiddle210;
          }
          //Back
          else if(cubeX === 2 && cubeY === 2 && cubeZ === 1){
            greenSide === 3 ? moveString+= space + moveFromMiddle210 : moveString+= space + "01B2 01R' 01B' 01R 01B 01D 01B 01D'";
          }
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 0) moveString+= space + "01B";
          else if(cubeX === 0 && cubeY === 2 && cubeZ === 1) moveString+= space + "01B2";
          else if(cubeX === 1 && cubeY === 2 && cubeZ === 2) moveString+= space + "01B'"; 
        }
      }
    }
  }

  const moveArray = moveStringToArray(moveString);

  if(solvedEdges < 4 ) return {moveSet : moveArray};
  else return {solveState : 4};
}

module.exports = solveMiddleEdges;