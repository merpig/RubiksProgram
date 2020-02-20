function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveBackEdgeSegments = (current,solved,dim,whiteSide) => {
    const FRONT=0,UP=1,RIGHT=2,BACK=3,LEFT=4,DOWN=5;
    const maxCoord = dim-1;
    const minCoord = 0;
    let moveString = "";
    let solvedPosition = "top";

    if(solved.x===maxCoord) {solvedPosition = "right";}
    else if(solved.z===minCoord) {solvedPosition = "bottom";}
    else if(solved.x===minCoord) {solvedPosition = "left";}


    return moveString;
}

module.exports = solveBackEdgeSegments;