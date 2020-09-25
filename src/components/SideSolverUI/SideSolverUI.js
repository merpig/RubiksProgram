import "../SideView/SideView.css";
import React,{Component} from "react";
import "./SideSolverUI.css";
import "../SolverUI/SolverUI.css";
import algorithms from "../../cubeFunctions/algorithms";
import cube from '../../cubeFunctions/cube';

class SolverUI extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.state.autoRewind===true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            if(nextProps.state.moveSet[0]==="stop'"){
                nextProps.setState({autoRewind:false});
            }
            nextProps.rewindOne();
        }
        else if(nextProps.state.autoRewind===true && nextProps.state.solvedSetIndex <= nextProps.state.targetSolveIndex){
            //console.log("ending rewind");
            nextProps.setState({autoRewind:false});
        }

        if(nextProps.state.autoPlay===true && nextProps.state.solvedSetIndex < nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            if(nextProps.state.moveSet[0]==="stop'"){
                nextProps.setState({autoPlay:false});
            }
            nextProps.playOne(nextProps);
        }
        else if(nextProps.state.autoPlay===true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex){
            //console.log("ending rewind");
            nextProps.setState({autoPlay:false});
        }
    }

    componentDidUpdate() {
        if(document.querySelector(".nextSolveIndex")&&this.props.state.autoScroll) {
            document.querySelector(".nextSolveIndex").scrollIntoView(true);
            this.props.setState({autoScroll:false});
        }
    }

    render(){
        
        let solverSet = [];
        let defaultMessage = this.props.state.currentFunc==="Solving"?"Already solved":"None Selected";
        let jumperButtons = [<div onClick={(e)=>preSetTarget(e,this.props,setTarget)} id={0} className="solveMoveDiv jumper" key={-1}>Top</div>];
        !this.props.state.solvedSet.length?
        solverSet.push(defaultMessage):
        this.props.state.solvedSet.forEach((el,i)=>el===this.props.state.solvedSet[i+1]?
            <></>:
            el==="stop'"? 
            (solverSet.push(<div key={i} style={{width:"100%"}}><hr key={i} style={{border:"1px solid lightblue",marginLeft:"5px"}}></hr>{jumperButtons.length===1?"Edges: ":"3x3: "}</div>),jumperButtons.push(
                jumperButtons.length===1?<div onClick={(e)=>preSetTarget(e,this.props,setTarget)} id={i+1} className="solveMoveDiv jumper" key={i}>Edge</div>:
                <div onClick={(e)=>preSetTarget(e,this.props,setTarget)} id={i+1} className="solveMoveDiv jumper" key={i}>3x3</div>
            )):
            el===this.props.state.solvedSet[i-1]?
                i===this.props.state.solvedSetIndex||(i===this.props.state.solvedSetIndex+1&&el===this.props.state.solvedSet[i-1])?
                    solverSet.push(<div 
                        id={i-1} 
                        className="solveMoveDiv nextSolveIndex" 
                        key={i}>{el.replace("01","").replace("0","").replace("'","")+"2"}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i-1} 
                        className="solveMoveDiv" 
                        key={i}>{el.replace("01","").replace("0","").replace("'","")+"2"}
                    </div>):
                i===this.props.state.solvedSetIndex||(i===this.props.state.solvedSetIndex+1&&el===this.props.state.solvedSet[i-1])?
                    solverSet.push(<div 
                        id={i} 
                        className="solveMoveDiv nextSolveIndex" 
                        key={i}>{el.replace("01","").replace("0","")}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i} className="solveMoveDiv" 
                        key={i}>{el.replace("01","").replace("0","")}</div>)
        )
        
        let algorithmSet = 
            algorithms
                .filter(algo=>algo.worksFor.includes(this.props.state.cubeDimension))
                .map(algo=>
                    <button 
                        id={algo.name} 
                        key={algo.name}
                        className={
                            this.props.state.activeAlgo===algo.name?
                                "algoButton algoActive":"algoButton"
                        }
                        onClick={(e)=>algoStart(e,this.props)}>
                        {algo.name}
                    </button>
                    );

        function preSetTarget(e,props,setTarget){
            props.setState({autoScroll:true});
            setTarget(e,props);
        }

        //add small fix for jumping to double moves
        function setTarget(e,props){
            e.stopPropagation();
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
                    rubiksObject:props.autoJump(props.state,forwardMoves)})
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
                    rubiksObject:props.autoJump(props.state,backwardMoves.reverse())})
            }
        }

        function algoStart(e,props){
            let cD = props.state.cubeDimension;
            let algo = null;
            try{algo = e.target.id}catch{algo = e};
            let algoSet = [];
            let generated = cube.generateSolved(cD,cD,cD);
            algoSet = algorithms.find(set=>set.name===algo&&set.worksFor.includes(cD)).moves.split(" ");
            
            props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0,prevSet:[]});
        }

        return(<div className="sideMenu">
                    <div className="sideMenuBox0 sideLimit">
                        {this.props.state.currentFunc==="Solving"?
                        <div className="sideMovesBox">
                            
                            {solverSet}
                            
                        </div>:
                        [
                        <div className="sideMenuBox1" key="sideMenuBox1">
                            <div className="algoList" style={{minWidth:"30vw"}}>
                                {algorithmSet}  
                            </div>
                        </div>,
                        <div className="sideMenuBox2" key="sideMenuBox2">
                            <div className="sideMovesBox">
                            
                                {solverSet}
                                
                            </div>
                        </div>
                        ]
                        }
                    </div>
                </div>);
    }
}

export default React.memo(SolverUI);