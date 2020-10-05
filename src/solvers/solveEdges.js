import solveEdgeLogic from './solveEdgeLogic';

function solveEdges(cube,dim,moveStringToArray,edges,index){
    const numCubeEdges = 12;
    const innerEdgeLength = dim-2;
    const numEdges = innerEdgeLength * numCubeEdges;
    let moveString = "";
    const obj = {};

    if (index < numEdges){
        moveString = solveEdgeLogic(dim,cube[edges[index]],index,cube,edges);
        moveString.trim().length ? obj.moveSet = moveStringToArray(moveString) : obj.rubiksIndex = index+1;
    }

    else {
        if(dim<11){
            obj.solveState = 1;
            obj.rubiksIndex = 0;
            obj.currentFunc = "Solving";
            obj.moveSet = ['stop'];
          } else {
            obj.solveState = -1;
            obj.rubiksIndex = 0;
            obj.currentFunc = "None";
          }
    }

    return obj;
}

export default solveEdges;