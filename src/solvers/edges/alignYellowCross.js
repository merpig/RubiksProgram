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

function alignYellowCross(rubiksObject,moveStringToArray,edges,dim){

    if(dim === 2) {return {solveState : 6};}

    let moveString = "";
    let cube = rubiksObject;

    let maxCoord = dim-1;
    let minCoord = 0;

    let fourEdgeSections = sectionSpliter(edges);
    let cubeIndex = [fourEdgeSections[0][0],fourEdgeSections[3][0],fourEdgeSections[1][0],fourEdgeSections[2][0]];

    if(inMiddle(cube[cubeIndex[0]][6],maxCoord,minCoord) && cube[cubeIndex[0]][7] === maxCoord && cube[cubeIndex[0]][8] === maxCoord){
        //Check if other pieces are in place
        if(cube[cubeIndex[1]][6] === minCoord && inMiddle(cube[cubeIndex[1]][8],maxCoord,minCoord)&&
            cube[cubeIndex[2]][6] === maxCoord && inMiddle(cube[cubeIndex[2]][8],maxCoord,minCoord));

        else if(cube[cubeIndex[1]][6] === maxCoord && inMiddle(cube[cubeIndex[2]][8],maxCoord,minCoord) &&
        inMiddle(cube[cubeIndex[3]][6],maxCoord,minCoord) && cube[cubeIndex[3]][8] === minCoord) moveString = "01D 01B 01D' 01B 01D 01B2 01D' 01B2 01L 01B 01L' 01B 01L 01B2 01L' 01B";

        else if(cube[cubeIndex[3]][6] === maxCoord && inMiddle(cube[cubeIndex[3]][8],maxCoord,minCoord)) moveString = "01R 01B 01R' 01B 01R 01B2 01R' 01B";

        else if(cube[cubeIndex[3]][6] === minCoord && inMiddle(cube[cubeIndex[3]][8],maxCoord,minCoord)) moveString = "01R 01B 01R' 01B 01R 01B2 01R' 01B";


        //Make moves
    }
    else if(cube[cubeIndex[0]][6] === maxCoord && cube[cubeIndex[0]][7] === maxCoord && inMiddle(cube[cubeIndex[0]][8],maxCoord,minCoord)){
        moveString = "01B";
    }
    else moveString = "01B'"

    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray};
    else return{solveState:6};
}

module.exports = alignYellowCross;