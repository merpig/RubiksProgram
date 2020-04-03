/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from "react";
import {Row, Col} from "react-bootstrap";
import "./SolverUI.css";
import algorithms from "../../cubeFunctions/algorithms";
import cube from '../../cubeFunctions/cube';

function playOne(props){
    if(props.state.playOne===true) return;
    if(props.state.moveSet[0]&&typeof(props.state.moveSet[0][0])==='string'&&props.state.moveSet[0]!=="'"){
        props.setState({playOne:true,prevSet:[...props.state.prevSet,props.state.moveSet[0]]});
    }
}

class SolverUI extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.state.autoRewind===true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            nextProps.rewindOne();
        }
        else if(nextProps.state.autoRewind===true && nextProps.state.solvedSetIndex <= nextProps.state.targetSolveIndex){
            //console.log("ending rewind");
            nextProps.setState({autoRewind:false});
        }

        if(nextProps.state.autoPlay===true && nextProps.state.solvedSetIndex < nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            playOne(nextProps);
        }
        else if(nextProps.state.autoPlay===true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex){
            //console.log("ending rewind");
            nextProps.setState({autoPlay:false});
        }
      }

    // shouldComponentUpdate(nextProps, nextState) {
    // }



    componentDidUpdate() {
        //if(document.querySelector(".nextSolveIndex")) document.querySelector(".nextSolveIndex").scrollIntoView(false);
    }

    

    render(){
        let solverSet = [];
        this.props.state.solvedSet[0]==="'"||this.props.state.solvedSet[0]===""||this.props.state.solvedSet[0]===" "?
        solverSet.push("Already solved"):
        this.props.state.solvedSet.forEach((el,i)=> i===this.props.state.solvedSetIndex?
            solverSet.push(<div id={i} className="solveMoveDiv nextSolveIndex" key={i}>{el+" "}</div>):
            solverSet.push(<div onClick={(e)=>setTarget(e,this.props)} id={i} className="solveMoveDiv" key={i}>{el+" "}</div>)
        )

        let algorithmSet = [];
        
        algorithms.forEach(algo=>algo.worksFor.includes(this.props.state.cubeDimension)?
            algorithmSet.push(<button id={algo.name} key={algo.name} className={this.props.state.activeAlgo===algo.name?
                "algoButton algoActive":"algoButton"} onClick={(e)=>algoStart(e,this.props)}>{algo.name}</button>)
                :"")
        //console.log(algorithmSet);

        let solveAll = <>
        <a className="solveButtonImage" href="#"><img 
            alt="fastforward" 
            src="https://image.flaticon.com/icons/svg/92/92330.svg"
            onClick={() => fastforward(this.props)}>
        </img></a></>;

        let rewindAll = <>
            <a className="solveButtonImage" href="#"><img 
                className="rotateimg180"
                alt="fastforward" 
                src="https://image.flaticon.com/icons/svg/92/92330.svg"
                onClick={() => fastrewind(this.props)}>
            </img></a></>;

        let pause = <>
        <p>Pause</p>
        <a className="solveButtonImage" href="#"><img 
            alt="pause" 
            src="https://image.flaticon.com/icons/svg/92/92344.svg"
            onClick={() => pauseSolver(this.props)}>
        </img></a></>;

        function stay(){
            document.querySelector(".warningPopupSolver").style.display="none";
        }

        function leave(props){
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
            props.setState({autoPlay:true,autoRewind:false,targetSolveIndex:props.state.solvedSet.length});
        }

        function fastrewind(props){
            props.setState({autoPlay:false,autoRewind:true,targetSolveIndex:0});
        }

        function pauseSolver(props){
            props.setState({autoPlay:false,autoRewind:false});
        }

        function setTarget(e,props){
            if(parseInt(e.target.id)-props.state.solvedSetIndex===1){
                props.setState({targetSolveIndex:parseInt(e.target.id)});
                playOne(props);
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
            let algo = e.target.id;
            let algoSet = [];
            let generated = cube.generateSolved(cD,cD,cD);
            algorithms.forEach(e=>{
                if(e.name===algo&&e.worksFor.includes(cD)) algoSet.push(...e.moves.split(" "));
            })
            //console.log(algoSet);
            props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0});
        }

        return(<div className="solverUIWrapper">
            <div className="warningPopupSolver">
                <div id="solverChangeData" data=""></div>
                <div className="solverMessage">Are you sure you want to leave Solver? Progress will not be saved.</div>
                <button onClick={stay} className="solverLeaveStay">Stay</button><button onClick={()=>leave(this.props)} className="solverLeaveStay">Leave</button>
            </div>
            <Row style={{width:"100%",height:"100%",margin:0}}>
                <Col style={{paddingRight:0}}>
                    {this.props.state.currentFunc==="Solving"?
                        <div className="solverInfo">
                            <div className="solveTime">
                                Time:{this.props.state.solveTime}s
                            </div>
                            <div className="solveMoves">
                                Moves:{this.props.state.solvedSet.length}
                            </div>
                        </div>:""
                    }
                    <div className="solverInterface">
                        <div className="solverButton rewindAll">
                            {this.props.state.autoRewind?pause:rewindAll}
                        </div>

                        <div className="solverButton rewindOne">
                            <p style={{width:"100%"}}>{this.props.state.prevSet.length-1>=0?this.props.state.prevSet[this.props.state.prevSet.length-1]:"None"}</p>
                            <a className="solveButtonImage" href="#"><img 
                                className="rotateimg180" 
                                src="https://image.flaticon.com/icons/svg/92/92335.svg" 
                                alt="rewind"
                                onClick={this.props.rewindOne}>
                            </img></a>
                        </div>
                        <div className="solverButton playOne">
                            <p style={{width:"100%"}}>{this.props.state.moveSet[0]&&typeof(this.props.state.moveSet[0][0])==='string'&&this.props.state.moveSet[0]!=="'"?this.props.state.moveSet[0]:"None"}</p>
                            <a className="solveButtonImage" href="#"><img 
                                src="https://image.flaticon.com/icons/svg/92/92335.svg" 
                                alt="play"
                                onClick={() => playOne(this.props)}>
                            </img></a>
                            
                        </div>
                        <div className="solverButton playAll">
                            {this.props.state.autoPlay?pause:solveAll}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="solverMoves">
                        
                        {solverSet}
                    </div>
                </Col>
            </Row>
        </div>
    )}
}

export default React.memo(SolverUI);