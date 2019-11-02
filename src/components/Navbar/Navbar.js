import React from "react";
import "./Nav.css";
import {DropdownButton,Dropdown} from 'react-bootstrap'
import 'react-dropdown/style.css'

const Navbar = props => (
  <nav className="navbar navbar-dark fixed-top bg-dark">
    <ul className="nav nav-justified mr-auto">
      <li className="nav-item">
        <p className="navbar-brand"><b>{props.title}</b></p>
        <DropdownButton title="Dropdown">

          <Dropdown.Menu>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=2">2 X 2 X 2</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=3">3 X 3 X 3</Dropdown.Item>
            <Dropdown.Item href="https://mighty-fortress-00882.herokuapp.com/id=4">4 X 4 X 4</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownButton>
      </li>
    </ul>
  </nav>
);

export default Navbar;
