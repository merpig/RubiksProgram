import React from 'react';
import "./SolverInfo.css"

const SolverInfo = (props) => (
    <div className={(window.innerWidth > 900&&window.innerHeight>580)?"sideSolverInfo":"solverInfo"}>
        <div className="setLengthWrapper">
            Total Moves: <div className="setLength">{props.solvedSetLength}</div>
        </div>
        <div className="setLengthWrapper">
            Current Move: <div className="setLength">{props.prevSetLength}</div>
        </div>
    </div>
)

export default SolverInfo;