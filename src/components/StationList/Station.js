import React, {useState, useEffect} from "react";
import {Row, Col} from 'react-bootstrap';
import { TextField, Button, MenuItem } from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import axios from "axios";

import StationForm from "./StationForm";
import './Station.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const serverUrl = process.env.REACT_APP_API_PATH;

const Station = () => {

    const [stationList, setStationList] = useState([]);
    const [station, setStation] = useState(1);
    const [stationDet, setStationDet] = useState({});

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const admin = window.location.pathname.includes('admin') === true
    
    const getStationList = ()=>{
        setLoading(true);
        axios.get(`${serverUrl}/station/`).then((response)=>{
            console.log(response);
            setLoading(false);
            let stationsJson = response.data.result;
            setStationList(stationsJson);
            if(stationsJson.length>0){      
                setStation(stationsJson[0].id);
                setStationDet(stationsJson[0]);
            }
        });
    }

    useEffect(()=>{
        getStationList();

    },[])

    const handleChange = (event)=>{
        let id = event.target.value;
        console.log(id);
        let st = stationList.find((st)=>st.id===id);
        setStation(st.id);
        setStationDet(st);
    }

    const handleAdd = () => {
        setOpen(true);
        setEdit(false);
    }
    const handleClose = () => setOpen(false);
    const handleEdit = () => {
        setOpen(true);
        setEdit(true);
    };

    if(loading){
        return (<>Loading...</>)
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
                    <Button variant="contained" onClick={handleAdd}>Add</Button> &nbsp;
                    <Button variant="contained" onClick={handleEdit}>Edit</Button>
                </div>
            }

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              { edit && <h4>Edit Station</h4>}
              { !edit && <h4>Add Station</h4>}
              <Box sx={{ mt: 1 }}>
                <StationForm handleClose={handleClose} edit={edit} stationDet={stationDet} getStationList={getStationList} />
              </Box>
            </Box>
          </Modal>
        </div>
    )
}

export default Station;