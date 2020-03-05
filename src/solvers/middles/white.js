/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      white.js
 *      Started: Friday, December 13, 2019
 *      Finished: Saturday, December 14, 2019
 *      Note: Redo this function so it works similarly to other solvers (no row or columns)
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveWhiteMiddle = (current,solved,dim,index) => {

    let currentSide = "F";
    let row = Math.floor(index/(dim-2));
    let column = index%(dim-2);
    let moveString = "";

    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    // console.log(`Currently on side: ${currentSide}`);
    // console.log(`Current position: ${JSON.stringify(current)}`);
    // console.log(`Solved position: ${JSON.stringify(solved)}`);
    
    if(solved.x===1){
        if(dim-solved.z === 2){
            if(currentSide==="F"){
                moveString="01F";
            }
            else if(currentSide!=="D"&&currentSide!=="U"){
                if(current.z!==dim-2){
                    moveString= "01" + currentSide;
                }
                else{
                    moveString= move("",dim-current.z,"U");
                }
            }
            else {
                if(current.x!==solved.x){
                    moveString = "01" + currentSide;
                }
                else{
                    moveString = "02L";
                }
            }
        }
        else{
            if(currentSide==="F"){
                moveString = move("",current.z+1,"D'");
            }
            else if(currentSide==="B"){
                if(current.z<=solved.z){
                    moveString = move("",current.z+1,"D");
                }
                else moveString = "01B";
            }
            else if(currentSide==="L"){
                if(current.y!==dim-2){
                    moveString= "01L";
                }
                else if(current.z!==solved.z){
                    moveString= "01L";
                }
                else {
                    moveString = move("",current.z+1,"D");
                }
            }
            else moveString = move("",current.y+1,"F'");
        }
    }
    else{
        if(row===0){
            if(currentSide==="F"){
                if(current.z < solved.z && current.x >=solved.x){
                    moveString = move("",dim-current.x,"R");
                }
                else{
                    moveString = move("",current.z+1,"D");
                }
            }
            else if(currentSide==="B"){
                if(current.x === solved.x && current.z!== solved.z){
                    moveString = move("",column+2,"L2");
                }
                else {
                    moveString = "01B"
                };
            }
            else{
                if(current.y===dim-2){
                    if(current.z !== dim-1){
                        moveString = move("",row+2,"B")
                    }
                    else{
                        if(current.x !== solved.x){
                            moveString = "01U";
                        }
                        else {
                            moveString = move("",column+2,"L");
                        };
                    }
                }
                else{
                    moveString = "01" + currentSide;
                }
            }
        }
        else{
            if(currentSide==="F"){
                if(current.z<solved.z){
                    moveString = move("",dim-current.z,"U");
                }
                else {
                    moveString = move("",dim-current.z,"U");
                    moveString += move(" ",dim-current.x,"F'");
                    moveString += move(" ",dim-current.z,"U'");
                }
                
            }
            else if(currentSide==="B"){
                if(current.z===solved.z){
                    if(solved.x===current.x){
                        moveString = move("",dim-current.z,"U");
                        moveString += move(" ",current.x+1,"B");
                        moveString += move(" ",dim-current.z,"U'");
                    }
                    else {
                        moveString = move("",dim-current.z,"U");
                        moveString += " 01R";
                        moveString += move(" ",dim-current.z,"U'");
                    }
                }
                else moveString = "01B";
            }
            else{
                if(currentSide!=="U"){
                    //console.log("Moving to top")
                    moveString += move(" ",current.y+1,"F");
                }
                else{
                    if(current.x!==solved.x || current.y!==solved.z){
                        moveString = "01U";
                    }
                    else{
                        moveString = "01U'";
                        moveString += move(" ",dim-solved.z,"U'");
                        moveString += move(" ",current.x+1,"F");
                        moveString += move(" ",dim-solved.z,"U");
                    }
                }
            }
        }
    }
    return moveString;
}

module.exports = solveWhiteMiddle;