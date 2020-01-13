function solveYellowCross(rubiksObject,moveStringToArray){
    let moveString = "";
    let cube = rubiksObject;
    let recipe = "01U 01R 01B 01R' 01B' 01U'";
    let cubeIndex = [19,21,23,25];
    let cubeAtIndex = [];

    for(let i = 0; i < 4; i++){
      if(cube[cubeIndex[i]][6] === 1 && 
         cube[cubeIndex[i]][7] === 2 &&
         cube[cubeIndex[i]][8] === 2) cubeAtIndex[0] = cube[cubeIndex[i]][3];
      else if (cube[cubeIndex[i]][6] === 0 && 
        cube[cubeIndex[i]][7] === 2 &&
        cube[cubeIndex[i]][8] === 1) cubeAtIndex[1] = cube[cubeIndex[i]][3];
      else if (cube[cubeIndex[i]][6] === 2 && 
        cube[cubeIndex[i]][7] === 2 &&
        cube[cubeIndex[i]][8] === 1) cubeAtIndex[2] = cube[cubeIndex[i]][3];
      else if (cube[cubeIndex[i]][6] === 1 && 
        cube[cubeIndex[i]][7] === 2 &&
        cube[cubeIndex[i]][8] === 0) cubeAtIndex[3] = cube[cubeIndex[i]][3];
    }

    if(cube[19][3] === "yellow" &&
       cube[21][3] === "yellow" &&
       cube[23][3] === "yellow" &&
       cube[25][3] === "yellow" 
      );

    //Line
    else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[3] === "yellow" ) {moveString = "01B " + recipe;}
    else if (cubeAtIndex[1] === "yellow" && cubeAtIndex[2] === "yellow" ) {moveString = recipe;}

    //L-Shape
    else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[2] === "yellow" ) {moveString = "01B2 " + recipe + " " + recipe;}
    else if (cubeAtIndex[1] === "yellow" && cubeAtIndex[3] === "yellow" ) {moveString = recipe + " " + recipe;}
    else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[1] === "yellow" ) {moveString = "01B " + recipe + " " + recipe;}
    else if (cubeAtIndex[2] === "yellow" && cubeAtIndex[3] ) {moveString = "01B' " + recipe + " " + recipe;}

    else moveString = recipe;
    
    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray}; 
    else return {solveState:5};
  }

  module.exports = solveYellowCross;