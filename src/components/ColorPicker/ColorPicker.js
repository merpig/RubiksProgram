import React from "react";
import {Row, Col} from "react-bootstrap";
import ColorButton from "./ColorButton";
import "./ColorPicker.css";

const ColorPicker = (props) => {
    const colors = ["white","blue","red","yellow","orange","green"];
    const li = [];
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
        document.querySelector(".warningPopup").style.display="block";
    }

    return (
        <Row className="cp-container" style={{height:"98%",width:"100%", overflowX:"hidden!important",overflowY:"hidden!important",margin:"0px"}}>
            <div className="warningPopup">
                <div id="cpChangeData" data=""></div>
                <div className="cpMessage">Are you sure you want to leave Color Picker? Changes will not be saved.</div>
                <button onClick={stay} className="cpLeaveStay">Stay</button><button onClick={leave} className="cpLeaveStay">Leave</button>
            </div>
            <Col>
                {props.isValidConfig?<div className="cpButton" onClick={()=>props.setColorPickedCube()}><strong style={{color:'green',fontSize:'1rem'}}>Solve</strong></div>:<div className="cpButton"><strong style={{color:'red',fontSize:'1rem'}}>Invalid</strong></div>}
                <div style={{fontSize:".5rem"}}>
                     
                        {li}
                </div>

            </Col>
            <Col style={{padding:"0px"}}>
                <div className="colorButtonContainer">
                    {colors.map(color=><ColorButton 
                        key={color}
                        color={color}
                        colorPicked={props.colorPicked}
                        changeColor={props.changeColor}
                        isMobile={props.isMobile}
                    />)}
                    <button className="colorPicker colorPickerBlank"></button>
                    <button id="ColorPicker" data="Color Picker" onClick={optionClick} className="colorPicker activeMenu colorPickerExit">Exit</button>
                </div>
            </Col>
        </Row>
        );

};

export default ColorPicker;