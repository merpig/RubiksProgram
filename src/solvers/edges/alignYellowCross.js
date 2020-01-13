function alignYellowCross(rubiksObject,moveStringToArray){
    let moveString = "";
    let cube = rubiksObject;

    if(cube[19][6] === 1 && cube[19][7] === 2 && cube[19][8] === 2){
        //Check if other pieces are in place
        if(cube[21][6] === 0 && cube[21][8] === 1 &&
            cube[23][6] === 2 && cube[23][8] === 1);

        else if(cube[21][6] === 2 && cube[23][8] === 1 &&
                cube[25][6] === 1 && cube[25][8] === 0) moveString = "01D 01B 01D' 01B 01D 01B2 01D' 01B2 01L 01B 01L' 01B 01L 01B2 01L' 01B";

        else if(cube[25][6] === 2 && cube[25][8] === 1) moveString = "01R 01B 01R' 01B 01R 01B2 01R' 01B";

        else if(cube[25][6] === 0 && cube[25][8] === 1) moveString = "01R 01B 01R' 01B 01R 01B2 01R' 01B";


        //Make moves
    }
    else if(cube[19][6] === 2 && cube[19][7] === 2 && cube[19][8] === 1){
        moveString = "01B";
    }
    else moveString = "01B'"

    const moveArray = moveStringToArray(moveString);

    if(moveString.length) return {moveSet : moveArray};
    else return{solveState:6};
}

module.exports = alignYellowCross;