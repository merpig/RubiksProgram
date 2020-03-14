import React from "react";
import Draggable from 'react-draggable';

const ColorPicker = (props) => {
    return (
        <div style={{position: "absolute", zIndex: "99"}}>
            <Draggable
            handle=".handle"
            defaultPosition={{x:window.innerWidth-211 , y: 150}}
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
                            <button style={{backgroundColor:props.colorPicked}}>Current color: [{props.colorPicked}]</button>
                            <button style={{backgroundColor:'white'}} onClick={()=>props.changeColor('white')}>1 : White</button>
                            <button style={{backgroundColor:'blue'}} onClick={()=>props.changeColor('blue')}>2 : Blue</button>
                            <button style={{backgroundColor:'red'}} onClick={()=>props.changeColor('red')}>3 : Red</button>
                            <button style={{backgroundColor:'yellow'}} onClick={()=>props.changeColor('yellow')}>4 : Yellow</button>
                            <button style={{backgroundColor:'orange'}} onClick={()=>props.changeColor('orange')}>5 : Orange</button>
                            <button style={{backgroundColor:'green'}} onClick={()=>props.changeColor('green')}>6 : Green</button>
                            <button >Set [N/A]</button>
                            <button onClick={props.endColorPicker}>Quit</button>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
        );

};

export default ColorPicker;