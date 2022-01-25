import React, {useState} from "react";
import "./ColorPicker.css";
import "../SideView/SideView.css"

const SideColorPicker = (props) => {
    const [solveBtnText,setSolveBtnText] = useState("Solve");
    const [checkBtnText,setCheckBtnText] = useState("Check");

    const onSolveClick = () => {
        setSolveBtnText("Configuring...");
        setTimeout(function(){
            document.querySelector(".warningPopup").style.display = "none";
            document.querySelector(".bottomExitDiv").style.visibility="visible";
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
    
    return (
        <div className="sideMenuBox0 sideLimit">
          <div className="sideMenuBox1">
            <div className="cpInfo" style={{width:"100%"}}>
                    {
                        props.isValidConfig?
                        <div className="solveCpDiv"><button className="solveCp" onClick={onSolveClick}>
                            <strong style={{color:'green',fontSize:'1rem'}}>{solveBtnText}</strong>
                        </button></div>:!props.cpErrors.length?
                        <div className="checkCpDiv"><button className="checkCp" onClick={onCheckClick}>
                            <strong style={{color:'blue',fontSize:'1rem'}}>{checkBtnText}</strong>
                        </button></div>:[]
                    }
                    <div style={{fontSize:".5rem"}}>
                        {props.state.cpErrors.map((error,i)=>
                            <p key={i} className="cpErrorMessage">{"- "+error}</p>
                        )}
                    </div>
                </div>   
            </div>  
        </div>        
    );
};

export default SideColorPicker;