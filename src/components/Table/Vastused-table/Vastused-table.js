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
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import AddHighlight from "../../Dialog/Add-Highlight/Add-highlight";

import "./Vastused-table.css"
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import {getVastused} from "../../../Services/Vastused/Vastused-services";

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User id' },
    { id: 'category_name', label: 'Category name' },
    { id: 'sub_category_name', label: 'Sub category name' },
    { id: 'question_title', label: 'Question title' },
    { id: 'question_description', label: 'Question description' },
    { id: 'question_date', label: 'Question date' },
    { id: 'answer_title', label: 'Answer title'},
    { id: 'answer_description', label: 'Answer description' },
    { id: 'source', label: 'Source' },
    {id: 'add_highlight', label: "Add highlight"}

];


export default function VastusedTable() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [cleanupFunction, setCleanupFunction] = useState(false)

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");
    const [answerDescription, setAnswerDescription] = useState("");
    const [id, setId] = useState("");
    const [refreshVastused] = useGlobalState("refreshVastused")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [state, setState] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (question_title, question_description, answer_description, id) => {
        setIsOpen(!isOpen);
        setQuestionTitle(question_title)
        setQuestionDescription(question_description)
        setAnswerDescription(answer_description)
        setId(id)
    };

    const fetchData = () => {
        getVastused().then(res => {
            setState(res.data)
        }).catch(err => {
            console.log(err)
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

    useEffect(() =>{
        if (refreshVastused){
            getVastused().then(res => {
                setState(res.data)
                setGlobalState("refreshVastused", false)
            })
        }
    })

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AddHighlight
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
                question_title={questionTitle}
                question_description={questionDescription}
                answer_description={answerDescription}
                id={id}
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
                                <TableCell align="left">{row.sub_category_name}</TableCell>
                                <TableCell align="left" dangerouslySetInnerHTML={{__html: row.question_title}}/>

                                <TableCell align="left" dangerouslySetInnerHTML={{__html: row.question_description}}/>
                                <TableCell align="left">{row.question_date}</TableCell>
                                <TableCell align="left">{JSON.stringify(row.answer_title, null, 2)}</TableCell>
                                <TableCell align="left" dangerouslySetInnerHTML={{__html: row.answer_description}}/>
                                <TableCell align="left">{row.source}</TableCell>

                                <TableCell align="left">
                                    <EditRoundedIcon onClick={() =>
                                        handleOpen(row.question_title, row.question_description, row.answer_description, row.id)}
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

    );
}
