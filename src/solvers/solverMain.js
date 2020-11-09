import solver from '../solvers/solver';
import cube from '../cubeFunctions/cube';
import moveFuncs from '../cubeFunctions/move';

function generateAllSolveMoves(state,rubiksObject){
    let beforeObject = rubiksObject.map(e=>[...e]);
    let tempState = {...state}, solvedSet = "";
    let currentIndex = null;
    let previousIndex = null;
    let indexOccurence = 0;
    let error = false;
    let counter = 0;
    let threeByThreeCounter = 0;
    if(tempState.currentFunc === 'Color Picker'){
      tempState.solveState = 0;
      tempState.currentFunc = "Solving";
      tempState.rubiksObject = rubiksObject.map(e=>[...e]);
    }
    while(tempState.currentFunc==="Solving"){
      
      if(!tempState.moveSet || !tempState.moveSet.length) {
        //console.log(tempState.rubiksIndex);
        currentIndex=tempState.rubiksIndex;
        if(currentIndex===previousIndex) indexOccurence = indexOccurence+1;
        else indexOccurence = 0;
        if(tempState.solveState>=1) threeByThreeCounter++;
        let moves;

        moves = solver(tempState.solveState,tempState.rubiksObject,tempState.cubeDimension,moveFuncs.moveStringToArray,
          tempState.solveMoves,tempState.rubiksIndex,tempState.middles,tempState.edges,tempState.corners);
        if (!moves) moves = {};
        if(moves.moveSet && moves.moveSet[0]==='stop'){
          if(tempState.currentFunc==="Solving"){
            moves.solveMoves = tempState.solveMoves + ` ${moves.moveSet[0]}`;
            moves.moveSet.pop();
          }
          else moves.moveSet.pop();
        }
        
        if(moves.moveSet){
          let temp = [];
          for(let i = 0; i<moves.moveSet.length; i++){
            
            if(moves.moveSet[i]===''||moves.moveSet[i]===' '||moves.moveSet[i][0]==="N"||moves.moveSet[i]==="'");
            else temp.push(moves.moveSet[i]);
          }
          moves.moveSet = temp;
        }
        if(threeByThreeCounter>500) {
          error = true;
          //console.log(tempState.solveState);
          moves.currentFunc="None";
        }
        else if((indexOccurence>10 && tempState.solveState<1)||counter>10000||(moves.moveSet&&moves.moveSet[0]==='error')) {

          console.log(
            "Solve State: ",tempState.solveState,
            "\nPiece attempts: ",indexOccurence,
            "\nPiece: ",tempState.rubiksObject[tempState.middles[tempState.rubiksIndex]]
          );
          
          console.log(moves);
          error = true;
          //console.log(JSON.stringify({beforeObject}));
          moves.currentFunc="None";
        }
        if(moves.currentFunc && moves.currentFunc==="None") solvedSet = tempState.solveMoves;
        counter++;
        tempState = {...tempState,...moves};
        previousIndex=currentIndex;
      }
      else{
        let cD = tempState.cubeDimension;
        let blockMoveLog = tempState.blockMoveLog;
        let moveLog = tempState.moveLog;
        let solveMoves = tempState.solveMoves;
        let rubiksObject = tempState.rubiksObject;
        let end = tempState.end;
        let solveState = tempState.solveState;
        let moveData = moveFuncs.parseMoveArray(tempState.moveSet); // generates data for next move
        let obj = cube.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
        obj.rubiksObject = cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);
        tempState = {...tempState,...obj};
      }
    }
    let splitSet = solvedSet.split(" ");
    if(splitSet[0][0]==="N"||splitSet[0][0]==="'") splitSet.shift();
    let moveSet = []
    splitSet.forEach(e => e[e.length-1]==="'"? moveSet.push(e.replace("'","")):moveSet.push(e+"'"));

    for(let i = 0; i<moveSet.length; i++){
      if(moveSet[i]===''||moveSet[i]===' '||moveSet[i][0]==="N"||moveSet[i]==="'"||moveSet[i]===undefined){
        moveSet.splice(i,1);
      }
    }

    let maxDepth = Math.floor(tempState.cubeDimension/2);
    moveSet = moveSet.map(move=>{
      if(move==="stop'") return move;
      //console.log(move);
      let dataMove = moveFuncs.convertMoveToData(move);
      if(parseInt(dataMove[2])>maxDepth&&!dataMove[3]){
        //console.log("Found over reaching move: [ " + move + " ]");
        dataMove[2]=(tempState.cubeDimension-dataMove[2])+1
        if(parseInt(dataMove[0])===0) dataMove[0] = 3;
        else if(parseInt(dataMove[0])===1) dataMove[0] = 5;
        else if(parseInt(dataMove[0])===2) dataMove[0] = 4;
        else if(parseInt(dataMove[0])===3) dataMove[0] = 0;
        else if(parseInt(dataMove[0])===4) dataMove[0] = 2;
        else if(parseInt(dataMove[0])===5) dataMove[0] = 1;
        dataMove[1]===0?dataMove[1]=-1:dataMove[1]=0;

        //console.log("Converted to: [ " + moveFuncs.convertDataToMove(dataMove) + " ]");
        return moveFuncs.convertDataToMove(dataMove);
      }
      return moveFuncs.convertDataToMove(dataMove);
    })

    let moveSetLength = 0;
    while(moveSet.length!==moveSetLength){
      moveSetLength = moveSet.length;
      for(let i = 0; i < moveSet.length-2; i++){
        if(moveSet[i].substring(0,3)===moveSet[i+1].substring(0,3) && moveSet[i].length!==moveSet[i+1].length){
          moveSet.splice(i,2);
        }
      }
      for(let i = 0; i < moveSet.length-2; i++){
        if(moveSet[i]===moveSet[i+1] && moveSet[i]===moveSet[i+2]){
          if(moveSet[i].length===3){moveSet[i]+="'"}
          else{moveSet[i]=moveSet[i].substring(0,3)}
          moveSet.splice(i+1,2);
        }
      }
    }

    if(moveSet[0]==="stop'"&&moveSet[1]==="stop'"&&moveSet.length===2) moveSet = [];
  
    // let invalidAlignment = 0;
    // let invalidPlacement = 0;

    if(state.cubeDimension<6){
      tempState.rubiksObject.forEach(piece => {
        if(piece.includes("middle")) return;
        let tempPiece = piece.slice(0,6);
        let tempFiltered = tempPiece.filter(side=>side!=="black");
        let validCount = 0
        if([piece[6],piece[7],piece[8]].join("")!==[piece[9],piece[10],piece[11]].join("")){
          if(tempFiltered.length>1) {/*invalidPlacement++;*/ error=true;}
        }
        if(tempPiece[0]==="white"||tempPiece[0]==="black") validCount++;
        if(tempPiece[1]==="blue"||tempPiece[1]==="black") validCount++;
        if(tempPiece[2]==="red"||tempPiece[2]==="black") validCount++;
        if(tempPiece[3]==="yellow"||tempPiece[3]==="black") validCount++;
        if(tempPiece[4]==="orange"||tempPiece[4]==="black") validCount++;
        if(tempPiece[5]==="green"||tempPiece[5]==="black") validCount++;
        if(validCount<6) {/*invalidAlignment++;*/ error=true;}
      });    
    }

    if(error) {
      //console.log(invalidAlignment,invalidPlacement);
      return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:false,solvedSet:[...moveSet],solvedSetIndex:0};
    }
    return {moveSet:[...moveSet],rubiksObject : beforeObject,solveable:true,solvedSet:[...moveSet],solvedSetIndex:0,tempObject:tempState.rubiksObject};
}

export default generateAllSolveMoves;