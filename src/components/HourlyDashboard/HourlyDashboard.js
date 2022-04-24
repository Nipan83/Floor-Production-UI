import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import hourlyScorecardData from "./hourlyScorecardData";
import './HourlyDashboard.css';


const HourlyDashboard = () => {

    const columns = hourlyScorecardData.columns;
    const rows = hourlyScorecardData.data;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (<div>
        <Paper sx={{width: '100%', overflow: 'hidden', paddingTop: '10px'}}>
            <h5 className="hourly-scoreboard-header">HOURLY SCORECARD</h5>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (<TableCell
                                key={column.id}
                                // align={column.align}
                                // style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (<TableRow hover role="checkbox" tabIndex={-1} key={row.expression}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (<TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>);
                                    })}
                                </TableRow>);
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="hourly-scoreboard-table-pagination"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </div>)
}

export default HourlyDashboard;