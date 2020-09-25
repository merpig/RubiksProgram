import React from "react";
import "./MainSideMenu.css";
import "../SideView/SideView.css";
import algs from "../../cubeFunctions/algorithms"
import MainSideMenuButton from "./MainSideMenuButton";

const MainSideMenu = props => {

    let algorithmSet = algs.filter(algo=>algo.worksFor.includes(props.state.cubeDimension));

    function colorPicker(){
        props.setState({activeMenu:"ColorPicker",isValidConfig:true});
        props.beginColorPicker();
    }

    function solver(){
        props.setState({activeMenu:"Solver"},props.beginSolve());
    }

    function scramble(){
        if(props.state.currentFunc==="None"){
            props.beginScramble();
        }
    }

    function reset(){
        props.setState({activeMenu:"",currentFunc:"Reset"})
    }

    function algorithms(){
        props.setState({activeMenu:"Algorithms",currentFunc:"Algorithms",solveOnce:false,solvedSet:[],prevSet:[],moveSet:[]});
    }
    
    return (
        <div className="sideMenuBox0 sideLimit">
            {props.state.cubeDimension<6?<MainSideMenuButton 
                name="Color Picker"
                onClick={colorPicker}
            />:[]}
            {props.state.cubeDimension<6?
            <MainSideMenuButton 
                name="Solver"
                onClick={solver}
            />:[]}  
            {algorithmSet.length>0?<MainSideMenuButton 
                name="Algorithms"
                onClick={algorithms}
            />:[]}
            {/* <MainSideMenuButton
                name="Moves" 
            /> */}
            <MainSideMenuButton 
                name="Scramble"
                onClick={scramble}
            />
            <MainSideMenuButton 
                name="Reset"
                onClick={reset}
            />
        </div>
    )
}

export default MainSideMenu;