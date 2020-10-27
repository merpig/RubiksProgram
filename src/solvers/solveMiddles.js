import solveMiddleLogic from './solveMiddleLogic';

function solveMiddles(cube,dim,moveStringToArray,index,middles){

    // End function if 2x2
    if(dim===2) return {solveState : 1};

    const numberOfMiddles= ((dim-2)*(dim-2))*5;
    const obj = {};
    let moveString = "";

    // Position middles for 3x3
    if(dim===3){
      if(cube[4][7] === 0 && cube[10][8] === 2){
      }
      else{
        if(cube[4][8]===2){ //U
          cube[12][6]===0 ? moveString+="02R'" : moveString+="02U'";
        }
        else if(cube[4][6]===0){//L
          cube[10][8]===2 ? moveString+="02U'" : moveString+="02R'";
        }
        else if(cube[4][6]===2){//R
          cube[10][8]===2 ? moveString+="02U" : moveString+="02R'";
        }
        else if(cube[4][8]===0){//D
          cube[12][6]===0 ? moveString+="02R" : moveString+="02U'";
        }
        else if(cube[4][7]===2){//B
          cube[10][8]===2 ? moveString+="02U2" : moveString+="02F'";
        }
        else moveString+="02B'"//F
      }

      const moveArray = moveStringToArray(moveString);
      moveString.trim().length ? obj.moveSet = moveArray : obj.solveState = 1;
    }

    // Solve logic for 4x4 and greater
    else{
      
      if(index<numberOfMiddles){ 
        moveString = solveMiddleLogic(dim,cube[middles[index]],index);
        const moveArray = moveStringToArray(moveString);
        moveString.trim().length ? obj.moveSet = moveArray : obj.rubiksIndex = index+1;
      }

      else{
        obj.solveState = .1;
        obj.rubiksIndex = 0;
        obj.currentFunc = "Solving";
        obj.moveSet = ['stop'];
      }
    }

    return obj;
}

export default solveMiddles;