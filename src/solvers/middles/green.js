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

let solveGreenMiddle = (current,solved,dim,index) => {

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
    

    // Temp 4x4 solver
    if(dim===4){
        if(currentSide === "D"){
            if(index===16){
                if(solved.x===current.x&&solved.y===current.y);
                else moveString = "01D"
            }

            else if(index===17){
                console.log("on side D")
                if(solved.x===current.x&&solved.y===current.y);
                else {
                    moveString = move("",current.y+1,"F'");
                    moveString += " 01R2"
                    moveString += move(" ",current.y+1,"F");
                }
            }
            else if(index===18){
                console.log("DID THIS SOLVE IT")
                moveString = move("",dim-1,"F'");
                moveString += " 01R'"
                moveString += move(" ",dim-1,"F");
            }
        }

        if(currentSide === "R"){
            if(index===16){
                moveString = move("",current.y+1,"F");
                moveString += " 01D2"
                moveString += move(" ",current.y+1,"F'");
            }

            else if(index===17){
                console.log("solved from red to green");
                console.log(current);
                if(current.y===2 && current.z===2){
                    console.log("solve it");
                    moveString = "01D";
                    moveString += move(" ", dim-1, "F");
                    moveString += " 01D'";
                    moveString += move(" ", dim-1, "F'");
                    
                }
                else{
                    moveString = "01R"
                }
            }
            
            else if(index===18){
                if(current.y===2 && current.z===1){
                    console.log("solve it");
                    moveString = "01R";
                    moveString += move(" ",dim-1,"F'");
                    moveString += " 01R'";
                    moveString += move(" ",dim-1,"F");
                }
                else{
                    moveString = "01R"
                }
            }
            else if(index===19){
                console.log("calculating move");
                if(current.y===1 && current.z===2){
                    moveString="03F'";
                    moveString+=" 01R'";
                    moveString+=" 03F";
                    moveString+=" 01R";
                    moveString+=" 03F'";
                    moveString+=" 01R";
                    moveString+=" 03F";
                }
                else{
                    moveString = "01R"
                }
            }
        }
    }

    // ORIGINAL SIDE 4 code.
    // Leaves opposite sides as last 2 faces, code left incase revisited

    // if(currentSide==="D"){
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

    return moveString;
}

module.exports = solveGreenMiddle;

