import React from "react";
import "./MenuOptions.css"
import algorithms from "../../cubeFunctions/algorithms";
import cube from '../../cubeFunctions/cube';

const optionLimitCP = 100;
const optionLimitSOLVER = 100;

const MenuOptions = props => {
        let algorithmSet = 
            algorithms
                .filter(algo=>algo.worksFor.includes(props.state.cubeDimension))
                .map(algo=>
                    <button 
                        id={algo.name} 
                        key={algo.name}
                        className={
                            props.state.activeAlgo===algo.name?
                                "algoButton algoActive":"algoButton"
                        }
                        onClick={(e)=>algoStart(e,props)}>
                        {algo.name}
                    </button>
                    );

        const baseOptions = <>
           {props.state.cubeDimension<=optionLimitCP?<button id="ColorPicker" key="Color Picker" data="Color Picker" onClick={optionClick} className="leftButton">Color Picker</button>:<button className="leftButton invis"></button>}
           {props.state.cubeDimension<=optionLimitSOLVER?<button id="Solver" key="Soler" data="Solving" onClick={optionClick} className="leftButton">Solver</button>:<button className="leftButton invis"></button>}
           {algorithmSet.length?<button id="Algorithms" key="Algorithms" data="None" onClick={optionClick} className="leftButton">Patterns</button>:<button className="leftButton invis"></button>}
        </>

        

        function algoStart(e,props){
            if(props.state.autoPlay||props.state.autoRewind||props.state.playOne) return;
            let cD = props.state.cubeDimension;
            let algo = e.target.id;
            let algoSet = [];
            let generated = cube.generateSolved(cD,cD,cD);
            algorithms.forEach(e=>{
                if(e.moves&&e.name===algo&&e.worksFor.includes(cD)) algoSet.push(...e.moves.split(" "));
            })
            //console.log(algoSet);
            props.setState({activeAlgo:algo,moveSet:[...algoSet],rubiksObject : generated.tempArr,solveable:true,solvedSet:[...algoSet],solvedSetIndex:0,prevSet:[],autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,jumpToEnd:true});
        }

        function optionClick(e){
            if(props.state.currentFunc==="None") {
                if(e.target.id==="ColorPicker"){
                    
                    props.setState({activeMenu:e.target.id,isValidConfig:true});
                    props.beginColorPicker();
                }
                else if(e.target.id==="Solver"){
                    props.setState({activeMenu:e.target.id},props.beginSolve());
                    
                }
                else if(e.target.id==="Algorithms"){
                    console.log(props.state.currentFunc);
                    //props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
                    props.setState({activeMenu:e.target.id,currentFunc:"Algorithms",solveOnce:false,solvedSet:[],prevSet:[],moveSet:[],activeAlgo:""});
                }
                else props.setState({activeMenu:e.target.id,currentFunc:"None"});
            }
        }
        return (
        <div className="menuOptionsWrapper">
            {props.state.currentFunc==="Solving"?[]:
            props.state.currentFunc==="Color Picker"?<><div style={{paddingTop:"45%"}}></div>
            <button id="ColorPicker" data="Color Picker" key="Color Picker" onClick={optionClick} className="cpButton activeMenu">Exit</button></>:
            props.state.currentFunc==="Algorithms"?
            <div className="algoList">
                {algorithmSet}  
            </div>:baseOptions}
        </div>)

}

export default React.memo(MenuOptions);