import React, {useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";


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


const Alert = ({message,handleAlertSubmit,handleAlertClose}) => {

    const [open, setOpen] = useState(true);

    const handleClose = ()=>{
        setOpen(false);
        handleAlertClose();
    }

    const handleProceed = ()=>{
        setOpen(false);
        handleAlertSubmit();
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h4>Alert!</h4>


                  <Box sx={{ mt: 1 }}>
                    <h6>{message}</h6>
                    <Button variant="contained" onClick={handleProceed}>Proceed</Button>
                  </Box>
                </Box>
              </Modal>
        </div>
    )
}

export default Alert;