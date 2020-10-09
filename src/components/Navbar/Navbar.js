import React from "react";
import "./Nav.css";
import { DropdownButton, Dropdown } from 'react-bootstrap'
import 'react-dropdown/style.css'
import Popup from "reactjs-popup";

const Navbar = props => {
  const navCubes = [];
  for (let i = 2; i <= 10; i++) {
    navCubes.push(
      <Dropdown.Item key={i} href={`/RubiksProgram/id=${i}`}>{i} X {i}</Dropdown.Item>
    )
  }
  return (
    <nav className="navbar navbar-dark fixed-top">
      <ul className="nav nav-justified mr-auto">
        <li className="nav-item nav-fix-for-edge">
          <p className="navbar-brand" style={{ color: "lightgray" }}><b>{props.title}</b></p>

          {/*Open model here. Show bunch of settings. Pass changeSettings down to component to apply changes*/}
          <div className="settingsDropDown">
            <DropdownButton className="settings" aria-label="settings" id="settings" title={<i className='fa fa-cog'></i>}>
              <ul>

                <li className="settingsDropDownItem">
                  <div className="checkbox-inline">
                      <input type="checkbox" data-toggle="toggle" onClick={() => props.changeSettings('displayMoveInput')}></input>
                  </div>
              Move Input
            </li>

                <li className="settingsDropDownItem" onClick={() => props.changeSettings('displayHints')}>


                  <div className="checkbox-inline">
                      <input type="checkbox" defaultChecked data-toggle="toggle" onClick={() => props.changeSettings('displayHints')}></input>
                  </div>
              Move Hints

            </li>

              </ul>

            </DropdownButton>
          </div>
          <div className="cubesDropdown">
            <DropdownButton title="Cubes" className="cubes">
              {navCubes}
            </DropdownButton>
          </div>
        </li>
      </ul>
      <div style={{ float: "right", height: "100%" }} >
        <Popup trigger={<button id="infoBtn">Info</button>}>
          {close => (
            <div style={{ zIndex: "100", width: "100%", height: "100%" }}>
              <div className="shadeBackground" style={{ backgroundColor: "black", zIndex: "101" }} onClick={close}></div>
              <div style={{ zIndex: "102", width: "max-content", margin: "auto", transform: "translateX(-50%)", padding: "8px" }} className="popupDiv">
                <b style={{ fontSize: "2rem" }}>Instructions</b>
                <div className="close" id="closeBtn" onClick={close}>
                  &times;
                </div>
                <div style={{ backgroundColor: "rgba(0,0,0,.8)", height: "100%", marginTop: "0", color: "lightgrey", fontSize: "1rem", textAlign: "center", borderRadius: ".25rem", padding: "8px" }}>
                  <div style={{ paddingTop: "" }}>Click and drag anywhere not on the cube to rotate.</div>
                  <hr style={{ backgroundColor: "lightgray", width: "60%" }}></hr>
                  <div>Click and drag anywhere on the cube to make a move <br></br>or use the keyboard to make turns:</div>
                  <div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <b style={{ color: "white", backgroundColor: "black" }}> F, </b><b style={{ color: "white", backgroundColor: "black" }}>f,</b>
                      <b style={{ color: "blue", backgroundColor: "black" }}> U, </b><b style={{ color: "blue", backgroundColor: "black" }}>u,</b>
                      <b style={{ color: "red", backgroundColor: "black" }}> R, </b><b style={{ color: "red", backgroundColor: "black" }}>r,</b>
                      <b style={{ color: "yellow", backgroundColor: "black" }}> B, </b><b style={{ color: "yellow", backgroundColor: "black" }}>b,</b>
                      <b style={{ color: "orange", backgroundColor: "black" }}> L, </b><b style={{ color: "orange", backgroundColor: "black" }}>l,</b>
                      <b style={{ color: "green", backgroundColor: "black" }}> D, </b><b style={{ color: "green", backgroundColor: "black" }}>d </b>
                      <p style={{ width: "100%", textAlign: "center" }}>(lower case is clockwise, upper case is counterclockwise)</p>
                    </div>
                  </div>
                  <hr style={{ backgroundColor: "lightgray", width: "60%" }}></hr>
                  <div style={{}}>
                  <div style={{ marginBottom: "0", paddingBottom: "" }}>Author: Sasha Peters <br></br> <a target="#" href="https://www.github.com/merpig"><i className="fa fa-github" style={{ fontSize: "36px", marginRight: "10px" }}></i></a><a target="#" href="https://www.linkedin.com/in/alexandr-sasha-peters-8a2489168/"><i className="fa fa-linkedin" style={{ fontSize: "36px" }}></i></a></div>
                  <hr style={{ backgroundColor: "lightgrey" }}></hr>
                  <div style={{ color: "white", backgroundColor: "", textAlign: "center" }}>
                      site design / cube © 2020 RubiksProgram
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup> {" "}
        <button id="fullscreenBtn" value="true">Fullscreen</button>
      </div>
    </nav>)
};

export default Navbar;
