import solveMiddleLogic from './solveMiddleLogic';

// Lots of console logs while this section is still in development.
// Might leave logs commented for future debugging if necessary.
function solveMiddles(cube,dim,moveStringToArray,index,middles){

    if(dim===2) {
        return {solveState : 1};
    }

    let moveString = "";
    let whiteMiddleError = false;
    let yellowMiddleError = false;

    const obj = {};

    // Solve logic for 3x3
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
    }

    // Solve logic for 4x4 and greater
    else if(dim>3){
      
      //Check for misplacement errors in white middle solve
      for(let i = 0; i<index&&i<(dim-2)*(dim-2)-1;i++){
        if(cube[middles[i]][6]!==cube[middles[i]][9]&&
           cube[middles[i]][7]!==cube[middles[i]][10]&&
           cube[middles[i]][8]!==cube[middles[i]][11]){
            console.log(cube[middles[i]]);
            whiteMiddleError=true;
           }
      }
      //Check for misplacement errors in yellow middle solve
      for(let i = (dim-2)*(dim-2); i<index&&i<((dim-2)*(dim-2))*2-1;i++){
        if(cube[middles[i]][6]!==cube[middles[i]][9]&&
           cube[middles[i]][7]!==cube[middles[i]][10]&&
           cube[middles[i]][8]!==cube[middles[i]][11]){
            console.log(cube[middles[i]]);
            yellowMiddleError=true;
           }
      }
      // if(dim%2 && !whiteMiddleError && !yellowMiddleError && index===((dim-2)*(dim-2))*2){
      //   console.log(cube[middles[index+Math.ceil(((dim-2)*(dim-2)))/2]]);
      //   /* Send Index of center blue piece
      //   console.log(`Index: ${index}, Piece: ${middles[index]}`);
      //   moveString = solveMiddleLogic(dim,cube[middles[index]],index);
      //   console.log(moveString + "\n-------------------------------")*/
      // }
      
      if(!whiteMiddleError && !yellowMiddleError && index<((dim-2)*(dim-2))*3){
        if(dim%2 && index === ((((dim-2)*(dim-2))*2))){
          
          let oddTopMiddleIndex = ((((dim-2)*(dim-2))*2)+Math.floor((dim-2)*(dim-2)/2));

          console.log("Odd cube top middle index: " + cube[middles[oddTopMiddleIndex]]);
          if(cube[middles[oddTopMiddleIndex]][6]===cube[middles[oddTopMiddleIndex]][9] &&
             cube[middles[oddTopMiddleIndex]][7]===cube[middles[oddTopMiddleIndex]][10] &&
             cube[middles[oddTopMiddleIndex]][8]===cube[middles[oddTopMiddleIndex]][11]){
            console.log("Odd cube top middle in position, moving on with solver");
          }
          else{
            if(cube[middles[oddTopMiddleIndex]][6]===dim-1){
              console.log("1")
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F'";
            }
            else if(cube[middles[oddTopMiddleIndex]][8]===0){
              console.log("2")
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F2";
            }
            else if(cube[middles[oddTopMiddleIndex]][6]===0){
              console.log("3")
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F";
            }
            console.log(moveString);
          }
        }
        console.log(`Index: ${index}, Piece: ${middles[index]}`);
        moveString += ((moveString.length) ? " ":"") + solveMiddleLogic(dim,cube[middles[index]],index);
        console.log(moveString + "\n-------------------------------");
      }
      else if(whiteMiddleError){
        console.log("Exiting early due to an earlier solved piece being displaced on face 0");
        index=1000000000;
      }
      else if(yellowMiddleError){
        console.log("Exiting early due to an earlier solved piece being displaced on face 3");
        index=1000000000;
      }
    }
    const moveArray = moveStringToArray(moveString);

    if(dim<4){
      moveString.length ? obj.moveSet = moveArray : obj.solveState=1;
    }
    else{
      if(index<((dim-2)*(dim-2))*3){
        moveString.length ? obj.moveSet = moveArray : obj.rubiksIndex = index+1;
      }

      else{
        console.log(index);
        console.log("move on");
        obj.solveState = -1; obj.currentFunc = "None"; obj.rubiksIndex = 0;
      }
    }
    return obj;
}

export default solveMiddles;