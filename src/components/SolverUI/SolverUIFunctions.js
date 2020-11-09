import cube from "../../cubeFunctions/cube";
import moveFuncs from "../../cubeFunctions/move";
import algorithms from "../../cubeFunctions/algorithms";

const SolverUIFunctions = {

    // Jump to selected move
    autoJump : function (state,moves){
        let tempState = {...state};
        tempState.moveSet = moves;
        
        while(tempState.moveSet.length){
            //console.log(tempState.rubiksObject);
            let cD = tempState.cubeDimension;
            let blockMoveLog = tempState.blockMoveLog;
            let moveLog = tempState.moveLog;
            let solveMoves = tempState.solveMoves;
            let rubiksObject = tempState.rubiksObject;
            let end = tempState.end;
            let solveState = tempState.solveState;
            let moveData = 
              moveFuncs.parseMoveArray(tempState.moveSet); // generates data for next move
            let obj = 
              cube.rotateCubeFace(...moveData,blockMoveLog,moveLog,solveMoves,end,solveState);
            obj.rubiksObject = 
              cube.rotateFace(obj.face,obj.turnDirection,obj.cubeDepth,obj.isMulti,cD,rubiksObject);
            tempState = {...tempState,...obj};
        }
        return [...tempState.rubiksObject];
    },

    // Sets target to jump to
    setTarget : function (e,props){
        //e.stopPropagation();
        if(props.state.autoPlay||props.state.autoRewind){
    
        }
        else if(parseInt(e.target.id)-props.state.solvedSetIndex===1){
            props.setState({targetSolveIndex:parseInt(e.target.id)});
            props.playOne(props);
        }
        else if(props.state.solvedSetIndex<=parseInt(e.target.id)){
            props.setState({targetSolveIndex:parseInt(e.target.id),autoTarget:true});
            let prevSetNew = props.state.solvedSet.slice(0,parseInt(e.target.id));
            let moveSetNew = props.state.solvedSet.slice(parseInt(e.target.id),props.state.solvedSet.length);
            let forwardMoves = props.state.solvedSet.slice(props.state.solvedSetIndex,parseInt(e.target.id));
    
            props.setState({
                solvedSetIndex:parseInt(e.target.id),
                prevSet:prevSetNew,
                moveSet:moveSetNew,
                rubiksObject:SolverUIFunctions.autoJump(props.state,forwardMoves)})
        }
        else if(props.state.solvedSetIndex>parseInt(e.target.id)) {
            props.setState({targetSolveIndex:parseInt(e.target.id),autoTarget:true});
            let prevSetNew = props.state.solvedSet.slice(0,parseInt(e.target.id));
            let moveSetNew = props.state.solvedSet.slice(parseInt(e.target.id),props.state.solvedSet.length);
            let backwardMoves= props.state.solvedSet.slice(parseInt(e.target.id),props.state.solvedSetIndex)
                .map(move=>move.length===4?move.slice(0,3):(move+"'"));
    
            props.setState({
                solvedSetIndex:parseInt(e.target.id),
                prevSet:prevSetNew,
                moveSet:moveSetNew,
                rubiksObject:SolverUIFunctions.autoJump(props.state,backwardMoves.reverse())})
        }
    },

    // Initiate selected pattern set
    algoStart : function (name,props){
        let cD = props.state.cubeDimension;
        let algo = name;
        let algoSet = [];
        let generated = cube.generateSolved(cD,cD,cD);
        if(algo!=="None Selected")
            algoSet = algorithms
                .find(
                    set=>set.name===algo&&
                    set.worksFor.includes(cD)).moves.split(" ");
        props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0,prevSet:[],jumpToEnd:true});
    }
}

export default SolverUIFunctions;