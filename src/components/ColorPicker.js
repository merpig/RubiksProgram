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
                        <div className="cp-container" style={{width:"200px",height:"100px"}}>

                            <div style={{backgroundColor:"darkgrey"}}><p>Click pieces to assign colors. Click buttons or keyboard to select color.</p></div>
                            <div style={{backgroundColor:props.colorPicked}}><h3>Current color</h3></div>
                            <button style={{backgroundColor:'white'}} onClick={()=>props.changeColor('white')}>1 : White</button>
                            <button style={{backgroundColor:'blue'}} onClick={()=>props.changeColor('blue')}>2 : Blue</button>
                            <button style={{backgroundColor:'red'}} onClick={()=>props.changeColor('red')}>3 : Red</button>
                            <button style={{backgroundColor:'yellow'}} onClick={()=>props.changeColor('yellow')}>4 : Yellow</button>
                            <button style={{backgroundColor:'orange'}} onClick={()=>props.changeColor('orange')}>5 : Orange</button>
                            <button style={{backgroundColor:'green'}} onClick={()=>props.changeColor('green')}>6 : Green</button>
                            {props.isValidConfig?<button onClick={()=>props.setColorPickedCube()}>Set [<strong style={{color:'green'}}>Valid</strong>]</button>:<button>Set [<strong style={{color:'red'}}>Invalid</strong>]</button>}
                            <button onClick={props.endColorPicker}>Quit</button>
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

export default ColorPicker;