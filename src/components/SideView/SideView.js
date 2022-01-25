import React,{Component} from "react";
import Controls from "../Controls";
import ColorPicker from "../ColorPicker/SideColorPicker";
import SideSolverUI from "../SolverUI/SideSolverUI";
import SideSolverControls from "../SolverUI/SideSolverControls";
import SideColorPickerController from "../ColorPicker/SideColorPickerController";
import MainSideMenu from "../MainSideMenu/MainSideMenu";
import "./SideView.css";


class SideView extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.state.upDateCp!==nextProps.state.upDateCp){
            return true;
        }
        if(this.props.state.solvedSet!==nextProps.state.solvedSet) {
            //console.log(nextProps.state.solvedSet);
            return true;
        }

        if(this.props.state.currentFunc!==nextProps.state.currentFunc) return true;

        if(this.props.state.activeAlgo!==nextProps.state.activeAlgo) return true;

        if( this.props.state.activeAlgo===nextProps.state.activeAlgo&&
            this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex&&
            ((this.props.state.autoRewind||this.props.state.autoPlay)
            &&this.props.state.autoRewind===nextProps.state.autoRewind
            &&this.props.state.autoPlay===nextProps.state.autoPlay)) return false;

        if(this.props.state.solvedSetIndex!==nextProps.state.solvedSetIndex) return true;
        if(nextProps.state.autoRewind&&nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex-1) return true;
        if(nextProps.state.autoPlay&&nextProps.state.solvedSetIndex < nextProps.state.targetSolveIndex-1) return true;

        if(!nextProps.state.autoRewind&&this.props.state.autoRewind) return true;
        if(!nextProps.state.autoPlay&&this.props.state.autoPlay) return true;

        if(this.props.state.activeMenu===nextProps.state.activeMenu &&
           this.props.state.colorPicked===nextProps.state.colorPicked&&
           this.props.state.currentFunc===nextProps.state.currentFunc&&
           this.props.state.isValidConfig===nextProps.state.isValidConfig&&
           this.props.cpErrors===nextProps.cpErrors&&
           this.props.state.solveTime===nextProps.state.solveTime&&
           this.props.state.playOne===nextProps.state.playOne&&
           !this.props.state.autoPlay) return false;

        if(this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex && this.props.state.autoPlay && this.props.state.solvedSetIndex < this.props.state.targetSolveIndex) return false;

        if(this.props.state.solvedSetIndex===nextProps.state.solvedSetIndex && this.props.state.autoRewind && this.props.state.solvedSetIndex >= this.props.state.targetSolveIndex) return false;

        return true;
    }
    render(){
        let activeMenu;
        let activeMenuBottom;
        let activeMenuExit;


        let exitConfirm = () =>{
            document.querySelector(".warningPopupSolver").style.visibility="visible";
            document.querySelector(".controllerBox").style.visibility="hidden";
            document.querySelector(".bottomExitDiv").style.visibility="hidden";
        }

        let exitCpConfirm = () => {
            document.querySelector(".warningPopup").style.display="block";
            document.querySelector(".colorButtonContainer").style.visibility="hidden";
            document.querySelector(".bottomExitDiv").style.visibility="hidden";
        }

        let exitAlgo = () => {
            this.props.setState({activeMenu:"",currentFunc:"Reset",solvedSet:[],hoverData:[],prevSet:[],moveSet:[],isValidConfig:false,targetSolveIndex:-1, solveMoves : "",autoPlay:false,autoRewind:false,autoTarget: false,playOne : false,activeAlgo:"none"});
        }

        function stay() {
            document.querySelector(".warningPopupSolver").style.visibility = "hidden";
            document.querySelector(".controllerBox").style.visibility="visible";
            document.querySelector(".bottomExitDiv").style.visibility="visible";
        }

        function stayCp(){
            document.querySelector(".warningPopup").style.display = "none";
            document.querySelector(".colorButtonContainer").style.visibility="visible";
            document.querySelector(".bottomExitDiv").style.visibility="visible";
        }

        function leave(e, props) {
            document.querySelector(".warningPopupSolver").style.visibility = "hidden";
            document.querySelector(".bottomExitDiv").style.visibility="visible";
            e.stopPropagation();
            props.stopSolve();

            if (document.querySelector(".activeMenu")) {
                document.querySelector(".activeMenu").classList.remove("activeMenu");
            }

            if (document.querySelector("#solverChangeData").data) {
                let data = document.querySelector("#solverChangeData").data.split(",");
                if (data[0] === "ColorPicker") {
                    props.setState({ activeMenu: "", currentFunct: "None", isValidConfig: false });
                    document.querySelector("#solverChangeData").data = "";
                    return;
                }
                document.querySelector(`#${data[0]}`).classList.add("activeMenu");
                props.setState({ activeMenu: data[0], currentFunct: data[1], isValidConfig: false });
                document.querySelector("#solverChangeData").data = "";

            }
            else {
                props.setState({ activeMenu: "", currentFunct: "None", isValidConfig: false });
            }
        }

        

        let  leaveCp = () => {
            document.querySelector(".warningPopup").style.display = "none";
            document.querySelector(".bottomExitDiv").style.visibility="visible";
            this.props.endColorPicker();

            if( document.querySelector(".activeMenu")){
                document.querySelector(".activeMenu").classList.remove("activeMenu");
            }

            if(document.querySelector("#cpChangeData").data){
                let data = document.querySelector("#cpChangeData").data.split(",");
                if(data[0]==="Solver") {
                    this.props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
                    document.querySelector("#cpChangeData").data="";
                    return;
                }
                document.querySelector(`#${data[0]}`).classList.add("activeMenu");
                document.querySelector("#cpChangeData").data="";

                this.props.setState({activeMenu:data[0],currentFunc:data[1],isValidConfig:false},()=>this.props.beginSolve());
            }
            else{
                this.props.setState({activeMenu:"",currentFunct:"None",isValidConfig:false});
            }
        }

        let solverLeaveButton = 
            <button 
                id="Solver" 
                data="Solving" 
                onClick={exitConfirm} 
                className="exitButton">Exit</button>

        let algoLeaveButton =
            <button 
                id="Algorithms" 
                data="Algorithms" 
                onClick={exitAlgo} 
                className="exitButton">Exit</button>
        
        let cpLeaveButton =
            <button 
                id="ColorPicker" 
                data="Color Picker" 
                onClick={exitCpConfirm} 
                className="exitButton">Exit</button>

        let confirmLeavePopup =
            <div id="controlsPopup" className="warningPopupSolver" style={{position:"absolute", left:"35vw", width:"30vw", bottom: "8px"}}>
                <div id="solverChangeData" data=""></div>
                <div className="solverMessage">Are you sure you want to leave Solver? Progress will not be saved.</div>
                <button onClick={stay} className="solverLeaveStay">Stay</button><button onClick={(e) => leave(e, this.props)} className="solverLeaveStay">Leave</button>
            </div>
        
        let confirmLeavePopupCp=
            <div id="controlsPopup" className="warningPopup" style={{position:"absolute", left:"35vw", width:"30vw", bottom: "8px"}}>
                <div id="cpChangeData" data=""></div>
                <div className="cpMessage">Are you sure you want to leave Color Picker? Progress will not be saved.</div>
                <button onClick={stayCp} className="cpLeaveStay">Stay</button><button onClick={leaveCp} className="cpLeaveStay">Leave</button>
            </div>

        switch(this.props.state.activeMenu){
            case 'Moves':
                activeMenu = <Controls {...this.props}/>
                break;
            case 'ColorPicker':
                activeMenu = <ColorPicker {...this.props}/>
                activeMenuBottom = <SideColorPickerController {...this.props} />
                activeMenuExit = cpLeaveButton;
                break;
            case 'Solver':
                activeMenu=<SideSolverUI {...this.props}/>
                activeMenuBottom=<SideSolverControls {...this.props}/>
                activeMenuExit=solverLeaveButton;
                break;
            case 'Algorithms':
                activeMenu=<SideSolverUI {...this.props}/>
                activeMenuBottom=<SideSolverControls {...this.props}/>
                activeMenuExit=algoLeaveButton;
                break;
            default:
                activeMenu=<MainSideMenu {...this.props}/>;
                activeMenuBottom="";
        }

        
        //console.log("hi")
        return (
        [<div className="sideMenuWrapper" key="sideMenuWrapper" style={{pointerEvents: "none"}}>
            {activeMenu}
        </div>,
        <div className="bottomMenuWrapper" key="bottomMenuWrapper" style={{pointerEvents: "none"}}>
            {confirmLeavePopupCp}
            {confirmLeavePopup}
            {activeMenuBottom}
            <div className="bottomExitDiv">
                {activeMenuExit}
            </div>
            
        </div>])
    }
}

export default React.memo(SideView);