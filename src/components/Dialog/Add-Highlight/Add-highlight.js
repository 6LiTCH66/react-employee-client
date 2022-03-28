import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState, useRef} from "react";
import SnackBar from "../../Snackbar/Snackbar";
import {updateVastused} from "../../../Services/Vastused/Vastused-services";

import "./Add-highlight.css"

export default function AddHighlight({ isDialogOpened, handleCloseDialog, question_title, question_description, answer_description, id  }) {

    const questionRef = useRef("")
    const questionDesRef = useRef("")
    const answerRef = useRef("")

    const handleClose = () => {
        handleCloseDialog(false)
    };
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    function getInnerHtml(val){
        return val.replace(/(<([^>]+)>)/ig,'')
    }

    function questionTitleSelected(){
        const start = questionRef.current.selectionStart;
        const end = questionRef.current.selectionEnd;
        const questionTitHighlight = questionRef.current.value.replace(
            questionRef.current.value.substr(start, end - start),
            "<span class='highlight'>"
            + questionRef.current.value.substr(start, end - start) + "</span>")

        if (questionTitHighlight){
            var toJson = {question_title: questionTitHighlight}
            updateVastused(toJson, id)
            handleOpen()
            handleCloseDialog(true)
        }else {
            alert("Please highlight the text!")
        }

    }



    function questionDescriptionSelected(){
        const start = questionDesRef.current.selectionStart;
        const end = questionDesRef.current.selectionEnd;
        const questionDescHighlight = questionDesRef.current.value.replace(
            questionDesRef.current.value.substr(start, end - start),
            "<span class='highlight'>"
            + questionDesRef.current.value.substr(start, end - start) + "</span>")

        if (questionDescHighlight){
            var toJson = {question_description: questionDescHighlight}
            updateVastused(toJson, id)

            handleOpen()
            handleCloseDialog(true)
        }
        else {
            alert("Please highlight the text!")
        }


    }


    function answerDescriptionSelected() {
        const start = answerRef.current.selectionStart;
        const end = answerRef.current.selectionEnd;
        const answerDescHighlight = answerRef.current.value.replace(
            answerRef.current.value.substr(start, end - start),
            "<span class='highlight'>"
            + answerRef.current.value.substr(start, end - start) + "</span>")


        if (answerDescHighlight){
            var toJson = {answer_description: answerDescHighlight}
            updateVastused(toJson, id)

            handleOpen()
            handleCloseDialog(true)
        }
        else {
            alert("Please highlight the text!")
        }

    }



    return (
        <Dialog open={isDialogOpened} onClose={handleClose} >
            {/*<SnackBar*/}
            {/*    isSnackbarOpened={isOpen}*/}
            {/*    handleCloseSnackbar={() => setIsOpen(false)}*/}
            {/*/>*/}
            <DialogTitle>Vastused id:{id}</DialogTitle>
            <DialogContent>
                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="Question title"
                    type="text"
                    fullWidth
                    multiline
                    inputProps={
                        { readOnly: true, }
                    }
                    defaultValue={getInnerHtml(question_title)}
                    inputRef={questionRef}


                />
                <Button variant="contained" className="add-highlight" onClick={() => questionTitleSelected()}>Question title highlight</Button>

                <TextField
                    autoFocus
                    inputProps={
                        { readOnly: true, }
                    }
                    margin="dense"
                    multiline
                    label="Question description"
                    type="text"
                    fullWidth
                    id="filled-multiline-static"
                    variant="filled"
                    defaultValue={getInnerHtml(question_description)}
                    inputRef={questionDesRef}
                />
                <Button variant="contained" className="add-highlight" onClick={() => questionDescriptionSelected()}>Question description highlight</Button>

                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    inputProps={
                        { readOnly: true, }
                    }
                    margin="dense"
                    multiline
                    label="Answer description"
                    type="text"
                    fullWidth
                    defaultValue={getInnerHtml(answer_description)}
                    inputRef={answerRef}
                />
                <Button variant="contained" className="add-highlight" onClick={() => answerDescriptionSelected()}>Answer description highlight</Button>


            </DialogContent>
        </Dialog>
    );
}