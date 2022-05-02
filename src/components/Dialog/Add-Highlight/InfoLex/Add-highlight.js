import * as React from 'react';
import {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import {setGlobalState} from "../../../../StateAuth";
import ReactHtmlParser from "react-html-parser";
import {updatedInfoLex} from "../../../../Services/InfoLex/InfoLex-services";
import "./Add-highlight.css"
//Question name, Question title, Answer title
export default function AddHighlight({isDialogOpened, handleCloseDialog, question_name, question_title, answer_title, id}){
    const [questionName, setQuestionName] = useState(question_name)
    const [questionTitle, setQuestionTitle] = useState(question_title)
    const [answerTitle, setAnswerTitle] = useState(answer_title)

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

    function questionNameSelected(){

        if (questionNameMouseUp()){
            var questionNameHighlight = getInnerHtml(questionName).replace(
                questionNameMouseUp(),
                "<span class='highlight'>" + questionNameMouseUp() + "</span>")

            const text = ReactHtmlParser(questionName)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    questionNameHighlight = questionNameHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setQuestionName(questionNameHighlight)
        }


        if (questionNameHighlight){
            console.log(questionNameHighlight)
            var toJson = {question_name: questionNameHighlight}
            updatedInfoLex(toJson, id)
            handleOpen()
            setGlobalState("refreshInfoLex", true)
            setGlobalState("showSnackBar", true)
        }else {
            alert("Please highlight the text!")
        }

    }

    function questionTitleSelected(){

        if (questionTitleMouseUp()){
            var questionTitleHighlight = getInnerHtml(questionTitle).replace(
                questionTitleMouseUp(),
                "<span class='highlight'>" + questionTitleMouseUp() + "</span>")

            const text = ReactHtmlParser(questionTitle)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    questionTitleHighlight = questionTitleHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setQuestionTitle(questionTitleHighlight)
        }


        if (questionTitleHighlight){
            console.log(questionTitleHighlight)
            var toJson = {question_title: questionTitleHighlight}
            updatedInfoLex(toJson, id)
            handleOpen()

            setGlobalState("refreshVastused", true)
            setGlobalState("showSnackBar", true)
        }else {
            alert("Please highlight the text!")
        }

    }

    function answerTitleSelected(){

        if (answerTitleMouseUp()){
            var answerTitleHighlight = getInnerHtml(answerTitle).replace(
                answerTitleMouseUp(),
                "<span class='highlight'>" + answerTitleMouseUp() + "</span>")

            const text = ReactHtmlParser(answerTitle)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
                    answerTitleHighlight = answerTitleHighlight.replace(text[i].props.children[0], "<span class='highlight'>" + text[i].props.children[0] + "</span>")
                }
            }
            setAnswerTitle(answerTitleHighlight)
        }


        if (answerTitleHighlight){
            console.log(answerTitleHighlight)
            var toJson = {answer_title: answerTitleHighlight}
            updatedInfoLex(toJson, id)
            handleOpen()

            setGlobalState("refreshVastused", true)
            setGlobalState("showSnackBar", true)
        }else {
            alert("Please highlight the text!")
        }

    }




    useEffect(() => {
        setQuestionName(question_name)
        setQuestionTitle(question_title)
        setAnswerTitle(answer_title)

    }, [question_name, question_title, answer_title])

    const noop = (e) => {
        e.preventDefault();
        return false;
    };

    const questionNameMouseUp = () =>  {
        return window.getSelection().toString()
    }

    const questionTitleMouseUp = () =>  {
        return window.getSelection().toString()
    }

    const answerTitleMouseUp = () =>  {
        return window.getSelection().toString()
    }

    return (
        <Dialog open={isDialogOpened} onClose={handleClose} >
            <DialogTitle>LexInfo id:{id}</DialogTitle>
            <DialogContent>
                <div style={{marginTop: "15px"}}>
                    <label htmlFor="questionName">Question name</label>
                    <div id="questionName" contentEditable="true" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: questionName.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUpCapture={questionNameMouseUp}
                    >
                    </div>
                </div>

                <Button variant="contained" className="add-highlight" onClick={() => questionNameSelected()}>Question name highlight</Button>

                <div style={{marginTop: "40px"}}>
                    <label htmlFor="questionTitle">Question title</label>
                    <div id="questionTitle" contentEditable="true" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: questionTitle.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUpCapture={questionTitleMouseUp}
                    >
                    </div>
                </div>

                <Button variant="contained" className="add-highlight" onClick={() => questionTitleSelected()}>Question description highlight</Button>


                <div style={{marginTop: "40px"}}>
                    <label htmlFor="answerTitle">Answer title</label>
                    <div id="answerTitle" contentEditable="true" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: answerTitle.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUpCapture={answerTitleMouseUp}
                    >
                    </div>
                </div>

                <Button variant="contained" className="add-highlight" onClick={() => answerTitleSelected()}>Answer description highlight</Button>

            </DialogContent>
        </Dialog>
    )

}