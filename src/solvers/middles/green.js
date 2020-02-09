/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      green.js
 *      Started: 
 *      
 */

let solveGreenMiddle = (current,solved,dim,index,fixMiddle) => {
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

    if(currentSide==="D"){
        moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F";

        if(dim-(current.x+1)<Math.floor(dim/2)) {
            if(current.y<Math.floor(dim/2)) moveString += " 01R";
            else moveString += " 01R'";
        }
        else {
            if(current.y<Math.floor(dim/2)) moveString += " 01R'";
            else moveString += " 01R";
        }

        moveString += " " + (((current.x+1))<10? "0" : "") + ((current.x+1)) + "U2"

        if(dim-(current.x+1)<Math.floor(dim/2)) {
            if(current.y<Math.floor(dim/2)) moveString += " 01R1";
            else moveString += " 01R";
        }
        else {
            if(current.y<Math.floor(dim/2)) moveString += " 01R";
            else moveString += " 01R'";
        }

        moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";

        moveString += " " + (((current.x+1))<10? "0" : "") + (current.x+1) + "U2"
    }

    else if (currentSide==="R"){
        if(current.y===solved.y&&current.z===solved.x){
            moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01L'"; //a
            else moveString += " 01L2";

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01L'"; //a1

            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01L";  //a1'

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01L";  //a'
            else moveString += " 01L2";

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";

            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
        }
        else moveString = "01R'"
    }

    else if (currentSide==="L"){
        if(current.y===solved.y&&current.z===(dim-(solved.x+1))){
            moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01R"; //a
            else moveString += " 01R2";

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01R"; //a1

            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01R'";  //a1'

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";

            if(solved.y===Math.floor(dim/2)&&dim%2) moveString += " 01R'";  //a'
            else moveString += " 01R2";

            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";

            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
        }
        else moveString = "01L"
    }

    return moveString;
}

module.exports = solveGreenMiddle;

