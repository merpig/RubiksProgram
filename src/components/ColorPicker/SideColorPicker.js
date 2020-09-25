import React from "react";
import "./ColorPicker.css";
import "../SideView/SideView.css"

const SideColorPicker = (props) => {
    const li = [];
    props.cpErrors.forEach(function(error,i){
        li.push(<p key={i} style={{color:"red",fontSize:".8rem",textAlign:"left",listStyle:"none",margin:"2px",lineHeight: "15px"}}>
            {"- "+error}
        </p>);
    });
    

    return (
        <div className="sideMenuBox0">
          <div className="sideMenuBox1">
            <div className="cpInfo" style={{width:"100%"}}>
                    {
                        props.isValidConfig?
                        <div className="solveCpDiv"><button className="solveCp" onClick={()=>props.setColorPickedCube()}>
                            <strong style={{color:'green',fontSize:'1rem'}}>Solve</strong>
                        </button></div>:
                        []
                    }
                    <div style={{fontSize:".5rem"}}>
                        
                            {li}
                    </div>
                </div>   
            </div>  
        </div>
        
              
    );
};

export default SideColorPicker;