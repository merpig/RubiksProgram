function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

function extractFromFront(current,maxCoord,minCoord){
    if(current.z===maxCoord){
        return `${move("",current.x+1,"L'")} 01B' 01R 01B ${move("",current.x+1,"L")} 01R'`
    }
    else if(current.x===maxCoord){
        return `${move("",current.z+1,"D")} 01B' 01D 01B ${move("",current.z+1,"D'")} 01D'`
    }
    else if(current.z===minCoord){
        return `${move("",current.x+1,"L")} 01B' 01L 01B ${move("",current.x+1,"L'")} 01L'`
    }
    else if(current.x===minCoord){
        return `${move("",current.z+1,"D'")} 01B' 01U 01B ${move("",current.z+1,"D")} 01U'`
    }
}

function moveFromMiddleToBack(current,maxCoord,minCoord,whiteSide){
    if(current.x===maxCoord && current.z===maxCoord){// Top Right
        if(whiteSide===1){
            return `01U' 01B 01U`
        }
        else{
            return `01R 01B 01R'`
        }
    }
    if(current.x===minCoord && current.z===maxCoord){// Top Left
        if(whiteSide===1){
            return `01U 01B 01U'`
        }
        else {
            return `01L' 01B 01L`
        }
    }
    if(current.x===maxCoord && current.z===minCoord){// Bottom Right
        if(whiteSide===5){
            return `01D 01B 01D'`
        }
        else {
            return `01R' 01B 01R`
        }
    }
    if(current.x===minCoord && current.z===minCoord){// Bottom Left
        if(whiteSide===1){
            return `01D' 01B 01U`
        }
        else {
            return `01L 01B 01L'`
        }
    }
}

function flipPieceOnBack(current,maxCoord,minCoord){
    if(current.z===maxCoord){//top
        return `01U 01R 01B2 01R' 01U' 01B'`
    }
    else if(current.x===maxCoord){//right
        return `01R 01D 01B2 01D' 01R' 01B'`
    }
    else if(current.z===minCoord){//down
        return `01D 01L 01B2 01L' 01D' 01B'`
    }
    else if(current.x===minCoord){//left
        return `01L 01U 01B2 01U' 01L' 01B'`
    }
}

function solveFromBackToFront(current,solved,maxCoord,minCoord){
    if(current.z===maxCoord&&solved.z===maxCoord){
        return `${move("",current.x+1,"L")} 01F 01R' 01F' ${move("",current.x+1,"L'")} 01F 01R 01F'`
    }
    else if(current.x===maxCoord && solved.x===maxCoord){
        return `${move("",current.z+1,"D'")} 01F 01D' 01F' ${move("",current.z+1,"D")} 01F 01D 01F'`
    }
    else if(current.z===minCoord && solved.z===minCoord){
        return `${move("",current.x+1,"L'")} 01F 01L' 01F' ${move("",current.x+1,"L")} 01F 01L 01F'`
    }
    else if(current.x===minCoord && solved.x===minCoord){
        return `${move("",current.z+1,"D")} 01F 01U' 01F' ${move("",current.z+1,"D'")} 01F 01U 01F'`
    }
    else return ``
}



let solveFrontEdgeSegments = (current,solved,dim,whiteSide) => {
    const BACK=3;
    const maxCoord = dim-1;
    const minCoord = 0;
    let moveString = "";
    // let solvedPosition = "top";

    // if(solved.x===maxCoord) {solvedPosition = "right";}
    // else if(solved.z===minCoord) {solvedPosition = "bottom";}
    // else if(solved.x===minCoord) {solvedPosition = "left";}
    
    if(current.y===minCoord){
        moveString = extractFromFront(current,maxCoord,minCoord);
    }
    else if(current.y>minCoord&&current.y<maxCoord){
        moveString = moveFromMiddleToBack(current,maxCoord,minCoord,whiteSide);
    }
    else if(current.y===maxCoord && whiteSide===BACK){
        moveString = flipPieceOnBack(current,maxCoord,minCoord);
    }
    else if(current.z===solved.z&&current.x===solved.x){
        moveString = solveFromBackToFront(current,solved,maxCoord,minCoord);
    }
    else {
        moveString = `01B`;
    }
        
    

    return moveString;
}

module.exports = solveFrontEdgeSegments;