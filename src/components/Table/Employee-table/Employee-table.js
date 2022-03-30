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
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import AddEmployee from "../../Dialog/Add-Employee/Add-employee";
import {getEmployee} from "../../../Services/Employee/Employee-services";
import "./Employee-table.css"
import EditEmployee from "../../Dialog/Edit-employee/Edit-employee";
import DeleteEmployee from "../../Dialog/Delete-employee/Delete-employee";
import SnackBar from "../../Snackbar/Snackbar";




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

    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [data, setData] = useState([])
    const [refreshEmployee] = useGlobalState("refreshEmployee")

    const [id, setId] = useState("")
    const [fistName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")

    const [createdAt, setCreatedAt] = useState("")
    const [updatedAt, setUpdatedAt] = useState("")
    const [openSnackBar] = useGlobalState("showSnackBar")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenEdit = (id, first_name, last_name, location, birthday, email, telephone) => {
        setId(id)
        setFistName(first_name)
        setLastName(last_name)
        setLocation(location)
        setBirthday(birthday)
        setEmail(email)
        setTelephone(telephone)

        setIsOpenEdit(!isOpenEdit)
    }
    const handleOpenDelete = (id, first_name, last_name, location, birthday, email, telephone, created_at, updated_at) => {
        setId(id)
        setFistName(first_name)
        setLastName(last_name)
        setLocation(location)
        setBirthday(birthday)
        setEmail(email)
        setTelephone(telephone)
        setCreatedAt(created_at)
        setUpdatedAt(updated_at)

        setIsOpenDelete(!isOpenEdit)
    }

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


        getEmployee().then(res => {
            console.log(res.status)
            setData(res.data);
        })

    },[])
    useEffect(() => {
        if (refreshEmployee){
            getEmployee().then(res => {
                setData(res.data);
                setGlobalState("refreshEmployee", false)
            })
        }
    })

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden'}}>
            <AddEmployee
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
            />
            <EditEmployee
                isDialogOpened={isOpenEdit}
                handleCloseDialog={() => setIsOpenEdit(false)}
                id={id}
                first_name={fistName}
                last_name={lastName}
                _location={location}
                _birthday={birthday}
                _telephone={telephone}
                _email={email}

            />

            <DeleteEmployee
                isDialogOpened={isOpenDelete}
                handleCloseDialog={() => setIsOpenDelete(false)}
                id={id}
                first_name={fistName}
                last_name={lastName}
                location={location}
                birthday={birthday}
                telephone={telephone}
                email={email}
                created_at={createdAt}
                updated_at={updatedAt}
            />

            <SnackBar
                isSnackbarOpened={openSnackBar}
                handleCloseSnackbar={() => setGlobalState("showSnackBar", false)}
                message="Data was successful updated"
            />

            <TableContainer>
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
                                            <EditRoundedIcon className="icon-button"
                                                             onClick={() =>
                                                                 handleOpenEdit(row.id, row.first_name,
                                                                     row.last_name, row.location,
                                                                     row.birthday,row.email,
                                                                     row.telephone)}
                                                             color="secondary"/>
                                            <DeleteIcon className="icon-button" onClick={() => handleOpenDelete(row.id, row.first_name,
                                                row.last_name, row.location,
                                                row.birthday,row.email,
                                                row.telephone, row.created_at, row.updated_at)} color="secondary"/>
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
