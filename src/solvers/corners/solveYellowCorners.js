function move(depth,side){
  return ((depth<10? "0":"") + depth + side);
}

function solveYellowCorners(rubiksObject,cubeDimension,moveStringToArray,solveMoves,corners){
    let moveString = "";
    let cube = rubiksObject;
    let solveAlgo = "01U' 01F' 01U 01F 01U' 01F' 01U 01F";
    let dim = cubeDimension;

    let maxCoord = dim-1;
    let minCoord = 0;

    let pieceOne = corners[4];
    let pieceTwo = corners[5];
    let pieceThree = corners[6];
    let pieceFour = corners[7];

    let moveArray;

    if(cube[pieceOne][3] === "yellow" &&
       cube[pieceTwo][3] === "yellow" &&
       cube[pieceThree][3] === "yellow" &&
       cube[pieceFour][3] === "yellow"){
      if(cube[pieceOne][6] === minCoord && cube[pieceOne][8] === maxCoord);
      else moveString = "01B";
    }

    else if(cube[pieceOne][3]!== "yellow"){
      //console.log(cube[pieceOne]);
      moveString = solveAlgo;
    }

    else if(cube[pieceTwo][3]!== "yellow"){
      if(cube[pieceTwo][6] === minCoord && cube[pieceTwo][8] === maxCoord) {
        //console.log(cube[pieceTwo]);
        moveString = solveAlgo;
      }
      else {
        moveString = "01B";
      }
    }
    else if(cube[pieceFour][3]!== "yellow"){
      if(cube[pieceFour][6] === minCoord && cube[pieceFour][8] === maxCoord) {
        //console.log(cube[pieceFour]);
        moveString = solveAlgo;
      }
      else{
        moveString = "01B";
      }
    }
    else if(cube[pieceThree][3]!== "yellow"){
      if(cube[pieceThree][6] === minCoord && cube[pieceThree][8] === maxCoord) {
        //console.log(cube[pieceThree]);
        moveString = solveAlgo;
      }
      else {
        moveString = "01B";
      }
    }

    moveArray = moveStringToArray(moveString);

    if(moveString.length){
      return {moveSet:moveArray};
    }
    else{
      //check for anomoly
      if(dim === 2) {

        if(cube[pieceOne][6]===minCoord && cube[pieceOne][8]===maxCoord) {
          if(cube[pieceTwo][6]===maxCoord && cube[pieceTwo][8]===maxCoord){
            if(cube[pieceThree][6]===minCoord && cube[pieceThree][8]===minCoord){
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
      else if(dim>3){
        if(cube[pieceOne][6]===minCoord && cube[pieceOne][8]===maxCoord) {
          if(cube[pieceTwo][6]===maxCoord && cube[pieceTwo][8]===maxCoord){
            if(cube[pieceThree][6]===minCoord && cube[pieceThree][8]===minCoord){
              let obj = {moveLog : "",currentFunc: "None",moveSet:[],solveState:-1};
              if(solveMoves.length){
                obj.solveMoves = "";
                return obj;
              }
              return obj;
            }
            else {
              //console.log("last parity brother");
              moveString = "02R2 01B2 02R2 01B2 02B2 02R2 02B2";
              moveString = `${move(dim/2,"r2")} 01R2 01B2 ${move(dim/2,"r2")} 01R2 01B2 ${move(dim/2,"b2")} 01B2 ${move(dim/2,"r2")} 01R2 ${move(dim/2,"b2")} 01B2`;
              moveArray = moveStringToArray(moveString);
              return {moveSet:moveArray,solveState:4};
            }
          }
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
