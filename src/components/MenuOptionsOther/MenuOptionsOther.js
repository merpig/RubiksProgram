import React from "react";
import "../MenuOptions/MenuOptions.css"

const MenuOptionsOther = props => {

    const baseOptions = <>
        {/* <button id="Moves" key="Moves" data="None" onClick={otherOptionClick} className="rightButton">Moves</button> */}
        <button className="rightButton invis" key="Blank"></button>
        <button id="Scramble" key="Scramble" onClick={otherOptionClick} className="rightButton scramble">
            Scramble
        </button>
        <button id="Reset" key="Reset" onClick={otherOptionClick} className="rightButton reset">
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
                props.setState({activeMenu:e.target.id,currentFunc:"None"});
        }
    }

    return (
        <div className="menuOptionsWrapper" style={{float:"right"}}>
            {props.state.currentFunc==="Solving"||props.state.currentFunc==="Color Picker"||props.state.currentFunc==="Algorithms"?<><div style={{paddingTop:"45%"}}></div>
                </>:baseOptions}
        </div>
    )

}

export default React.memo(MenuOptionsOther);