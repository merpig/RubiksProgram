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
    return (
        <Row className="cp-container" style={{height:"98%",width:"100%", overflowX:"hidden!important",overflowY:"hidden!important",margin:"0px"}}>
            <div className="warningPopup">
                <div id="cpChangeData" data=""></div>
                <div className="cpMessage">Are you sure you want to leave Color Picker? Changes will not be saved.</div>
                <button onClick={stay} className="cpLeaveStay">Stay</button><button onClick={leave} className="cpLeaveStay">Leave</button>
            </div>

            <Col style={{width:"50%"}}>
                {props.colorPicked==="yellow"||props.colorPicked==="white"?
                    <div style={{backgroundColor:props.colorPicked, borderRadius: ".25rem",height:"25%",fontSize:"1.5rem",color:"#343a40",width:"93%",margin:"auto",border:"1px solid #343a40"}}>Selected</div>:
                    <div style={{backgroundColor:props.colorPicked, borderRadius: ".25rem",height:"25%",fontSize:"1.5rem",color:"lightgrey",width:"93%",margin:"auto",border:"1px solid #343a40"}}>Selected</div>
                }
                <div className="cpButton" style={{color:'lightgrey',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('white')}>1 : White</div>
                <div className="cpButton" style={{color:'blue',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('blue')}>2 : Blue</div>
                <div className="cpButton" style={{color:'red',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('red')}>3 : Red</div>
                <div className="cpButton" style={{color:'yellow',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('yellow')}>4 : Yellow</div>
                <div className="cpButton" style={{color:'orange',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('orange')}>5 : Orange</div>
                <div className="cpButton" style={{color:'green',width:"45%",display:"inline-block",height:"20%", margin:"4px"}} onClick={()=>props.changeColor('green')}>6 : Green</div>
                
            </Col>
            <Col style={{width:"50%"}}>
                {props.isValidConfig?<div id="triggerBtn" style={{width:"100%"}} onClick={()=>props.setColorPickedCube()}>Set <strong style={{color:'green',fontSize:'1rem'}}>Valid</strong></div>:<div id="triggerBtn" style={{width:"100%"}}>Set <strong style={{color:'red',fontSize:'1rem'}}>Invalid</strong></div>}
                <div style={{fontSize:".5rem"}}>
                     
                        {li}
                </div>

            </Col>
        </Row>
        );

};

export default ColorPicker;