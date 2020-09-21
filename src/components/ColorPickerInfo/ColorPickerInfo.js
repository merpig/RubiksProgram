import React from 'react';
import "./ColorPickerInfo.css"

const ColorPickerInfo = (props) => (
    <div className="solverInfo">
        <div className="setLengthWrapper">
            Current Color: <div className="setLength" style={{backgroundColor:props.colorPicked}}></div>
        </div>
    </div>
)

export default ColorPickerInfo;