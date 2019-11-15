import React from "react";
import "./Nav.css";
import {DropdownButton,Dropdown} from 'react-bootstrap'
import 'react-dropdown/style.css'
import Popup from "reactjs-popup";

const Navbar = props => (
  <nav className="navbar navbar-dark fixed-top bg-dark">
    <ul className="nav nav-justified mr-auto">
      <li className="nav-item">
        <p className="navbar-brand" style={{color:"lightgray"}}><b>{props.title}</b></p>
        <DropdownButton title="Cubes">

          
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=2" style={{backgroundColor:"lightgrey"}}>2 X 2 X 2</Dropdown.Item>
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=3">3 X 3 X 3</Dropdown.Item>
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=4" style={{backgroundColor:"lightgrey"}}>4 X 4 X 4</Dropdown.Item>
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=5">5 X 5 X 5</Dropdown.Item>
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=6" style={{backgroundColor:"lightgrey"}}>6 X 6 X 6</Dropdown.Item>
            <Dropdown.Item href="https://rubiksprogram.herokuapp.com/id=7">7 X 7 X 7</Dropdown.Item>
          
        </DropdownButton>
        
      </li>
    </ul>
    <div style={{float:"right"}} >
    <Popup trigger={<button id="triggerBtn">Info</button>}>
        {close => (
          <div className="popupDiv">
            <b style={{fontSize: "2rem"}}>Instructions</b>
            <button className="close" id="closeBtn" onClick={close}>
              &times;
            </button>
            <hr style={{backgroundColor:"#007bff",marginBottom:"0"}}></hr>
            <div style={{backgroundColor:"lightgrey",marginTop:"0",color:"black"}}>
              <p style={{paddingTop: "1rem"}}>Use arrow keys to turn the cube.</p>
              <hr style={{backgroundColor:"lightgray"}}></hr>
              <p>Use buttons on the right or keyboard: 
                <b style={{color: "white",backgroundColor:"black"}}>F,</b><b style={{color: "white",backgroundColor:"black"}}>f,</b>
                <b style={{color: "blue",backgroundColor:"black"}}>U,</b><b style={{color: "blue",backgroundColor:"black"}}>u,</b>
                <b style={{color: "red",backgroundColor:"black"}}>R,</b><b style={{color: "red",backgroundColor:"black"}}>r,</b>
                <b style={{color: "yellow",backgroundColor:"black"}}>B,</b><b style={{color: "yellow",backgroundColor:"black"}}>b,</b>
                <b style={{color: "orange",backgroundColor:"black"}}>L,</b><b style={{color: "orange",backgroundColor:"black"}}>l,</b>
                <b style={{color: "green",backgroundColor:"black"}}>D,</b><b style={{color: "green",backgroundColor:"black"}}>d</b> 
                to turn individual faces
              </p>
              <hr style={{backgroundColor:"lightgray"}}></hr>
              <p>Top Left buttons control the speed</p>
              <hr style={{backgroundColor:"lightgray"}}></hr>
              <p>Bottom left buttons are built in pattern functions</p>
              <hr style={{backgroundColor:"lightgray"}}></hr>
              <p style={{marginBottom: "0",paddingBottom:"1rem"}}>Bottom right buttons are the core functions for the cube</p>
            </div>
          </div>
        )}
      </Popup>
      {/*Open model here. Show bunch of settings. Pass changeSettings down to component to apply changes*/}
      <DropdownButton hidden title={<i className='fa fa-cog'></i>}>
        <ul>
          <li>
            {/*
            Anisotropy {props.state.anisotropy ? "ON" : "OFF"}
            <label className="checkbox-inline">
              <input type="checkbox" defaultChecked data-toggle="toggle" onClick={() => props.changeSettings('anisotropy')}></input>
            </label>
            */}
          </li>
          
        </ul>

      </DropdownButton>
      {/*<button className="btn btn-primary btn-circle btn-circle-sm m-1" onClick={() => props.changeSettings([1],["Hello"])}><i className="fa fa-cog"></i></button> */}
    </div>
  </nav>
);

export default Navbar;
