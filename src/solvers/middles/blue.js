/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      yellow.js
 *      Started: Saturday, December 14, 2019
 *      
 *      
 *      Consider starting from scratch. Logic needs reworking on certain cases. System is hard to
 *      code with. New functions/variables to help clean up/simplify logic.
 */

let solveBlueMiddle = (current,solved,dim,index) => {
    let currentSide = "F";
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    console.log(`Currently on side: ${currentSide}`);
    console.log(`Current position: ${JSON.stringify(current)}`);
    console.log(`Solved position: ${JSON.stringify(solved)}`);
    let moveString = "";


    if(currentSide==="U"){
        console.log("move out of top side")
        // F,U2,F',U2
        moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
        moveString += " " + ((current.x+1)<10? "0" : "") + (current.x+1) + "U2";
        moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
        moveString += " " + ((current.x+1)<10? "0" : "") + (current.x+1) + "U2";
    }

    else if(currentSide==="R"){
        console.log("move piece to side D or solve pattern for side R");
        // 
        if(current.y===solved.y){
            moveString+= "01R";
        }
        else{
            moveString+= ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F'";

            if(current.y!==solved.y && current.z!==solved.x){
                if((solved.x===1||solved.x===dim-2)&&(solved.y===1||solved.y===dim-2))
                    moveString+= " 01R";
                else{
                    moveString+= " 01R";
                }
            }
            else if(current.z!==solved.x){
                moveString+= " 01R";
                console.log("r1")
            }
            else if(current.y!==solved.y){
                moveString+= " 01R";
                console.log("r2")
            }

            moveString+= " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "U2";

            moveString+= " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F";

            moveString+= " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "U2";

        }
    }

    else if(currentSide==="L"){
        console.log("move piece to side D or solve pattern for side L");
        if(current.y===solved.y){
            moveString+= "01L";
        }
        else{
            moveString+= ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F";

            if(current.y!==solved.y && current.z!==solved.x){
                if((solved.x===1||solved.x===dim-2)&&(solved.y===1||solved.y===dim-2))
                    moveString+= " 01L2";
                else{
                    moveString+= " 01L";
                }
            }
            else if(current.z!==solved.x){
                moveString+= " 01L";
                console.log("l1")
            }
            else if(current.y!==solved.y){
                moveString+= " 01L";
                console.log("l2")
            }

            moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U2";

            moveString+= " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F'";

            moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U2";

            /* Position piece so it can be rotated into place.
               Account for y = Math.floor(dim/2) on dim%2 === 1
            */

            // Rotate into place dim-z U2

            // F' to put back on blue face

            // U2 to put yellow/white back in place
        }

    }

    else {
        console.log("solve pattern for side D");
        if(current.y!==solved.y){
            moveString += "01D";
        }
        else{
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F'";
            moveString += " 01R";
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F";
        }
    }

    return moveString;
}

module.exports = solveBlueMiddle;