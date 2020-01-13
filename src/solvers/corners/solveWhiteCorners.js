  // Solves white (front) corners
  function solveWhiteCorners(rubiksObject,cubeDimension,moveStringToArray){
    let moveString = "";
    let cube = rubiksObject;
    let space = "";
    let solvedCorners = 0;

    let dim = cubeDimension;

    let pieceOne = 0;
    let pieceTwo = dim - 1;
    let pieceThree = (cube.length/dim) - dim;
    let pieceFour = (cube.length/dim) - 1;

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
          else if(cube[i][j] === "white") whiteSide = j;
        }

        // If edge piece
        if(emptyCount === 3) {

          if(i===pieceOne && solvedCorners === 0 ){
            //Front
            if(cubeX===0 && cubeY===0 && cubeZ===dim-1){
              if(whiteSide===0){solvedCorners++;}
              else if(whiteSide===1) moveString+= space + "01L' 01B 01L 01B' 01L' 01B 01L";
              else moveString+= space + "01L' 01B' 01L 01B2 01U 01B' 01U'";
            }
            else if(cubeX===dim-1 && cubeY===0 && cubeZ===dim-1) moveString+= space + "01R 01L' 01B 01L 01R'"
            else if(cubeX===dim-1 && cubeY===0 && cubeZ===0) moveString+= space + "01R' 01B' 01R 01U 01B' 01U'";
            else if(cubeX===0 && cubeY===0 && cubeZ===0) moveString+= space + "01D' 01U 01B 01U' 01D"
            //Back
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01U 01B 01U'"
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01L' 01B 01L"
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01L' 01B2 01L"
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01U 01B' 01U'"
          }

          if(i===pieceTwo && solvedCorners === 1 ){
            if(cubeX===dim-1 && cubeY === 0 && cubeZ === dim-1){
              if(whiteSide === 0){solvedCorners++}
              else if(whiteSide===1) moveString += space + "01R 01B' 01R' 01B 01R 01B' 01R'";
              else moveString += space + "01U' 01B 01U 01B' 01U' 01B 01U";
            }
            else if(cubeX === dim-1 && cubeY===0 && cubeZ===0) moveString+= space + "01U' 01D 01B 01D' 01U";
            else if(cubeX===0 && cubeY===0 && cubeZ===0) moveString+= space + "01L 01R 01B2 01R' 01L'";
            //Back
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01R 01B' 01R'";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01B 01R 01B' 01R'";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01B2 01R 01B' 01R'";
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01R 01B2 01R'";
          }

          if(i===pieceThree && solvedCorners === 2 ){
            if(cubeX===0 && cubeY===0 && cubeZ===0){
              if(whiteSide === 0){solvedCorners++}
              else if(whiteSide === 4) moveString += space + "01D' 01B 01D 01B' 01D' 01B 01D";
              else moveString += space + "01L 01B' 01L' 01B 01L 01B' 01L'";
            }
            else if(cubeX === dim-1 && cubeY===0 && cubeZ===0) moveString+= space + "01R' 01L 01B' 01L' 01R";
            //Back
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01D' 01B 01D";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01D' 01B2 01D";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01B' 01D' 01B' 01D";
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01D' 01B' 01D";
          }

          if(i===pieceFour && solvedCorners === 3 ){
            if(cubeX === dim-1 && cubeY===0 && cubeZ===0){
              if(whiteSide === 0){solvedCorners++}
              else if(whiteSide === 2) moveString += space + "01D 01B' 01D' 01B 01D 01B' 01D'";
              else moveString += space + "01R' 01B 01R 01B' 01R' 01B 01R";
            }
            //Back
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + " 01R' 01B2 01R";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===dim-1) moveString+= space + "01D 01B' 01D'";
            else if(cubeX===dim-1 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01B 01D 01B' 01D'";
            else if(cubeX===0 && cubeY===dim-1 && cubeZ===0) moveString+= space + "01R' 01B 01R";
          }
        }
      }
    }

    const moveArray = moveStringToArray(moveString);

    // solvedCorners < 4 ? this.setState({moveSet : moveArray}) :
    //   dim < 3 ? this.setState({solveState : 6}) : this.setState({solveState : 3});
    if(solvedCorners < 4){
        return {moveSet : moveArray};
    }
    else{
      if(dim < 3){
        return {solveState : 6};
      }
      else{
        return {solveState : 3};
      }
    }
  }

  module.exports = solveWhiteCorners;