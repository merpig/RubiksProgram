import React,{Component} from "react";
import "./MenuWrapper/MenuWrapper.css";
import {Row, Col} from "react-bootstrap";
import MenuOptions from "./MenuOptions/MenuOptions";
import MenuOptionsOther from "./MenuOptionsOther/MenuOptionsOther";
import Controls from "./Controls";
import ColorPicker from "./ColorPicker";
import SolverUI from "./SolverUI/SolverUI";


class View extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if(!this.props.state.autoTarget&&nextProps.autoTarget) return true;
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
        let currentFunc = this.props.state.currentFunc;
        switch(this.props.state.activeMenu){
            case 'Moves':
                activeMenu = <Controls {...this.props}/>
                break;
            case 'ColorPicker':
                if(currentFunc==="None"){
                    if(document.querySelector(".activeMenu")){
                        document.querySelector(".activeMenu").classList.remove("activeMenu");
                    }
                    this.props.setState({activeMenu:""});
                }
                activeMenu = <ColorPicker {...this.props}/>
                break;
            case 'Solver':
                if(currentFunc==="None"){
                    if(document.querySelector(".activeMenu")){
                        document.querySelector(".activeMenu").classList.remove("activeMenu");
                    }
                    this.props.setState({activeMenu:""});
                }
                activeMenu=<SolverUI {...this.props}/>
                break;
            default:
                activeMenu=this.props.state.activeMenu;
        }
        console.log("hi")
        return (
        <div className="menuWrapper" style={{color:"white"}}>
            <Row style={{height: "100%", margin: "5px",paddingBottom: "10px"}}>
                <Col style={{padding:0}}>
                    <MenuOptions {...this.props}/>
                </Col>
                <Col style={{padding:0, color:"black",opacity:0}} xs={.5}>
                    .    
                </Col>
                <Col id="menuBox" style={{padding:0,overflow:"auto",position:"relative",top:"0px",width:"100%",height:"100%"}} xs={8}>
                    {activeMenu}  
                </Col>
                <Col style={{padding:0, color:"black",opacity:0}} xs={.5}>
                    .    
                </Col>
                <Col style={{padding:0}}>
                    <MenuOptionsOther {...this.props}/>
                </Col>
            </Row>
        </div>)
    }
}

export default React.memo(View);