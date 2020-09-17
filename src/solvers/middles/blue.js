/*
 *
 *
 *      ******* Add documentation before you forget how all this works!!! ********
 * 
 * 
 *      Sasha Peters
 *      blue.js
 * 
 */

function move(space,depth,side){
    return (space+(depth<10? "0":"") + depth + side);
}

let solveBlueMiddle = (current,solved,dim) => {

    let currentSide = "F";
    let middle = Math.floor(dim/2);
    let isOddCube = dim%2;
    let moveString = "";

    if(current.x === 0) currentSide = "L";
    else if(current.x === dim-1) currentSide = "R";
    else if(current.z === 0) currentSide = "D";
    else if(current.z === dim-1) currentSide = "U";
    
    if(isOddCube && solved.x===middle && solved.y===middle){
        switch(currentSide){
            case "L":
                moveString = move("",current.y+1,"F'");
                moveString += " 01L"; 
                moveString += move(" ",current.y+1,"F");
                moveString += " 01L'"; 
                moveString += move(" ",current.y+1,"F");
                break;
            case "D":
                moveString = move("",current.y+1,"F'");
                moveString += " 01L"; 
                moveString += move(" ",current.y+1,"F2");
                moveString += " 01L'"; 
                moveString += move(" ",current.y+1,"F");
                break;
            case "R":
                moveString = move("",current.y+1,"F");
                moveString += " 01R"; 
                moveString += move(" ",current.y+1,"F'");
                moveString += " 01R'"; 
                moveString += move(" ",current.y+1,"F'");
                break;
            default:
                console.log("Shouldn't be checking middle if already in solved location.");
        }
    }

    else if(currentSide==="U"){
        moveString = move("",current.y+1,"F");//1
        moveString += move(" ",current.x+1,"U2");//2
        if( isOddCube && current.y===middle) moveString+= " 01L'";//2.1
        moveString += move(" ",current.y+1,"F'");//3
        if( isOddCube && current.y===middle) moveString+= " 01L";//3.1
        moveString += move(" ",current.x+1,"U2");//4
    }

    else if(currentSide==="R"){
        if((dim-current.z)===(solved.x+1) && current.y===solved.y){
            moveString = move("",solved.x+1,"U2");//6
            if(isOddCube && solved.y===middle) moveString += " 01L'";//6.1
            moveString += move(" ",solved.y+1,"F");//7
            if(isOddCube && solved.y===middle) moveString += " 01L";//7.1
            moveString += move(" ",solved.x+1,"U2");//8
            moveString += move(" ",solved.y+1,"F'");//9
            
        } else {
            moveString = "01R'"//5
        }
    }

    else if(currentSide==="L"){
        if(current.z===solved.x && current.y===solved.y){
            moveString = move("",current.z+1,"D2");//6
            if(isOddCube && solved.y===middle) moveString += " 01R";//6.1
            moveString += move(" ",solved.y+1,"F'");//7
            if(isOddCube && solved.y===middle) moveString += " 01R'";//7.1
            moveString += move(" ",current.z+1,"D2");//8
            moveString += move(" ",solved.y+1,"F");//9
            
        } else {
            moveString = "01L"//5
        }
    }

    else {
        if(current.y!==solved.y){
            moveString = "01D";
        }
        else{
            moveString = move("",solved.y+1,"F'");
            moveString += " 01R";
            moveString += move(" ",solved.y+1,"F");
        }
    }

    return moveString;
}

module.exports = solveBlueMiddle;