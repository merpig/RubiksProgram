import React, {Component} from "react";
import "../MenuWrapper/MenuWrapper.css";
import "./MobileView.css"
import Controls from "../Controls";
import SolverUI from "../SolverUI/SolverUI";
import ColorPicker from "../ColorPicker";
import {Row, Col, Button} from "react-bootstrap";

class Mobile extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        

        if(this.props.state.currentFunc!==nextProps.state.currentFunc) return true;

        if(this.props.state.activeAlgo!==nextProps.state.activeAlgo) return true;

        if( this.props.state.activeAlgo===nextProps.state.activeAlgo&&
            this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex&&
            ((this.props.state.autoRewind||this.props.state.autoPlay)
            &&this.props.state.autoRewind===nextProps.state.autoRewind
            &&this.props.state.autoPlay===nextProps.state.autoPlay)) return false;

        if(this.props.state.solvedSetIndex!==nextProps.state.solvedSetIndex) return true;
        if(nextProps.state.autoRewind&&nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex-1) return true;
        if(nextProps.state.autoPlay&&nextProps.state.solvedSetIndex < nextProps.state.targetSolveIndex-1) return true;

        if(!nextProps.state.autoRewind&&this.props.state.autoRewind) return true;
        if(!nextProps.state.autoPlay&&this.props.state.autoPlay) return true;

        if(this.props.state.activeMenu===nextProps.state.activeMenu &&
           this.props.state.colorPicked===nextProps.state.colorPicked&&
           this.props.state.currentFunc===nextProps.state.currentFunc&&
           this.props.state.isValidConfig===nextProps.state.isValidConfig&&
           this.props.cpErrors===nextProps.cpErrors&&
           this.props.state.solveTime===nextProps.state.solveTime&&
           this.props.state.playOne===nextProps.state.playOne&&
           !this.props.state.autoPlay) return false;

        if(this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex && this.props.state.autoPlay && this.props.state.solvedSetIndex < this.props.state.targetSolveIndex) return false;

        if(this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex && this.props.state.autoRewind && this.props.state.solvedSetIndex >= this.props.state.targetSolveIndex) return false;

        return true;
    }

    render(){
        function otherOptionClick(e,props){
            switch(e.target.id){
                case 'Reset':
                    props.setState({activeMenu:"",currentFunc:"Reset"});
                    break;
                case 'Scramble':
                    if(props.state.currentFunc==="None"){
                        props.beginScramble();
                    }
                    break;
                default:
            }
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

        return (
        <div className="menuWrapper">
            {(this.props.state.currentFunc === "None"||this.props.state.currentFunc === "Drag Turn")&&this.props.state.activeMenu!=="Moves"?
                <Row style={{height: "100%"}}>
                    <Col xs={6}>
                        <Button className="mobileButton" onClick={()=>this.props.setState({activeMenu: "Moves"})} key={0}>Moves</Button>
                        <Button className="mobileButton" id="ColorPicker" data="Color Picker" onClick={(e)=>optionClick(e,this.props)} key={1}>Color Picker</Button> 
                        <Button className="mobileButton" id="Solver" data="Solving" onClick={(e)=>optionClick(e,this.props)} key={2}>Solver</Button> 
                        <Button className="mobileButton" id="Algorithms" data="Algorithms" onClick={(e)=>optionClick(e,this.props)} key={3}>Patterns</Button> 
                    </Col>
                    <Col xs={6}>
                        <Button className="blankButton" key={0}></Button>
                        <Button className="mobileButton" id="Scramble" onClick={(e)=>otherOptionClick(e,this.props)} key={2}>Scramble</Button>
                        <Button className="mobileButton" id="Reset" onClick={(e)=>otherOptionClick(e,this.props)}  key={3}>Reset</Button>
                    </Col>
                </Row>
            :
                this.props.state.currentFunc === "Color Picker"?
                <ColorPicker {...this.props}></ColorPicker>:
                this.props.state.currentFunc === "Solving"?
                <SolverUI {...this.props} mobile={true}/>:
                this.props.state.currentFunc === "Algorithms"?
                <><SolverUI {...this.props} mobile={true}/></>
                :
                this.props.state.activeMenu==="Moves"?
                    <Row style={{height: "100%"}}>
                        <Col xs={2}>
                            <Button className="mobileButton" style={{fontSize:"2rem",padding:0}} onClick={()=>{this.props.setState({activeMenu:""})}}>←</Button>
                        </Col>
                        <Col xs={10}>
                            <Controls {...this.props}/>
                        </Col>
                    </Row>
                :<></>
            }
            
        </div>)
    }
}

export default Mobile;