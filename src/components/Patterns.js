import React from "react";
import algorithms from '../cubeFunctions/algorithms';

let position = 0;
let buttons=[];
const Patterns = props => (
    <div style={{position:"fixed", bottom: "0px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>
        {
            algorithms.forEach(e => {
                if(e.worksFor.includes(props.size)){
                    if(props.size===4&&e.name==="Cube x3")
                        e.moves = e.moves1;

                    buttons.push( <button onClick={() => props.algorithm(e.moves,e.name)} key={position/30}style={{position:"fixed", bottom: position, left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>{e.name}</button>)
                    position+=30;
                }
            })
        }
        {buttons}
        {/* <button onClick={() => props.algorithm(algorithms.cross.moves,algorithms.cross.name)} style={{position:"fixed", bottom: "150px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>CROSS</button>
        <button onClick={() => props.algorithm(algorithms.checkerBoard.moves,algorithms.checkerBoard.name)} style={{position:"fixed", bottom: "120px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>CHECKERBOARD</button>
        <button onClick={() => props.algorithm(algorithms.checkerBoard1.moves,algorithms.checkerBoard1.name)} style={{position:"fixed", bottom: "90px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>CHECKERBOARD1</button>
        <button onClick={() => props.algorithm(algorithms.cube2.moves,algorithms.cube2.name)} style={{position:"fixed", bottom: "60px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>CUBE X2</button>
        <button onClick={() => props.algorithm(algorithms.cube3.moves,algorithms.cube3.name)} style={{position:"fixed", bottom: "30px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>CUBE X3</button>
        <button onClick={() => props.algorithm(algorithms.sixSpots.moves,algorithms.sixSpots.name)} style={{position:"fixed", bottom: "0px", left: "10px",backgroundColor: "Transparent", border: "none",color:"lightgray"}}>SIX SPOTS</button> */}
    </div>
);

export default Patterns;