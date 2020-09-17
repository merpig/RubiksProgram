import frontEdges from "./edges/solveFrontEdgeSegments";
import backEdges from "./edges/solveBackEdgeSegments";
import middleEdges from "./edges/solveMiddleEdgeSegements";

function side(rubiksObject,color){
    return rubiksObject.indexOf(color);
}

function solveEdgeLogic(cubeDimensions,rubiksObjectAtIndex,index,cube,edges){

    const dim = cubeDimensions;
    const edgesPerSection = 4;
    const edgeLength = dim-2
    const section = Math.floor(index/(edgeLength*edgesPerSection));
    const whiteSide = side(rubiksObjectAtIndex,'white');
    const yellowSide = side(rubiksObjectAtIndex,'yellow');
    const blueSide = side(rubiksObjectAtIndex,'blue');
    const greenSide = side(rubiksObjectAtIndex,'green');

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

    if(current.x===solved.x && current.y===solved.y && current.z===solved.z){
        //console.log(rubiksObjectAtIndex);
        if( (whiteSide === 0  && section === 0)||
            (yellowSide === 3 && section === 1)||
            (blueSide === 1   && section === 2)||
            (greenSide === 5  && section === 2)){
            //console.log("SOLVED");
            return "";
        }      
    }
    switch(section){
        case 0: 
            // Finished for now
            moveString = frontEdges(current,solved,dim,whiteSide);
            break;
        case 1:
            // Finished for now
            moveString = backEdges(current,solved,dim,yellowSide);
            break;
        case 2:
            // Not started
            moveString = middleEdges(current,solved,dim);
            break;
        default:
            console.log("Should never reach here");
    }

    return moveString;
}

export default solveEdgeLogic;