import React from "react";
import "./Nav.css";
import {DropdownButton,Dropdown} from 'react-bootstrap'
import 'react-dropdown/style.css'

const Navbar = props => (
  <nav className="navbar navbar-dark fixed-top">
    <ul className="nav nav-justified mr-auto">
      <li className="nav-item">
        <p className="navbar-brand" style={{color:"lightgray"}}><b>{props.title}</b></p>
        <DropdownButton title="Cubes">

          
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=2" style={{backgroundColor:"lightgrey"}}>2 X 2 X 2</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=3">3 X 3 X 3</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=4" style={{backgroundColor:"lightgrey"}}>4 X 4 X 4</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=5">5 X 5 X 5</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=6" style={{backgroundColor:"lightgrey"}}>6 X 6 X 6</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=7">7 X 7 X 7</Dropdown.Item>
          
        </DropdownButton>
      </li>
    </ul>
  </nav>
);

export default Navbar;
