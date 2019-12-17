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
        moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
        moveString += " " + ((dim - current.x)<10? "0" : "") + (dim - current.x) + "D2";
        moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
        moveString += " " + ((dim - current.x)<10? "0" : "") + (dim - current.x) + "D2";
    }

    else if(currentSide==="R"){
        if(current.y===solved.y && solved.y === Math.floor(dim/2)&&dim%2!==0){
            moveString = "01R";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
            moveString = "01R'";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString = "01R";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
        }
        else if(solved.y!==current.y && current.z!==dim-solved.x){
            moveString = "01R";
        }
        else {
            moveString += ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
        }
    }

    else if(currentSide==="L"){
        if(current.y===solved.y && solved.y === Math.floor(dim/2)&&dim%2!==0){
            moveString = "01L";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
            moveString = "01L'";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString = "01L";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
        }
        else if(solved.y!==current.y && current.z!==solved.x){
            moveString = "01L";
        }
        else {
            moveString += ((current.z+1)<10? "0" : "") + (current.z) + "D2";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
        }
    }

    else {
        if((solved.y===current.y && solved.y!==Math.floor(dim/2)) && current.x===solved.x){
            moveString = "01D";
        }
        else{
            moveString = ((current.y+1)<10? "0" : "") + (current.y) + "F";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
            moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";
        }
    }

    return moveString;
}

module.exports = solveBlueMiddle;