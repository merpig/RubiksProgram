/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      red.js
 *      Started: 
 * 
 * 
 *      
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveOrangeMiddle = (current,solved,dim) => {

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

    if(currentSide==="L"){

    }

    else if(currentSide==="R"){

    }

    return moveString;

}

module.exports = solveOrangeMiddle;