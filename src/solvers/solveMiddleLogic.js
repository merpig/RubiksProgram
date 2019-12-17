/* 
 * 
 *      Sasha Peters
 *      Created working function: Saturday, December 14, 2019
 *      
 */

import whiteSolver from "./middles/white"
import yellowSolver from "./middles/yellow"
import blueSolver from "./middles/blue"

function solveMiddleLogic(cubeDimensions,rubiksObjectAtIndex,index){
    
    let dim = cubeDimensions;
    let faceColor = Math.floor((index)/((dim-2)*(dim-2)));
    let moveString = "";
    let current = {
        x:rubiksObjectAtIndex[6],
        y:rubiksObjectAtIndex[7],
        z:rubiksObjectAtIndex[8]
    };
    let solved = {
        x:rubiksObjectAtIndex[9],
        y:rubiksObjectAtIndex[10],
        z:rubiksObjectAtIndex[11]
    };
    //console.log(`object: ${rubiksObjectAtIndex}`);
    //console.log(`face: ${faceColor}`);

    //console.log("checking if in place...")
    if(current.x===solved.x && current.y===solved.y && current.z===solved.z){
        console.log("in place");
    }
    else{
        //console.log("not in place... generating move...");
        switch(faceColor){
            case 0:
                moveString = whiteSolver(current,solved,dim,index);
                break;
            case 1:
                moveString = yellowSolver(current,solved,dim,index);
                break;
            case 2:
                // Next one to solve
                moveString = blueSolver(current,solved,dim,index);
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                console.log("Should never reach here");
        }
    }
    return moveString;
}

export default solveMiddleLogic;