import solveWhiteCross from "./edges/solveWhiteCross"
import solveWhiteCorners from "./corners/solveWhiteCorners"
import solveMiddleEdges from "./edges/solveMiddleEdges"
import solveYellowCross from "./edges/solveYellowCross"
import alignYellowCross from "./edges/alignYellowCross"
import solveYellowCorners from "./corners/solveYellowCorners"
import alignYellowCorners from "./corners/alignYellowCorners"
import solveMiddles from "./solveMiddles"
import solveEdges from "./solveEdges"

const CONSTANTS = {
    SOLVE_MIDDLES: 0,
    SOLVE_EDGES: 0.1,
    SOLVE_WHITE_CROSS: 1,
    SOLVE_WHITE_CORNERS: 2,
    SOLVE_MIDDLE_EDGES: 3,
    SOLVE_YELLOW_CROSS: 4,
    ALIGN_YELLOW_CROSS: 5,
    ALIGN_YELLOW_CORNERS: 6,
    SOLVE_YELLOW_CORNERS: 7
}

function solver(solveState,rubiksObject,cubeDimension,moveStringToArray,solveMoves,rubiksIndex,middles,edges,corners){
    switch(solveState){
        case CONSTANTS.SOLVE_MIDDLES:
            return solveMiddles(rubiksObject,cubeDimension,moveStringToArray,rubiksIndex,middles);
        case CONSTANTS.SOLVE_EDGES:
            return solveEdges(rubiksObject,cubeDimension,moveStringToArray,edges,rubiksIndex);
        case CONSTANTS.SOLVE_WHITE_CROSS:
            return solveWhiteCross(rubiksObject,cubeDimension,moveStringToArray,edges);
        case CONSTANTS.SOLVE_WHITE_CORNERS:
            return solveWhiteCorners(rubiksObject,cubeDimension,moveStringToArray,corners);
        case CONSTANTS.SOLVE_MIDDLE_EDGES:
            return solveMiddleEdges(rubiksObject,moveStringToArray,edges,cubeDimension);
        case CONSTANTS.SOLVE_YELLOW_CROSS:
            return solveYellowCross(rubiksObject,moveStringToArray,edges,cubeDimension);
        case CONSTANTS.ALIGN_YELLOW_CROSS:
            return alignYellowCross(rubiksObject,moveStringToArray,edges,cubeDimension);
        case CONSTANTS.ALIGN_YELLOW_CORNERS:
            return alignYellowCorners(rubiksObject,cubeDimension,moveStringToArray,corners);
        case CONSTANTS.SOLVE_YELLOW_CORNERS:
            return solveYellowCorners(rubiksObject,cubeDimension,moveStringToArray,solveMoves,corners);
        default:
            console.log("invalid solve state");
    }
}

export default solver;