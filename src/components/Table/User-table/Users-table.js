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
import {getUsers} from "../../../Services/Users/Users-services";

const columns = [
    { id: 'user_id', label: 'User id'},
    { id: 'login_at', label: 'Login at'},
    { id: 'logout_at', label: 'Logout at'},
    { id: 'ip', label: 'Ip'},
    { id: 'agent', label: 'Agent'},
    { id: 'online', label: 'Online'},
];



export default function UsersTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

        getUsers().then(res => {
            setUsers(res.data)
        }).catch(err => {
            localStorage.removeItem("currentUser")
            localStorage.removeItem("initialTime")
        })


    }, [])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow key={row.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.user_id}
                                        </TableCell>
                                        <TableCell align="left">{row.login_at}</TableCell>
                                        <TableCell align="left">{row.logout_at}</TableCell>
                                        <TableCell align="left">{row.ip}</TableCell>
                                        <TableCell align="left">{row.agent}</TableCell>
                                        <TableCell align="left">{row.isOnline ? "True" : "False"}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
