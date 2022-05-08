import React, {useState, useEffect} from "react";
import {Button, Row, Col} from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import './MidDashboard.css'

import TableLoader from '../Util/TableLoader';
import Chart from '../Util/Chart.js';

const MidDashboard = ({rows}) => {

    const [loading, setLoading] = useState(true);
    const [scoreboardDet, setScoreboardDet] = useState(rows);
    const [actual, setActual] = useState(0);
    const [target, setTarget] = useState(0);
    const [chartTitle, setChartTitle] = useState("Scoreboard Chart");
    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            let ac = 0;
            let tg = 0;
            let time = [];
            let actual_dt = [];
            let target_dt = [];
            for(let i=0;i<rows.length;i++){
                ac+=parseInt(rows[i].actual);
                tg+=parseInt(rows[i].target);
                time.push(rows[i].time);
                actual_dt.push(parseInt(rows[i].actual));
                target_dt.push(parseInt(rows[i].target));
            }
            
            let obj = {
                labels:time, 
                datasets: [{label: 'Actual', data: actual_dt, backgroundColor: 'blue'},{label:'Target', data: target_dt, backgroundColor: 'green'}]
            };

            setActual(ac);
            setTarget(tg);
            setChartData(obj);
            setChartLabels(time);
            setLoading(false);

        },1000)
    },[rows])

    if(loading === true) {
        return (<TableLoader/>)
    }

    if(rows.length === 0){
        return (<div className="blue italic">Dashboard Details Can't be generated.</div>)
    }
    return (
        <div>
            <div className="flex mb-4">
                <div className="block target-count blue">ACTUAL: &nbsp;{actual}</div>
                <div className="block target-count blue">TARGET: &nbsp;{target}</div>
                <div className="block-red target-count red">PENDING: &nbsp;{target-actual}</div>
            </div>

            <div className="chart">
                <Chart data={chartData} title={chartTitle} />
            </div>
            
        </div>
    )
}

export default MidDashboard;