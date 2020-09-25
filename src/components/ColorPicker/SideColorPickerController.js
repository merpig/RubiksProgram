import React from "react";
import {Row, Col} from "react-bootstrap";
import ColorButton from "./ColorButton";
import "./ColorPicker.css";

const SideColorPickerController = (props) => {
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
        <div className="controllerBox" style={{ width: `30vw` }}>
            <div className="colorButtonContainer">
                {colors.map((color,i)=><ColorButton
                    index={i+1} 
                    key={color}
                    height={1/3*100}
                    color={color}
                    side={true}
                    colorPicked={props.colorPicked}
                    changeColor={props.changeColor}
                    isMobile={props.isMobile}
                />)}
            </div>
        </div>
    )     

};

export default SideColorPickerController;