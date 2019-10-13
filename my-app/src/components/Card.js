import React from "react";

const Card = props => (
    <div className="card" value={props.id}>
        <img 
        src={props.image} 
        alt={props.name} 
        onClick={() => props.click(props.id)}></img>
    </div>
);

export default Card;