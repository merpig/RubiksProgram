function sectionSpliter(edges){
  let splitEdges = [];
  let edgeSegments = edges.length/3;
  const edgeSections = 4;
  let segmentsPerSection = edgeSegments/edgeSections;

  let temp = [];
  for(let i = edgeSegments; i < edgeSegments*2;i++){
    temp.push(edges[i]);
    if(temp.length===segmentsPerSection){
      splitEdges.push(temp);
      temp=[];
    }
  }

  return splitEdges;
}

function inMiddle(coord,maxCoord,minCoord){
  return coord>minCoord&&coord<maxCoord;
}

function move(depth,side){
  return ((depth<10? "0":"") + depth + side);
}

function solveYellowCross(rubiksObject,moveStringToArray,edges,dim){

    if(dim === 2) {return {solveState : 5};}

    let moveString = "";
    let cube = rubiksObject;
    let recipe = "01U 01R 01B 01R' 01B' 01U'";

    let maxCoord = dim-1;
    let minCoord = 0;

    let fourEdgeSections = sectionSpliter(edges);
    //console.log(edges);
    let cubeIndex = [fourEdgeSections[0][0],fourEdgeSections[3][0],fourEdgeSections[1][0],fourEdgeSections[2][0]];
    //console.log(cubeIndex);
    let cubeAtIndex = [];

    for(let i = 0; i < 4; i++){
      if(inMiddle(cube[cubeIndex[i]][6],maxCoord,minCoord) && 
         cube[cubeIndex[i]][7] === maxCoord &&
         cube[cubeIndex[i]][8] === maxCoord) cubeAtIndex[0] = cube[cubeIndex[i]][3];
      else if (cube[cubeIndex[i]][6] === minCoord && 
        cube[cubeIndex[i]][7] === maxCoord &&
        inMiddle(cube[cubeIndex[i]][8],maxCoord,minCoord)) cubeAtIndex[1] = cube[cubeIndex[i]][3];
      else if (cube[cubeIndex[i]][6] === maxCoord && 
        cube[cubeIndex[i]][7] === maxCoord &&
        inMiddle(cube[cubeIndex[i]][8],maxCoord,minCoord)) cubeAtIndex[2] = cube[cubeIndex[i]][3];
      else if (inMiddle(cube[cubeIndex[i]][6],maxCoord,minCoord) && 
        cube[cubeIndex[i]][7] === maxCoord &&
        cube[cubeIndex[i]][8] === minCoord) cubeAtIndex[3] = cube[cubeIndex[i]][3];
    }

    let skip = false;

    if(dim%2===0&&dim>=4){
      let counter = 0;
      for(let i = 0; i < 4; i++){
        if(cube[cubeIndex[i]][3] === "yellow") counter++;
      }
      if(counter%2){
        //console.log("fix implemented");
        skip=true;
        moveString=
          `${move(dim/2,"r")} 01B2 ${move(dim/2,"r'")} 01B2 
          ${move(dim/2,"r")} 01B2 ${move(dim/2,"r")} 01B2 
          ${move(dim/2,"l'")} 01B2 ${move(dim/2,"r")} 01B2 
          ${move(dim/2,"r'")} 01B2 01D2 
          ${move(dim/2,"r2")} 01D2 ${move(dim,"r'")}`;
      };
    }

    if(!skip){
      if(cube[cubeIndex[0]][3] === "yellow" &&
        cube[cubeIndex[1]][3] === "yellow" &&
        cube[cubeIndex[2]][3] === "yellow" &&
        cube[cubeIndex[3]][3] === "yellow" 
        ); 

      //Line
      else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[3] === "yellow" ) {moveString = "01B " + recipe; }
      else if (cubeAtIndex[1] === "yellow" && cubeAtIndex[2] === "yellow" ) {moveString = recipe;}

      //L-Shape
      else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[2] === "yellow" ) {moveString = "01B2 " + recipe + " " + recipe;}
      else if (cubeAtIndex[1] === "yellow" && cubeAtIndex[3] === "yellow" ) {moveString = recipe + " " + recipe;}
      else if (cubeAtIndex[0] === "yellow" && cubeAtIndex[1] === "yellow" ) {moveString = "01B " + recipe + " " + recipe;}
      else if (cubeAtIndex[2] === "yellow" && cubeAtIndex[3] ) {moveString = "01B' " + recipe + " " + recipe;}

      else {moveString = recipe;}
    }
    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray}; 
    else return {solveState:5};
  }

  module.exports = solveYellowCross;