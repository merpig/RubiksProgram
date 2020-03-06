function solveYellowCorners(rubiksObject,cubeDimension,moveStringToArray,solveMoves){
    let moveString = "";
    let cube = rubiksObject;
    let solveAlgo = "01U' 01F' 01U 01F 01U' 01F' 01U 01F";
    let dim = cubeDimension;

    let pieceOne = cube.length - (dim*dim);
    let pieceTwo = pieceOne + (dim-1);
    let pieceThree = cube.length - dim;
    let pieceFour = cube.length - 1;

    if(cube[pieceOne][3] === "yellow" &&
       cube[pieceTwo][3] === "yellow" &&
       cube[pieceThree][3] === "yellow" &&
       cube[pieceFour][3] === "yellow"){
      if(cube[pieceOne][6] === 0 && cube[pieceOne][8] === dim-1);
      else moveString = "01B";
    }
    else if(cube[pieceOne][3]!== "yellow"){
      moveString = solveAlgo;
    }
    else if(cube[pieceTwo][3]!== "yellow"){
      if(cube[pieceTwo][6] === 0 && cube[pieceTwo][8] === dim-1) {
        moveString = solveAlgo;
      }
      else {
        moveString = "01B";
      }
    }
    else if(cube[pieceFour][3]!== "yellow"){
      if(cube[pieceFour][6] === 0 && cube[pieceFour][8] === dim-1) {
        moveString = solveAlgo;
      }
      else{
        moveString = "01B";
      }
    }
    else if(cube[pieceThree][3]!== "yellow"){
      if(cube[pieceThree][6] === 0 && cube[pieceThree][8] === dim-1) {
        moveString = solveAlgo;
      }
      else {
        moveString = "01B";
      }
    }

    let moveArray = moveStringToArray(moveString);

    if(moveString.length){
      return {moveSet:moveArray};
    }
    else{
      //check for anomoly
      if(dim === 2) {
        if(cube[pieceOne][6]===0 && cube[pieceOne][8]===dim-1) {
          if(cube[pieceTwo][6]===dim-1 && cube[pieceTwo][8]===dim-1){
            if(cube[pieceThree][6]===0 && cube[pieceThree][8]===0){
              let obj = {moveLog : "",currentFunc: "None",moveSet:[],solveState:-1};
              if(solveMoves.length){
                obj.solveMoves = "";
                return obj;
              }
              return obj;
            }
            else {
              moveString = "01R 01D' 01R' 01F' 01R' 01F 01D";
              moveArray = moveStringToArray(moveString);
              return {moveSet:moveArray};
            }
          }
        }
        else {
          moveString = "01B";
          moveArray = moveStringToArray(moveString);
          return {moveSet:moveArray};
        }
      }
      else {
        let obj = {moveLog : "",currentFunc: "None",moveSet:[],solveState:-1};
        if(solveMoves.length){
          obj.solveMoves = "";
          return obj;
        }
        
        return obj;
      }
    }
  }
  module.exports = solveYellowCorners;
