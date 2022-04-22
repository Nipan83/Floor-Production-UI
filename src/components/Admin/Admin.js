import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import './Admin.css'

const Admin = () => {

    return (
        <div>
            <Row className="justify-content-around">
                <Col sm={4} className="panel left-panel">
                    <div>LEFT</div>
                </Col>
                <Col sm={4} className="panel mid-panel">
                    <div>MID</div>
                </Col> 
                <Col sm={4} className="panel right-panel">
                    <div>RIGHT</div>
                </Col>  
            </Row>
        </div>
    )
}

export default Admin;