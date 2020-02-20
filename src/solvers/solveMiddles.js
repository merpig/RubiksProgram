import solveMiddleLogic from './solveMiddleLogic';

// Lots of console logs while this section is still in development.
// Might leave logs commented for future debugging if necessary.
function move(space,depth,side){
  return (space+(depth<10? "0":"") + depth + side);
}

function solveMiddles(cube,dim,moveStringToArray,index,middles){

    if(dim===2) {
        return {solveState : 1};
    }

    let moveString = "";
    let whiteMiddleError = false;
    let yellowMiddleError = false;
    let blueMiddleError = false;
    let orangeMiddleError = false;

    let solved = true;

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

      // Check if all middles are in place
      for(let i = 0; i<=index&&i<((dim-2)*(dim-2))*5;i++){
          if(cube[middles[i]][6]===cube[middles[i]][9]&&
             cube[middles[i]][7]===cube[middles[i]][10]&&
             cube[middles[i]][8]===cube[middles[i]][11]){
             }else {
              solved=false;
             }
      }
      
      if(!solved && index<((dim-2)*(dim-2))*5){ 
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
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F'";
            }
            else if(cube[middles[oddTopMiddleIndex]][8]===0){
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F2";
            }
            else if(cube[middles[oddTopMiddleIndex]][6]===0){
              moveString += ((Math.ceil(dim/2))<10? "0" : "") + (Math.ceil(dim/2)) + "F";
            }
            console.log(moveString);
          }
        }
        console.log(`Index: ${index}, Piece: ${middles[index]}`);
        
        moveString += ((moveString.length) ? " ":"") + solveMiddleLogic(dim,cube[middles[index]],index);
        // if(index === ((dim-2)*(dim-2))*4-1 && moveString === "" && fixOrange){

        //   // do a check here to see if this even needs to be run
        //   // This will be deprecated later. Here because I got lazy and tired of middle solvers

        //   obj.fixOrange = false;
          
        //   if(dim%2){
        //     for(let i = dim-1; i> Math.floor(dim/2)+1; i--){
        //       moveString += move(" ",i,"F");
        //     }

        //     moveString+= " 01L2";

        //     for(let i = dim-1; i> Math.floor(dim/2)+1; i--){
        //       moveString += move(" ",i,"F'");
        //     }

        //     for(let i = 2; i < Math.floor(dim/2)+1; i++){
        //       moveString += move(" ",i,"F");
        //     }

        //     moveString+= " 01L2";

        //     for(let i = 2; i < Math.floor(dim/2)+1; i++){
        //       moveString += move(" ",i,"F'");
        //     }

        //     moveString += " 01L2";
        //     moveString += " 01D";
        //     moveString += move(" ",Math.floor(dim/2)+1,"F'")
        //     moveString += " 01D'";
        //     moveString += move(" ",Math.floor(dim/2)+1,"F")

        //     obj.rubiksIndex = index+1;
        //   }
        //   else {
        //     for(let i = dim-1; i> Math.floor(dim/2); i--){
        //       moveString += move(" ",i,"F");
        //     }

        //     moveString+= " 01L2";

        //     for(let i = dim-1; i> Math.floor(dim/2); i--){
        //       moveString += move(" ",i,"F'");
        //     }

        //     for(let i = 1; i <= Math.floor(dim/2); i++){
        //       moveString += move(" ",i,"F");
        //     }

        //     moveString+= " 01L2";

        //     for(let i = 1; i <= Math.floor(dim/2); i++){
        //       moveString += move(" ",i,"F'");
        //     }

        //     moveString += " 01L2";
        //     obj.rubiksIndex = index+1;
        //   }
        // }else if(index === ((dim-2)*(dim-2))*4){
        //   obj.fixOrange = true;
        // }
        console.log(moveString + "\n-------------------------------");
      }
    }

    

    if(dim<4){
      const moveArray = moveStringToArray(moveString);
      moveString.trim().length ? obj.moveSet = moveArray : obj.solveState = 1;
    }
    else{
      if(index<((dim-2)*(dim-2))*5){

        const moveArray = moveStringToArray(moveString);
        moveString.trim().length ? obj.moveSet = moveArray : obj.rubiksIndex = index+1;

      }

      else{
        console.log("Ready for edge solver {solveState:0.1}");
        console.log(moveString + "\n-------------------------------\n");
        
        if(dim===4){
          obj.solveState = .1; obj.rubiksIndex = 0; obj.currentFunc = "Solving";
        } else {
          obj.solveState = .1; obj.rubiksIndex = 0; obj.currentFunc = "Solving";
        }
      }
    }
    //return obj;
    // obj.moveSet = [];
    // obj.solveState = 0.1; 
    // obj.rubiksIndex = 0;
    return obj;
}

export default solveMiddles;