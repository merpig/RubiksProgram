/* 
 * 
 *      Sasha Peters
 *      Created working function: Saturday, December 14, 2019
 *      
 */

import whiteSolver from "./middles/white"
import yellowSolver from "./middles/yellow"
import blueSolver from "./middles/blue"
import greenSolver from "./middles/green"
import orangeSolver from "./middles/orange"

function solveMiddleLogic(cubeDimensions,rubiksObjectAtIndex,index){
    
    let dim = cubeDimensions;
    let faceColor = Math.floor((index)/((dim-2)*(dim-2)));
    let moveString = "";

    // Coordinates organized
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

    

    if(current.x===solved.x && current.y===solved.y && current.z===solved.z){
        console.log("SOLVED");
    }

    else{
        switch(faceColor){
            case 0:
                // Solved for all sizes
                moveString = whiteSolver(current,solved,dim,index);
                break;
            case 1:
                // Solved for all sizes
                moveString = yellowSolver(current,solved,dim,index);
                break;
            case 2:
                // Solved for all sizes
                moveString = blueSolver(current,solved,dim);
                break;
            case 3:
                // In Progress. Solved for 4x4
                moveString = orangeSolver(current,solved,dim);
                break;
            case 4:
                // In Progress. Solved for 4x4
                moveString = greenSolver(current,solved,dim,index);
                break;
            default:
                console.log("Should never reach here");
        }
    }
    return moveString;
}

export default solveMiddleLogic;