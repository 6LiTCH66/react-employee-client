import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState, useRef, useEffect, createRef} from "react";
import SnackBar from "../../Snackbar/Snackbar";
import {updateVastused} from "../../../Services/Vastused/Vastused-services";
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';

import parse from "html-react-parser"

import Highlighter from "react-highlight-words";


import "./Add-highlight.css"

export default function AddHighlight({ isDialogOpened, handleCloseDialog, question_title, question_description, answer_description, id  }) {
    const [questionTitle, setQuestionTitle] = useState(question_title)
    const [questionDescription, setQuestionDescription] = useState(question_description)
    const [answerDescription, setAnswerDescription] = useState(answer_description)
    const [answerDescHighlighted, setAnswerDescHighlighted] = useState([""])


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

        if (questionMouseUp()){
            var questionTitHighlight = getInnerHtml(questionTitle).replace(
                questionMouseUp(),
                    "<span class='highlight'>" + questionMouseUp() + "</span>")

            const text = ReactHtmlParser(questionTitle)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
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

        if (questionDesMouseUp()){
            var questionDescHighlight = getInnerHtml(questionDescription).replace(
                questionDesMouseUp(),
                "<span class='highlight'>" + questionDesMouseUp() + "</span>")

            const text = ReactHtmlParser(questionDescription)
            for (let i = 0; i < text.length; i++) {
                if (text[i].props){
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



        if (answerMouseUp()){

            let arr = []

            var answerDescHighlight = getInnerHtml(answerDescription)
                .replaceAll(answerMouseUp(),
                    "<span class='highlight'>" + answerMouseUp() + "</span>")


            // const text = document.querySelectorAll("#answerDes .highlight")
            //
            //
            // console.log(typeof Array.prototype.slice.call(text))
            //
            // for (const s of text) {
            //     arr.push(s.textContent)
            //     answerDescHighlight = answerDescHighlight
            //         .replaceAll(s.textContent, "<span class='highlight'>" + s.textContent + "</span>")
            // }
            // arr = [...new Set(arr)];
            // console.log(arr)



            // const text = parse(answerDescription)
            //
            // for (let i = 0; i < text.length; i++) {
            //     if (text[i].props){
            //
            //         answerDescHighlight = answerDescHighlight.replaceAll(text[i].props.children,
            //             "<span class='highlight'>" + text[i].props.children + "</span>")
            //
            //     }
            // }

            setAnswerDescription(answerDescHighlight)

        }



        if (answerDescHighlight){
            // var toJson = {answer_description: answerDescHighlight}
            // updateVastused(toJson, id)

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

    }, [question_title, question_description, answer_description])

    const noop = (e) => {
        e.preventDefault();
        return false;
    };

    const questionMouseUp = () =>  {
        return window.getSelection().toString()
    }

    const questionDesMouseUp = () =>  {
        return window.getSelection().toString()
    }

    const answerMouseUp = () =>  {
        return window.getSelection().toString()
    }



    return (
        <Dialog open={isDialogOpened} onClose={handleClose} >
            <DialogTitle>Vastused id:{id}</DialogTitle>
            <DialogContent>
                <div style={{marginTop: "15px"}}>
                    <label htmlFor="questionTitle">Question title</label>
                    <div id="questionTitle" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: questionTitle.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUpCapture={questionMouseUp}
                    >
                    </div>
                </div>

                <Button variant="contained" className="add-highlight" onClick={() => questionTitleSelected()}>Question title highlight</Button>

                <div style={{marginTop: "40px"}}>
                    <label htmlFor="questionDes">Question description</label>
                    <div id="questionDes" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: questionDescription.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUpCapture={questionDesMouseUp}
                    >
                    </div>
                </div>

                <Button variant="contained" className="add-highlight" onClick={() => questionDescriptionSelected()}>Question description highlight</Button>


                <div style={{marginTop: "40px"}}>
                    <label htmlFor="answerDes">Answer description</label>
                    <div id="answerDes" className="custom-textarea"
                         dangerouslySetInnerHTML={{__html: answerDescription.toString()}}
                         onCut={noop}
                         onCopy={noop}
                         onPaste={noop}
                         onKeyDown={noop}
                         onMouseUp={answerMouseUp}
                        >
                    </div>
                </div>



                <Button variant="contained" className="add-highlight" onClick={() => answerDescriptionSelected()}>Answer description highlight</Button>


            </DialogContent>
        </Dialog>
    );
}
