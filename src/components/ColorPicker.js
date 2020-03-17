import React from "react";
import Draggable from 'react-draggable';

const ColorPicker = (props) => {
    let li = [];
    props.cpErrors.forEach(function(error){
        console.log(error);
            li.push(<li style={{color:"red",fontSize:"1rem",textAlign:"left"}}>
                {error}
            </li>);
    });
    return (
        <div style={{position: "absolute", zIndex: "99"}}>
            <Draggable
            handle=".handle"
            defaultPosition={{x:0 , y: 150}}
            position={null}
            grid={[50, 50]}
            scale={1}
            onStart={props.handleStart}
            onDrag={props.handleDrag}
            onStop={props.handleStop}>
                <div>
                    <div className="handle" style={{color:"grey"}}>Drag from here</div>
                    <div>
                        <div className="cp-container" style={{width:"220px",height:"100px"}}>

                            <div style={{backgroundColor:" #343a40", borderRadius: ".25rem",color: "lightgray"}}><p>Click pieces to assign colors. Click buttons or keyboard to select color.</p></div>
                            <div style={{backgroundColor:props.colorPicked, borderRadius: ".25rem",color: "lightgray"}}><h3>Selected color</h3></div>
                            <button className="cpButton" style={{backgroundColor:'white',width:"110px"}} onClick={()=>props.changeColor('white')}>1 : White</button>
                            <button className="cpButton" style={{backgroundColor:'blue',width:"110px"}} onClick={()=>props.changeColor('blue')}>2 : Blue</button>
                            <button className="cpButton" style={{backgroundColor:'red',width:"110px"}} onClick={()=>props.changeColor('red')}>3 : Red</button>
                            <button className="cpButton" style={{backgroundColor:'yellow',width:"110px"}} onClick={()=>props.changeColor('yellow')}>4 : Yellow</button>
                            <button className="cpButton" style={{backgroundColor:'orange',width:"110px"}} onClick={()=>props.changeColor('orange')}>5 : Orange</button>
                            <button className="cpButton" style={{backgroundColor:'green',width:"110px"}} onClick={()=>props.changeColor('green')}>6 : Green</button>
                            {props.isValidConfig?<button id="triggerBtn" style={{width:"110px"}} onClick={()=>props.setColorPickedCube()}>Set <strong style={{color:'green',fontSize:'1rem'}}>Valid</strong></button>:<button id="triggerBtn" style={{width:"110px"}}>Set <strong style={{color:'red',fontSize:'1rem'}}>Invalid</strong></button>}
                            <button id="triggerBtn" style={{width:"110px"}} onClick={props.endColorPicker}>Quit</button>
                            <div style={{width:"max-content"}}>
                                <ul> 
                                    {li}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
        );

};

export default React.memo(ColorPicker);