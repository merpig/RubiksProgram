import React from "react";
import "../MenuWrapper/MenuWrapper.css";
import "./MobileView.css"
import Controls from "../Controls";
import SolverUI from "../SolverUI/SolverUI";
import {Row, Col, Button} from "react-bootstrap";

const Mobile = props => {

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
        <div className="menuWrapper">
            {props.state.currentFunc === "None"&&props.state.activeMenu!=="Moves"?
                <Row style={{height: "100%"}}>
                    <Col xs={6}>
                        <Button className="mobileButton" onClick={()=>props.setState({activeMenu: "Moves"})} key={0}>Moves</Button>
                        <Button className="mobileButton" onClick={()=>props.setState({currentFunc: "Color Picker",activeMenu: "ColorPicker"},props.beginColorPicker())} key={1}>Color Picker</Button> 
                        <Button className="mobileButton" onClick={()=>props.setState({currentFunc: "Solving"})} key={2}>Solver</Button> 
                        <Button className="mobileButton" onClick={()=>props.setState({currentFunc: "Algorithms",activeMenu: "Algorithms"})} key={3}>Patterns</Button> 
                    </Col>
                    <Col xs={6}>
                        <Button className="blankButton" key={0}></Button>
                        <Button className="mobileButton" id="Scramble" onClick={otherOptionClick} key={2}>Scramble</Button>
                        <Button className="mobileButton" id="Reset" onClick={otherOptionClick}  key={3}>Reset</Button>
                    </Col>
                </Row>
            :
                props.state.currentFunc === "Color Picker"?<></>:
                props.state.currentFunc === "Solving"?<></>:
                props.state.currentFunc === "Algorithms"?
                <><SolverUI {...props} mobile={true}/></>
                :
                props.state.activeMenu==="Moves"?
                    <Row style={{height: "100%"}}>
                        <Col xs={2}>
                            <Button className="mobileButton" style={{fontSize:"2rem",padding:0,textAlign:"center"}} onClick={()=>{props.setState({activeMenu:""})}}>←</Button>
                        </Col>
                        <Col xs={10}>
                            <Controls {...props}/>
                        </Col>
                    </Row>
                :<></>
            }
            
        </div>)

}

export default Mobile;