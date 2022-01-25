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
    let moves = [];
    let currentSide = "F";
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.z === 0) currentSide = "D";
    
    // 4x4 Solver for Orange
    if(dim%2===0){
        //console.log("4x4 orange middle solver here");
        switch(currentSide){
            case 'L':
                if(solved.x === 0 && solved.y ===  middle-1&& solved.z === middle){
                    moves.push("01L");
                }
                else if(solved.x === 0 && solved.y === middle-1 && solved.z === middle-1){
                    moves.push(move(current.y+1,"F'"));
                    moves.push(" 01D2");
                    moves.push(move(current.y+1,"F"));
                }
                else if(solved.x === 0 && solved.y === middle && solved.z === middle){
                    moves.push(move(current.y+1,"F'"));
                    moves.push(" 01D2");
                    moves.push(move(current.y+1,"F"));
                }
                else {
                    if( solved.z===solved.y||solved.z===(dim-1)-solved.y||(dim-1)-solved.z===(dim-1)-solved.y||(dim-1)-solved.z===solved.y){
                        if(current.z<middle-1&&current.y<middle-1){
                        //01R' 01D' 01D' 03B' 01D 03F' 01D' 03B 01D 03F 01R 01D
                            moves.push(
                                "01L'",
                                "01D'",
                                move(current.y+1,"B'"),
                                "01D",
                                move(current.y+1,"F'"),
                                "01D'",
                                move(current.y+1,"B"),
                                "01D",
                                move(current.y+1,"F"),
                                "01L"
                            );
                        }
                        else if(current.z>middle&&current.y<middle-1){
                            moves.push(
                                "01D'",
                                move(current.y+1,"B'"),
                                "01D",
                                move(current.y+1,"F'"),
                                "01D'",
                                move(current.y+1,"B"),
                                "01D",
                                move(current.y+1,"F")
                            );
                        }
                        else if(current.z>middle&&current.y>middle){
                            moves.push(
                                "01L",
                                "01D'",
                                move(dim-(current.y),"B'"),
                                "01D",
                                move(dim-(current.y),"F'"),
                                "01D'",
                                move(dim-(current.y),"B"),
                                "01D",
                                move(dim-(current.y),"F"),
                                "01L'"
                            );
                        }
                        else if(current.z<middle-1&&current.y>middle){
                            moves.push(
                                "01L2",
                                "01D'",
                                move(dim-(current.y),"B'"),
                                "01D",
                                move(dim-(current.y),"F'"),
                                "01D'",
                                move(dim-(current.y),"B"),
                                "01D",
                                move(dim-(current.y),"F"),
                                "01L2"
                            );
                        }
                        
                    }
                    else {
                        moves.push(
                            "01D'",
                            move((dim-1)-current.z+1,"B'"),
                            "01D",
                            move(current.y+1,"F'"),
                            "01D'",
                            move((dim-1)-current.z+1,"B"),
                            "01D",
                            move(current.y+1,"F")
                        );
                    }
                }
                break;
            case 'D':
                if(solved.x === 0 && solved.y === middle-1 && solved.z === middle){
                    moves.push(move(current.y+1,"F"));
                    moves.push(" 01L2");
                    moves.push(move(current.y+1,"F'"));
                }
                else if(solved.x === 0 && solved.y === middle-1 && solved.z === middle-1){
                    if(current.x===middle && current.y===middle){
                        moves.push(
                            "01L",
                            move(middle,"F'")/*"02F'"*/,
                            "01D'",
                            move(middle,"F")/*"02F"*/
                        );
                    }
                    else{
                        moves.push("01D");
                    }
                }
                else if(solved.x === 0 && solved.y === middle && solved.z === middle){
                    if(current.y===middle-1 && current.x===middle-1){
                        moves.push(
                            move(middle+1,"F'")/*"03F'"*/,
                            "01D'",
                            move(middle+1,"F")/*"03F"*/
                        );
                    }
                    else {
                        moves.push("01D");
                    }
                }
                else if(solved.x === 0 && solved.y === middle && solved.z === middle-1){
                    if(current.y===middle-1 && current.x===middle){
                        moves.push(
                            move(middle+1,"F'")/*"03F'"*/,
                            "01D'",
                            move(middle+1,"F")/*"03F"*/,
                            "01D",
                            move(middle+1,"F'")/*"03F'"*/,
                            "01D",
                            move(middle+1,"F")/*"03F"*/
                        );
                    }
                    else{
                        moves.push("01D");
                    }
                }
                else {
                    if( solved.x===solved.y||
                        solved.x===(dim-1)-solved.y||
                        (dim-1)-solved.z===(dim-1)-solved.y||
                        (dim-1)-solved.z===solved.y){
                            // solve from green to orange middles
                            if(current.x<middle-1&&current.y<middle-1){
                                if(solved.z<middle-1&&solved.y<middle-1){
                                //01R' 01D' 01D' 03B' 01D 03F' 01D' 03B 01D 03F 01R 01D
                                    moves.push(
                                        "01L'",
                                        "01D'",
                                        move(solved.y+1,"B'"),
                                        "01D",
                                        move(solved.y+1,"F'"),
                                        "01D'",
                                        move(solved.y+1,"B"),
                                        "01D",
                                        move(solved.y+1,"F"),
                                        "01L"
                                    );
                                }
                                else if(solved.z>middle&&solved.y<middle-1){
                                    moves.push(
                                        "01D'",
                                        move(solved.y+1,"B'"),
                                        "01D",
                                        move(solved.y+1,"F'"),
                                        "01D'",
                                        move(solved.y+1,"B"),
                                        "01D",
                                        move(solved.y+1,"F")
                                    );
                                }
                                else if(solved.z>middle&&solved.y>middle){
                                    moves.push(
                                        "01L",
                                        "01D'",
                                        move(dim-(solved.y),"B'"),
                                        "01D",
                                        move(dim-(solved.y),"F'"),
                                        "01D'",
                                        move(dim-(solved.y),"B"),
                                        "01D",
                                        move(dim-(solved.y),"F"),
                                        "01L'"
                                    );
                                }
                                else if(solved.z<middle-1&&solved.y>middle){
                                    moves.push(
                                        "01L2",
                                        "01D'",
                                        move(dim-(solved.y),"B'"),
                                        "01D",
                                        move(dim-(solved.y),"F'"),
                                        "01D'",
                                        move(dim-(solved.y),"B"),
                                        "01D",
                                        move(dim-(solved.y),"F"),
                                        "01L2"
                                    );
                                }
                            }
                            else{
                                moves.push("01D");
                            }
                        }
                    else {
                        if(current.y===solved.y&&current.x===(dim-1)-solved.z){
                            moves.push(
                                "01D'",
                                move(current.x+1,"B'"),
                                "01D",
                                move(current.y+1,"F'"),
                                "01D'",
                                move(current.x+1,"B"),
                                "01D",
                                move(current.y+1,"F")
                            );
                        }
                        else{
                            moves.push("01D");
                        }
                    }
                }
                break;
            case 'R':
                if(solved.x === 0 && solved.y === middle-1 && solved.z === middle){
                    moves.push(move(current.y+1,"F2"));
                    moves.push("01L2");
                    moves.push(move(current.y+1,"F2"));
                }
                else if(
                    (solved.x === 0 && solved.y === middle-1 && solved.z === middle-1)||
                    (solved.x === 0 && solved.y === middle && solved.z === middle-1)||
                    (solved.x === 0 && solved.y === middle && solved.z === middle)
                ){
                    moves.push(move(current.y+1,"F"));
                    moves.push("01D2");
                    moves.push(move(current.y+1,"F'"));
                }
                else {
                    moves.push(
                        move(current.y+1,"F"),
                        "01D",
                        move(current.y+1,"F'")
                    );
                }
                break;
            default:
                console.log("Something broke");
        }
    }

    // 5x5 Solver for Orange
    else if(dim%2){
        //console.log(solved);
        // First row
        switch(currentSide){
            case "L":
                if(solved.z>=middle-1&&solved.z<=middle+1&&solved.y>=middle-1&&solved.y<=middle+1){
                // piece 1
                    if(solved.x === 0 && solved.y === middle-1 && solved.z === middle+1){
                        moves.push("01L");
                    }
                    //row 1 solved location
                    else if(solved.y === middle-1){
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
                    else if(solved.y === middle+1){
                        if(solved.z === middle+1){
                            moves.push(move(current.y+1,"F'"));
                            moves.push("01D");
                            moves.push(move(current.y+1,"F"));
                        }
                    }
                }
                else {
                    if( solved.z===solved.y||
                        solved.z===(dim-1)-solved.y||
                        (dim-1)-solved.z===(dim-1)-solved.y||
                        (dim-1)-solved.z===solved.y){
                            if(current.z<middle-1&&current.y<middle-1){
                            //01R' 01D' 01D' 03B' 01D 03F' 01D' 03B 01D 03F 01R 01D
                                moves.push(
                                    "01L'",
                                    "01D'",
                                    move(current.y+1,"B'"),
                                    "01D",
                                    move(current.y+1,"F'"),
                                    "01D'",
                                    move(current.y+1,"B"),
                                    "01D",
                                    move(current.y+1,"F"),
                                    "01L"
                                );
                            }
                            else if(current.z>middle&&current.y<middle-1){
                                moves.push(
                                    "01D'",
                                    move(current.y+1,"B'"),
                                    "01D",
                                    move(current.y+1,"F'"),
                                    "01D'",
                                    move(current.y+1,"B"),
                                    "01D",
                                    move(current.y+1,"F")
                                );
                            }
                            else if(current.z>middle&&current.y>middle){
                                moves.push(
                                    "01L",
                                    "01D'",
                                    move(dim-(current.y),"B'"),
                                    "01D",
                                    move(dim-(current.y),"F'"),
                                    "01D'",
                                    move(dim-(current.y),"B"),
                                    "01D",
                                    move(dim-(current.y),"F"),
                                    "01L'"
                                );
                            }
                            else if(current.z<middle-1&&current.y>middle){
                                moves.push(
                                    "01L2",
                                    "01D'",
                                    move(dim-(current.y),"B'"),
                                    "01D",
                                    move(dim-(current.y),"F'"),
                                    "01D'",
                                    move(dim-(current.y),"B"),
                                    "01D",
                                    move(dim-(current.y),"F"),
                                    "01L2"
                                );
                            }
                    }
                    else {
                        moves.push(
                            "01D'",
                            move((dim-1)-current.z+1,"B'"),
                            "01D",
                            move(current.y+1,"F'"),
                            "01D'",
                            move((dim-1)-current.z+1,"B"),
                            "01D",
                            move(current.y+1,"F")
                        );
                    }
                }
                break;

            case "D":
                if(solved.z>=middle-1&&solved.z<=middle+1&&solved.y>=middle-1&&solved.y<=middle+1){
                    if(solved.x === 0 && solved.y === middle-1 && solved.z === middle+1){
                        moves.push(move(current.y+1,"F"),"01L2",move(current.y+1,"F'"));
                    }
                    // row 1
                    else if(solved.y === middle-1){
                        if(current.x<middle+1||current.y===middle-1){
                            moves.push("01D");
                        }
                        else{
                            moves.push("01L",move(current.y+1,"F"),"01L'",move(current.y+1,"F'"));
                        }
                    }
                    // row 2 (rework)
                    else if(solved.y === middle){
                        // first piece row 2
                        if(solved.z === middle+1){
                            if(current.y !== middle-1){
                                moves.push("01D");
                            }
                            else{
                                moves.push(move(middle+1,"F'"));
                                moves.push("01D'");
                                moves.push(move(middle+1,"F"));
                            }
                        }
                        // last piece row 2
                        else if(solved.z === middle-1){
                            if(current.y !== middle+1){
                                moves.push("01D");
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
                    else if(solved.y === middle+1){
                        // piece 1
                        if(solved.z === middle+1){
                            if(current.x === middle-1 && current.y === middle-1){
                                moves.push(move(middle+1+1,"F'"));
                                moves.push("01D'");
                                moves.push(move(middle+1+1,"F"));
                            }
                            else{
                                moves.push("01D");
                            }
                        }
                        // piece 2
                        else if(solved.z === middle){
                            if(current.x === middle+1){
                                moves.push(move(middle+1+1,"F2"));
                                moves.push("01R'");
                                moves.push(move(middle+1+1,"F"));
                                moves.push("01D");
                                moves.push(move(middle+1+1,"F"));
                            }
                            else {
                                moves.push("01D'");
                            }
                        }
                        else if(solved.z === middle-1){
                            if(current.x === middle-1 && current.y === middle+1){
                                //04F' 05R' 04F 05R 04F'
                                moves.push(move(middle+1+1,"F"));
                                moves.push("01L'");
                                moves.push(move(middle+1+1,"F'"));
                                moves.push("01L");
                                moves.push("01D2");
                                moves.push(move(middle+1+1,"F'"));
                                moves.push("01D2");
                                moves.push(move(middle+1+1,"F"));
                            }
                            else{
                                moves.push("01D");
                            }
                        }
                    }
                }
                else {
                    if( solved.z===solved.y||
                        solved.z===(dim-1)-solved.y||
                        (dim-1)-solved.z===(dim-1)-solved.y||
                        (dim-1)-solved.z===solved.y){
                            if(current.x<middle-1&&current.y<middle-1){
                                if(solved.z<middle-1&&solved.y<middle-1){
                                //01R' 01D' 01D' 03B' 01D 03F' 01D' 03B 01D 03F 01R 01D
                                    moves.push(
                                        "01L'",
                                        "01D'",
                                        move(solved.y+1,"B'"),
                                        "01D",
                                        move(solved.y+1,"F'"),
                                        "01D'",
                                        move(solved.y+1,"B"),
                                        "01D",
                                        move(solved.y+1,"F"),
                                        "01L"
                                    );
                                }
                                else if(solved.z>middle&&solved.y<middle-1){
                                    moves.push(
                                        "01D'",
                                        move(solved.y+1,"B'"),
                                        "01D",
                                        move(solved.y+1,"F'"),
                                        "01D'",
                                        move(solved.y+1,"B"),
                                        "01D",
                                        move(solved.y+1,"F")
                                    );
                                }
                                else if(solved.z>middle&&solved.y>middle){
                                    moves.push(
                                        "01L",
                                        "01D'",
                                        move(dim-(solved.y),"B'"),
                                        "01D",
                                        move(dim-(solved.y),"F'"),
                                        "01D'",
                                        move(dim-(solved.y),"B"),
                                        "01D",
                                        move(dim-(solved.y),"F"),
                                        "01L'"
                                    );
                                }
                                else if(solved.z<middle-1&&solved.y>middle){
                                    
                                    moves.push(
                                        "01L2",
                                        "01D'",
                                        move(dim-(solved.y),"B'"),
                                        "01D",
                                        move(dim-(solved.y),"F'"),
                                        "01D'",
                                        move(dim-(solved.y),"B"),
                                        "01D",
                                        move(dim-(solved.y),"F"),
                                        "01L2"
                                    );
                                }
                            }
                            else{
                                moves.push("01D");
                            }
                        }
                    else {
                        if(current.y===solved.y&&current.x===(dim-1)-solved.z){
                            moves.push(
                                "01D'",
                                move(current.x+1,"B'"),
                                "01D",
                                move(current.y+1,"F'"),
                                "01D'",
                                move(current.x+1,"B"),
                                "01D",
                                move(current.y+1,"F")
                            );
                        }
                        else{
                            moves.push("01D");
                        }
                    }
                }
                break;
            case "R":
                if(solved.z>=middle-1&&solved.z<=middle+1&&solved.y>=middle-1&&solved.y<=middle+1){
                    if(solved.x === 0 && solved.y === middle-1 && solved.z === middle+1){
                        moves.push(move(current.y+1,"F2"),"01L2",move(current.y+1,"F2"));
                    }
                    // row 1
                    else if(solved.y === middle-1){
                        if(current.z!==middle+1||current.y===middle-1){
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
                    else if(solved.y === middle+1){
                        // piece 1
                        if(solved.z === middle+1){
                            if(current.y===middle-1&&current.z===middle-1){
                                moves.push(move(middle+1+1,"F2"));
                                moves.push("01R'");
                                moves.push(move(middle+1+1,"F2"));
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
                        else if(solved.z === middle-1){
                            moves.push(move(current.y+1,"F"));
                            moves.push("01D2");
                            moves.push(move(current.y+1,"F'"));
                        }
                    }
                }
                else {
                    moves.push(
                        move(current.y+1,"F"),
                        "01D",
                        move(current.y+1,"F'")
                    );
                }
                break;
            default:
                console.log("Something broke");
                return "";
        }

        return moves.join(" ");
    }

    return moves.join(" ");

}

module.exports = solveOrangeMiddle;