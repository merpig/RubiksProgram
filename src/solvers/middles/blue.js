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
        console.log("move out of top side to right side")
        // F,U2,F',U2
        moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F";        //1
        moveString += " " + ((current.x+1)<10? "0" : "") + (current.x+1) + "U2";//2
        if( dim%2 && current.y+1===Math.ceil(dim/2)) moveString+= " 01L'";      //2.1
        moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";//3
        if( dim%2 && current.y+1===Math.ceil(dim/2)) moveString+= " 01L";       //3.1
        moveString += " " + ((current.x+1)<10? "0" : "") + (current.x+1) + "U2";//4
    }

    else if(currentSide==="R"){
        console.log("solve from right side to top side");
        // 5-9
        if((dim-current.z)===(solved.x+1) && current.y===solved.y){
            console.log("in place for step 6-9");
            moveString = ((solved.x+1)<10? "0" : "") + (solved.x+1) + "U2";//6
            if(dim%2 && solved.y===Math.floor(dim/2)) moveString += " 01L'";//6.1
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F"//7
            if(dim%2 && solved.y===Math.floor(dim/2)) moveString += " 01L";//7.1
            moveString += " " + ((solved.x+1)<10? "0" : "") + (solved.x+1) + "U2";//8
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F'"//9
            
        } else {
            console.log("rotating right side");
            moveString = "01R'"//5
        }
    }

    else if(currentSide==="L"){
        console.log("solve from left side to top side");
        if(current.z===solved.x && current.y===solved.y){
            console.log("in place for step 6-9");
            moveString = ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";//6
            if(dim%2 && solved.y===Math.floor(dim/2)) moveString += " 01R";//6.1
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F'"//7
            if(dim%2 && solved.y===Math.floor(dim/2)) moveString += " 01R'";//7.1
            moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D2";//8
            moveString += " " + ((solved.y+1)<10? "0" : "") + (solved.y+1) + "F"//9
            
        } else {
            console.log("rotating left side");
            moveString = "01L"//5
        }
    }

    else {
        console.log("move from back side to right side");
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