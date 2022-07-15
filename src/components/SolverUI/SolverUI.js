/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from "react";
import {Row, Col} from "react-bootstrap";
import "./SolverUI.css";
import algorithms from "../../cubeFunctions/algorithms";
import LazyLoad from 'react-lazyload';
import solverMain from '../../solvers/solverMain';

import UI from './SolverUIFunctions';
let {setTarget, algoStart} = UI;

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

    componentDidMount(){
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
        let prevSet = this.props.state.prevSet;
        let moveSet = this.props.state.moveSet;
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
                        key={i}>{el.replace(`0`+el[1],el[1]).replace("'","")+"2"}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i-1} 
                        className={`solveMoveDiv ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0`+el[1],el[1]).replace("'","")+"2"}
                    </div>):
                i===this.props.state.solvedSetIndex||(i===this.props.state.solvedSetIndex+1&&el===this.props.state.solvedSet[i-1])?
                    solverSet.push(<div 
                        id={i} 
                        className={`solveMoveDiv nextSolveIndex ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0`+el[1],el[1])}
                    </div>):
                    solverSet.push(<div 
                        onClick={(e)=>setTarget(e,this.props)} 
                        id={i} className={`solveMoveDiv ${buttonClassColor(el)}`} 
                        key={i}>{el.replace(`0`+el[1],el[1])}</div>)
        )

        solverSet.map(el=><LazyLoad height="2rem">el</LazyLoad>);


        let previousMove = 
            <div className="previousMove">
                {prevSet.length-1>=0?
                    prevSet[prevSet.length-1]==="stop'"?
                        prevSet[prevSet.length-2]?
                            prevSet[prevSet.length-2]===prevSet[prevSet.length-3]?
                                prevSet[prevSet.length-2].replace(`0`+prevSet[prevSet.length-2][1],prevSet[prevSet.length-2][1]).replace("'","")+2
                            :
                                prevSet[prevSet.length-2].replace(`0`+prevSet[prevSet.length-2][1],prevSet[prevSet.length-2][1])
                        :
                            "-"
                    :
                        prevSet[prevSet.length-1]===prevSet[prevSet.length-2]?
                            prevSet[prevSet.length-1].replace(`0`+prevSet[prevSet.length-1][1],prevSet[prevSet.length-1][1]).replace("'","")+2
                        :
                            prevSet[prevSet.length-1].replace(`0`+prevSet[prevSet.length-1][1],prevSet[prevSet.length-1][1])
                :
                    "-"}
            </div>

        let nextMove = 
            <div className="nextMove">
                {moveSet[0]&&typeof(moveSet[0][0])==='string'&&moveSet[0]!=="'"?
                    moveSet[0]==="stop'"?
                        moveSet[1]?
                            moveSet[1]===moveSet[2]?
                                moveSet[1].replace(`0`+moveSet[1][1],moveSet[1][1]).replace("'","")+2
                            :
                                moveSet[1].replace(`0`+moveSet[1][1],moveSet[1][1])
                        :
                            "-"
                    :
                        moveSet[0]===moveSet[1]?
                            moveSet[0].replace(`0`+moveSet[0][1],moveSet[0][1]).replace("'","")+2
                        :
                            moveSet[0].replace(`0`+moveSet[0][0],moveSet[0][1])
                :
                    "-"
                }
            </div>;



        function stay(){
            document.querySelector(".warningPopupSolver").style.visibility="hidden";
            document.querySelector(".solverInterface").style.display="block";
            document.querySelector(".exitDiv").style.display="block";
        }

        function leave(e,props){
            e.stopPropagation();
            props.stopSolve();

            if( document.querySelector(".activeMenu")){
                document.querySelector(".activeMenu").classList.remove("activeMenu");
            }

            if(document.querySelector("#solverChangeData").data){
                let data = document.querySelector("#solverChangeData").data.split(",");
                if(data[0]==="ColorPicker"){
                    props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
                    document.querySelector("#solverChangeData").data="";
                    return;
                }
                document.querySelector(`#${data[0]}`).classList.add("activeMenu");
                props.setState({activeMenu:data[0],currentFunct:data[1],isValidConfig:false});
                document.querySelector("#solverChangeData").data="";
                
            }
            else{
                props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
            }
        }

        function fastforward(props){
            if(!props.state.moveSet.length) return;
            props.state.moveSet.length===1 ? 
                props.playOne(props):
                props.setState({
                    autoPlay:true,
                    autoRewind:false,
                    targetSolveIndex:props.state.solvedSet.length});
        }

        function fastrewind(props){
            props.setState({autoPlay:false,autoRewind:true,targetSolveIndex:0});
        }

        function pauseSolver(props){
            props.setState({autoPlay:false,autoRewind:false});
        }

        function preSetTarget(e,props,setTarget){
            props.setState({autoScroll:true});
            setTarget(e,props);
        }

        function optionClick(e,props){
            switch(props.state.currentFunc){
                case "Solving":
                    document.querySelector(".warningPopupSolver").style.visibility="visible";
                    document.querySelector(".warningPopupSolver").style.width="100%";
                    document.querySelector(".solverInterface").style.display="none";
                    document.querySelector(".exitDiv").style.display="none"
                    break;
                case "Algorithms":
                    //this.setState({currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [], moveSet : [],targetSolveIndex:-1,solvedSet:[]});
                    props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
                    break;
                default:
                    props.setState({activeMenu:"",currentFunct:"None"});
            }

        }

        return(<div className="solverUIWrapper">
            <Row style={{width:"100%",height:"100%",margin:0}}>
                <Col id={(!this.props.mobile&&this.props.state.currentFunc==="Algorithms")?"centerControls2":""} style={{paddingLeft:"0px"}}> 
                    {!this.props.mobile?<>
                    <div className="solverMoves">
                        
                        {solverSet}
                        
                    </div></>:<>
                    {this.props.state.currentFunc==="Algorithms"?<><Row style={{paddingLeft:"15px"}}>
                        {/* <label htmlFor="patterns" style={{color:"lightgrey"}}>Choose a Pattern:</label> */}

                        <select style={{color:"lightgrey",backgroundColor:"#343a40"}} id="patterns" onChange={(e) => algoStart(e.target.value,this.props)}>
                        {algorithms.map(algo=>algo.worksFor.includes(this.props.state.cubeDimension)?
                            <option className="mobileAlgo" id={algo.name} value={algo.name} key={algo.name}>{algo.name}</option>
                                :"")}
                        </select>
                    </Row>
                    <Row style={{paddingLeft:"15px"}}>
                        <div className="algoMoves">
                            
                            {solverSet}
                            
                        </div>
                        
                    </Row></>:<>
                    <div className="solverMovesMobile">
                            
                            {solverSet}
                            
                        </div>
                    </>
                    }</>
                    }
                </Col>
                <Col id={(!this.props.mobile&&this.props.state.currentFunc==="Algorithms")?"centerControls":"centerControlsOther"} style={{paddingRight:0,paddingLeft:0,maxWidth:"300px"}}>
                        <div className="warningPopupSolver">
                                    <div id="solverChangeData" data=""></div>
                                    {this.props.mobile?
                                        <div className="solverMessage"> Progress will not be saved.</div>:
                                        <div className="solverMessage"> Are you sure you want to leave Solver? Progress will not be saved.</div>
                                    }
                                    <button onClick={stay} className="solverLeaveStay">Stay</button><button onClick={(e)=>leave(e,this.props)} className="solverLeaveStay">Leave</button>
                        </div>
                    <div className="solverInterface">
                        
                        <div className="solverButtonDiv rewindOne">
                            <button 
                                className={`solverButton`}
                                onClick={() => this.props.rewindOne(this.props)}> 
                            Previous {previousMove}
                            </button>
                        </div>
                        <div className="solverButtonDiv playOne">
                            <button 
                                className={`solverButton`}
                                onClick={() => this.props.playOne(this.props)}> 
                            Next {nextMove}
                            </button>
                        </div>
                        <div className="solverButtonDiv rewindAll">
                            {this.props.state.autoRewind?
                            <button 
                                className={`solverButton`}
                                onClick={() => pauseSolver(this.props)}> 
                            <div style={{width:"100%"}}>Pause</div> Solver
                            </button>
                            :
                            <button 
                                className={`solverButton`}
                                onClick={() => fastrewind(this.props)}> 
                            <div style={{width:"100%"}}>Auto</div> Rewind
                            </button>
                            }
                        </div>
                        <div className="solverButtonDiv fastforward">
                           {this.props.state.autoPlay?
                            <button 
                                className={`solverButton`}
                                onClick={() => pauseSolver(this.props)}> 
                            <div style={{width:"100%"}}>Pause</div> Solver
                            </button>
                            :
                            <button 
                                className={`solverButton`}
                                onClick={() => fastforward(this.props)}> 
                            <div style={{width:"100%"}}>Auto</div> Forward
                            </button>
                            } 
                        </div>
                        
                        
                    </div>
                    <div className="exitDiv" style={{width:"100%",height:"25%"}}>
                        {/* <button id="blankExit"></button> */}
                    {this.props.state.currentFunc==="Solving"?<>
                        <button id="Solver" data="Solving" onClick={(e)=>optionClick(e,this.props)} className="exitButton">Exit</button></>:
                        <button id="Algorithms" data="Algorithms" onClick={(e)=>optionClick(e,this.props)} className="exitButton">Exit</button>}
                    </div>

                </Col>
                
            </Row>
        </div>
    )}
}

export default React.memo(SolverUI);