function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveBackEdgeSegments = (current,solved,dim,yellowSide) => {
    const FRONT=0,UP=1,RIGHT=2,BACK=3,LEFT=4,DOWN=5;
    const maxCoord = dim-1;
    const minCoord = 0;
    let moveString = "";
    let solvedPosition = "top";
    let inMiddleSection = current.y > minCoord && current.y < maxCoord;

    if(solved.x===maxCoord) {solvedPosition = "right";}
    else if(solved.z===minCoord) {solvedPosition = "bottom";}
    else if(solved.x===minCoord) {solvedPosition = "left";}

    // Solve just top edges for now
    if(solved.z===maxCoord){
        if(current.y<maxCoord && current.z===maxCoord && current.x===maxCoord){
            if(yellowSide===RIGHT){
                console.log("solve it");
                moveString = `01L' 01B 01L ${move("",current.y+1,"F'")} 01L' 01B 01L 01B2 ${move("",current.y+1,"F")}`;
            }
            else {
                console.log("flip it");
                moveString = `01R 01B 01R' 01B' 01U' 01B 01U`;
            }
        }
        else if(current.z===solved.z && current.y===solved.y){
            console.log("remove it");
            moveString = `01L' 01B 01L ${move("",dim-(current.x+1),"F'")} 01L' 01B 01L 01B2 ${move("",dim-(current.x+1),"F")}`;
        }
        else if(current.y===maxCoord && !(current.z===maxCoord)){
            moveString = `01U' 01B 01U`;
        }
        else if(current.y!==maxCoord){
            if(current.z===maxCoord && current.x===minCoord){
                moveString= `01L' 01B' 01L 01B`
            }
            else if(current.z===minCoord && current.x===minCoord){
                moveString= `01L 01B' 01L' 01B`
            }
            else if(current.z===minCoord && current.x===maxCoord){
                moveString = `01R' 01B 01R 01B'`
            }
        }
        // moves in parenthesis are the flex moves (flex axis included)
        // if piece in middle between blue and red. Yellow face must also be on red
        // 01L' 01B 01L (02F' c.y+1) 01L' 01B 01L 01B2 (02F c.y+1)
        //
        // else if current.z===solved.z and current.y===solved.y extract piece
        // (could probably just use the solve to put a different piece there. c.x+1 instead of c.y+1)
        // 01L' 01B 01L (02F' c.x+1) 01L' 01B 01L 01B2 (02F c.x+1)
        //
        // else reposition piece to satisfy solve conditions
    //          if on back 
    //              then move to top or right depending on which side yellow is on
    //              then insert into top right middle
    //              readjust back so that top back edge is back where it was
    //          else
    //              move to top without displacing top back edge
    }
    else if(solved.x===maxCoord){
        
    }


    return moveString;
}

module.exports = solveBackEdgeSegments;