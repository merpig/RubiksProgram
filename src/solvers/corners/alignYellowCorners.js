function alignYellowCorners(rubiksObject,cubeDimension,moveStringToArray){
    let moveString = "";
    let cube = rubiksObject;

    let dim = cubeDimension;

    let pieceOne = cube.length - (dim*dim);
    let pieceTwo = pieceOne + (dim-1);
    let pieceThree = cube.length - dim;
    let pieceFour = cube.length - 1;


    if(cube[pieceOne][6] === 0 && cube[pieceOne][8] === dim-1 &&
       cube[pieceTwo][6] === dim-1 && cube[pieceTwo][8] === dim-1);

    else if(cube[pieceOne][6] === 0 && cube[pieceOne][8] === dim-1) moveString = "01B 01U 01B' 01D' 01B 01U' 01B' 01D";
    else if(cube[pieceTwo][6] === dim-1 && cube[pieceTwo][8] === dim-1) moveString = "01B 01R 01B' 01L' 01B 01R' 01B' 01L";
    else if(cube[pieceThree][6] === 0 && cube[pieceThree][8] === 0) moveString = "01B 01L 01B' 01R' 01B 01L' 01B' 01R";
    else if(cube[pieceFour][6] === dim-1 && cube[pieceFour][8] === 0) moveString = "01B 01D 01B' 01U' 01B 01D' 01B' 01U";

    else moveString = "01B 01U 01B' 01D' 01B 01U' 01B' 01D";

    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray};
    else return {solveState:7};
  }

  module.exports = alignYellowCorners;