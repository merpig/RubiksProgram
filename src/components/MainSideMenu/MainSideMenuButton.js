import React from "react";
import "./MainSideMenu.css";
import "../SideView/SideView.css";

const MainSideMenuButton = props => {
    return (
        <div className="mainSideMenuButton" style={{height:`${1/6*100}%`}}>
            <button className="sideMenuButton" onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    )
}

export default MainSideMenuButton;