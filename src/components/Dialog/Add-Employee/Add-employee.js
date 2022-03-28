import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogActions} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Add-employee.css"
import {dark} from "@mui/material/styles/createPalette";


export default function AddEmployee({isDialogOpened, handleCloseDialog}){
    const [fistName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [location, setLocation] = React.useState('');
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")


    const confirmAdd = () => {
        // if (firstNameRef.current.value &&
        //     lastNameRef.current.value &&
        //     age && birthday.current.value &&
        //     email.current.value && telephone.current.value){
        // }else {
        //     console.log(fistName)
        // }

        // handleCloseDialog(false);
    };

    const isValid = () => {
        return fistName.length > 0 && lastName.length > 0
            && location.length > 0 && email.length > 0
            && telephone.length > 0 && birthday.length > 0 && email.includes("@")
    }
    const handleClose = () => {
        handleCloseDialog(false);
    }




    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const [focus, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <Dialog open={isDialogOpened} onClose={handleClose} sx={{Width: 587}}>
            <DialogTitle>Add new Employee</DialogTitle>
            <DialogContent>
                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="First name"
                    type="text"
                    fullWidth
                    required
                    onChange={(event) => setFistName(event.target.value)}

                />
                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="Last name"
                    type="text"
                    fullWidth
                    required
                    onChange={(event) => setLastName(event.target.value)}


                />

                <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Location</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={location}
                        onChange={handleChange}>
                        <MenuItem value="Tallinn">Tallinn</MenuItem>
                        <MenuItem value="Tartu">Tartu</MenuItem>
                        <MenuItem value="Viljandi">Viljandi</MenuItem>
                        <MenuItem value="Rakvere">Rakvere</MenuItem>
                        <MenuItem value="Maardu">Maardu</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="Birthday"
                    type={hasValue || focus ? "date" : "text"}
                    fullWidth
                    required
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e) => {
                        setBirthday(e.target.value)
                        if (e.target.value) setHasValue(true);
                        else setHasValue(false);
                    }}
                />
                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    id="filled-multiline-static"
                    variant="filled"
                    autoFocus
                    margin="dense"
                    label="Telephone"
                    type="number"
                    fullWidth
                    required
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
                    }}
                    onChange={(event) => setTelephone(event.target.value)}


                />
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmAdd} disabled={!isValid()}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}