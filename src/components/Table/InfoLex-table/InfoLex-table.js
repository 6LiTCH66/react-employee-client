import * as React from 'react';
import Button from "@mui/material/Button";
import SnackBar from "../../Snackbar/Snackbar";
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import {getInfoLex} from "../../../Services/InfoLex/InfoLex-services";

import AddHighlight from "../../Dialog/Add-Highlight/InfoLex/Add-highlight"
import "./InfoLex-table.css"

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User id' },
    { id: 'category_name', label: 'Category name' },
    { id: 'question_name', label: 'Question name' },
    { id: 'question_title', label: 'Question title' },
    { id: 'question_date', label: 'Question date' },
    { id: 'answer_title', label: 'Answer title' },
    { id: 'answer_date', label: 'Answer date'},
    {id: 'add_highlight', label: "Add highlight"}

];

export default function InfoLexTable(){

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [refreshInfoLex] = useGlobalState("refreshInfoLex")

    const [questionName, setQuestionName] = useState("")
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerTitle, setAnswerTitle] = useState("")
    const [id, setId] = useState("");
    const [openSnackBar] = useGlobalState("showSnackBar")


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = (question_name, question_title, answer_title, id) => {
        setIsOpen(!isOpen);
        setQuestionName(question_name)
        setQuestionTitle(question_title)
        setAnswerTitle(answer_title)
        setId(id)
    };

    const [state, setState] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchData = () => {
        getInfoLex().then(res => {
            getInfoLex().then(res => {
                setState(res.data)
            }).catch(err => {
                localStorage.removeItem("currentUser")
                localStorage.removeItem("initialTime")
            })
        })
    }

    useEffect(() => {
        if (localStorage.getItem("currentUser")){
            setGlobalState("isAuth", true)
        }else {
            setGlobalState("isAuth", false)
        }

        fetchData()

    }, [])

    useEffect(() => {
        if (refreshInfoLex){
            getInfoLex().then(res => {
                setState(res.data)
                setGlobalState("refreshInfoLex", false)
            })
        }
    })


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/*<Button variant="contained" style={{margin: "20px"}} color="success" onClick={start}>Start</Button>*/}
            {/*<Button variant="contained" style={{margin: "20px"}} color="error" onClick={stop}>Stop</Button>*/}
            <AddHighlight
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
                question_name={questionName}
                question_title={questionTitle}
                answer_title={answerTitle}
                id={id}

            />
            <SnackBar
                isSnackbarOpened={openSnackBar}
                handleCloseSnackbar={() => setGlobalState("showSnackBar", false)}
                message="Data was successful highlighted"
            />

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>

                                    <TableCell align="left">{row.user_id}</TableCell>
                                    <TableCell align="left">{row.category_name}</TableCell>
                                    <TableCell align="left" dangerouslySetInnerHTML={{__html: row.question_name}}/>
                                    <TableCell align="left" dangerouslySetInnerHTML={{__html: row.question_title}}/>

                                    <TableCell align="left">{row.question_date}</TableCell>
                                    <TableCell align="left" dangerouslySetInnerHTML={{__html: row.answer_title}}/>
                                    <TableCell align="left">{row.answer_date}</TableCell>
                                    {/*<TableCell align="left">{row.source}</TableCell>*/}

                                    <TableCell align="left">
                                        <EditRoundedIcon onClick={() =>
                                            handleOpen(row.question_name, row.question_title, row.answer_title, row.id)}
                                                         className="edit-button" color="secondary"/>
                                    </TableCell>


                                </TableRow>

                            ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={state.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )

}