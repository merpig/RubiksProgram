import React from 'react';
import "./ColorPickerInfo.css"

const ColorPickerInfo = (props) => (
    <div className={(window.innerWidth > 900&&window.innerHeight>580)?"sideSolverInfo":"solverInfo"}>
        <div className="setLengthWrapper">
            Current Color: <div className="setLength" style={{backgroundColor:props.colorPicked}}></div>
        </div>
    </div>
)

export default ColorPickerInfo;