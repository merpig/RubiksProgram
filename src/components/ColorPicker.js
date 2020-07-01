import React from "react";
import {Row, Col} from "react-bootstrap";
import "./ColorPicker.css";

const ColorPicker = (props) => {
    let li = [];
    props.cpErrors.forEach(function(error,i){
        li.push(<p key={i} style={{color:"red",fontSize:".8rem",textAlign:"left",listStyle:"none",margin:"2px",lineHeight: "15px"}}>
            {"- "+error}
        </p>);
    });
    function leave(){
        //console.log(document.querySelector("#cpChangeData").data)
        props.endColorPicker();

        if( document.querySelector(".activeMenu")){
            document.querySelector(".activeMenu").classList.remove("activeMenu");
        }

        if(document.querySelector("#cpChangeData").data){
            let data = document.querySelector("#cpChangeData").data.split(",");
            if(data[0]==="Solver") {
                props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
                document.querySelector("#cpChangeData").data="";
                return;
            }
            document.querySelector(`#${data[0]}`).classList.add("activeMenu");
            document.querySelector("#cpChangeData").data="";

            props.setState({activeMenu:data[0],currentFunc:data[1],isValidConfig:false},()=>props.beginSolve());
        }
        else{
            props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
        }
    }
    function stay(){
        document.querySelector(".warningPopup").style.display="none";
    }

    function optionClick(e){
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
        <Row className="cp-container" style={{height:"98%",width:"100%", overflowX:"hidden!important",overflowY:"hidden!important",margin:"0px"}}>
            <div className="warningPopup">
                <div id="cpChangeData" data=""></div>
                <div className="cpMessage">Are you sure you want to leave Color Picker? Changes will not be saved.</div>
                <button onClick={stay} className="cpLeaveStay">Stay</button><button onClick={leave} className="cpLeaveStay">Leave</button>
            </div>

            <Col style={{width:"50%",margin:0}}>
                <button id="ColorPicker" data="Color Picker" onClick={optionClick} className="cpButton activeMenu" style={{float:"left",width:"25%",marginLeft:"2px"}}>←</button>
                {props.colorPicked==="yellow"||props.colorPicked==="white"?
                    <div style={{backgroundColor:props.colorPicked, borderRadius: ".25rem",height:"22.5%",fontSize:"1.5rem",color:"#343a40",width:"70%",margin:"auto",border:"1px solid #343a40",float:"right",marginRight:"2px"}}>Color</div>:
                    <div style={{backgroundColor:props.colorPicked, borderRadius: ".25rem",height:"22.5%",fontSize:"1.5rem",color:"lightgrey",width:"70%",margin:"auto",border:"1px solid #343a40",float:"right",marginRight:"2px"}}>Color</div>
                }
                <div className="cpButton" style={{color:'lightgrey',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('white')}>{props.isMobile?"White":"1. White"}</div>
                <div className="cpButton" style={{color:'blue',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('blue')}>{props.isMobile?"Blue":"2. Blue"}</div>
                <div className="cpButton" style={{color:'red',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('red')}>{props.isMobile?"Red":"3. Red"}</div>
                <div className="cpButton" style={{color:'yellow',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('yellow')}>{props.isMobile?"Yellow":"4. Yellow"}</div>
                <div className="cpButton" style={{color:'orange',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('orange')}>{props.isMobile?"Orange":"5. Orange"}</div>
                <div className="cpButton" style={{color:'green',width:"45%",display:"inline-block",height:"20%", margin:"2px"}} onClick={()=>props.changeColor('green')}>{props.isMobile?"Green":"6. Green"}</div>
                
            </Col>
            <Col style={{width:"50%",margin:0}}>
                {props.isValidConfig?<div className="cpButton" onClick={()=>props.setColorPickedCube()}><strong style={{color:'green',fontSize:'1rem'}}>Solve</strong></div>:<div className="cpButton"><strong style={{color:'red',fontSize:'1rem'}}>Invalid</strong></div>}
                <div style={{fontSize:".5rem"}}>
                     
                        {li}
                </div>

            </Col>
        </Row>
        );

};

export default ColorPicker;