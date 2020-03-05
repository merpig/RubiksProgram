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
 */

function move(space,depth,side){
    return (space + (depth<10? "0":"") + depth + side);
}

let solveOrangeMiddle = (current,solved,dim) => {

    let currentSide = "F";
    // let middle = Math.floor(dim/2);
    // let isOddCube = dim%2;
    let moveString = "";

    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    
    // console.log(`Currently on side: ${currentSide}`);
    // console.log(`Current position: ${JSON.stringify(current)}`);
    // console.log(`Solved position: ${JSON.stringify(solved)}`);

    if(dim===4){
        //console.log("4x4 orange middle solver here");
        switch(currentSide){
            case 'L':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moveString+="01L";
                }
                else if(solved.x === 0 && solved.y === 1 && solved.z === 1){
                    moveString+=move("",current.y+1,"F'");
                    moveString+=" 01D2";
                    moveString+=move(" ",current.y+1,"F");
                }
                else if(solved.x === 0 && solved.y === 2 && solved.z === 2){
                    moveString+=move("",current.y+1,"F'");
                    moveString+=" 01D2";
                    moveString+=move(" ",current.y+1,"F");
                }
                break;
            case 'D':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moveString+=move("",current.y+1,"F");
                    moveString+=" 01L2";
                    moveString+=move(" ",current.y+1,"F'");
                }
                else if(solved.x === 0 && solved.y === 1 && solved.z === 1){
                    if(current.x===2 && current.y===2){
                        moveString="01L"
                        moveString+=" 02F'";
                        moveString+=" 01D'";
                        moveString+=" 02F";
                    }
                    else{
                        moveString+="01D";
                    }
                }
                else if(solved.x === 0 && solved.y === 2 && solved.z === 2){
                    if(current.y===1 && current.x===1){
                        moveString+="03F'";
                        moveString+=" 01D'";
                        moveString+=" 03F";
                    }
                    else{
                        moveString="01D";
                    }
                }
                else {
                    if(current.y===1 && current.x===2){
                        moveString+="03F'";
                        moveString+=" 01D'";
                        moveString+=" 03F";
                        moveString+=" 01D";
                        moveString+=" 03F'";
                        moveString+=" 01D";
                        moveString+=" 03F";
                    }
                    else{
                        moveString="01D";
                    }
                }
                break;
            case 'R':
                if(solved.x === 0 && solved.y === 1 && solved.z === 2){
                    moveString+=move("",current.y+1,"F2");
                    moveString+=" 01L2";
                    moveString+=move(" ",current.y+1,"F2");
                }
                else {
                    moveString+=move("",current.y+1,"F");
                    moveString+=" 01D2";
                    moveString+=move(" ",current.y+1,"F'");
                }
                break;
            default:
                console.log("Something broke");
        }
    }
    else if(dim===5){
        //console.log("5x5 orange middle solver here");
    }
    else {
        //console.log("6x6 and greater orange middle solver here");
    }

    // if((current.x===0 && current.y===middle && current.z===middle && isOddCube)|| 
    //     (current.x===solved.x && current.y===solved.y && current.z===solved.z)){
    //     return moveString;
    // }
    // else if(currentSide==="D"){
    //     moveString = move("",current.y+1,"F");

    //     if(dim-(current.x+1)<middle) {
    //         if(current.y<middle) moveString += " 01R";
    //         else moveString += " 01R'";
    //     }
    //     else {
    //         if(current.y<middle) moveString += " 01R'";
    //         else moveString += " 01R";
    //     }

    //     moveString += move(" ",current.x+1,"U2");

    //     if(dim-(current.x+1)<middle) {
    //         if(current.y<middle) moveString += " 01R1";
    //         else moveString += " 01R";
    //     }
    //     else {
    //         if(current.y<middle) moveString += " 01R";
    //         else moveString += " 01R'";
    //     }

    //     moveString += move(" ",current.y+1,"F'");
    //     moveString += move(" ",current.x+1,"U2");
    // }

    // else if (currentSide==="R"){
    //     if(current.y===solved.y&&current.z===solved.x){
    //         moveString = move("",current.y+1,"F");

    //         if(solved.y===middle&&isOddCube) moveString += " 01L'"; //a
    //         else moveString += " 01L2";

    //         moveString += move(" ",current.y+1,"F'");

    //         if(solved.y===middle&&isOddCube) moveString += " 01L'"; //a1

    //         moveString += move(" ",current.z+1,"D2");

    //         if(solved.y===middle&&isOddCube) moveString += " 01L";  //a1'

    //         moveString += move(" ",current.y+1,"F");

    //         if(solved.y===middle&&isOddCube) moveString += " 01L";  //a'
    //         else moveString += " 01L2";

    //         moveString += move(" ",current.y+1,"F'");
    //         moveString += move(" ",current.z+1,"D2");
    //     }
    //     else moveString = "01R'"
    // }

    // else if (currentSide==="L"){
    //     if(current.y===solved.y&&current.z===(dim-(solved.x+1))){
    //         moveString = move(" ",current.y+1,"F'");

    //         if(solved.y===middle&&isOddCube) moveString += " 01R"; //a
    //         else moveString += " 01R2";

    //         moveString += move(" ",current.y+1,"F");

    //         if(solved.y===middle&&isOddCube) moveString += " 01R"; //a1

    //         moveString += move(" ",current.z+1,"D2");

    //         if(solved.y===middle&&isOddCube) moveString += " 01R'";  //a1'

    //         moveString += move(" ",current.y+1,"F'");

    //         if(solved.y===middle&&isOddCube) moveString += " 01R'";  //a'
    //         else moveString += " 01R2";

    //         moveString += move(" ",current.y+1,"F");
    //         moveString += move(" ",current.z+1,"D2");
    //     }
    //     else moveString = "01L"
    // }

// ############################################################

    // if(currentSide==="L"){
    //     if(solved.y===current.y){
    //         moveString = move("",current.y+1,"F'");

    //         if(solved.y===middle && isOddCube){
    //             moveString += " 01D' ";
    //         } else { moveString += " 01D2 "; }

    //         moveString += move(" ",current.y+1,"F");

    //         if(solved.y===middle && isOddCube){
                
    //         } else {
    //             moveString += " 01D ";
    //         }

    //         moveString += move(" ",current.y+1,"F'");
    //         moveString += " 01R2";
    //         moveString += move(" ",current.y+1,"F");

    //         if(solved.y===middle && isOddCube){
                
    //         } else {
    //             moveString += " 01D' ";
    //         }

    //         moveString += move(" ",current.y+1,"F'");

    //         if(solved.y===middle && isOddCube){
    //             moveString += " 01D ";
    //         } else {
    //             moveString += " 01D2 ";
    //         }

    //         moveString += move(" ",current.y+1,"F");

    //     }
    //     else{
    //         moveString = move("",current.y+1,"F'");
    //         moveString += " 01D";
    //         moveString += move(" ",current.y+1,"F");
    //     }

    // }
    // if(currentSide==="R"){
    //     // this solver is hard. console.log the moves but return an empty string so you can see the move it's trying
    //     if(current.y===solved.y && solved.z === dim-(current.z+1)){
    //         moveString = move("",solved.y+1,"F'");

    //         if(solved.y===middle && isOddCube){
    //             moveString += " 01D";
    //         } else { moveString += " 01D2"; }

    //         moveString += move(" ",solved.y+1,"F");

    //         if(solved.y===middle && isOddCube){
    //             moveString += " 01D'";
    //         } else { moveString += " 01D2"; }

    //         moveString += " 01R"
    //         moveString += " 01D"

    //         moveString += move(" ",current.z+1,"F");

    //         if(current.y>middle){
    //             moveString += " 01D";
    //         } else {moveString += " 01D'";}

    //         moveString += move(" ",current.z+1,"F'");

    //         if(solved.y===middle && isOddCube){
    //         } else {moveString += " 01D";}

    //         moveString += move(" ",solved.y+1,"F'");

    //         if(solved.y===middle && isOddCube){
    //             moveString += " 01D'";
    //         } else {moveString += " 01D2";}

    //         moveString += move(" ",solved.y+1,"F");

    //         console.log("Test moves: ",moveString);
    //         moveString = "";
    //         // piece should be in place on displaced solved row on D (column d)
    //         //               d
    //         // D = [ 0 0 0 0 0 0 0 ]
    //         //     [ 0 n n n P n 0 ]
    //         //   x [ 0 n n n U n 0 ]
    //         //     [ 0 n n X U n 0 ]
    //         //     [ 0 n n n U n 0 ]
    //         //     [ 0 n n n U n 0 ]
    //         //     [ 0 0 0 0 0 0 0 ]

    //         // Idea : find way to figure out what d and x will be, will make next 3 steps easier
    //         // 
    //         // 

    //         // Rotate D to avoid misplacements when putting blue back in place (row x)

    //         // Rotate D to move out of blue path onto L

    //         // Rotate D into path so solved row gets replaced when blue gets moved from L to U
            

    //     }
    //     else {
    //         moveString = "01R"
    //     }
    // }
    // if(currentSide==="D"){
    //     moveString = move("",current.y+1,"F'");

    //     if(isOddCube && current.y===middle){
    //         moveString += " 01R'";
    //     } else {moveString += " 01R2";}

    //     moveString += move(" ",current.y+1,"F");
    // }




    return moveString;

}

module.exports = solveOrangeMiddle;