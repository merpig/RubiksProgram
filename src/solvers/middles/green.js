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

function move(depth,side){
    return ((depth<10? "0":"") + depth + side);
}

function checkSide(current,dim){
    let currentSide = "F";
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    return currentSide;
}

let solveGreenMiddle = (current,solved,dim,index) => {

    const currentSide = checkSide(current,dim);
    const middle = Math.floor(dim/2);
    const max = dim-2;
    const min = 1;
    // let isOddCube = dim%2;
    const moves = [];

    // Temp 4x4 solver
    if(dim===4){
        if(currentSide === "D"){
            if(index===16){
                moves.push("01D");
            }

            else if(index===17){
                moves.push(move(current.y+1,"F'"));
                moves.push("01R2");
                moves.push(move(current.y+1,"F"));
            }
            else if(index===18){
                moves.push(move(dim-1,"F'"));
                moves.push("01R'");
                moves.push(move(dim-1,"F"));
            }
        }

        if(currentSide === "R"){
            if(index===16){
                moves.push(move(current.y+1,"F"));
                moves.push("01D2");
                moves.push(move(current.y+1,"F'"));
            }
            else if(index===17){
                if(current.y===2 && current.z===2){
                    moves.push("01D");
                    moves.push(move(dim-1,"F"));
                    moves.push("01D'");
                    moves.push(move(dim-1, "F'"));
                    
                }
                else{
                    moves.push("01R")
                }
            }
            
            else if(index===18){
                if(current.y===2 && current.z===1){
                    moves.push("01R");
                    moves.push(move(dim-1,"F'"));
                    moves.push("01R'");
                    moves.push(move(dim-1,"F"));
                }
                else{
                    moves.push("01R");
                }
            }
            else if(index===19){
                if(current.y===1 && current.z===2){
                    moves.push("03F'");
                    moves.push("01R'");
                    moves.push("03F");
                    moves.push("01R");
                    moves.push("03F'");
                    moves.push("01R");
                    moves.push("03F");
                }
                else{
                    moves.push("01R");
                }
            }
        }
    }

    else if(dim===5){
        // console.log(`--------------Index: ${index}--------------`);
        // console.log(current);
        // console.log(solved);

        switch(currentSide){
            case "D":
                if(solved.y===min){
                    if(solved.x===min) moves.push("01D");
                    else if(solved.x===middle){
                        if(current.x<middle){
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D'");
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01D");
                        }
                        else if(current.x>middle){
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D");
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01D'");
                        }
                        else{
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01R'");
                            moves.push(move(current.y+1,"F"));
                        }
                    }
                    else{
                        moves.push(move(current.y+1,"F"));
                        moves.push("01D");
                        moves.push(move(current.y+1,"F'"));
                        moves.push("01D'");
                    }
                }
                else if(solved.y===middle){
                    if(solved.x===min){
                        if(current.y===middle){
                            moves.push(move(min+1,"F"));
                            moves.push("01D2");
                            moves.push(move(min+1,"F'"));
                        }
                        else{
                            moves.push(move(min+1,"F"));
                            moves.push("01D");
                            moves.push(move(min+1,"F'")); 
                        }
                    }
                    else{
                        moves.push(move(current.y+1,"F'"));
                        moves.push("01R");
                        moves.push(move(current.y+1,"F"));
                    }
                }
                else{
                    if(solved.x===min){
                        moves.push(move(current.y+1,"F'"));
                        moves.push("01R");
                        moves.push(move(current.y+1,"F"));
                    }
                }
                break;
            case "R":
                if(solved.y===min){
                    if(solved.x===min){
                        moves.push(move(current.y+1,"F"));
                        moves.push("01D2");
                        moves.push(move(current.y+1,"F'"));
                    }
                    else if(solved.x===middle){
                        if(current.z===max){
                            moves.push("01D");
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D'");
                            moves.push(move(current.y+1,"F'"));
                        }
                        else moves.push("01R");
                    }
                    else{
                        if(current.y===max&&current.z===max){
                            moves.push("01D");
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D'");
                            moves.push(move(current.y+1,"F'"));
                        }
                        else moves.push("01R");
                    }
                }
                else if(solved.y===middle){
                    if(solved.x===min){
                        if(current.y===max){
                            moves.push(move(middle+1,"F'"));
                            moves.push("01R");
                            moves.push(move(middle+1,"F"));
                        }
                        else moves.push("01R'");
                    }
                    else{
                        if(current.z===min){
                            moves.push(move(min+1,"F"));
                            moves.push("01D'");
                            moves.push(move(min+1,"F'"));
                            moves.push("01R");
                            moves.push(move(min+1,"F"));
                            moves.push("01D");
                            moves.push(move(min+1,"F'"));
                        }
                        else moves.push("01R'");
                    }
                }
                else{
                    if(solved.x===min){
                        if(current.z===min&&current.y===min){
                            moves.push(move(max+1,"F'"));
                            moves.push("01R'");
                            moves.push(move(max+1,"F"));
                        }
                        else{
                            moves.push("01R");
                        }
                    }
                    else if(solved.x===middle){
                        if(current.y===max){
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01R'");
                            moves.push(move(current.y+1,"F"));
                            moves.push("01R'");
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01R");
                            moves.push(move(current.y+1,"F"));
                        }
                        else{
                            moves.push("01R");
                        }
                    }
                    else{
                        if(current.y===max&&current.z===min){
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D'");
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01D'");
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D2");
                            moves.push(move(current.y+1,"F'"));
                        }
                        else{
                            moves.push("01R");
                        }
                    }
                }
                break;
            default:
                console.log("Woops something broke. Only red and green should be unsolved.");
        }
    }

    return moves.join(" ");
}

module.exports = solveGreenMiddle;

