import React from "react";
import "./Nav.css";
import {DropdownButton,Dropdown} from 'react-bootstrap'
import 'react-dropdown/style.css'
import Popup from "reactjs-popup";

const Navbar = props => (
  <nav className="navbar navbar-dark fixed-top bg-dark">
    <ul className="nav nav-justified mr-auto">
      <li className="nav-item nav-fix-for-edge">
        <p className="navbar-brand" style={{color:"lightgray"}}><b>{props.title}</b></p>

          {/*Open model here. Show bunch of settings. Pass changeSettings down to component to apply changes*/}
          <DropdownButton className="settings" aria-label="settings" id="settings" title={<i className='fa fa-cog'></i>}>
          <ul>
            <li>
              
              Stats <br></br>
              <label className="checkbox-inline">
                <input type="checkbox" data-toggle="toggle" onClick={() => props.changeSettings('displayStats')}></input>
                {props.state.showStats ? "ON " : "OFF "}
              </label>
              
              
            </li>

            <li>
              
              Move Input <br></br>
              <label className="checkbox-inline">
                <input type="checkbox" data-toggle="toggle" onClick={() => props.changeSettings('displayMoveInput')}></input>
                {props.state.showMoveInput ? "ON " : "OFF "}
              </label>
              
              
            </li>

            <li>
              
              Move Hints <br></br>
              <label className="checkbox-inline">
                <input type="checkbox" defaultChecked data-toggle="toggle" onClick={() => props.changeSettings('displayHints')}></input>
                {props.state.showHints? "ON " : "OFF "}
              </label>
              
              
            </li>
            
          </ul>

        </DropdownButton>
        <DropdownButton title="Cubes" className="cubes">

          {props.isLocal ?
          <>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=2" style={{backgroundColor:"lightgrey"}}>2 X 2 X 2</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=3">3 X 3 X 3</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=4" style={{backgroundColor:"lightgrey"}}>4 X 4 X 4</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=5">5 X 5 X 5</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=6" style={{backgroundColor:"lightgrey"}}>6 X 6 X 6</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/RubiksProgram/id=7">7 X 7 X 7</Dropdown.Item>
          </>:
          <>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=2" style={{backgroundColor:"lightgrey"}}>2 X 2 X 2</Dropdown.Item>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=3">3 X 3 X 3</Dropdown.Item>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=4" style={{backgroundColor:"lightgrey"}}>4 X 4 X 4</Dropdown.Item>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=5">5 X 5 X 5</Dropdown.Item>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=6" style={{backgroundColor:"lightgrey"}}>6 X 6 X 6</Dropdown.Item>
          <Dropdown.Item href="https://merpig.github.io/RubiksProgram/id=7">7 X 7 X 7</Dropdown.Item>
          </>}

          
        </DropdownButton>
        
      </li>
    </ul>
    <div style={{float:"right"}} >
    <Popup trigger={<button id="triggerBtn">Info</button>}>
        {close => (
          <div style={{zIndex:"100",width:"100%",height:"100%"}}>
            <div className="shadeBackground" style={{backgroundColor:"black",zIndex:"101"}} onClick={close}></div>
            <div style={{zIndex:"102",width:"max-content",margin:"auto",transform:"translateX(-50%)"}} className="popupDiv">
              <b style={{fontSize: "2rem"}}>Instructions</b>
              <button className="close" id="closeBtn" onClick={close}>
                &times;
              </button>
              <hr style={{backgroundColor:"#007bff",marginBottom:"0"}}></hr>
              <div style={{backgroundColor:"black",marginTop:"0",color:"#00C000",fontSize:"1rem",textAlign:"left"}}>
                <div style={{paddingTop: "1rem"}}>> Click and drag anywhere not on the cube to rotate.</div>
                <hr style={{backgroundColor:"lightgray"}}></hr>
                <div>> 1. Click and drag anywhere on the cube to make a move or</div>
                <div>> 2. Use buttons(Moves) or keyboard to make turns: <br></br>
                  <div style={{width:"100%",textAlign:"center"}}>
                  <b style={{color: "white",backgroundColor:"black"}}> F, </b><b style={{color: "white",backgroundColor:"black"}}>f,</b>
                  <b style={{color: "blue",backgroundColor:"black"}}> U, </b><b style={{color: "blue",backgroundColor:"black"}}>u,</b>
                  <b style={{color: "red",backgroundColor:"black"}}> R, </b><b style={{color: "red",backgroundColor:"black"}}>r,</b>
                  <b style={{color: "yellow",backgroundColor:"black"}}> B, </b><b style={{color: "yellow",backgroundColor:"black"}}>b,</b>
                  <b style={{color: "orange",backgroundColor:"black"}}> L, </b><b style={{color: "orange",backgroundColor:"black"}}>l,</b>
                  <b style={{color: "green",backgroundColor:"black"}}> D, </b><b style={{color: "green",backgroundColor:"black"}}>d </b> 
                  <p style={{width:"100%",textAlign:"center"}}>(lower case is clockwise, upper case is counterclockwise)</p>
                  </div>
                </div>
                <hr style={{backgroundColor:"lightgray"}}></hr>
                <div style={{marginBottom: "0",paddingBottom:"1rem"}}>> Author: Sasha Peters, <a target="#" href="https://www.github.com/merpig">github</a>, <a target="#" href="https://www.github.com/merpig/RubiksProgram">Project Repo</a></div>
                <hr style={{backgroundColor:"lightgrey"}}></hr>
                  <div style={{color: "white",backgroundColor:"black",textAlign:"center"}}>
                  site design / cube © 2020 RubiksProgram
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup> {" "}
      <button id="fullscreenBtn" value="true">Fullscreen</button>
      
      {/*<button className="btn btn-primary btn-circle btn-circle-sm m-1" onClick={() => props.changeSettings([1],["Hello"])}><i className="fa fa-cog"></i></button> */}
    </div>
  </nav>
);

export default Navbar;
