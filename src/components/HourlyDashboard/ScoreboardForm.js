import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
const serverUrl = process.env.REACT_APP_API_PATH;

const station_id = localStorage.getItem('selected_station');

export default function ScoreboardForm({ handleClose, edit, scoreboardDet, getHourlyScoreboard, date }) {
  const [time, setTime] = useState("");
  const [actual, setActual] = useState(0);
  const [target, setTarget] = useState(0);

  useEffect(()=>{
    if(edit){
      setTime(scoreboardDet.time);
      setActual(scoreboardDet.actual);
      setActual(scoreboardDet.target);
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(time);
    console.log(actual);
    console.log(target);
    if(!edit){
        axios.post(`${serverUrl}/scoreboard/`, {
            time,actual,target,business_date:date,station_id
        })
        .then(function (response) {
            toast.success("Successfully added Station");
            getHourlyScoreboard();
            handleClose();
        })
        .catch(function (error) {
            toast.error("Error");
            console.log(error);
            handleClose();
        });
    }

    else{
        axios.put(`${serverUrl}/scoreboard/${scoreboardDet.station_id}`, {
            actual: actual,
            target: target,
            time: time
        })
        .then(function (response) {
            toast.success("Successfully Updated Station");
            getHourlyScoreboard();
            handleClose();
        })
        .catch(function (error) {
            toast.error("Error");
            console.log(error);
            handleClose();
        });

    }
  };
  return (
    <form onSubmit={handleSubmit}>

      <TextField
        margin="normal"
        required
        fullWidth
        id="time"
        label="Time"
        name="time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="actual"
        label="Actual"
        name="actual"
        value={actual}
        onChange={(event) => setActual(event.target.value)}
      />


      <TextField
        margin="normal"
        required
        fullWidth
        id="target"
        label="Target"
        name="target"
        value={target}
        onChange={(event) => setTarget(event.target.value)}
      />
      

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </form>
  );
}
