import "../SideView/SideView.css";
import React,{Component} from "react";
import "./SideSolverUI.css";
import "./SolverUI.css";
import algorithms from "../../cubeFunctions/algorithms";
import LazyLoad from 'react-lazyload';
import solverMain from '../../solvers/solverMain';

import UI from './SolverUIFunctions';
let {setTarget,algoStart} = UI;

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
        if(nextProps.state.jumpToEnd){
            nextProps.setState({jumpToEnd:false},setTarget({target:{id:nextProps.state.moveSet.length}},nextProps));
        }
    }

    componentDidMount() {
        let setState = this.props.setState;
        let state = this.props.state;
        if(state.solveOnce){
            setTimeout(function(){
                    setState({...solverMain(state,state.rubiksObject),solveOnce:false});
            }, 50);
        }
    }

    render(){
        
        let solverSet = [];
        let defaultSolver = this.props.state.solveOnce?"Loading, please wait...":"Already Solved";
        let defaultMessage = this.props.state.currentFunc==="Solving"?defaultSolver:"None Selected";
        let jumperButtons = [<div onClick={(e)=>preSetTarget(e,this.props,setTarget)} id={0} className="solveMoveDiv jumper" key={-1}>Top</div>];
        
        const buttonClassColor = e => {
            e=e.toLowerCase();
            if(e.includes("f")) return "white";
            //if(e.includes("u")) return "blue";
            if(e.includes("r")) return "red";
            if(e.includes("b")) return "yellow";
            if(e.includes("l")) return "orange";
            if(e.includes("d")) return "green";
        }

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
                        className={`solveMoveDiv nextSolveIndex ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0${el[1]}`,el[1]).replace("'","")+"2"}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i-1} 
                        className={`solveMoveDiv ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0${el[1]}`,el[1]).replace("'","")+"2"}
                    </div>):
                i===this.props.state.solvedSetIndex||(i===this.props.state.solvedSetIndex+1&&el===this.props.state.solvedSet[i-1])?
                    solverSet.push(<div 
                        id={i} 
                        className={`solveMoveDiv nextSolveIndex ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0${el[1]}`,el[1])}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i} className={`solveMoveDiv ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0${el[1]}`,el[1])}</div>)
        )

        solverSet.map(el=><LazyLoad height="2rem">el</LazyLoad>);
        
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
                        onClick={()=>algoStart(algo.name,this.props)}>
                        {algo.name}
                    </button>
                    );

        function preSetTarget(e,props,setTarget){
            props.setState({autoScroll:true});
            setTarget(e,props);
        }

        return(
            <div className="sideMenu">
                <div className="sideMenuBox0 sideLimit">
                    {this.props.state.currentFunc==="Solving"?
                    <div className="sideMovesBox">
                        
                        {solverSet}
                        
                    </div>:
                    [
                    <div className="sideMenuBox1" key="sideMenuBox1">
                        <div className="algoList" style={{maxWidth:"400px"}}>
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
            </div>
        );
    }
}

export default React.memo(SolverUI);