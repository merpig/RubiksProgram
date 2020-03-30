import React from "react";
import "../MenuOptions/MenuOptions.css"

const MenuOptionsOther = props => {

    const baseOptions = <>
        <button id="Info" onClick={otherOptionClick} className="cpButton">
            Info
        </button>
        <button id="Settings" onClick={otherOptionClick} className="cpButton">
            Move Input
        </button>
        <button id="Scramble" onClick={otherOptionClick} className="cpButton">
            Scramble
        </button>
        <button id="Reset" onClick={otherOptionClick} className="cpButton">
            Reset
        </button>
    </>

    function otherOptionClick(e){

        switch(e.target.id){
            case 'Reset':
                if(props.state.currentFunc==="Color Picker"){
                    document.querySelector(".warningPopup").style.display="block";
                }
                else if(props.state.currentFunc==="Solving"){
                    document.querySelector(".warningPopupSolver").style.display="block";
                }
                else if(props.state.activeMenu!==""&&props.state.activeMenu!==null&&document.querySelector(".activeMenu")!==null) {
                    document.querySelector(".activeMenu").classList.remove("activeMenu");
                    props.setState({activeMenu:"",currentFunc:"Reset"});
                }
                else{
                    props.setState({activeMenu:"",currentFunc:"Reset"});
                }
                break;
            case 'Scramble':
                if(props.state.currentFunc==="None"){
                    props.beginScramble();
                }
                break;
            default:
        }

    }
    return (

        <div className="menuOptionsWrapper">

            {props.state.currentFunc==="Solving"||props.state.currentFunc==="Color Picker"?<>
                <button id="Info" onClick={otherOptionClick} className="cpButton">
                    Info
                </button>
                <button disabled id="MoveInput" className="cpButton hoverDisabled">
                    
                </button>
                <button disabled id="Scramble" className="cpButton hoverDisabled">
                    
                </button>
                <button id="Reset" onClick={otherOptionClick} className="cpButton">
                    Reset
                </button></>:baseOptions}


                
        </div>
    
    )

}

export default React.memo(MenuOptionsOther);