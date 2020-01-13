import solveWhiteCross from "./edges/solveWhiteCross"
import solveWhiteCorners from "./corners/solveWhiteCorners"
import solveMiddleEdges from "./edges/solveMiddleEdges"
import solveYellowCross from "./edges/solveYellowCross"
import alignYellowCross from "./edges/alignYellowCross"
import solveYellowCorners from "./corners/solveYellowCorners"
import alignYellowCorners from "./corners/alignYellowCorners"

function solver(solveState,rubiksObject,cubeDimension,moveStringToArray,solveMoves){
    switch(solveState){
        case 0:
            break;
        case 1:
            return solveWhiteCross(rubiksObject,cubeDimension,moveStringToArray);
        case 2:
            return solveWhiteCorners(rubiksObject,cubeDimension,moveStringToArray);
        case 3:
            return solveMiddleEdges(rubiksObject,moveStringToArray);
        case 4:
            return solveYellowCross(rubiksObject,moveStringToArray);
        case 5:
            return alignYellowCross(rubiksObject,moveStringToArray);
        case 6:
            return alignYellowCorners(rubiksObject,cubeDimension,moveStringToArray);
        case 7:
            return solveYellowCorners(rubiksObject,cubeDimension,moveStringToArray,solveMoves);
        default:
            console.log("invalid solve state");
    }
}

export default solver;