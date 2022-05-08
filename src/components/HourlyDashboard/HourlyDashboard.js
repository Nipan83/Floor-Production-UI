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
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";

import { Button, TextField } from "@mui/material";
import TableLoader from '../Util/TableLoader';
import Alert from "../Util/Alert";
import ScoreboardForm from "./ScoreboardForm";

import './HourlyDashboard.css';

const serverUrl = process.env.REACT_APP_API_PATH;

// const selected_station_id = localStorage.getItem('selected_station'); // now selectedStationId is being sent as a prop

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



const HourlyDashboard = ({selectedStationId, setScoreboard}) => {

    console.log(`Hourly dashboard rendered: stationId ${selectedStationId}`)

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [frows, setFrows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fcolumns, setFcolumns] = useState([]);

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [edit, setEdit] = useState(false);
    const [scoreboardDet, setScoreboardDet] = useState({});
    const [date, setDate] = useState("");
    const [disabledColumns,setDisabledColumns] = useState(['id','station_id','createdAt','updatedAt','business_date'])

    const formatBusinessDate = ()=>{
        let bd = new Date();
        let y = `${bd.getFullYear()}`;
        let m = `${bd.getMonth()+1}`;
        m = m<10?`0${m}`:m;
        let d = `${bd.getDate()}`;
        d = d<10?`0${d}`:d;
        setDate(`${y}-${m}-${d}`)
    }

    const getHourlyScoreboard = ()=>{
        setLoading(true);
        setRows([]);
        setColumns([]);
        setFcolumns([]);
        axios.get(`${serverUrl}/scoreboard/${selectedStationId}/${date}`).then((response)=>{
            console.log(response);
            setLoading(false);

            response = response.data.result;

            setScoreboard(response);

            if(response.length === 0) return;
            setColumns(Object.keys(response[0]))
            setRows(response);

            let fc = Object.keys(response[0]).filter((x)=>disabledColumns.indexOf(x)<0);
            console.log(fc)
            setFcolumns(fc);

        })
    }

    useEffect(()=>{
        getHourlyScoreboard();
    },[date,selectedStationId])

    useEffect(()=>{
        formatBusinessDate();
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

    const handleDelete = (e,row) => {
        setAlertOpen(true);
        setScoreboardDet(row);
        setAlertMessage("Are you sure to delete the selected record?");
    }

    const handleAlertClose = ()=>{
        setAlertOpen(false);
    }

    const setBusinessDate = (val) => {
        console.log(val);
        setDate(val);
    }

    const prepareRowId = (id)=>`sc-tr-${id}`

    const editRow = (e,row)=>{
        console.log(row);
        setScoreboardDet(row);
        handleEdit();
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
                
                <div>
                    <span className="hourly-scoreboard-header mt-2">HOURLY SCORECARD:&nbsp;</span> <input className="bd" type="date" name="date" value={date} onChange={e=>setBusinessDate(e.target.value)} placeholder="Business Date" />
                </div>

                <div className="blue italic mt-4">No Hourly Scoreboard Data Found.</div>
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
                    <ScoreboardForm handleClose={handleClose} date={date} edit={edit} scoreboardDet={scoreboardDet} 
                        getHourlyScoreboard={getHourlyScoreboard} selectedStationId={selectedStationId}/>
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
            <div>
                <span className="hourly-scoreboard-header mt-2">HOURLY SCORECARD:&nbsp;</span> <input className="bd" type="date" name="date" value={date} onChange={e=>setBusinessDate(e.target.value)} placeholder="Business Date" />
            </div>

            <TableContainer sx={{maxHeight: '55vh'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {fcolumns.map((column) => (<TableCell
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
                                return (<TableRow className="sc-tr"
                                hover role="checkbox" tabIndex={-1} id={prepareRowId(row.id)} key={row.id}>
                                    {fcolumns.map((column) => {
                                        const value = row[column];
                                        return (<TableCell key={column}>
                                            {value}
                                        </TableCell>);
                                    })}
                                    {admin && 
                                    <>
                                        <td className="blue" onClick={e=>editRow(e,row)}><EditIcon/></td>
                                        <td onClick={e=>handleDelete(e,row)} className="red"><DeleteIcon/></td>
                                    </>
                                    }
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
                <ScoreboardForm handleClose={handleClose} date={date} edit={edit} scoreboardDet={scoreboardDet} 
                    getHourlyScoreboard={getHourlyScoreboard} selectedStationId={selectedStationId} />
              </Box>
            </Box>
          </Modal>

          {alertOpen && <Alert message={alertMessage} handleAlertSubmit={handleAlertSubmit} handleAlertClose={handleAlertClose}/>}

    </div>)
}

export default HourlyDashboard;