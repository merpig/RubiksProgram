import React from "react";
import "../MenuOptions/MenuOptions.css"

const MenuOptionsOther = props => {

    const baseOptions = <>
        <button id="Moves" data="None" onClick={optionClick} className="cpButton">Moves</button>
        <button id="Scramble" onClick={otherOptionClick} className="cpButton scramble">
            Scramble
        </button>
        <button id="Reset" onClick={otherOptionClick} className="cpButton reset">
            Reset
        </button>
    </>

    function optionClick(e){
        // Already selected button (turns off)
        if(e.target.classList.contains("activeMenu")){
            
            switch(props.state.currentFunc){
                case "Color Picker":
                    document.querySelector(".warningPopup").style.display="block";
                    break;
                case "Solving":
                    document.querySelector(".warningPopupSolver").style.display="block";
                    break;
                case "Algorithms":
                    //this.setState({currentFunc : "None",solveState : -1,autoPlay : false, playOne : false, isVisible : false, hoverData : [], solveMoves : "", prevSet : [], moveSet : [],targetSolveIndex:-1,solvedSet:[]});
                    props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
                    break;
                default:
                    document.querySelector(".activeMenu").classList.remove("activeMenu");
                    props.setState({activeMenu:"",currentFunct:"None"});
            }
        }
        else {
            if(props.state.currentFunc==="None") {
                if(props.state.activeMenu!==""&&props.state.activeMenu!==null&&document.querySelector(".activeMenu")!==null) {
                    document.querySelector(".activeMenu").classList.remove("activeMenu");
                }
                e.target.classList.add("activeMenu");
                if(e.target.id==="ColorPicker"){
                    
                    props.setState({activeMenu:e.target.id});
                    props.beginColorPicker();
                }
                else if(e.target.id==="Solver"){
                    props.setState({activeMenu:e.target.id});
                    props.beginSolve();
                }
                else if(e.target.id==="Algorithms"){
                    props.setState({activeMenu:e.target.id,currentFunc:"Algorithms",solveOnce:false,solvedSet:[],prevSet:[],moveSet:[]});
                }
                else props.setState({activeMenu:e.target.id,currentFunc:"None"});
            }
        }
    }

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