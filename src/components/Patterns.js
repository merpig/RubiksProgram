import React from "react";
import algorithms from '../cubeFunctions/algorithms';


const Patterns = props => {
    let position = 0;
    let buttons=[];
    return (<div style={{position:"fixed", bottom: "0px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>
        {
            algorithms.forEach((e,i) => {
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
                                color:"lightgray",
                                fontSize:"1.5rem"
                            }}
                        >{e.name}</button>
                    )
                    position+=30;
                }
            })
        }
        {buttons}
    </div>)
}

export default Patterns;