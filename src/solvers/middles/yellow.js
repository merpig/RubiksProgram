/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      yellow.js
 *      Started: Saturday, December 14, 2019
 *      v1.0 working function: Saturday, December 14, 2019
 *      
 */


let solveYellowMiddle = (current,solved,dim,index) => {
    let currentSide = "F";
    let row = Math.floor(index/(dim-2));
    let column = index%(dim-2);
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    console.log(`Currently on side: ${currentSide}`);
    console.log(`Current position: ${JSON.stringify(current)}`);
    console.log(`Solved position: ${JSON.stringify(solved)}`);
    let moveString = "";
    //if(row<dim-1){
        if(currentSide==="B"){

            if(current.z!==Math.floor(dim/2)&&current.z!==solved.z){
                moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                moveString+= " 01R2";
                moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
            }
            else{
                if((dim-current.x===current.z+1&&current.z===Math.ceil(dim/2)-1)||(current.z === solved.z&&current.x!==solved.x)){
                    moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString+= " 01R'";
                    moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                    moveString+= " 01R'";
                    moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString+= " 01R2";
                    moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                }
                else if(dim-current.x===current.z+1||current.x===current.z){
                    moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString+= " 01R'";
                    moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                }
                else{
                    moveString= ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U";
                    moveString+= " 01R";
                    moveString+= " " + ((dim-current.z)<10? "0" : "") + (dim-current.z) + "U'";
                }
                
            }
            console.log("moving piece out of back side");
        }
        else{
            if(currentSide!=="R"){
                moveString= ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
                console.log("moving piece to right side");
            }
            else if(current.y === dim-solved.z-1 && current.z === dim-solved.x-1) {
                moveString = ((solved.x+1)<10? "0" : "") + (solved.x+1) + "L";
                if(solved.x===solved.z){
                    moveString += " 01D"
                    console.log("1")
                } 
                else {
                    solved.z<Math.ceil(dim/2)&&solved.x<Math.ceil(dim/2) ? moveString += " 01D" : moveString += " 01D'"
                    console.log("2")
                }
                moveString += " " + (current.y+1<10? "0" : "") + (current.y+1) + "F'";
                if(solved.x===solved.z){
                    moveString += " 01D'"
                    console.log("3")
                } 
                else 
                    solved.z<Math.ceil(dim/2)&&solved.x<Math.ceil(dim/2) ? moveString += " 01D'" : moveString += " 01D"
                moveString += " " + ((solved.x+1)<10? "0" : "") + (solved.x+1) + "L'";
            } 
            else {
                console.log("correct pos should be y:" + (dim-solved.z) + ", x:" + (dim-solved.x));
                moveString = "01R";
                console.log("Problem here")
            }
        }
    //}
   // else{
   // }

    return moveString
}

module.exports = solveYellowMiddle;