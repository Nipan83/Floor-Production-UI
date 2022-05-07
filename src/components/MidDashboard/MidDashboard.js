import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import './MidDashboard.css'

const MidDashboard = ({rows}) => {

    return (
        <div>
            <div className="flex">
                <div className="actual-count">MID</div>
                <div className="actual-count">MID</div>
            </div>
        </div>
    )
}

export default MidDashboard;