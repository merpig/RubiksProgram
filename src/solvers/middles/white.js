/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      white.js
 *      Started: Friday, December 13, 2019
 *      v1.0 working function: Saturday, December 14, 2019
 *      
 */

const move = (dim, current, option) =>{
    let moveString = undefined
    
    return moveString

}
let solveWhiteMiddle = (current,solved,dim,index) => {
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
    if(solved.x===1){
        console.log("SOLVING LEFT SIDE PIECE");
        if(dim-solved.z === 2){
            if(currentSide==="F"){
                moveString="01F";
                console.log("1")
            }
            else if(currentSide!=="D"&&currentSide!=="U"){
                if(current.z!==dim-2){
                    moveString= "01" + currentSide;
                    console.log("2")
                }
                else{
                    moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    console.log("3")
                }
            }
            else {
                if(current.x!==solved.x){
                    moveString = "01" + currentSide;
                    console.log("4")
                }
                else{
                    moveString = "02L";
                    console.log("5")
                }
            }
        }
        else{
            if(currentSide==="F"){
                moveString = ((current.z+1)<10? "0" : "") + (current.z+1) + "D'";
            }
            else if(currentSide==="B"){
                if(current.z<=solved.z){
                    moveString = ((current.z+1)<10? "0" : "") + (current.z+1) + "D";
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
                    moveString = ((current.z+1)<10 ? "0" : "")  + (current.z+1) + "D";
                }
            }
            else moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
        }
    }
    else{
        if(row===0){
            if(currentSide==="F"){
                if(current.z < solved.z && current.x >=solved.x){
                    moveString = ((dim-current.x)<10? "0" : "") + (dim-current.x) + "R";
                    console.log("6 ---------------------------------------- " + moveString);
                }
                else{
                    moveString = ((current.z+1)<10? "0" : "") + (current.z+1) + "D"
                    console.log("7 ----------------------------------------"+ moveString);
                }
            }
            else if(currentSide==="B"){
                if(current.x === solved.x && current.z!== solved.z){
                    moveString = ((column+2)<10? "0" : "") + (column+2) + "L2"
                    console.log("8")
                }
                else {
                    moveString = "01B"
                    console.log("9")
                };
            }
            else{
                if(current.y===dim-2){
                    if(current.z !== dim-1){
                        moveString = ((row+2)<10? "0" : "") + (row+2) + "B";
                        console.log("10")
                    }
                    else{
                        if(current.x !== solved.x){
                            moveString = "01U";
                            console.log("11")
                        }
                        else {
                            moveString = ((column+2)<10? "0" : "") + (column+2) + "L"
                            console.log("12")
                        };
                    }
                }
                else{
                    moveString = "01" + currentSide;
                    console.log("13")
                }
            }
        }
        else{
            if(currentSide==="F"){
                if(current.z<solved.z){
                    moveString = ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    console.log("if not at solved level move left")
                }
                else {
                    moveString = ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString += " " + ((dim-current.x)<10? "0" : "") + (dim-current.x) + "F'";
                    moveString += " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                    console.log("is at solved level, extract")
                }
                
            }
            else if(currentSide==="B"){
                if(current.z===solved.z){
                    if(solved.x===current.x){
                    moveString = ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString += " " + ((current.x+1)<10? "0" : "") + (current.x+1) + "B";
                    moveString += " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                    }
                    else {
                        moveString = ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                        moveString += " 01R";
                        moveString += " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                    }
                }
                else moveString = "01B";
            }
            else{
                if(current.z!==(dim-1)){
                    moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
                    console.log("moving z to top")
                }
                else{
                    if(current.x!==solved.z){
                        moveString = "01U";
                        console.log("top: solve z")
                    }
                    else if(current.y!==(dim-(solved.x+1))){
                        moveString = "01U";
                        console.log("top: solve y")
                    }
                    else{
                        moveString = ((dim-solved.z)<10? "0" : "") + (dim-solved.z) + "U";
                        moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
                        moveString += " " + ((dim-solved.z)<10? "0" : "") + (dim-solved.z) + "U'";
                        console.log("top to front")
                    }
                }
            }
        }
    }
    return moveString;
}

module.exports = solveWhiteMiddle;