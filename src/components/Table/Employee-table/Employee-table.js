import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {setGlobalState} from "../../../StateAuth";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import AddEmployee from "../../Dialog/Add-Employee/Add-employee";
import "./Employee-table.css"




export default function EmployeeTable() {
    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'first_name', label: 'First name' },
        { id: 'last_name', label: 'Last name' },
        { id: 'location', label: 'Location' },
        { id: 'birthday', label: 'Birthday' },
        { id: 'email', label: 'Email' },
        { id: 'telephone', label: 'Telephone' },
        { id: 'created_at', label: 'Created at' },
        { id: 'updated_at', label: 'Updated at'},
        {id: 'actions', label: <AddIcon color="secondary" className="icon-button" onClick={() => handleOpen()}/> }

    ];
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleOpen = () => {
        setIsOpen(!isOpen);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (localStorage.getItem("currentUser")){
            setGlobalState("isAuth", true)
        }else {
            setGlobalState("isAuth", false)
        }

        let cleanupFunction = false;

        axios.get("https://employee-webserver.herokuapp.com/api/employee/",
            {withCredentials: true})
            .then(res => {
                console.log(res.status)
                setData(res.data);

                //console.log(res.data)
        })
        return () => cleanupFunction = true;
    },[])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AddEmployee
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
            />
            <TableContainer sx={{ maxHeight: 440 }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.first_name}</TableCell>

                                    <TableCell align="left">{row.last_name}</TableCell>
                                    <TableCell align="left">{row.location}</TableCell>
                                    <TableCell align="left">{row.birthday}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.telephone}</TableCell>
                                    <TableCell align="left">{row.created_at}</TableCell>
                                    <TableCell align="left">{row.updated_at}</TableCell>
                                    <TableCell align="left">
                                        <Box sx={{ display: 'flex' }}>
                                            <EditRoundedIcon className="icon-button" onClick={() => alert("test")} color="secondary"/>
                                            <DeleteIcon className="icon-button" onClick={() => alert("test")} color="secondary"/>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
