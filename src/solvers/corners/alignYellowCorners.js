function move(depth,side){
   return ((depth<10? "0":"") + depth + side);
}

function alignYellowCorners(rubiksObject,cubeDimension,moveStringToArray,corners){
    let moveString = "";
    let cube = rubiksObject;

    let dim = cubeDimension;

    let maxCoord = dim-1;
    let minCoord = 0;

    let pieceOne = corners[4];
    let pieceTwo = corners[5];
    let pieceThree = corners[6];
    let pieceFour = corners[7];

    let solveCount = 0;

    
    if(cube[pieceOne][6]===cube[pieceOne][9] && cube[pieceOne][7]===cube[pieceOne][10] && cube[pieceOne][8]===cube[pieceOne][11]) solveCount++;
    if(cube[pieceTwo][6]===cube[pieceTwo][9] && cube[pieceTwo][7]===cube[pieceTwo][10] && cube[pieceTwo][8]===cube[pieceTwo][11]) solveCount++;
    if(cube[pieceThree][6]===cube[pieceThree][9] && cube[pieceThree][7]===cube[pieceThree][10] && cube[pieceThree][8]===cube[pieceThree][11]) solveCount++;
    if(cube[pieceFour][6]===cube[pieceFour][9] && cube[pieceFour][7]===cube[pieceFour][10] && cube[pieceFour][8]===cube[pieceFour][11]) solveCount++;
    

    if(cube[pieceOne][6] === minCoord && cube[pieceOne][8] === maxCoord &&
       cube[pieceTwo][6] === maxCoord && cube[pieceTwo][8] === maxCoord);

   else if(solveCount === 2 && dim > 3) {
      //console.log("another parity encountered brother");
      moveString = `02D2 01B2 02D2 02b2 02D2 02b2`;
      moveString = `${move(dim/2,"d2")} 01D2 01B2 ${move(dim/2,"d2")} 01D2 ${move(dim/2,"b2")} ${move(dim/2,"d2")} 01D2 ${move(dim/2,"b2")}`;

      //04d2 01D2 01B2 04d2 01D2 04b2 04d2 01D2 04b2
      const moveArray = moveStringToArray(moveString);
      if(moveString.length) return {moveSet : moveArray,solveState:5};
   }

    else if(cube[pieceOne][6] === minCoord && cube[pieceOne][8] === maxCoord) moveString = "01B 01U 01B' 01D' 01B 01U' 01B' 01D";
    else if(cube[pieceTwo][6] === maxCoord && cube[pieceTwo][8] === maxCoord) moveString = "01B 01R 01B' 01L' 01B 01R' 01B' 01L";
    else if(cube[pieceThree][6] === minCoord && cube[pieceThree][8] === minCoord) moveString = "01B 01L 01B' 01R' 01B 01L' 01B' 01R";
    else if(cube[pieceFour][6] === maxCoord && cube[pieceFour][8] === minCoord) moveString = "01B 01D 01B' 01U' 01B 01D' 01B' 01U";

    else moveString = "01B 01U 01B' 01D' 01B 01U' 01B' 01D";

    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray};
    else return {solveState:7};
  }

  module.exports = alignYellowCorners;