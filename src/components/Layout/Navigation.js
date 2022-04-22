import React from 'react'
import {Navbar} from 'react-bootstrap';
//import {Link} from "react-router-dom";

const Navigation = () => {

    return (
        <Navbar className="navigation-bar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        </Navbar>
	)
}

export default Navigation;