import solveEdgeLogic from './solveEdgeLogic';

function solveEdges(cube,dim,moveStringToArray,edges,index){
    const numCubeEdges = 12;
    const innerEdgeLength = dim-2;
    const numEdges = innerEdgeLength * numCubeEdges;
    let moveString = "";
    const obj = {};



    const moveArray = moveStringToArray(moveString);

    if (index < numEdges){
        console.log(`Index: ${index}, Piece: ${edges[index]}`);
        moveString += ((moveString.length) ? " ":"") + solveEdgeLogic(dim,cube[edges[index]],index,cube,edges,);
        moveString.trim().length ? obj.moveSet = moveArray : obj.rubiksIndex = index+1;

        console.log(moveString + "\n-------------------------------");
    }

    else {
        console.log("Ready to initiate 3x3 solver");
        obj.solveState = -1;
        obj.rubiksIndex = 0;
        obj.currentFunc = "None";
    }

    return obj;
}

export default solveEdges;