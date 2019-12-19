/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      yellow.js
 *      Started: Saturday, December 14, 2019
 *      
 *      
 */


let solveYellowMiddle = (current,solved,dim,index) => {
    let currentSide = "F";
    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.y === dim-1) currentSide = "B";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    console.log(`Currently on side: ${currentSide}`);
    console.log(`Current position: ${JSON.stringify(current)}`);
    console.log(`Solved position: ${JSON.stringify(solved)}`);
    let moveString = "";
    let opposite = "01L'";
    if(currentSide==="B"){
        moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D'";

        if(current.z!==solved.z){
            if(current.z === Math.floor(dim/2)){
                moveString += " 01R1";
            }
            else moveString += " 01R2";
        }

        else {
        // Do opposite of if on R to remove piece from back without displacing other pieces
        // All issues arise from here
            console.log("Piece found on same row but wrong column");
            if(current.x===current.z){
                moveString += " 01L'";
                opposite = "01L";
            }
            else if(((current.x>= Math.floor(dim/2) &&current.z>=Math.floor(dim/2)))  ||
                (current.x< Math.floor(dim/2) &&current.z<Math.floor(dim/2)) ||
                (current.x> Math.floor(dim/2) &&current.z<Math.floor(dim/2)))
                moveString += " 01L";
            else{
                moveString += " 01L'";
                opposite = "01L";
            }
        // End issue

        
            moveString += " " + ((dim-current.x)<10? "0" : "") + (dim-current.x) + "F";
            moveString += " " + opposite;
            
        }
        moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D";
        console.log("moving piece out of back side");
    }
    else{
        if(currentSide!=="R"){
            moveString= ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
            console.log("moving piece to right side");
        }
        else {
            // move piece from R to U, turn back strip so it's on R. Rotate L so white doesn't get displaced. Rotate piece
            // on U to R. Rotate L back into place and then move yellow/white sections back onto B/F
            if(current.y!==dim-(solved.x+1)||current.z!==solved.z){
                moveString = "01R";
            }
            else {
                moveString = ((current.y+1)<10? "0" : "") + (current.y+1) + "F'";
                moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D'";
                if((current.y>= Math.floor(dim/2)&&current.z>=Math.floor(dim/2)) ||
                   (current.y< Math.floor(dim/2)&&current.z<Math.floor(dim/2)))
                    moveString += " 01L"
                else
                    moveString += " 01L'"

                moveString += " " + ((current.y+1)<10? "0" : "") + (current.y+1) + "F";
                
                if((current.y>= Math.floor(dim/2)&&current.z>=Math.floor(dim/2)) ||
                   (current.y< Math.floor(dim/2)&&current.z<Math.floor(dim/2)))
                    moveString += " 01L'"
                else
                    moveString += " 01L"

                moveString += " " + ((current.z+1)<10? "0" : "") + (current.z+1) + "D";
            }

        }
        // else if(current.y === dim-solved.z-1 && current.z === dim-solved.x-1) {
        //     moveString = ((solved.x+1)<10? "0" : "") + (solved.x+1) + "L";
        //     if(solved.x===solved.z){
        //         moveString += " 01D"
        //         console.log("1")
        //     } 
        //     else {
        //         solved.z<Math.ceil(dim/2)&&solved.x<Math.ceil(dim/2) ? moveString += " 01D" : moveString += " 01D'"
        //         console.log("2")
        //     }
        //     moveString += " " + (current.y+1<10? "0" : "") + (current.y+1) + "F'";
        //     if(solved.x===solved.z){
        //         moveString += " 01D'"
        //         console.log("3")
        //     } 
        //     else 
        //         solved.z<Math.ceil(dim/2)&&solved.x<Math.ceil(dim/2) ? moveString += " 01D'" : moveString += " 01D"
        //     moveString += " " + ((solved.x+1)<10? "0" : "") + (solved.x+1) + "L'";
        // } 
        // else {
        //     console.log("correct pos should be y:" + (dim-solved.z) + ", x:" + (dim-solved.x));
        //     moveString = "01R";
        //     console.log("Problem here")
        // }
    }

    return moveString
}

module.exports = solveYellowMiddle;