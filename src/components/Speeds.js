import 'rc-slider/assets/index.css';

import React from 'react';
import Slider from 'rc-slider'

const style = { width: 100, position: "fixed", top: "80px", left: "10px",fontSize:"1rem"};

const Speeds = props => (

    <div className="sliderDiv" style = {style}>

        {props.isDisabled ?
        <Slider 
            defaultValue={40} 
            min={0} max={70} 
            step={10}
            disabled
        />
        :
        <Slider 
            defaultValue={40} 
            min={0} max={70} 
            step={10}
            onChange={props.onSliderChange}
        />}

    </div>
);



export default Speeds;