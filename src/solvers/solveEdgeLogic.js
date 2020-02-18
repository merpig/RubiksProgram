import frontEdges from "./edges/solveFrontEdgeSegments";

function side(rubiksObject){
    return rubiksObject.indexOf('white');
}

function solveEdgeLogic(cubeDimensions,rubiksObjectAtIndex,index,cube,edges){

    const dim = cubeDimensions;
    const edgesPerSection = 4;
    const edgeLength = dim-2
    const section = Math.floor(index/(edgeLength*edgesPerSection));
    let whiteSide = null;

    let moveString = "";

    // Coordinates organized
    let current = {
        x:rubiksObjectAtIndex[6],
        y:rubiksObjectAtIndex[7],
        z:rubiksObjectAtIndex[8]
    };
    let solved = {
        x:rubiksObjectAtIndex[9],
        y:rubiksObjectAtIndex[10],
        z:rubiksObjectAtIndex[11]
    };

    whiteSide = side(rubiksObjectAtIndex);

    if(current.x===solved.x && current.y===solved.y && current.z===solved.z){
        console.log("SOLVED");
    }
    else {
        switch(section){
            case 0: 
                moveString = frontEdges(current,solved,dim,whiteSide);
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                console.log("Should never reach here");
        }
        console.log("Section: ", section);
        section === 0 ? console.log("White side: ",whiteSide) : console.log("White side: N/A");
        console.log("Current: ",current,"\nSolved: ",solved);
    }

    return moveString;
}

export default solveEdgeLogic;