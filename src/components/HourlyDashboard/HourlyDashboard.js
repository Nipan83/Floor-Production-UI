import React, {useEffect,useState} from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";

import { Button } from "@mui/material";
import TableLoader from '../Util/TableLoader';
import Alert from "../Util/Alert";
import ScoreboardForm from "./ScoreboardForm";

import './HourlyDashboard.css';

const serverUrl = process.env.REACT_APP_API_PATH;

const selected_station_id = localStorage.getItem('selected_station');

const admin = window.location.pathname.includes('admin') === true;

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



const HourlyDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [edit, setEdit] = useState(false);
    const [date, setDate] = useState("");
    const [scoreboardDet, setScoreboardDet] = useState({});

    const getHourlyScoreboard = ()=>{
        setLoading(true);
        axios.get(`${serverUrl}/scoreboard/${selected_station_id}`).then((response)=>{
            console.log(response);
            setLoading(false);

            response = response.data.result;

            if(response.length === 0) return;
            setColumns(Object.keys(response[0]))
            setRows(response);

        })
    }

    useEffect(()=>{
        getHourlyScoreboard();
    },[])
    

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAdd = () => {
        setOpen(true);
        setEdit(false);
    }
    const handleClose = () => setOpen(false);
    const handleEdit = () => {
        setOpen(true);
        setEdit(true);
    };

    const handleDelete = () => {
        setAlertOpen(true);
        setAlertMessage("Are you sure to delete the selected record?");
    }

    const handleAlertClose = ()=>{
        setAlertOpen(false);
    }

    const handleAlertSubmit = ()=>{
    setAlertOpen(false);
    let id = scoreboardDet.id;
    axios.delete(`${serverUrl}/scoreboard/${id}`).then((response)=>{
        console.log(response);
        toast.success("Successfully deleted Scoreboard record");
        getHourlyScoreboard();
    });

    }

    if(loading){
        return (<TableLoader/>)
    }


    if(rows.length === 0){
        return (
            <>
                <div className="blue italic">No Hourly Scoreboard Data Found.</div>
                {admin && 
                <div className="mt-4">
                    <Button variant="contained" onClick={handleAdd}>Add</Button> &nbsp;
                </div>
                }

                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  { edit && <h4>Edit Scoreboard Data</h4>}
                  { !edit && <h4>Add Scoreboard Data</h4>}
                  <Box sx={{ mt: 1 }}>
                    <ScoreboardForm handleClose={handleClose} date={date} edit={edit} scoreboardDet={scoreboardDet} getHourlyScoreboard={getHourlyScoreboard} />
                  </Box>
                </Box>
              </Modal>

              {alertOpen && <Alert message={alertMessage} handleAlertSubmit={handleAlertSubmit} handleAlertClose={handleAlertClose}/>}

            </>
        )
    }

    return (
    <div>
        <div sx={{width: '100%', overflow: 'hidden', paddingTop: '10px'}}>
            <h5 className="hourly-scoreboard-header">HOURLY SCORECARD</h5>
            <TableContainer sx={{maxHeight: '58vh'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (<TableCell
                                key={column}
                            >
                                {column}
                            </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column];
                                        return (<TableCell key={column}>
                                            {value}
                                        </TableCell>);
                                    })}
                                </TableRow>);
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="hourly-scoreboard-table-pagination small"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>

        {admin && 
            <div className="mt-2">
                <Button variant="contained" onClick={handleAdd}>Add</Button> &nbsp;
                <Button variant="contained" onClick={handleEdit}>Edit</Button> &nbsp;
                <Button variant="contained" style={{color: 'white',backgroundColor:'red'}} onClick={handleDelete}><DeleteIcon/></Button> &nbsp;
            </div>
        }

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              { edit && <h4>Edit Scoreboard Data</h4>}
              { !edit && <h4>Add Scoreboard Data</h4>}
              <Box sx={{ mt: 1 }}>
                <ScoreboardForm handleClose={handleClose} date={date} edit={edit} scoreboardDet={scoreboardDet} getHourlyScoreboard={getHourlyScoreboard} />
              </Box>
            </Box>
          </Modal>

          {alertOpen && <Alert message={alertMessage} handleAlertSubmit={handleAlertSubmit} handleAlertClose={handleAlertClose}/>}

    </div>)
}

export default HourlyDashboard;