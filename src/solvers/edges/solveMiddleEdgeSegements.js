function move(depth,side){
    return ((depth<10? "0":"") + depth + side);
}

let solveMiddleEdgeSegments = (current,solved,cubeSize) => {
    const maxCoord = cubeSize-1;
    const minCoord = 0;
    const centerEdge = Math.floor(cubeSize/2);

    let moves = [];

    // where blue and orange meet
    let firstEdge = (solved.x===minCoord && solved.z===maxCoord);
    // where blue and red meet
    let secondEdge = (solved.x===maxCoord && solved.z===maxCoord);
    // where green and red meet
    let thirdEdge = (solved.x===maxCoord && solved.z===minCoord);

    // flip edge segment in place
    let flip = ["01R","01U'","01B","01R'","01U"];
    let flip2 = ["01D","01R'","01B","01D'","01R"];
    let flip3 = ["01L","01D'","01B","01L'","01D"];

    const flipFirstCenterEdge = [
        move(centerEdge+1,"B'"),
        "01R","01B","01R'","01U","01R'","01U'","01R",
        move(centerEdge+1,"B"),
    ];

    const flipSecondCenterEdge = [
        move(centerEdge+1,"B'"),
        "01D","01B","01D'","01R","01D'","01R'","01D",
        move(centerEdge+1,"B"),
    ];

    const flipThirdCenterEdge = [
        move(centerEdge+1,"B'"),
        "01L","01B","01L'","01D","01L'","01D'","01L",
        move(centerEdge+1,"B"),
    ];

    const swapLastTwoCenterEdges = [
        move(centerEdge,"b2"),"01L2","01D2",
        move(centerEdge,"b2"),"01D2","01L2",
        move(centerEdge,"b2"),"01D2"
    ];

    const flipLastCenterEdge = [
        move(centerEdge,"f"),"01L2",move(centerEdge,"f"),"01L2",
        move(centerEdge,"f'"),"01L2",move(centerEdge,"f"),"01L2",
        move(centerEdge,"b'"),"01L2",move(centerEdge,"f"),"01L2",
        move(centerEdge,"f'"),"01L2",move(cubeSize,"f'"),move(centerEdge,"f'"),
        "01L2",move(centerEdge,"f'"),"01L2",move(centerEdge+1,"F"),
        "01L'","01B","01D"
    ];

    // solves piece diagonally to solved location
    let solveUp = depth => {
        return ["01F",move(depth,"F"),"01R","01U'","01B","01R'","01U","01F'",move(depth,"F'")];
    }
    let solveDown = depth => {
        return [move(depth,"B'"),"01B'","01R","01U'","01B","01R'","01U",move(depth,"B"),"01B"];
    }
    let solveUp2 = depth => {
        return ["01F",move(depth,"F"),"01D","01R'","01B","01D'","01R","01F'",move(depth,"F'")];
    }
    let solveDown2 = depth => {
        return [move(depth,"B'"),"01B'","01D","01R'","01B","01D'","01R",move(depth,"B"),"01B"];
    }
    let solveUp3 = depth => {
        return ["01F",move(depth,"F"),"01L","01D'","01B","01L'","01D","01F'",move(depth,"F'")];
    }
    let solveDown3 = depth => {
        return [move(depth,"B'"),"01B'","01L","01D'","01B","01L'","01D",move(depth,"B"),"01B"];
    }

    let solveLastEdge = depth => {
        return [
            move(depth,"B'"),"01D2",move(depth,"F") ,"01L2",
            move(depth,"F'"),"01L2",move(depth,"B2"),"01D2",
            move(depth,"B") ,"01D2",move(depth,"B'"),"01D2","01L2",
            move(depth,"B2"),"01L2"
        ];
    }

    if(cubeSize>4&&cubeSize%2&&current.y===centerEdge) {
        if(firstEdge){
            if(current.x===minCoord&&current.z===minCoord){
                moves=[move(centerEdge+1,"F'"),"01D2",move(centerEdge+1,"F")];
            }
            else if(current.x===maxCoord&&current.z===minCoord){
                moves=["01D2"];
            }
            else if(current.x===maxCoord&&current.z===maxCoord){
                moves=[move(centerEdge+1,"F"),"01R2",move(centerEdge+1,"F'")];
            }
            else moves=flipFirstCenterEdge;
        }
        else if(secondEdge){
            if(current.x===minCoord&&current.z===minCoord){
                moves=["01D2"];
            }
            else if(current.x===maxCoord&&current.z===minCoord){
                moves=[move(centerEdge+1,"F"),"01D2",move(centerEdge+1,"F'")];
            }
            else moves=flipSecondCenterEdge;
        }
        else if(thirdEdge){
            if(current.x===maxCoord&&current.z===minCoord){
                moves=flipThirdCenterEdge;
            }
            else {
                moves=swapLastTwoCenterEdges;
            }
        }
        else{
            moves=flipLastCenterEdge;
        }
    }
    else {
        if(firstEdge){
            if(current.x===minCoord&&current.z===maxCoord){
                if(current.y>=centerEdge){
                    moves=solveDown(cubeSize-current.y);
                }
                else{
                    moves=solveUp(current.y+1);
                }
            }
            else if(current.x===maxCoord&&current.z===maxCoord){
                if(current.y===solved.y){
                    moves=flip;
                }
                else{
                    if(current.y>=centerEdge){
                        moves=solveUp(cubeSize-current.y);
                    }
                    else{
                        moves=solveDown(current.y+1);
                    }
                }
            }
            else if(current.x===minCoord&&current.z===minCoord){
                moves.push("01D2","01R2");
            }
            else {
                moves.push("01R2");
            }
        }
        else if(secondEdge){
            if(current.x===maxCoord&&current.z===maxCoord){
                if(current.y>=centerEdge){
                        moves=solveDown2(cubeSize-current.y);
                    }
                    else{
                        moves=solveUp2(current.y+1);
                    }
            }
            else if(current.x===maxCoord&&current.z===minCoord){
                if(current.y===solved.y){
                    moves=flip2;
                }
                else{
                    if(current.y>=centerEdge){
                        moves=solveUp2(cubeSize-current.y);
                    }
                    else{
                        moves=solveDown2(current.y+1);
                    }
                }
            }
            else {
                moves.push("01D2");
            }
        }
        else if(thirdEdge){
            if(current.x===maxCoord&&current.z===minCoord){
                if(current.y===(maxCoord-1)){
                        moves=solveDown3(cubeSize-current.y);
                    }
                    else{
                        moves=solveUp3(current.y+1);
                    }
            }
            else if(current.x===minCoord&&current.z===minCoord){
                if(current.y===solved.y){
                    moves=flip3;
                }
                else{
                    if(current.y===(maxCoord-1)){
                        moves=solveUp3(cubeSize-current.y);
                    }
                    else{
                        moves=solveDown3(current.y+1);
                    }
                }
            }
        }
        else {
            moves=solveLastEdge(current.y+1);
        }
    }

    return moves.join(" ");
}

module.exports = solveMiddleEdgeSegments;