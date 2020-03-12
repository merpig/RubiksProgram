import React from "react";
import Draggable from 'react-draggable';

const ColorPicker = (props) => {
    return (
        <div style={{position: "absolute", zIndex: "99"}}>
            <Draggable
            handle=".handle"
            defaultPosition={{x:window.innerWidth-211 , y: 50}}
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

                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
        );

};

export default ColorPicker;