import React, {useState, useEffect} from "react";
import {Row, Col} from 'react-bootstrap';
import './Station.css';
import { TextField, Button, MenuItem } from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Station = () => {

    const stationsJson = [
        {
            'id':1,
            'name': 'Station 1',
            'state': 'In Use',
            'description': 'Station 1 Description. Located in XYZ'
        },
        {
            'id':2,
            'name': 'Station 2',
            'state': 'Idle',
            'description': 'Station 2 Description. Located in XYZ'

        },
        {
            'id':3,
            'name': 'Station 3',
            'state': 'In Use',
            'description': 'Station 3 Description. Located in XYZ'
        },
        {
            'id':4,
            'name': 'Station 4',
            'state': 'In Use',
            'description': 'Station 4 Description. Located in XYZ'
        }
    ]

    const [stationList, setStationList] = useState([]);
    const [station, setStation] = useState(1);
    const [stationDet, setStationDet] = useState({});
    const admin = true;

    useEffect(()=>{
        setStationList(stationsJson);
        if(stationsJson.length>0){      
            setStation(stationsJson[0].id);
            setStationDet(stationsJson[0]);
        }
        
    },[])

    const handleChange = (event)=>{
        let id = event.target.value;
        console.log(id);
        let st = stationList.find((st)=>st.id===id);
        setStation(st.id);
        setStationDet(st);
    }

    return (
        <div>
            { stationList.length == 0 && 
                <div className="blue italic">No Stations Added.</div>
            }
            { stationList.length>0 && 
            <>
                <div>
                    <TextField
                        fullWidth
                        select
                        margin="normal"
                        label="Select Station"
                        value={station}
                        onChange={handleChange}
                      >
                        {stationList.map((station) => (
                          <MenuItem key={station.id} value={station.id}>
                            {station.name}
                          </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="station-details">
                    <h3 className="bold">{stationDet.name}</h3>
                    State: &nbsp;
                    { stationDet.state === "In Use" &&  
                    <><span className="blue">{stationDet.state}</span>&nbsp;
                    <AutoGraphIcon className="blue" /></>}

                    { stationDet.state === "Idle" &&  
                    <><span className="red">{stationDet.state}</span>&nbsp;
                    <ErrorOutlineIcon className="red" /></>}
                    <br/>

                    <div className="station-desciption mt-4">
                        {stationDet.description}
                    </div>
                </div>
            </>
            }

            {admin && 
                <div className="mt-2">
                    <Button variant="contained">Add</Button> &nbsp;
                    <Button variant="contained">Edit</Button>
                </div>
            }
        </div>
    )
}

export default Station;