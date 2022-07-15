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
    
    if(currentSide==="B"){
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