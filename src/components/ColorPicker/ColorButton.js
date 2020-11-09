import React from "react";
import "./ColorPicker.css";

const ColorPicker = (props) => {

    let colors = {
        'white':[255,255,255],
        'blue':[0,0,255],
        'red':[255,0,0],
        'yellow':[255,255,0],
        'orange':[255,165,0],
        'green':[0,255,0]
    }

    const capitalized = props.color.charAt(0).toUpperCase() + props.color.slice(1);
    const unselected = props.color===props.colorPicked?"":props.color;
    
    return(
        <div 
            onClick={e=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}}
            className={`${props.side?"bottomColorButtonDiv":"colorButtonDiv"} ${props.index%2?"leftCp":"rightCp"}`}>
        <button
            className={`colorPicker ${unselected}`}
            style={{
                backgroundColor:unselected?`rgba(0,0,255,.10)`:`rgba(${colors[props.color]},.5)`,
                color:props.color
            }} 
            onClick={(e)=>
                {e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                props.changeColor(props.color);
            }}>
                {props.isMobile?capitalized:`${props.index}. ${capitalized}`}
        </button>
        </div>
    );

}

export default ColorPicker;