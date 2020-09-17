/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      orange.js
 *      Started: 
 * 
 *    
 */

function move(depth,side){
    return ((depth<10? "0":"") + depth + side);
}

let solveOrangeMiddle = (current,solved,dim) => {
    
    let middle = Math.floor(dim/2);
    let oddCube = dim%2;
    let max = dim-2;
    let moves = [];
    let currentSide = "F";
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.z === 0) currentSide = "D";

    // 4x4 Solver for Orange
    if(dim===4){
        //console.log("4x4 orange middle solver here");
        switch(currentSide){
            case 'L':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moves.push("01L");
                }
                else if(solved.x === 0 && solved.y === 1 && solved.z === 1){
                    moves.push(move(current.y+1,"F'"));
                    moves.push(" 01D2");
                    moves.push(move(current.y+1,"F"));
                }
                else if(solved.x === 0 && solved.y === 2 && solved.z === 2){
                    moves.push(move(current.y+1,"F'"));
                    moves.push(" 01D2");
                    moves.push(move(current.y+1,"F"));
                }
                break;
            case 'D':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moves.push(move(current.y+1,"F"));
                    moves.push(" 01L2");
                    moves.push(move(current.y+1,"F'"));
                }
                else if(solved.x === 0 && solved.y === 1 && solved.z === 1){
                    if(current.x===2 && current.y===2){
                        moves.push("01L","02F'","01D'","02F");
                    }
                    else{
                        moves.push("01D");
                    }
                }
                else if(solved.x === 0 && solved.y === 2 && solved.z === 2){
                    if(current.y===1 && current.x===1){
                        moves.push("03F'","01D'","03F");
                    }
                    else{
                        moves.push("01D");
                    }
                }
                else {
                    if(current.y===1 && current.x===2){
                        moves.push("03F'","01D'","03F","01D","03F'","01D","03F");
                    }
                    else{
                        moves.push("01D");
                    }
                }
                break;
            case 'R':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moves.push(move(current.y+1,"F2"));
                    moves.push("01L2");
                    moves.push(move(current.y+1,"F2"));
                }
                else {
                    moves.push(move(current.y+1,"F"));
                    moves.push("01D2");
                    moves.push(move(current.y+1,"F'"));
                }
                break;
            default:
                console.log("Something broke");
        }
    }

    // 5x5 Solver for Orange
    else if(dim===5){
        // First row
        switch(currentSide){
            case "L":
                // piece 1
                if(solved.x === 0 && solved.y === 1 && solved.z === max){
                    moves.push("01L");
                }
                //row 1 solved location
                else if(solved.y === 1){
                    moves.push(move(current.y+1,"F'"));
                    middle && oddCube? 
                        moves.push("01D'",move(current.y+1,"F")):
                        moves.push("01D2",move(current.y+1,"F"));
                }
                //row 2 solved location
                else if(solved.y === middle){
                    moves.push(move(current.y+1,"F'"));
                    moves.push("01D'");
                    moves.push(move(current.y+1,"F"));
                }
                //row 3 solved location
                else if(solved.y === max){
                    if(solved.z === max){
                        moves.push(move(current.y+1,"F'"));
                        moves.push("01D");
                        moves.push(move(current.y+1,"F"));
                    }
                }
                break;

            case "D":
                if(solved.x === 0 && solved.y === 1 && solved.z === max){
                    moves.push(move(current.y+1,"F"),"01L2",move(current.y+1,"F'"));
                }
                // row 1
                else if(solved.y === 1){
                    if(current.x<max||current.y===1){
                        moves.push("01D");
                    }
                    else{
                        moves.push("01L",move(current.y+1,"F"),"01L'",move(current.y+1,"F'"));
                    }
                }
                // row 2 (rework)
                else if(solved.y === middle){
                    // first piece row 2
                    if(solved.z === 3){
                        if(current.y !== 1){
                            moves.push(move("01D"));
                        }
                        else{
                            moves.push(move(middle+1,"F'"));
                            moves.push("01D'");
                            moves.push(move(middle+1,"F"));
                        }
                    }
                    // last piece row 2
                    else if(solved.z === 1){
                        if(current.y !== max){
                            moves.push(move("01D"));
                        }
                        else{
                            moves.push(move(middle+1,"F'"));
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D");
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01D'");
                            moves.push(move(middle+1,"F"));
                        }
                    }
                }
                // row 3
                else if(solved.y === max){
                    // piece 1
                    if(solved.z === max){
                        if(current.x === 1 && current.y === 1){
                            moves.push(move(max+1,"F'"));
                            moves.push("01D'");
                            moves.push(move(max+1,"F"));
                        }
                        else{
                            moves.push("01D");
                        }
                    }
                    // piece 2
                    else if(solved.z === middle){
                        if(current.x === max){
                            moves.push(move(max+1,"F2"));
                            moves.push("01R'");
                            moves.push(move(max+1,"F"));
                            moves.push("01D");
                            moves.push(move(max+1,"F"));
                        }
                        else {
                            moves.push("01D'");
                        }
                    }
                    else if(solved.z === 1){
                        if(current.x === 1 && current.y === max){
                            //04F' 05R' 04F 05R 04F'
                            moves.push(move(max+1,"F"));
                            moves.push("01L'");
                            moves.push(move(max+1,"F'"));
                            moves.push("01L");
                            moves.push("01D2");
                            moves.push(move(max+1,"F'"));
                            moves.push("01D2");
                            moves.push(move(max+1,"F"));
                        }
                        else{
                            moves.push("01D");
                        }
                    }
                }
                break;
            case "R":
                if(solved.x === 0 && solved.y === 1 && solved.z === max){
                    moves.push(move(current.y+1,"F2"),"01L2",move(current.y+1,"F2"));
                }
                // row 1
                else if(solved.y === 1){
                    if(current.z!==max||current.y===1){
                        moves.push("01R");
                    }
                    else{
                        moves.push("01L",move(current.y+1,"F2"),"01L'",move(current.y+1,"F2"))
                    }
                }
                // row 2 (rework)
                else if(solved.y === middle){
                    moves.push(move(current.y+1,"F"));
                    moves.push("01D");
                    moves.push(move(current.y+1,"F'"));
                }
                // row 3
                else if(solved.y === max){
                    // piece 1
                    if(solved.z === max){
                        if(current.y===1&&current.z===1){
                            moves.push(move(max+1,"F2"));
                            moves.push("01R'");
                            moves.push(move(max+1,"F2"));
                        }
                        else{
                            moves.push("01R");
                        }
                    }
                    // piece 2
                    else if(solved.z === middle){
                        moves.push(move(current.y+1,"F"));
                        moves.push("01D");
                        moves.push(move(current.y+1,"F'"));
                    }
                    else if(solved.z === 1){
                        moves.push(move(current.y+1,"F"));
                        moves.push("01D2");
                        moves.push(move(current.y+1,"F'"));
                    }
                }
                break;
            default:
                console.log("Something broke");
        }

    }

    else {
        //console.log("6x6 and greater orange middle solver here");
    }

    return moves.join(" ");

}

module.exports = solveOrangeMiddle;