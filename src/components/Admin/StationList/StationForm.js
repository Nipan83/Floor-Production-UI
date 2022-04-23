import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
const serverUrl = process.env.REACT_APP_API_PATH;

export default function StationForm({ handleClose, edit, stationDet, getStationList }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("In Use");
  const states = ["In Use","Idle"]

  useEffect(()=>{
    if(edit){
      setName(stationDet.name);
      setDescription(stationDet.description);
      setState(stationDet.state);
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(description);
    console.log(state);
    if(!edit){
        axios.post(`${serverUrl}/station/`, {
            name: name,
            description: description,
            state: state
        })
        .then(function (response) {
            toast.success("Successfully added Station");
            getStationList();
            handleClose();
        })
        .catch(function (error) {
            toast.error("Error");
            console.log(error);
            handleClose();
        });
    }

    else{
        axios.put(`${serverUrl}/station/${stationDet.id}`, {
            name: name,
            description: description,
            state: state
        })
        .then(function (response) {
            toast.success("Successfully Updated Station");
            getStationList();
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
        id="name"
        label="Station Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        fullWidth
        select
        margin="normal"
        label="Select State"
        value={state}
        onChange={(event) => setState(event.target.value)}
      >
        {states.map((st) => (
          <MenuItem key={st} value={st}>
            {st}
          </MenuItem>
        ))}
    </TextField>

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
