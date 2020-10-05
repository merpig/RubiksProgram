import React from "react";
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