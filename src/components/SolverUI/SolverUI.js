/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from "react";
import {Row, Col} from "react-bootstrap";
import "./SolverUI.css";
import algorithms from "../../cubeFunctions/algorithms";
import cube from '../../cubeFunctions/cube';

function playOne(props){
    if(!props.state.moveSet.length) return;
    if((props.state.moveSet[0]===props.state.moveSet[1]||props.state.moveSet[1]==="stop'")&&!props.state.autoPlay){
        props.setState({
            autoPlay:true,
            autoRewind:false,
            targetSolveIndex:props.state.solvedSetIndex+2});
    }
    else{
        if(props.state.playOne===true) return;
        if(props.state.moveSet[0]&&typeof(props.state.moveSet[0][0])==='string'&&props.state.moveSet[0]!=="'"){
            props.setState({playOne:true,prevSet:[...props.state.prevSet,props.state.moveSet[0]]});
        }
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
            playOne(nextProps);
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
        let jumperButtons = [<div onClick={(e)=>preSetTarget(e,this.props,setTarget)} id={0} className="solveMoveDiv jumper" key={-1}>Top</div>];
        !this.props.state.solvedSet.length?
        solverSet.push("Already solved"):
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
        solverSet.push(<div key={solverSet.length*10}style={{height:"35px",width:"100%"}}></div>)
        jumperButtons.push(<div onClick={(e)=>setTarget(e,this.props)} id={this.props.state.solvedSet.length+1} className="solveMoveDiv jumper" key={this.props.state.solvedSet.length+1}>End</div>);

        let algorithmSet = [];
        
        algorithms.forEach(algo=>algo.worksFor.includes(this.props.state.cubeDimension)?
            algorithmSet.push(<button id={algo.name} key={algo.name} className={this.props.state.activeAlgo===algo.name?
                "algoButton algoActive":"algoButton"} onClick={(e)=>algoStart(e,this.props)}>{algo.name}</button>)
                :"")
        //console.log(algorithmSet);

        let solveAll = <>
        <a className="solveButtonImage" href="#"><div className="solveButtonImage"><img 
            alt="fastforward" 
            src="https://image.flaticon.com/icons/svg/92/92330.svg"
            onClick={() => fastforward(this.props)}>
        </img></div></a></>;

        let rewindAll = <>
            <a className="solveButtonImage" href="#"><div className="solveButtonImage"><img 
                className="rotateimg180"
                alt="fastforward" 
                src="https://image.flaticon.com/icons/svg/92/92330.svg"
                onClick={() => fastrewind(this.props)}>
            </img></div></a></>;

        let pause = <>
        <p>{this.props.state.prevSet.length}</p>
        <a className="solveButtonImage" href="#"><div className="solveButtonImage"><img 
            alt="pause" 
            src="https://image.flaticon.com/icons/svg/92/92344.svg"
            onClick={() => pauseSolver(this.props)}>
        </img></div></a></>;

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
            if(!props.state.moveSet.length) return;
            props.state.moveSet.length===1 ? 
                playOne(props):
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

        //add small fix for jumping to double moves
        function setTarget(e,props){
            e.stopPropagation();
            if(props.state.autoPlay||props.state.autoRewind){

            }
            else if(parseInt(e.target.id)-props.state.solvedSetIndex===1){
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
            let algo = null;
            try{algo = e.target.id}catch{algo = e};
            let algoSet = [];
            let generated = cube.generateSolved(cD,cD,cD);
            algorithms.forEach(set=>{
                if(set.name.replace(" ","")===algo&&set.worksFor.includes(cD)) algoSet.push(...set.moves.split(" "));
            })
            //console.log(algoSet);
            props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0});
        }

        function optionClick(e,props){
            // Already selected button (turns off)
            if(e.target.classList.contains("activeMenu")){
                
                switch(props.state.currentFunc){
                    case "Color Picker":
                        document.querySelector(".warningPopup").style.display="block";
                        break;
                    case "Solving":
                        document.querySelector(".warningPopupSolver").style.display="block";
                        break;
                    case "Algorithms":
                        //this.setState({currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [], moveSet : [],targetSolveIndex:-1,solvedSet:[]});
                        props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
                        break;
                    default:
                        document.querySelector(".activeMenu").classList.remove("activeMenu");
                        props.setState({activeMenu:"",currentFunct:"None"});
                }
            }
            else {
                if(props.state.currentFunc==="None") {
                    if(props.state.activeMenu!==""&&props.state.activeMenu!==null&&document.querySelector(".activeMenu")!==null) {
                        document.querySelector(".activeMenu").classList.remove("activeMenu");
                    }
                    e.target.classList.add("activeMenu");
                    if(e.target.id==="ColorPicker"){
                        
                        props.setState({activeMenu:e.target.id});
                        props.beginColorPicker();
                    }
                    else if(e.target.id==="Solver"){
                        props.setState({activeMenu:e.target.id});
                        props.beginSolve();
                    }
                    else if(e.target.id==="Algorithms"){
                        props.setState({activeMenu:e.target.id,currentFunc:"Algorithms",solveOnce:false,solvedSet:[],prevSet:[],moveSet:[]});
                    }
                    else props.setState({activeMenu:e.target.id,currentFunc:"None"});
                }
            }
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
                            {/* <div className="solveTime">
                                Time:{this.props.state.solveTime}s
                            </div> */}
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
                            <p style={{width:"100%"}}>
                                {this.props.state.prevSet.length-1>=0?
                                    this.props.state.prevSet[this.props.state.prevSet.length-1]==="stop'"?
                                        this.props.state.prevSet[this.props.state.prevSet.length-2]?
                                            this.props.state.prevSet[this.props.state.prevSet.length-2]===this.props.state.prevSet[this.props.state.prevSet.length-3]?
                                                this.props.state.prevSet[this.props.state.prevSet.length-2].replace("01","").replace("0","").replace("'","")+2
                                            :
                                                this.props.state.prevSet[this.props.state.prevSet.length-2].replace("01","").replace("0","")
                                        :
                                            ""
                                    :
                                        this.props.state.prevSet[this.props.state.prevSet.length-1]===this.props.state.prevSet[this.props.state.prevSet.length-2]?
                                            this.props.state.prevSet[this.props.state.prevSet.length-1].replace("01","").replace("0","").replace("'","")+2
                                        :
                                            this.props.state.prevSet[this.props.state.prevSet.length-1].replace("01","").replace("0","")
                                :
                                    ""
                                }
                            </p>
                            <a className="solveButtonImage" href="#"><div className="solveButtonImage"><img 
                                className="rotateimg180" 
                                src="https://image.flaticon.com/icons/svg/92/92335.svg" 
                                alt="rewind"
                                onClick={this.props.rewindOne}>
                            </img></div></a>
                        </div>
                        <div className="solverButton playOne">
                            <p style={{width:"100%"}}>
                                {this.props.state.moveSet[0]&&typeof(this.props.state.moveSet[0][0])==='string'&&this.props.state.moveSet[0]!=="'"?
                                    this.props.state.moveSet[0]==="stop'"?
                                        this.props.state.moveSet[1]?
                                            this.props.state.moveSet[1]===this.props.state.moveSet[2]?
                                                this.props.state.moveSet[1].replace("01","").replace("0","").replace("'","")+2
                                            :
                                                this.props.state.moveSet[1].replace("01","").replace("0","")
                                        :
                                            ""
                                    :
                                        this.props.state.moveSet[0]===this.props.state.moveSet[1]?
                                            this.props.state.moveSet[0].replace("01","").replace("0","").replace("'","")+2
                                        :
                                            this.props.state.moveSet[0].replace("01","").replace("0","")
                                :
                                    ""
                                }
                            </p>
                            <a className="solveButtonImage" href="#"><div className="solveButtonImage"><img 
                                src="https://image.flaticon.com/icons/svg/92/92335.svg" 
                                alt="play"
                                onClick={() => playOne(this.props)}>
                            </img></div></a> 
                        </div>
                        <div className="solverButton playAll">
                            {this.props.state.autoPlay?pause:solveAll}
                        </div>
                    </div>
                    {this.props.mobile?
                        <Row style={{height:"150px"}}>
                            <Col xs={4}>
                            {this.props.state.currentFunc==="Solving"?<>
                            <button id="Solver" data="Solving" onClick={(e)=>optionClick(e,this.props)} className="cpButton activeMenu" style={{height:"auto"}}>Exit</button></>:
                            this.props.state.currentFunc==="Color Picker"?<>
                            <button id="ColorPicker" data="Color Picker" onClick={(e)=>optionClick(e,this.props)} className="cpButton activeMenu">Exit</button></>:
                            this.props.state.currentFunc==="Algorithms"?<>
                            <button id="Algorithms" data="Algorithms" onClick={(e)=>optionClick(e,this.props)} className="cpButton activeMenu">Exit</button></>:<></>}
                            </Col>
                            <Col xs={8} style={{paddingLeft: 0}}>
                            {/* {jumperButtons}small fix here for mobile size jumper buttons */}
                            </Col>
                        </Row>:<></>
                    }
                </Col>
                <Col>
                    {!this.props.mobile?<>
                    <div className="solverMoves">
                        
                        {solverSet}
                        
                    </div>
                    
                    <div className="jumperButtons" >
                        {/* {jumperButtons} */}
                    </div></>:<>
                    {this.props.state.currentFunc==="Algorithms"?<><Row >
                        <label htmlFor="patterns" style={{color:"lightgrey"}}>Choose a Pattern:</label>

                        <select style={{color:"lightgrey",backgroundColor:"#343a40"}} id="patterns" onChange={(e) => algoStart(e.target.value.replace(" ",""),this.props)}>
                        {algorithms.map(algo=>algo.worksFor.includes(this.props.state.cubeDimension)?
                            <option id={algo.name.replace(" ","")} value={algo.name} key={algo.name}>{algo.name}</option>
                                :"")}
                        </select>
                    </Row>
                    <Row >
                        <div className="solverMoves">
                            
                            {solverSet}
                            
                        </div>
                        
                    </Row></>:<>
                    <div className="solverMoves solverMovesSolver">
                            
                            {solverSet}
                            
                        </div>
                    </>
                    }</>
                    }
                </Col>
            </Row>
        </div>
    )}
}

export default React.memo(SolverUI);