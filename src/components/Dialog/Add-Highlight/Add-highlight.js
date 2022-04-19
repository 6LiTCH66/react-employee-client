import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState, useRef, useEffect} from "react";
import SnackBar from "../../Snackbar/Snackbar";
import {updateVastused} from "../../../Services/Vastused/Vastused-services";
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import ReactHtmlParser from 'react-html-parser';

import "./Add-highlight.css"

export default function AddHighlight({ isDialogOpened, handleCloseDialog, question_title, question_description, answer_description, id  }) {
    const [questionTitle, setQuestionTitle] = useState(question_title)
    const [questionDescription, setQuestionDescription] = useState(question_description)
    const [answerDescription, setAnswerDescription] = useState(answer_description)
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

        if (end > 0){
            var questionTitHighlight = questionRef.current.value.replace(
                questionRef.current.value.substr(start, end - start),
                "<span class='highlight'>"
                + questionRef.current.value.substr(start, end - start) + "</span>")


            const text = ReactHtmlParser(questionTitle)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    console.log(text[i].props.children)
                    questionTitHighlight = questionTitHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setQuestionTitle(questionTitHighlight)
        }

        if (questionTitHighlight){
            var toJson = {question_title: questionTitHighlight}
            updateVastused(toJson, id)
            handleOpen()

            setGlobalState("refreshVastused", true)
            setGlobalState("showSnackBar", true)
        }else {
            alert("Please highlight the text!")
        }

    }



    function questionDescriptionSelected(){

        const start = questionDesRef.current.selectionStart;
        const end = questionDesRef.current.selectionEnd;

        if (end > 0){
            var questionDescHighlight = questionDesRef.current.value.replace(
                questionDesRef.current.value.substr(start, end - start),
                "<span class='highlight'>"
                + questionDesRef.current.value.substr(start, end - start) + "</span>")

            const text = ReactHtmlParser(questionDescription)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    console.log(text[i].props.children)
                    questionDescHighlight = questionDescHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setQuestionDescription(questionDescHighlight)
        }


        if (questionDescHighlight){
            var toJson = {question_description: questionDescHighlight}
            updateVastused(toJson, id)
            handleOpen()
            setGlobalState("refreshVastused", true)
            setGlobalState("showSnackBar", true)
        }
        else {
            alert("Please highlight the text!")
        }


    }


    function answerDescriptionSelected() {
        const start = answerRef.current.selectionStart;
        const end = answerRef.current.selectionEnd;

        if (end > 0){
            var answerDescHighlight = answerRef.current.value.replace(
                answerRef.current.value.substr(start, end - start),
                "<span class='highlight'>"
                + answerRef.current.value.substr(start, end - start) + "</span>")

            const text = ReactHtmlParser(answerDescription)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    console.log(text[i].props.children)
                    answerDescHighlight = answerDescHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setAnswerDescription(answerDescHighlight)
        }


        if (answerDescHighlight){
            var toJson = {answer_description: answerDescHighlight}
            updateVastused(toJson, id)

            handleOpen()
            setGlobalState("refreshVastused", true)
            setGlobalState("showSnackBar", true)
        }
        else {
            alert("Please highlight the text!")
        }

    }
    useEffect(() => {
        setQuestionTitle(question_title)
        setQuestionDescription(question_description)
        setAnswerDescription(answer_description)
        console.log(question_title)

    }, [question_title, question_description, answer_description])



    return (
        <Dialog open={isDialogOpened} onClose={handleClose} >
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
                    defaultValue={getInnerHtml(questionTitle)}
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
                    defaultValue={getInnerHtml(questionDescription)}
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
                    defaultValue={getInnerHtml(answerDescription)}
                    inputRef={answerRef}
                />
                <Button variant="contained" className="add-highlight" onClick={() => answerDescriptionSelected()}>Answer description highlight</Button>


            </DialogContent>
        </Dialog>
    );
}
