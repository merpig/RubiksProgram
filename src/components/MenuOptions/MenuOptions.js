import React from "react";
import "./MenuOptions.css"

const MenuOptions = props => {

        const baseOptions = <>
           <button id="Moves" data="None" onClick={optionClick} className="cpButton">Moves</button>
           <button id="ColorPicker" data="Color Picker" onClick={optionClick} className="cpButton">Color Picker</button>
           <button id="Solver" data="Solving" onClick={optionClick} className="cpButton">Solver</button>
           <button id="Algorithms" data="None" onClick={optionClick} className="cpButton">Algorithms</button>
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
                    default:
                        document.querySelector(".activeMenu").classList.remove("activeMenu");
                        props.setState({activeMenu:"",currentFunct:"None"});
                }
            }
            else {
                if(props.state.currentFunc==="Color Picker"){
                    document.querySelector(".warningPopup").style.display="block";
                    document.querySelector("#cpChangeData").data=e.target.id+","+(e.target.id==="Solver"?"Solving":"None");
                }

                else if(props.state.currentFunc==="Solving"){
                    document.querySelector(".warningPopupSolver").style.display="block";
                    document.querySelector("#solverChangeData").data=e.target.id+","+(e.target.id==="ColorPicker"?"Color Picker":"None");
                }
                
                else if(props.state.currentFunc==="None") {
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
                    else props.setState({activeMenu:e.target.id,currentFunc:"None"});
                }
            }
        }
        return (
        <div className="menuOptionsWrapper">
           {props.state.currentFunc==="Solving"?<>
           <button disabled id="Moves" data="None" className="cpButton hoverDisabled"></button>
           <button disabled id="ColorPicker" data="Color Picker" className="cpButton hoverDisabled"></button>
           <button id="Solver" data="Solving" onClick={optionClick} className="cpButton">Exit</button>
           <button disabled id="Algorithms" data="None" className="cpButton hoverDisabled"></button></>:
           props.state.currentFunc==="Color Picker"?<>
           <button disabled id="Moves" data="None" className="cpButton hoverDisabled"></button>
           <button id="ColorPicker" data="Color Picker" onClick={optionClick} className="cpButton">Exit</button>
           <button disabled id="Solver" data="Solving" className="cpButton hoverDisabled"></button>
           <button disabled id="Algorithms" data="None" className="cpButton hoverDisabled"></button></>:baseOptions}
        </div>)

}

export default React.memo(MenuOptions);