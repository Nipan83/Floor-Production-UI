import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import Paper from '@mui/material/Paper';

import HourlyDashboard from '../HourlyDashboard/HourlyDashboard.js'
import Station from '../StationList/Station.js'
import './Admin.css'

const Admin = () => {

    return (
        <div>
            <Row className="justify-content-around">
                <Col sm={4} className="panel left-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>
                        <Station></Station>
                    </Paper>
                </Col>
                <Col sm={4} className="panel mid-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>MID</Paper>
                </Col> 
                <Col sm={4} className="panel right-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>
                        <HourlyDashboard></HourlyDashboard>
                    </Paper>
                </Col>  
            </Row>
        </div>
    )
}

export default Admin;