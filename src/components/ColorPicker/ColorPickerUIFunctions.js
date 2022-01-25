import cube from "../../cubeFunctions/cube";
import solverMain from "../../solvers/solverMain";

const ColorPickerUIFunctions = {
    alignQuadrant(_piece,size){
        let pos = _piece.position;
        let piece = {colors:_piece.colors}
        const max = size-1;
        const X = 0, Y = 1, Z = 2;
        if(pos[X] < Math.floor(size/2) && pos[Y] >= Math.floor(size/2)){
          piece.position = [ (max - pos[Y]), pos[X], pos[Z] ].join("");
        }
        else if(pos[X] >= Math.floor(size/2) && pos[Y] >= Math.ceil(size/2)){
          piece.position = [ (max - pos[X]), max - pos[Y], pos[Z] ].join("");
        }
        else if(pos[X] >= Math.ceil(size/2) && pos[Y] < Math.ceil(size/2)){
          piece.position = [ pos[Y], (max-pos[X]), pos[Z]].join("");
        }
        else piece.position=pos.join("");
        return piece;
    },

    checkOccurences : function (a1, a2) {
        let success = true;
        let amount = 0;
        let failedColors = [];
        for(var i = 0; i < a1.length; i++) {
          var count = 0;
          for(var z = 0; z < a2.length; z++) {
            if (a2[z] === a1[i]) count++;
          }
          if(count>1) {
            success = false;
            if(!failedColors.includes(a1[i])) failedColors.push(a1[i])
          }
    
        }
        return {success,failedColors,amount}
    },

    convertToBlueMiddle : function (_piece,size) {
        const piece = [..._piece];
        const max = size-1;
        const white=0,blue=size-1,red=size-1,yellow=size-1,orange=0,green=0;
    
        if(piece[7]===white) {
          return {
            colors:[
              piece[5], // color on bottom(face 5) is now on front(index 0)
              piece[0], // color on front(0) is now on top(1)
              piece[2], // color on right(2) is still on right(2)
              piece[1], // color on top(1) is now on back(3)
              piece[4], // color on left(4) is now on left(4)
              piece[3]  // color on back(3) is now on bottom(5)
            ].join(""),
            position:[
              piece[6],
              piece[8],
              max // becomes top
            ]
          }
        }
    
        if(piece[8]===blue) {
          return {
            colors:[
              piece[0], // piece on front(0) is now on front(0)
              piece[1], // piece on top(1) is still on top(1)
              piece[2], // piece on right(2) is now on right(2)
              piece[3], // piece on back(3) is now on back(3)
              piece[4], // piece on left(4) is now on left(4)
              piece[5] // piece on bottom(5) is still on bottom(5)
            ].join(""),
            position:[
              piece[6], // stays same
              piece[7],  // stays same
              max // becomes top
            ]
          }
        }
    
        if(piece[6]===red) {
          return {
            colors:[
              piece[0], // piece on front(index 0) remains the same
              piece[2], // piece on right(2) is still on top(1)
              piece[5], // piece on bottom(5) is now on right(2)
              piece[3], // piece on back(3) remains the same
              piece[1], // piece on top(1) is now on left(4)
              piece[4]  // piece on left(4) is still on bottom(5)
            ].join(""),
            position:[
              max-piece[8], 
              piece[7],  
              max // becomes top
            ]
          }
        }
    
        if(piece[7]===yellow) {
          return {
            colors:[
              piece[1], // piece on front(0) is now on bottom(5)
              piece[3], // piece on top(1) is still on front(0)
              piece[2], // piece on right(2) is now on right(2)
              piece[5], // piece on back(3) is now on top(1)
              piece[4], // piece on left(4) is now on left(4)
              piece[0] // piece on bottom(5) is still on back(3)
            ].join(""),
            position:[
              piece[6], // inverse y becomes x
              max-piece[8],  // y becomes 0
              max // becomes top
            ]
          }
        }
    
        if(piece[6]===orange) {
          return {
            colors:[
              piece[0], // piece on front(0) is now on front(0)
              piece[4], // piece on top(1) is still on right(2)
              piece[1], // piece on right(2) is now on bottom(5)
              piece[3], // piece on back(3) is now on back(3)
              piece[5], // piece on left(4) is now on top(1)
              piece[2] // piece on bottom(5) is still on left(4)
            ].join(""),
            position:[
              piece[8], // inverse y becomes x
              piece[7],  // y becomes 0
              max // becomes top
            ]
          }
        }
    
        if(piece[8]===green) {
          return {
            colors:[
              piece[0], // piece on front(0) is now on front(0)
              piece[5], // piece on top(1) is still on bottom(5)
              piece[4], // piece on right(2) is now on left(4)
              piece[3], // piece on back(3) is now on back(3)
              piece[2], // piece on left(4) is now on right(2)
              piece[1] // piece on bottom(5) is still on top(1)
            ].join(""),
            position:[
              max-piece[6], // inverse y becomes x
              piece[7],  // y becomes 0
              max // becomes top
            ]
          }
        }
    
    },

    checkValidMatchMiddle(validPiece,manualPiece,size){
        let newValidPiece = ColorPickerUIFunctions.alignQuadrant(ColorPickerUIFunctions.convertToBlueMiddle(validPiece,size),size);
        let newManualPiece = ColorPickerUIFunctions.alignQuadrant(ColorPickerUIFunctions.convertToBlueMiddle(manualPiece,size),size);
        if(newValidPiece.colors===newManualPiece.colors&&newValidPiece.position===newManualPiece.position){
          return true;
        }
        return false;
    },
    
    convertToBlueWhiteEdge : function (_piece,size) {
        const piece = [..._piece];
        const max = size-1;
        const white=0,blue=size-1,red=size-1,yellow=size-1,orange=0,green=0;
    
        // colors according to the solved cube
        if(piece[7]===white&&piece[8]===blue) {
          return {
            colors:[
              piece[0], // piece on front(0) is now on front(0)
              piece[1], // piece on top(1) is still on top(1)
              piece[2], // piece on right(2) is now on right(2)
              piece[3], // piece on back(3) is now on back(3)
              piece[4], // piece on left(4) is now on left(4)
              piece[5] // piece on bottom(5) is still on bottom(5)
            ].join(""),
            position:[
              piece[6], // inverse y becomes x
              0,  // y becomes 0
              max // becomes top
            ].join("")
          }
        }
    
        if(piece[6]===orange&&piece[8]===blue) {
          return {
            colors:[
              piece[4], // piece on left(4) is now on front(0)
              piece[1], // piece on top(1) is still on top(1)
              piece[0], // piece on front(0) is now on right(2)
              piece[2], // piece on right(2) is now on back(3)
              piece[3], // piece on back(3) is now on left(4)
              piece[5] // piece on bottom(5) is still on bottom(5)
            ].join(""),
            position:[
              max-piece[7], // inverse y becomes x
              0,  // y becomes 0
              max // becomes top
            ].join("")
          }
        }
    
        if(piece[7]===yellow&&piece[8]===blue){
          return {
            colors:[
              piece[3], // piece on back(3) is now on front(0)
              piece[1], // piece on top(1) is still on top(1)
              piece[4], // piece on left(4) is now on right(2)
              piece[0], // piece on front(0) is now on back(3)
              piece[2], // piece on right(2) is now on left(4)
              piece[5] // piece on bottom(5) is still on bottom(5)
            ].join(""),
            position:[
              size-(piece[6]+1), // inverse x becomes x
              0,  // y becomes 0
              max // becomes top
            ].join("")
          }
        }
    
        if(piece[6]===red&&piece[8]===blue){
          return {
            colors:[
              piece[2], // piece on right(2) is now on front(0)
              piece[1], // piece on top(1) is still on top(1)
              piece[3], // piece on back(3) is now on right(2)
              piece[4], // piece on left(4) is now on back(3)
              piece[0], // piece on front(0) is now on left(4)
              piece[5] // piece on bottom(5) is still on bottom(5)
            ].join(""),
            position:[
              piece[7], // inverse y becomes x
              0,  // y becomes 0
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===orange&&piece[7]===white){
          return {
            colors:[
              piece[0], // piece on front(0) is still on front(0)
              piece[4], // piece on left(4) is now on top(1)
              piece[1], // piece on top(1) is now on right(2)
              piece[3], // piece on back(3) is still on back(3)
              piece[5], // piece on bottom(5) is now on left(4)
              piece[2] // piece on right(2) is now on bottom(5)
            ].join(""),
            position:[
              piece[8], // z becomes x
              0,  // y 0
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===red&&piece[7]===white){
          return {
            colors:[
              piece[0], // piece on front(0) is still on front(0)
              piece[2], // piece on right(2) is now on top(1)
              piece[5], // piece on bottom(5) is now on right(2)
              piece[3], // piece on back(3) is still on back(3)
              piece[1], // piece on top(1) is now on left(4)
              piece[4] // piece on left(4) is now on bottom(5)
            ].join(""),
            position:[
              max-piece[8], // inverse z becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===orange&&piece[7]===yellow){
          return {
            colors:[
              piece[4], // piece on left(4) is now on front(0)
              piece[3], // piece on back(3) is now on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              piece[8], // z becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===red&&piece[7]===yellow){
          return {
            colors:[
              piece[2], // piece on right(2) is now on front(0)
              piece[3], // piece on back(1) is still on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              max-piece[8], // inverse z becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[7]===white&&piece[8]===green){
          return {
            colors:[
              piece[0], // piece on front(0) is still on front(0)
              piece[5], // piece on bottom(5) is now on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              max-piece[6], // inverse x becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===orange&&piece[8]===green){
          return {
            colors:[
              piece[4], // piece on left(4) is now on front(0)
              piece[5], // piece on bottom(5) is now on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              piece[7], // y becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[7]===yellow&&piece[8]===green){
          return {
            colors:[
              piece[3], // piece on back(3) is now on front(0)
              piece[5], // piece on bottom(5) is now on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              piece[6], // x becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
    
        if(piece[6]===red&&piece[8]===green){
          return {
            colors:[
              piece[2], // piece on right(2) is now on front(0)
              piece[5], // piece on bottom(5) is now on top(1)
              "black",
              "black",
              "black",
              "black",
            ].join(""),
            position:[
              max-piece[7], // inverse y becomes x
              0,  // y remains the same
              max // becomes tops
            ].join("")
          }
        }
        
        console.log("failed to register piece",piece);
        return null;
    },

    checkValidMatchEdge : function(validPiece,manualPiece,size) {
        let max = size-1;
        let newValidPiece = ColorPickerUIFunctions.convertToBlueWhiteEdge([...validPiece],size);
        let newManualPiece = ColorPickerUIFunctions.convertToBlueWhiteEdge([...manualPiece],size); 
        if((newValidPiece.colors===newManualPiece.colors&&newValidPiece.position===newManualPiece.position)||validPiece.includes("center")){
          return true;
        }
        else if(newValidPiece.colors!==newManualPiece.colors&&parseInt(newValidPiece.position[0])===max-parseInt(newManualPiece.position[0])){
          //console.log("valid");
          //console.log(newValidPiece,newManualPiece)
          return true;
        }
        else return false;
    },

    checkColors : function (state) {
        let size = state.cubeDimension;
        let rubiksLength = state.rubiksObject.length;
        let whiteCount = 0,blueCount = 0,redCount = 0,yellowCount = 0,orangeCount = 0,greenCount = 0;
        let duplicateFace = false;
        let duplicateColors = [];
        let matchedCount = 0;
        let obj = {error:[]};
        let validAmount = size*size;
        let rubiks = [...state.rubiksObject];
        let generated = cube.generateSolved(size,size,size);
        let newGenerated = [];
        let invalidMiddleConfig;
        let invalidEdgeConfig;
        for(let i = 0; i < rubiks.length; i++){
          let rubik = [...rubiks[i]];
          const colors = ['white','blue','red','yellow','orange','green'];
          if(rubik.includes('white')) whiteCount+=1;
          if(rubik.includes('blue')) blueCount+=1;
          if(rubik.includes('red')) redCount+=1;
          if(rubik.includes('yellow')) yellowCount+=1;
          if(rubik.includes('orange')) orangeCount+=1;
          if(rubik.includes('green')) greenCount+=1;
    
          let res = ColorPickerUIFunctions.checkOccurences(colors,rubik);
          if(!res.success){
            duplicateFace = true;
            let tempColors = []
            res.failedColors.forEach(color => {
              if(!tempColors.includes(color)) {
                tempColors.push(color);
              }
            })
            duplicateColors=tempColors;
          }
        }
    
        let checked = [];
        let otherChecked = [];
        //For each cube piece in the generated solved cube, find the matching
        //manually inputted piece and overwrite the solved position from the unsolved
        //piece with the solved piece's solved position to a new generated cube. For 
        //edge pieces, an extra check was needed to ensure first half segments weren't
        //getting assigned or assigning to second half segments(becomes unsolvable).
        generated.tempArr.forEach(([...piece],pieceIndex) =>{
          newGenerated.push([]);
          let tempInvalidMatch = [];
          rubiks.forEach(([...rubik],i) => {
            
            let validPiece = 0;
            piece.slice(0,6).sort().forEach((face,index) =>{
              if(rubik.slice(0,6).sort()[index]===face) {validPiece++;}
            });
            if(validPiece===6&&!checked.includes(pieceIndex)&&!otherChecked.includes(i)){
              let validEdgePlacement = false;
              let validMiddlePlacement = false;
              if(piece.includes("edge")){
                validEdgePlacement = ColorPickerUIFunctions.checkValidMatchEdge(piece,rubik,size);
                // A center edge cannot match with a non center edge
                if((piece[13]==="center"&&rubik[13]!=="center")||
                  (rubik[13]==="center"&&piece[13]!=="center")){
                    validEdgePlacement = false;
                }
                else if (piece[13]==="center"&&rubik[13]==="center"){
                  validEdgePlacement = true;
                }
              }
              else if(piece.includes("middle")){
                validMiddlePlacement = ColorPickerUIFunctions.checkValidMatchMiddle(piece,rubik,size);
                if(!validMiddlePlacement) tempInvalidMatch.push([piece,rubik]);
              }
              else{
                validEdgePlacement = true;
                validMiddlePlacement = true;
              }
              if(validEdgePlacement||validMiddlePlacement){
                matchedCount++;
                checked.push(pieceIndex);
                otherChecked.push(i);
                newGenerated[pieceIndex]=[
                  ...rubik.slice(0,9),
                  ...piece.slice(9,15)
                ];
              }
            }
          })
          if(newGenerated[pieceIndex].length===0)
            if(piece[12]==="edge")
              invalidEdgeConfig="Invalid edge configuration.";
            else if(piece[12]==="middle"){
              invalidMiddleConfig = "Invalid middle configuration.";
            }
        });
    
        let invalidAmounts = [];
        if(whiteCount!==validAmount){
          invalidAmounts.push("white");
        }
        if(blueCount!==validAmount){
          invalidAmounts.push("blue");
        }
        if(redCount!==validAmount){
          invalidAmounts.push("red");
        }
        if(yellowCount!==validAmount){
          invalidAmounts.push("yellow");
        }
        if(orangeCount!==validAmount){
          invalidAmounts.push("orange");
        }
        if(greenCount!==validAmount){
          invalidAmounts.push("green");
        }
        if(invalidAmounts.length){
          invalidAmounts=invalidAmounts.join(', ');
          obj.error.push(`Invalid ${invalidAmounts} sticker count.`);
        }
    
        if(duplicateFace){
          duplicateColors=duplicateColors.join(', ');
          obj.error.push(`More than one occurence of ${duplicateColors} found on a piece.`);
        }
    
        if(matchedCount!==rubiksLength&&state.cubeDimension<4){
          obj.error.push(`[${matchedCount-1}] out of [${rubiksLength-1}] matched. Missing [${(rubiksLength-1)-(matchedCount-1)}]`);
        }
    
        if(invalidEdgeConfig){
          obj.error.push(invalidEdgeConfig);
        }
        if(invalidMiddleConfig){
          obj.error.push(invalidMiddleConfig);
        }
    
        if(!obj.error.length){
          const solveData = {...solverMain(state,newGenerated)};
          if(solveData.solveable===false){
            //console.log(newGenerated);
            obj.error.push(`This configuration of the cube is not solveable,
            please check that you've entered all pieces correctly.`);
          }
          else{
            obj.error = undefined;
          }
        }
    
        if(!obj.error) {obj.success = true;obj.newGenerated = newGenerated}
        return obj;
    }
}

export default ColorPickerUIFunctions;