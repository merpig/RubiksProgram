import React from "react";
import algorithms from '../cubeFunctions/algorithms';

let position = 0;
let buttons=[];
const Patterns = props => (
    <div style={{position:"fixed", bottom: "0px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>
        {
            algorithms.forEach(e => {
                if(e.worksFor.includes(props.size)){
                    buttons.push( 
                        <button 
                            onClick={() => props.algorithm(e.moves,e.name)}
                            key={position/30}
                            style={{
                                position:"fixed",
                                bottom: position,
                                left: "10px",
                                backgroundColor: "Transparent",
                                border: "none",
                                color:"lightgray"
                            }}
                        >{e.name}</button>
                    )
                    position+=30;
                }
            })
        }
        {buttons}
    </div>
);

export default Patterns;