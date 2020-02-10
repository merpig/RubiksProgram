/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      blue.js
 *      Started: Saturday, December 14, 2019
 *      Finished: Friday, February 7, 2020
 * 
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveBlueMiddle = (current,solved,dim) => {

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

    if(currentSide==="U"){

        moveString = move("",current.y+1,"F");//1
        moveString += move(" ",current.x+1,"U2");//2

        if( isOddCube && current.y===middle) moveString+= " 01L'";//2.1

        moveString += move(" ",current.y+1,"F'");//3

        if( isOddCube && current.y===middle) moveString+= " 01L";//3.1

        moveString += move(" ",current.x+1,"U2");//4
    }

    else if(currentSide==="R"){
        
        if((dim-current.z)===(solved.x+1) && current.y===solved.y){

            moveString = move("",solved.x+1,"U2");//6

            if(isOddCube && solved.y===middle) moveString += " 01L'";//6.1

            moveString += move(" ",solved.y+1,"F");//7

            if(isOddCube && solved.y===middle) moveString += " 01L";//7.1

            moveString += move(" ",solved.x+1,"U2");//8
            moveString += move(" ",solved.y+1,"F'");//9
            
        } else {

            moveString = "01R'"//5
            
        }
    }

    else if(currentSide==="L"){
        console.log("solve from left side to top side");

        if(current.z===solved.x && current.y===solved.y){
            console.log("in place for step 6-9");

            moveString = move("",current.z+1,"D2");//6
            if(isOddCube && solved.y===middle) moveString += " 01R";//6.1
            moveString += move(" ",solved.y+1,"F'");//7
            if(isOddCube && solved.y===middle) moveString += " 01R'";//7.1
            moveString += move(" ",current.z+1,"D2");//8
            moveString += move(" ",solved.y+1,"F");//9
            
        } else {
            console.log("rotating left side");

            moveString = "01L"//5
        }
    }

    else {
        console.log("move from back side to right side");

        if(current.y!==solved.y){
            moveString = "01D";
        }
        else{
            moveString = move("",solved.y+1,"F'");
            moveString += " 01R";
            moveString += move(" ",solved.y+1,"F");
        }
    }

    return moveString;
}

module.exports = solveBlueMiddle;