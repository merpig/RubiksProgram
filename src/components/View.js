import React,{Component} from "react";
import "./MenuWrapper/MenuWrapper.css";
import {Row, Col} from "react-bootstrap";
import MenuOptions from "./MenuOptions/MenuOptions";
import MenuOptionsOther from "./MenuOptionsOther/MenuOptionsOther";
import Controls from "./Controls";
import ColorPicker from "./ColorPicker/ColorPicker";
import SolverUI from "./SolverUI/SolverUI";


class View extends Component {
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
        //const props = this.props;
        let activeMenu;
        switch(this.props.state.activeMenu){
            case 'Moves':
                activeMenu = <Controls {...this.props}/>
                break;
            case 'ColorPicker':
                activeMenu = <ColorPicker {...this.props}/>
                break;
            case 'Solver':
                activeMenu=<SolverUI {...this.props}/>
                break;
            case 'Algorithms':
                activeMenu=<SolverUI {...this.props}/>
                break;
            default:
                activeMenu="";
        }

        
        //console.log("hi")
        return (
        <div className="menuWrapper" style={{pointerEvents: "none"}}>
            <Row style={{height: "100%",margin:"0px"}}>
                 {(this.props.state.activeMenu==="ColorPicker"||this.props.state.activeMenu==="Solver")?
                []:
                [<Col key="MenuOptions" style={{paddingLeft:"0px"}}>
                    <MenuOptions {...this.props}/>
                </Col>,
                <Col key="MenuOptionsPadding" style={{padding:0, color:"black",opacity:0}} xs={.5}>
                    .    
                </Col>]}
                <Col 
                    id="menuBox" 
                    style={{position:"relative",bottom:"0",height:"100%"}} 
                    xs={
                        this.props.state.currentFunc==="Color Picker"||this.props.state.activeMenu==="Solver"?
                        12:this.props.state.currentFunc==="None"||this.props.state.currentFunc==="Scrambling"||this.props.state.currentFunc==="Reset"?4:8}>
                    {activeMenu}  
                </Col>
                {(this.props.state.activeMenu==="ColorPicker"||this.props.state.activeMenu==="Solver"||this.props.state.activeMenu==="Algorithms")?
                []:
                [<Col key="MenuOptionsOther" style={{padding:0, color:"black",opacity:0}} xs={.5}>
                    .    
                </Col>,
                <Col key="MenuOptionsOtherPadding" style={{paddingLeft:"0px",minWidth: "150px",paddingRight:"0px"}}>
                    <MenuOptionsOther {...this.props}/>
                </Col>]}
            </Row>
            
        </div>)
    }
}

export default React.memo(View);