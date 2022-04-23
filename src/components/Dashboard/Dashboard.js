import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import HourlyDashboard from './HourlyDashboard/HourlyDashboard.js'
import Station from './StationList/Station.js'
import './Dashboard.css'

const Dashboard = () => {

    return (
        <div>
            <Row className="justify-content-around">
                <Col sm={4} className="panel left-panel">
                    <div>
                        <Station></Station>
                    </div>
                </Col>
                <Col sm={4} className="panel mid-panel">
                    <div>MID</div>
                </Col> 
                <Col sm={4} className="panel right-panel">
                    <div>
                        <HourlyDashboard></HourlyDashboard>
                    </div>
                </Col>  
            </Row>
        </div>
    )
}

export default Dashboard;