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

    // Solves top back edge
    if(solved.z===maxCoord){
        // top right middle edge
        if(current.y<maxCoord && current.z===maxCoord && current.x===maxCoord){ //a
            // if yellow side is on the right face (red center)
            if(yellowSide===RIGHT){//a.1
                console.log("solve it");
                moveString = `01L' 01B 01L ${move("",current.y+1,"F'")} 01L' 01B 01L 01B2 ${move("",current.y+1,"F")}`;
            }
            // if yellow side is on the upward face (blue center)
            else {//a.2
                console.log("flip it");
                moveString = `01R 01B 01R' 01B' 01U' 01B 01U`;
            }
        }
        // top back edge (wrong position)
        else if(current.z===solved.z && current.y===solved.y){ // b
            console.log("remove it");
            moveString = `01L' 01B 01L ${move("",dim-(current.x),"F'")} 01L' 01B 01L 01B2 ${move("",dim-(current.x),"F")}`;
        }
        // back edge that isn't top
        else if(current.y===maxCoord && !(current.z===maxCoord)){ // c
            moveString = `01U' 01B 01U`;
        }
        // middle edge that isn't top right (just places piece on back edges)
        else if(current.y!==maxCoord){ // d
            if(current.z===maxCoord && current.x===minCoord){
                moveString = `01L' 01B' 01L 01B`
            }
            else if(current.z===minCoord && current.x===minCoord){
                moveString = `01L 01B' 01L' 01B`
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
    // Solves right back edge
    else if(solved.x===maxCoord){
        // Step one, try first algorithm and note placements
        // Might be able to tweak just a little for this one to work
        // 01L' 01B 01L (02F' c.y+1) 01L' 01B 01L 01B2 (02F c.y+1) // original
        // 01U' 01B 01U (02F' c.y+1) 01U' 01B 01U 01B2 (02F c.y+1) // converted
        // Algorithm can be used, does not disrupt the placement of pieces on first edge
        // Further notes, original algo will also work for the 3rd edge as it preserves two other edges

        // a // change coords
        // a.1 // small mods to algo to keep from displacing first edge
        // a.2 // not tested
        if(current.y<maxCoord && current.z===minCoord && current.x===maxCoord){ //a
            // if yellow side is on the down face (green center)
            if(yellowSide===DOWN){//a.1
                console.log("solve it");

                // 01U' 01B 01U (02F' c.y+1) 01U' 01B 01U 01B2 (02F c.y+1) // converted
                moveString = `01U' 01B 01U ${move("",current.y+1,"F'")} 01U' 01B 01U 01B2 ${move("",current.y+1,"F")} 01R' 01B2 01R`;
            }
            // if yellow side is on the right face (red center)
            else {//a.2
                console.log("flip it");
                moveString = `01D 01B 01D' 01B' 01R' 01B 01R2 01B' 01R'`;
            }
        }

        // b // change coords + small mod to algo
        else if(current.x===solved.x && current.y===solved.y){ // b
            console.log("remove it");
            moveString = `01U' 01B 01U ${move("",current.z+1,"F'")} 01U' 01B 01U 01B2 ${move("",current.z+1,"F")} 01R' 01B2 01R`;
        }


        // c // hard code those instead of generalizing
        else if(current.y===maxCoord){
            if(current.z===minCoord){
                moveString = `01R' 01B 01R2 01B' 01R'`;
            } else if(current.x===minCoord){
                moveString = `01R' 01B2 01R2 01B2 01R'`;
            }
        }

        // d // change coords
        else if(current.y!==maxCoord){
            if(current.x===maxCoord && current.z===maxCoord){
                moveString = `01B 01R 01B 01R' 01B2`
            }
            else if(current.x===minCoord && current.z===maxCoord){
                moveString = `01L' 01B' 01L 01B`
            }
            else if(current.x===minCoord && current.z===minCoord){
                moveString = `01D' 01B 01D 01B'`
            }
        }
    }
    // Solves bottom back edge
    else if(solved.z===minCoord){
        if(current.y<maxCoord && current.z===minCoord && current.x===minCoord){ //a
            // if yellow side is on the left face (orange center)
            if(yellowSide===LEFT){//a.1
                console.log("solve it");
                moveString = `01R' 01B 01R ${move("",current.y+1,"F'")} 01R' 01B 01R 01B2 ${move("",current.y+1,"F")} 01D 01U' 01B2 01D' 01U`;
            }
            // if yellow side is on the down face (green center)
            else {//a.2
                console.log("flip it");
                moveString = `01L 01B 01L' 01B' 01D' 01B 01D2 01B' 01D' 01B' 01R' 01B' 01R 01B2`;
            }
        }

        // b // change coords + small mod to algo
        else if(current.z===solved.z && current.y===solved.y){ // b
            console.log("remove it");
            moveString = `01R' 01B 01R ${move("",current.x+1,"F'")} 01R' 01B 01R 01B2 ${move("",current.x+1,"F")} 01D 01U' 01B2 01D' 01U`;
        }

        else if(current.y===maxCoord){ // c
            moveString = `01D' 01B 01D2 01B' 01D'`;
        }
        else if(current.y<maxCoord){
            moveString = `01D 01R 01U 01B 01U' 01R' 01D'`;
        }
        // permutations of the original algo should work
    }
    else if(solved.x===minCoord){
        console.log("we aint here yet");

        if(current.y<maxCoord && current.z===maxCoord && current.x===minCoord){ //a
            // if yellow side is on the left face (orange center)
            if(yellowSide===LEFT){//a.1
                console.log("solve it");
                moveString = `01D' 01B 01D ${move("",current.y+1,"F'")} 01D' 01B 01D 01B2 ${move("",current.y+1,"F")} 01L 01R' 01B2 01L' 01R 01L 01D 01R 01B 01R' 01D' 01L'`;
            }
            // if yellow side is on the down face (green center)
            else {//a.2
                console.log("flip it");
                moveString = `01U 01B 01U' 01B' 01L' 01B 01L2 01B' 01L' 01B' 01D' 01B' 01D 01B2`;
            }
        }

        else if(current.x===solved.x && current.y===solved.y){ // b
            console.log("remove it");
            moveString = `01D' 01B 01D ${move("",dim-current.z,"F'")} 01D' 01B 01D 01B2 ${move("",dim-current.z,"F")} 01L 01R' 01B2 01L' 01R 01L 01D 01R 01B 01R' 01D' 01L'`;
        }

        
        // 01D' 01B 01D ${move("",current.y+1,"F'")} 01D' 01B 01D 01B2 ${move("",current.y+1,"F")} 01L 01R' 01B2 01L' 01R 01L 01D 01R 01B 01R' 01D' 01L'
        // further analysis needs on displacements to determine if original algos are an option here
        // 01U 01B 01U' 01B' 01L' 01B 01L2 01B' 01L' 01B' 01D' 01B' 01D 01B2

        // 01D' 01B 01D ${move("",dim-current.z,"F'")} 01D' 01B 01D 01B2 ${move("",dim-current.z,"F")} 01L 01R' 01B2 01L' 01R 01L 01D 01R 01B 01R' 01D' 01L'

        //else if(current.y<maxCoord){
            //moveString = `01D 01R 01U 01B 01U' 01R' 01D'`;
            //if(current.x===maxCoord and current.z===maxCoord) checkfaces to determine which of first two should be used
        //}
    }


    return moveString;
}

module.exports = solveBackEdgeSegments;