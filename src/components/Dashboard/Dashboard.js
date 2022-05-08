import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import Paper from '@mui/material/Paper';

import HourlyDashboard from '../HourlyDashboard/HourlyDashboard.js'
import MidDashboard from '../MidDashboard/MidDashboard.js'
import Station from '../StationList/Station.js'
import './Dashboard.css'

const Dashboard = () => {

    const [selectedStationId, setSelectedStationId] = useState(1); //check what to give as initial state, null or some other integer
    const [rows, setRows] = useState([]);

    return (
        <div>
            <Row className="justify-content-around">
                <Col sm={3} className="panel left-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>
                        <Station station={selectedStationId} setStation={setSelectedStationId}></Station>
                    </Paper>
                </Col>
                <Col sm={5} className="panel mid-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>
                        <MidDashboard station={selectedStationId} rows={rows}></MidDashboard>
                    </Paper>
                </Col> 
                <Col sm={4} className="panel right-panel">
                    <Paper sx={{height: '100%', padding: '20px'}}>
                        <HourlyDashboard setScoreboard={setRows} selectedStationId={selectedStationId} setSelectedStationId={setSelectedStationId}></HourlyDashboard>
                    </Paper>
                </Col>  
            </Row>
        </div>
    )
}

export default Dashboard;