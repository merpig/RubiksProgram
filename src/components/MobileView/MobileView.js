import React, {Component} from "react";
import "../MenuWrapper/MenuWrapper.css";
import "./MobileView.css"
import Controls from "../Controls";
import SolverUI from "../SolverUI/SolverUI";
import ColorPicker from "../ColorPicker/ColorPicker";
import {Row, Col} from "react-bootstrap";
import algorithms from "../../cubeFunctions/algorithms";

const optionLimitCP = 100;

class Mobile extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if(this.props.state.solvedSet!==nextProps.state.solvedSet) {
            //console.log(nextProps.state.solvedSet);
            return true;
        }

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

        const algoLength = algorithms.filter(set=>set.worksFor.includes(this.props.state.cubeDimension)).length;

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
                    props.setState({activeMenu:e.target.id,currentFunc:"None"});
            }
        }

        function optionClick(e,props){
            if(props.state.currentFunc==="None") {
                if(e.target.id==="ColorPicker"){
                    
                    props.setState({activeMenu:e.target.id,isValidConfig:true});
                    props.beginColorPicker();
                }
                else if(e.target.id==="Solver"){
                    props.setState({activeMenu:e.target.id});
                    props.beginSolve();
                }
                else if(e.target.id==="Algorithms"){
                    //props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
                    props.setState({activeMenu:e.target.id,currentFunc:"Algorithms",solveOnce:false,solvedSet:[],prevSet:[],moveSet:[]});
                }
            }
        }

        return (
        <div className="menuWrapper">
            {(this.props.state.currentFunc === "None"||this.props.state.currentFunc === "Drag Turn"||this.props.state.currentFunc === "Undo"||this.props.state.currentFunc === "Redo"||this.props.state.currentFunc === "Scrambling")&&this.props.state.activeMenu!=="Moves"?
                <Row style={{width:"100%", height:"100%", margin: 0}}>
                    <Col xs={6} style={{paddingRight:"7.5px"}}>
                        {this.props.state.cubeDimension<=optionLimitCP?
                            <><button className="mobileButton" id="ColorPicker" data="Color Picker" onClick={(e)=>optionClick(e,this.props)} key={1}>Color Picker</button> 
                            <button className="mobileButton" id="Solver" data="Solving" onClick={(e)=>optionClick(e,this.props)} key={2}>Solver</button></>
                            :<>
                            <button className="blankButton" key={1}></button>
                            <button className="blankButton" key={2}></button></>
                        } 
                        {algoLength?
                            <button className="mobileButton" id="Algorithms" data="Algorithms" onClick={(e)=>optionClick(e,this.props)} key={3}>Patterns</button>:""
                        }
                    </Col>
                    <Col xs={6} style={{paddingLeft:"7.5px"}}>
                        {this.props.state.cubeDimension<1?
                            <button className="mobileButton" onClick={()=>otherOptionClick} key={0}>Moves</button>:
                            <button className="blankButton" key={0}></button>
                        }    
                        <button className="mobileButton" id="Scramble" onClick={(e)=>otherOptionClick(e,this.props)} key={2}>Scramble</button>
                        <button className="mobileButton" id="Reset" onClick={(e)=>otherOptionClick(e,this.props)}  key={3}>Reset</button>
                    </Col>
                </Row>
            :
                this.props.state.currentFunc === "Color Picker"?
                <ColorPicker {...this.props} isMobile={true}></ColorPicker>:
                this.props.state.currentFunc === "Solving"?
                <SolverUI {...this.props} mobile={true}/>:
                this.props.state.currentFunc === "Algorithms"?
                <><SolverUI {...this.props} mobile={true}/></>
                :
                this.props.state.activeMenu==="Moves"?
                    <Row style={{height: "100%"}}>
                        <Col xs={2}>
                            <div id="infoBtn" style={{fontSize:"2rem",padding:0,display:"inline"}} onClick={()=>{this.props.setState({activeMenu:""})}}>←</div>
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