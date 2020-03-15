  // Solves white (front) corners
  function solveWhiteCorners(rubiksObject,cubeDimension,moveStringToArray,corners){
    let moveString = "";
    let cube = rubiksObject;
    let solvedCorners = 0;

    let dim = cubeDimension;

    let maxCoord = dim-1;
    let minCoord = 0;

    let pieceOne = corners[0]
    let pieceTwo = corners[1]
    let pieceThree = corners[2]
    let pieceFour = corners[3]

    for(let i = 0; i < cube.length; i++){
      let whiteSide = -1;
      let cubeX = cube[i][6];
      let cubeY = cube[i][7];
      let cubeZ = cube[i][8];

      for(let j = 0; j < 6; j++){
        if(cube[i][j] === "white") whiteSide = j;
      }

      if(i===pieceOne && solvedCorners === 0 ){
        //Front
        if(cubeX===minCoord && cubeY===minCoord && cubeZ===maxCoord){
          if(whiteSide===0){solvedCorners++}
          else if(whiteSide===1) moveString="01L' 01B 01L 01B' 01L' 01B 01L";
          else moveString="01L' 01B' 01L 01B2 01U 01B' 01U'";
        }
        else if(cubeX===maxCoord && cubeY===minCoord && cubeZ===maxCoord) moveString="01R 01L' 01B 01L 01R'"
        else if(cubeX===maxCoord && cubeY===minCoord && cubeZ===minCoord) moveString="01R' 01B' 01R 01U 01B' 01U'";
        else if(cubeX===minCoord && cubeY===minCoord && cubeZ===minCoord) moveString="01D' 01U 01B 01U' 01D"
        //Back
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01U 01B 01U'"
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01L' 01B 01L"
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01L' 01B2 01L"
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01U 01B' 01U'"
      }

      if(i===pieceTwo && solvedCorners === 1 ){
        if(cubeX===maxCoord && cubeY===minCoord && cubeZ===maxCoord){
          if(whiteSide === 0){solvedCorners++}
          else if(whiteSide===1) moveString ="01R 01B' 01R' 01B 01R 01B' 01R'";
          else moveString ="01U' 01B 01U 01B' 01U' 01B 01U";
        }
        else if(cubeX === maxCoord && cubeY===minCoord && cubeZ===minCoord) moveString="01U' 01D 01B 01D' 01U";
        else if(cubeX===minCoord && cubeY===minCoord && cubeZ===minCoord) moveString="01L 01R 01B2 01R' 01L'";
        //Back
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01R 01B' 01R'";
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01B 01R 01B' 01R'";
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01B2 01R 01B' 01R'";
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01R 01B2 01R'";
      }
      
      if(i===pieceThree && solvedCorners === 2 ){
        if(cubeX===minCoord && cubeY===minCoord && cubeZ===minCoord){
          if(whiteSide === 0){solvedCorners++}
          else if(whiteSide === 4) moveString ="01D' 01B 01D 01B' 01D' 01B 01D";
          else moveString ="01L 01B' 01L' 01B 01L 01B' 01L'";
        }
        else if(cubeX === maxCoord && cubeY===minCoord && cubeZ===minCoord) moveString="01R' 01L 01B' 01L' 01R";
        //Back
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01D' 01B 01D";
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===maxCoord) moveString="01D' 01B2 01D";
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01B' 01D' 01B' 01D";
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===minCoord) moveString="01D' 01B' 01D";
      }
      if(i===pieceFour && solvedCorners === 3 ){ 
        if(cubeX === maxCoord && cubeY===minCoord && cubeZ===minCoord){
          if(whiteSide === 0){solvedCorners++}
          else if(whiteSide === 2) moveString ="01D 01B' 01D' 01B 01D 01B' 01D'";
          else moveString ="01R' 01B 01R 01B' 01R' 01B 01R";
        }
        //Back
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===maxCoord) {moveString=" 01R' 01B2 01R";}
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===maxCoord) {moveString="01D 01B' 01D'";}
        else if(cubeX===maxCoord && cubeY===maxCoord && cubeZ===minCoord) {moveString="01B 01D 01B' 01D'";}
        else if(cubeX===minCoord && cubeY===maxCoord && cubeZ===minCoord) {moveString="01R' 01B 01R";}
      }


    }

    const moveArray = moveStringToArray(moveString);

    if(solvedCorners < 4){
        return {moveSet : moveArray};
    }
    else{
      if(dim === 2){
        return {solveState : 6};
      }
      else{
        return {solveState : 3};
      }
    }
  }

  module.exports = solveWhiteCorners;