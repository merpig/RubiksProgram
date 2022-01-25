// Generalized move function. Takes in array of moves and parse the moves
const moveFuncs = {
    parseMoveArray : function(moveArray) {
        //if(typeof moveArray === 'string') moveArray = [moveArray];
        let shifted = moveArray.shift();

        let tempFace = 0;
        let tempDirection = -1;
        let tempDepth = 1;
        let tempIsMulti = false;

        if(shifted){
        if(shifted.length === 4) tempDirection=0;
        tempDepth = parseInt(shifted.slice(0,2));

        if(shifted.slice(2,3) === shifted.slice(2,3).toLowerCase()){
            tempIsMulti = true;
        }

        if(shifted.slice(2,3).toUpperCase() === "U") tempFace = 1;
        else if(shifted.slice(2,3).toUpperCase() === "F") tempFace = 0;
        else if(shifted.slice(2,3).toUpperCase() === "B") tempFace = 3;
        else if(shifted.slice(2,3).toUpperCase() === "R") tempFace = 2;
        else if(shifted.slice(2,3).toUpperCase() === "L") tempFace = 4;
        else if(shifted.slice(2,3).toUpperCase() === "D") tempFace = 5;

        return [tempFace,tempDirection,tempDepth,tempIsMulti];
        }
    },

    convertDataToMove : function(data) {
        let move = "";
        let face = ['F','U','R','B','L','D']
        move+=data[2].toString().length<2?"0".concat(data[2]):data[2];
        move+=(data[3]?face[data[0]].toLowerCase():face[data[0]])
        data[1]===-1?move+="":move+="'"
        return move;
    },

    convertMoveToData : function (move) {
        if(move.length < 2) return false;
        let data = [];
        let face = ['F','U','R','B','L','D']
        data.push(face.indexOf(move[2].toUpperCase()));
        move.length < 4 ? data.push(-1) : data.push(0);
        move[0]==='0' ? data.push(parseInt(move[1])) : data.push(parseInt(move.substring(0, 2)))
        move[2].toUpperCase() === move[2] ? data.push(false) : data.push(true);
        return data;
    },

    // Converts move string to move array
    // handle move short hand characters. ex: fx => 01Fx 02Fx; x = "" or "'" or "2"
    moveStringToArray : function (str) {
        let tempArray = str.split(" ");
        let moveArray = [];

        // Run through split string and create duplicates where needed
        // Handle other short hands
        for(let i = 0; i < tempArray.length;i++){
            if(tempArray[i].length === 4 && tempArray[i].slice(3,4)==="2") {
                let tempMove = tempArray[i].slice(0,3);
                moveArray.push(tempMove);
                moveArray.push(tempMove);
            }
            else {
                moveArray.push(tempArray[i]);
            }
        }
        return moveArray;
    },

    // generate a random move
    generateMove : function (size) {
        let maxDepth = Math.ceil(size/2);
        let randFace = Math.floor(Math.random() * 6);
        let randTurn = Math.floor((Math.random() * 2)-1);
        let randIsMulti = Math.floor(Math.random() * 2);
        let randDepth = 1;
    
        if(randFace>2&&size%2) maxDepth-=1;
    
        if(size>2) 
          randDepth = Math.floor((Math.random() * maxDepth)) + 1;
    
        if(randDepth===1) randIsMulti = 0;
    
        if(randDepth === Math.ceil(size/2) && size%2)
          randIsMulti=0;
    
        return moveFuncs.convertDataToMove([randFace, randTurn,randDepth,randIsMulti]);
    },

    // returns a move's equivalent other move, 
    // ex: (on a 3x3) 03F === 01B'
    // equivalentMove("03F") => "01B'"
    equivalentMove(_move,size){
        const move =_move.split('');
        let inverted = '';
        let depth;
        if(move[0]==='0'){
          depth = size - parseInt(move[1]) + 1;
        }
        else{
          depth = size - parseInt(move[0]+move[1]) + 1;
        }
    
        if(depth<10){
          inverted+=`0${depth}`
        }
        else{
          inverted+=`${depth}`
        }
    
        switch(move[2]){
          case 'F':
            inverted+='B';
            break;
          case 'f':
            inverted+='b';
            break;
          case 'U':
            inverted+='D';
            break;
          case 'u':
            inverted+='d';
            break;
          case 'R':
            inverted+='L';
            break;
          case 'r':
            inverted+='l';
            break;
          case 'B':
            inverted+='F';
            break;
          case 'b':
            inverted+='f';
            break;
          case 'L':
            inverted+='R';
            break;
          case 'l':
            inverted+='r';
            break;
          case 'D':
            inverted+='U';
            break;
          case 'd':
            inverted+='u';
            break;
          default:
        }
    
        if(move.length<4) inverted+="'";
        return inverted;
        
    },

    // Compares dragged move with the next move in algorithm or solver
    checkMoveEquivalence(dragMove,nextMove,size){
        if(nextMove.toLowerCase()===nextMove){
            if(dragMove.toLowerCase().slice(2)===nextMove.slice(2)){
                if(parseInt(dragMove.slice(0,2))<=parseInt(nextMove.slice(0,2)))
                return true;
            }
            else if(moveFuncs.equivalentMove(dragMove,size).toLowerCase().slice(2)===nextMove.slice(2)){
                if(parseInt(moveFuncs.equivalentMove(dragMove,size).slice(0,2))<=parseInt(nextMove.slice(0,2)))
                return true;
            }
        }
        if(dragMove===nextMove||moveFuncs.equivalentMove(dragMove,size)===nextMove){
            return true;
        }
        return false;
    }
}

export default moveFuncs;