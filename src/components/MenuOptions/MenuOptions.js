import React from "react";
import "./MenuOptions.css"
import algorithms from "../../cubeFunctions/algorithms";
import cube from '../../cubeFunctions/cube';

const MenuOptions = props => {

        const baseOptions = <>
           {props.state.cubeDimension<6?<button id="ColorPicker" key="Color Picker" data="Color Picker" onClick={optionClick} className="leftButton">Color Picker</button>:<></>}
           {props.state.cubeDimension<6?<button id="Solver" key="Soler" data="Solving" onClick={optionClick} className="leftButton">Solver</button>:<></>}
           <button id="Algorithms" key="Algorithms" data="None" onClick={optionClick} className="leftButton">Algorithms</button>
        </>

        let algorithmSet = [];
                
        algorithms.forEach(algo=>algo.worksFor.includes(props.state.cubeDimension)?
            algorithmSet.push(<button id={algo.name} key={algo.name} className={props.state.activeAlgo===algo.name?
                "algoButton algoActive":"algoButton"} onClick={(e)=>algoStart(e,props)}>{algo.name}</button>)
                :"")
        //console.log(algorithmSet);

        function algoStart(e,props){
            let cD = props.state.cubeDimension;
            let algo = e.target.id;
            let algoSet = [];
            let generated = cube.generateSolved(cD,cD,cD);
            algorithms.forEach(e=>{
                if(e.name===algo&&e.worksFor.includes(cD)) algoSet.push(...e.moves.split(" "));
            })
            //console.log(algoSet);
            props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0});
        }

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
        return (
        <div className="menuOptionsWrapper">
            {props.state.currentFunc==="Solving"?<><div style={{height:"45%"}}></div>
            <button id="Solver" data="Solving" key="Solving" onClick={optionClick} className="cpButton activeMenu">Exit</button></>:
            props.state.currentFunc==="Color Picker"?<><div style={{paddingTop:"45%"}}></div>
            <button id="ColorPicker" data="Color Picker" key="Color Picker" onClick={optionClick} className="cpButton activeMenu">Exit</button></>:
            props.state.currentFunc==="Algorithms"?<>
            <div className="algoList">
                {algorithmSet}  
            </div>
           <button id="Algorithms" data="Algorithms" key="Algorithms" onClick={optionClick} className="cpButton activeMenu">Exit</button></>:baseOptions}
        </div>)

}

export default React.memo(MenuOptions);