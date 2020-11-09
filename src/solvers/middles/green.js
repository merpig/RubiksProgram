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
    const max = middle+1;
    const min = middle-1;
    const moves = [];

    // Temp 4x4 solver
    if(dim%2===0){
        if(currentSide === "D"){
            if(solved.x === middle-1 && solved.y === middle-1 && solved.z === 0){
                moves.push("01D");
            }

            else if(solved.x === middle && solved.y === middle-1 && solved.z === 0){
                moves.push(move(current.y+1,"F'"));
                moves.push("01R2");
                moves.push(move(current.y+1,"F"));
            }
            else if(solved.x === middle-1 && solved.y === middle && solved.z === 0){
                moves.push(move(middle+1,"F'"));
                moves.push("01R'");
                moves.push(move(middle+1,"F"));
            }
            else {
                if( solved.x===solved.y||
                    solved.x===(dim-1)-solved.y||
                    (dim-1)-solved.x===(dim-1)-solved.y||
                    (dim-1)-solved.x===solved.y){
                        if(solved.y<middle&&solved.x<middle){
                            moves.push("01D");
                        }
                        else if(solved.x>middle&&solved.y<middle){
                            moves.push(
                                move(current.y+1,"F'"),
                                "01R2",
                                move(current.y+1,"F"),
                            )
                        }
                        else if(solved.x<middle&&solved.y>middle){
                            moves.push(
                                move(current.y+1,"F'"),
                                "01R",
                                move(current.y+1,"F"),
                            )
                        }
                }
                else {
                    moves.push(
                        "01R'",
                        "01D'",
                        move(dim-current.x,"F"),
                        "01D",
                        move(dim-current.y,"B'"),
                        "01D'",
                        move(dim-current.x,"F'"),
                        "01D",
                        move(dim-current.y,"B"),
                        "01R"
                    )
                }
            }
        }

        if(currentSide === "R"){
            if(solved.x === middle-1 && solved.y === middle-1 && solved.z === 0){
                moves.push(move(current.y+1,"F"));
                moves.push("01D2");
                moves.push(move(current.y+1,"F'"));
            }
            else if(solved.x === middle && solved.y === middle-1 && solved.z === 0){
                if(current.y===middle && current.z===middle){
                    moves.push("01D");
                    moves.push(move(middle+1,"F"));
                    moves.push("01D'");
                    moves.push(move(middle+1, "F'"));
                    
                }
                else{
                    moves.push("01R")
                }
            }
            
            else if(solved.x === middle-1 && solved.y === middle && solved.z === 0){
                if(current.y===middle && current.z===middle-1){
                    moves.push("01R");
                    moves.push(move(middle+1,"F'"));
                    moves.push("01R'");
                    moves.push(move(middle+1,"F"));
                }
                else{
                    moves.push("01R");
                }
            }
            else if(solved.x === middle && solved.y === middle && solved.z === 0){
                if(current.y===middle-1 && current.z===middle){
                    moves.push(move(middle+1, "F'"));
                    moves.push("01R'");
                    moves.push(move(middle+1, "F"));
                    moves.push("01R");
                    moves.push(move(middle+1, "F'"));
                    moves.push("01R");
                    moves.push(move(middle+1, "F"));
                }
                else{
                    moves.push("01R");
                }
            }

            else {
                if( solved.x===solved.y||
                    solved.x===(dim-1)-solved.y||
                    (dim-1)-solved.x===(dim-1)-solved.y||
                    (dim-1)-solved.x===solved.y){
                        if(current.y<middle && current.z < middle){
                            if(solved.x<middle&&solved.y<middle){
                                moves.push(
                                    move(current.y+1,"F"),
                                    "01D'",
                                    move(current.y+1,"F'"),
                                    "01D"
                                )
                            }
                            else if(solved.x>middle&&solved.y<middle){
                                moves.push(
                                    "01D'",
                                    move(current.y+1,"F"),
                                    "01D'",
                                    move(current.y+1,"F'"),
                                    "01D2",
                                )
                            }
                            else if(solved.x<middle&&solved.y>middle){
                                moves.push(
                                    move(dim-current.y,"F'"),
                                    "01R'",
                                    move(dim-current.y,"F")
                                )
                            }
                            else if(solved.x>middle&&solved.y>middle){
                                moves.push(
                                    "01R'",
                                    move(dim-current.y,"F"),
                                    "01D'",
                                    move(dim-current.y,"F'"),
                                    "01R2",
                                    "01D",
                                    move(dim-current.y,"F'"),
                                    "01R2",
                                    move(dim-current.y,"F")
                                )
                            }
                        }
                        else {
                            moves.push("01R");
                        }
                }
                else{
                    if(current.y===solved.y&&current.z===solved.x){
                        moves.push(
                            "01R'",
                            "01D'",
                            move(dim-current.z,"F"),
                            "01D",
                            move(dim-current.y,"B'"),
                            "01D'",
                            move(dim-current.z,"F'"),
                            "01D",
                            move(dim-current.y,"B"),
                            "01R"
                        )
                    }
                    else{
                        moves.push("01R");
                    }
                }
            }
        }
    }

    else if(dim%2){

        switch(currentSide){
            case "D":
                if(solved.x>=min&&solved.x<=max&&solved.y>=min&&solved.y<=max){
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
                }
                else{
                    if( solved.x===solved.y||
                        solved.x===(dim-1)-solved.y||
                        (dim-1)-solved.x===(dim-1)-solved.y||
                        (dim-1)-solved.x===solved.y){
                            if(solved.y<middle&&solved.x<middle){
                                moves.push("01D");
                            }
                            else if(solved.x>middle&&solved.y<middle){
                                moves.push(
                                    move(current.y+1,"F'"),
                                    "01R2",
                                    move(current.y+1,"F"),
                                )
                            }
                            else if(solved.x<middle&&solved.y>middle){
                                moves.push(
                                    move(current.y+1,"F'"),
                                    "01R",
                                    move(current.y+1,"F"),
                                )
                            }
                    }
                    else {
                        moves.push(
                            "01R'",
                            "01D'",
                            move(dim-current.x,"F"),
                            "01D",
                            move(dim-current.y,"B'"),
                            "01D'",
                            move(dim-current.x,"F'"),
                            "01D",
                            move(dim-current.y,"B"),
                            "01R"
                        )
                    }
                }
                break;
            case "R":
                if(solved.x>=middle-1&&solved.x<=middle+1&&solved.y>=middle-1&&solved.y<=middle+1){
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
                }
                else{
                    if( solved.x===solved.y||
                        solved.x===(dim-1)-solved.y||
                        (dim-1)-solved.x===(dim-1)-solved.y||
                        (dim-1)-solved.x===solved.y){
                            if(current.y<middle && current.z < middle){
                                if(solved.x<middle&&solved.y<middle){
                                    moves.push(
                                        move(current.y+1,"F"),
                                        "01D'",
                                        move(current.y+1,"F'"),
                                        "01D"
                                    )
                                }
                                else if(solved.x>middle&&solved.y<middle){
                                    moves.push(
                                        "01D'",
                                        move(current.y+1,"F"),
                                        "01D'",
                                        move(current.y+1,"F'"),
                                        "01D2",
                                    )
                                }
                                else if(solved.x<middle&&solved.y>middle){
                                    moves.push(
                                        move(dim-current.y,"F'"),
                                        "01R'",
                                        move(dim-current.y,"F")
                                    )
                                }
                                else if(solved.x>middle&&solved.y>middle){
                                    moves.push(
                                        "01R'",
                                        move(dim-current.y,"F"),
                                        "01D'",
                                        move(dim-current.y,"F'"),
                                        "01R2",
                                        "01D",
                                        move(dim-current.y,"F'"),
                                        "01R2",
                                        move(dim-current.y,"F")
                                    )
                                }
                            }
                            else {
                                moves.push("01R");
                            }
                    }
                    else {
                        if(current.y===solved.y&&current.z===solved.x){
                            moves.push(
                                "01R'",
                                "01D'",
                                move(dim-current.z,"F"),
                                "01D",
                                move(dim-current.y,"B'"),
                                "01D'",
                                move(dim-current.z,"F'"),
                                "01D",
                                move(dim-current.y,"B"),
                                "01R"
                            )
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

