import React from "react";
import "../MenuOptions/MenuOptions.css"

const MenuOptionsOther = props => {

    const baseOptions = <>
        <div style={{width:"100%",height:"13vh"}}></div>
        <button id="Scramble" onClick={otherOptionClick} className="cpButton scramble">
            Scramble
        </button>
        <button id="Reset" onClick={otherOptionClick} className="cpButton reset">
            Reset
        </button>
    </>

    function otherOptionClick(e){
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
        }
    }

    return (
        <div className="menuOptionsWrapper">
            {props.state.currentFunc==="Solving"||props.state.currentFunc==="Color Picker"||props.state.currentFunc==="Algorithms"?<><div style={{paddingTop:"45%"}}></div>
                </>:baseOptions}
        </div>
    )

}

export default React.memo(MenuOptionsOther);