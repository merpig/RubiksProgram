/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      yellow.js
 *      Started: Friday, December 13, 2019
 *      v1.0 working function: Saturday, December 14, 2019
 *      
 */


let solveYellowMiddle = (current,solved,dim,index) => {
    let currentSide = "F";
    let row = Math.floor(index/(dim-2));
    let column = index%(dim-2);
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    //console.log(`Currently on side: ${currentSide}`);
    //console.log(`Current position: ${JSON.stringify(current)}`);
    //console.log(`Solved position: ${JSON.stringify(solved)}`);
    let moveString = "";
}

module.exports = solveYellowMiddle;