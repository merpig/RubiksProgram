import React, {useState} from "react";
import {Row, Col} from "react-bootstrap";
import ColorButton from "./ColorButton";
import "./ColorPicker.css";

const ColorPicker = (props) => {
    const [solveBtnText,setSolveBtnText] = useState("Solve");
    const [checkBtnText,setCheckBtnText] = useState("Check");

    const colors = ["white","blue","red","yellow","orange","green"];

    const onSolveClick = () => {
        setSolveBtnText("Configuring...");
        setTimeout(function(){
            props.setColorPickedCube();
        }, 100);  
    };

    const onCheckClick = () => {
        setCheckBtnText("Checking...");
        setTimeout(function(){
            props.runCheckColors();
            setCheckBtnText("Check");
        }, 100);  
    };

    function leave(){
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
        document.querySelector(".colorButtonContainer").style.visibility="visible";
    }

    function optionClick(e){
        document.querySelector(".warningPopup").style.display="block";
        document.querySelector(".warningPopup").style.width="100%";
        document.querySelector(".colorButtonContainer").style.visibility="hidden";
    }

    return (
        <Row className="cp-container" style={{height:"98%",width:"100%", overflowX:"hidden!important",overflowY:"hidden!important",margin:"0px"}}>
            <Col>
                <div className="cpInfo">
                    {
                        props.isValidConfig?
                        <div className="solveCpDiv"><button className="solveCp" onClick={()=>onSolveClick()}>
                            <strong style={{color:'green',fontSize:'1rem'}}>{solveBtnText}</strong>
                        </button></div>:!props.cpErrors.length?
                        <div className="checkCpDiv"><button className="checkCp" onClick={()=>onCheckClick()}>
                            <strong style={{color:'blue',fontSize:'1rem'}}>{checkBtnText}</strong>
                        </button></div>:[]
                    }
                    <div style={{fontSize:".5rem"}}>
                        {props.state.cpErrors.map((error,i)=>
                            <p key={i} className="cpErrorMessage">{"- "+error}</p>
                        )}
                    </div>
                </div>
            </Col>
            <Col style={{padding:"0px"}}>
                <div className="warningPopup">
                    <div id="cpChangeData" data=""></div>
                    {props.isMobile?
                        <div className="cpMessage">Progress will not be saved.</div>:
                        <div className="cpMessage">Are you sure you want to leave Color Picker? Progress will not be saved.</div>}
                    <button onClick={stay} className="cpLeaveStay">Stay</button><button onClick={leave} className="cpLeaveStay">Leave</button>
                </div>
                <div className="colorButtonContainer">
                    
                    {colors.map((color,i)=><ColorButton
                        index={i+1} 
                        key={color}
                        color={color}
                        colorPicked={props.colorPicked}
                        changeColor={props.changeColor}
                        isMobile={props.isMobile}
                    />)}
                    <div className="colorButtonDiv" style={{paddingBottom:"0px",width:"100%"}}>
                        <button id="ColorPicker" data="Color Picker" onClick={optionClick} className="colorPicker activeMenu colorPickerExit">Exit</button>
                    </div>
                </div>
            </Col>
        </Row>
        );

};

export default ColorPicker;