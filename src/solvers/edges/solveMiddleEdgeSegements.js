function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveMiddleEdgeSegments = (current,solved,dim,blueSide,greenSide) => {
    const maxCoord = dim-1;
    const minCoord = 0;

    let moveString = "";

    // where blue and orange meet
    let firstEdge = (solved.x===minCoord && solved.z===maxCoord);
    // where blue and red meet
    let secondEdge = (solved.x===maxCoord && solved.z===maxCoord);
    // where green and red meet
    let thirdEdge = (solved.x===maxCoord && solved.z===minCoord);

    // flip edge segment in place
    let flip = "01R 01U' 01B 01R' 01U";
    // move solved edge to flip location to flip and then return
    let firstPieceFlip = "01U2 01R 01U' 01B 01R' 01U'";

    let flip2 = "01D 01R' 01B 01D' 01R";
    let firstPieceFlip2 = "01R2 01D 01R' 01B 01D' 01R'";

    let flip3 = "01L 01D' 01B 01L' 01D";
    let firstPieceFlip3 = "01D2 01L 01D' 01B 01L' 01D'";

    // solves piece diagonally to solved location
    let solveUp = "01F 02F 01R 01U' 01B 01R' 01U 01F' 02F'";
    let solveDown = "03F 04F 01R 01U' 01B 01R' 01U 03F' 04F'";

    let solveUp2 = "01F 02F 01D 01R' 01B 01D' 01R 01F' 02F'";
    let solveDown2 = "03F 04F 01D 01R' 01B 01D' 01R 03F' 04F'";

    let solveUp3 = "01F 02F 01L 01D' 01B 01L' 01D 01F' 02F'";
    let solveDown3 = "03F 04F 01L 01D' 01B 01L' 01D 03F' 04F'";

    if(dim===4){
        if(firstEdge){
            if(current.x===minCoord&&current.z===maxCoord){
                moveString=firstPieceFlip;
            }
            else if(current.x===maxCoord&&current.z===maxCoord){
                if(current.y===solved.y){
                    moveString=flip;
                }
                else{
                    if(current.y===(maxCoord-1)){
                        moveString=solveUp;
                    }
                    else{
                        moveString=solveDown;
                    }
                }
            }
            else if(current.x===minCoord&&current.z===minCoord){
                moveString="01D2 01R2";
            }
            else if(current.x===maxCoord&&current.z===minCoord){
                moveString="01R2";
            }
        }
        else if(secondEdge){
            if(current.x===maxCoord&&current.z===maxCoord){
                moveString=firstPieceFlip2;
            }
            else if(current.x===maxCoord&&current.z===minCoord){
                if(current.y===solved.y){
                    moveString=flip2;
                }
                else{
                    if(current.y===(maxCoord-1)){
                        moveString=solveUp2;
                    }
                    else{
                        moveString=solveDown2;
                    }
                }
            }
            else if(current.x===minCoord&&current.z===minCoord){
                moveString="01D2";
            }
        }
        else if(thirdEdge){
            if(current.x===maxCoord&&current.z===minCoord){
                moveString=firstPieceFlip3;
            }
            else if(current.x===minCoord&&current.z===minCoord){
                if(current.y===solved.y){
                    moveString=flip3;
                }
                else{
                    if(current.y===(maxCoord-1)){
                        moveString=solveUp3;
                    }
                    else{
                        moveString=solveDown3;
                    }
                }
            }
        }
    }
    return moveString;
}

module.exports = solveMiddleEdgeSegments;