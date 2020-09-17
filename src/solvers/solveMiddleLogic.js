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

    function solve(faceColor){
        switch(faceColor){
            case 0:
                // Solved for all sizes
                return whiteSolver(current,solved,dim,index);
            case 1:
                // Solved for all sizes
                return yellowSolver(current,solved,dim,index);
            case 2:
                // Solved for all sizes
                return blueSolver(current,solved,dim);
            case 3:
                // In Progress. Solved for 4x4
                return orangeSolver(current,solved,dim);
            case 4:
                // In Progress. Solved for 4x4
                return greenSolver(current,solved,dim,index);
            default:
                console.log("Should never reach here");
        }
    }

    if(current.x===solved.x && current.y===solved.y && current.z===solved.z){
        
    }

    else{
        return solve(faceColor);
    }

    return "";
}

export default solveMiddleLogic;