/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      yellow.js
 *      Started: Saturday, December 14, 2019
 *      Finished: Saturday, December 21, 2019
 *  
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveYellowMiddle = (current,solved,dim,index) => {

    let currentSide = "F";
    let middle = Math.floor(dim/2);
    let moveString = "";

    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    // console.log(`Currently on side: ${currentSide}`);
    // console.log(`Current position: ${JSON.stringify(current)}`);
    // console.log(`Solved position: ${JSON.stringify(solved)}`);
    
    
    //let opposite = "01L'";

    // This can be written smarter. Has a small flaw with extracting pieces from the back
    if(currentSide==="B"){
        // moveString += move(" ",current.z+1,"D'");

        // if(current.z!==solved.z){
        //     if(current.z === middle){
        //         moveString += " 01R";
        //     }
        //     else moveString += " 01R2";
        // }

        // else {
        //     if(current.x===current.z){
        //         moveString += " 01L'";
        //         opposite = "01L";
        //     }
        //     else if(((current.x>= middle &&current.z>=middle))  ||
        //         (current.x< middle &&current.z<middle) ||
        //         (current.x> middle &&current.z<middle))
        //         moveString += " 01L";
        //     else{
        //         moveString += " 01L'";
        //         opposite = "01L";
        //     }

        //     moveString += move(" ",dim-current.x,"F");
        //     moveString += " " + opposite;
            
        // }
        // moveString += move(" ",current.z+1,"D");
        moveString += move(" ",current.z+1,"D'");

        moveString += (dim%2&&current.z===middle)? " 01R" : " 01R2";

        moveString += move(" ",current.z+1,"D");

        moveString += (dim%2&&current.z===middle)? " 01R" : "";

        moveString += move(" ",current.x+1,"F")

        moveString += (dim%2&&current.z===middle)? " 01R'" : "";

        moveString += move(" ",current.z+1,"D'");

        moveString += (dim%2&&current.z===middle)? " 01R'" : " 01R2";

        moveString += move(" ",current.z+1,"D");
    }
    else{
        if(currentSide!=="R"){
            moveString= move("",current.y+1,"F");
        }
        else {
            if(current.y!==dim-(solved.x+1)||current.z!==solved.z){
                moveString = "01R";
            }
            else {
                moveString = move("",current.y+1,"F'");
                moveString += move(" ",current.z+1,"D'");
                if((current.y>= middle&&current.z>=middle) ||
                   (current.y< middle&&current.z<middle))
                    moveString += " 01L"
                else
                    moveString += " 01L'"

                moveString += move(" ",current.y+1,"F");
                
                if((current.y>= middle&&current.z>=middle) ||
                   (current.y< middle&&current.z<middle))
                    moveString += " 01L'"
                else
                    moveString += " 01L"

                moveString += move(" ",current.z+1,"D");
            }
        }
    }

    return moveString
}

module.exports = solveYellowMiddle;