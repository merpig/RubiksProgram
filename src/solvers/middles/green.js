/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      green.js
 *      Started: Saturday February 8, 2020
 *      Finished:Saturday February 8, 2020
 *      
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveGreenMiddle = (current,solved,dim) => {

    let currentSide = "F";
    let middle = Math.floor(dim/2);
    let isOddCube = dim%2;
    let moveString = "";

    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";

    console.log(`Currently on side: ${currentSide}`);
    console.log(`Current position: ${JSON.stringify(current)}`);
    console.log(`Solved position: ${JSON.stringify(solved)}`);
    

    if(currentSide==="D"){
        moveString = move("",current.y+1,"F");

        if(dim-(current.x+1)<middle) {
            if(current.y<middle) moveString += " 01R";
            else moveString += " 01R'";
        }
        else {
            if(current.y<middle) moveString += " 01R'";
            else moveString += " 01R";
        }

        moveString += move(" ",current.x+1,"U2");

        if(dim-(current.x+1)<middle) {
            if(current.y<middle) moveString += " 01R1";
            else moveString += " 01R";
        }
        else {
            if(current.y<middle) moveString += " 01R";
            else moveString += " 01R'";
        }

        moveString += move(" ",current.y+1,"F'");
        moveString += move(" ",current.x+1,"U2");
    }

    else if (currentSide==="R"){
        if(current.y===solved.y&&current.z===solved.x){
            moveString = move("",current.y+1,"F");

            if(solved.y===middle&&isOddCube) moveString += " 01L'"; //a
            else moveString += " 01L2";

            moveString += move(" ",current.y+1,"F'");

            if(solved.y===middle&&isOddCube) moveString += " 01L'"; //a1

            moveString += move(" ",current.z+1,"D2");

            if(solved.y===middle&&isOddCube) moveString += " 01L";  //a1'

            moveString += move(" ",current.y+1,"F");

            if(solved.y===middle&&isOddCube) moveString += " 01L";  //a'
            else moveString += " 01L2";

            moveString += move(" ",current.y+1,"F'");
            moveString += move(" ",current.z+1,"D2");
        }
        else moveString = "01R'"
    }

    else if (currentSide==="L"){
        if(current.y===solved.y&&current.z===(dim-(solved.x+1))){
            moveString = move(" ",current.y+1,"F'");

            if(solved.y===middle&&isOddCube) moveString += " 01R"; //a
            else moveString += " 01R2";

            moveString += move(" ",current.y+1,"F");

            if(solved.y===middle&&isOddCube) moveString += " 01R"; //a1

            moveString += move(" ",current.z+1,"D2");

            if(solved.y===middle&&isOddCube) moveString += " 01R'";  //a1'

            moveString += move(" ",current.y+1,"F'");

            if(solved.y===middle&&isOddCube) moveString += " 01R'";  //a'
            else moveString += " 01R2";

            moveString += move(" ",current.y+1,"F");
            moveString += move(" ",current.z+1,"D2");
        }
        else moveString = "01L"
    }

    return moveString;
}

module.exports = solveGreenMiddle;

