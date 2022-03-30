import * as React from 'react';
import "./Edit-employee.css"
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {DialogActions, NativeSelect} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import {updateEmployees} from "../../../Services/Employee/Employee-services";
import {setGlobalState} from "../../../StateAuth";
import moment from "moment";

export default function EditEmployee({isDialogOpened, handleCloseDialog, id, first_name, last_name, _location, _birthday, _telephone, _email}){
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [birthday, setBirthday] = useState(_location)
    const [location, setLocation] = useState(_birthday);
    const [email, setEmail] = useState(_telephone)
    const [telephone, setTelephone] = useState(_email)

    const handleClose = () => {
        handleCloseDialog(false);
    }
    const handleChange = (event) => {
        setLocation(event.target.value);
    };
    const updateEmployee = () => {
        if (isValid()){
            const updatedEmployee = {first_name: firstName,
                last_name: lastName,
                location: location,
                birthday: birthday,
                telephone: telephone,
                email: email}
            updateEmployees(id, updatedEmployee)
                .then(res => {
                    handleCloseDialog(false);
                    setGlobalState("refreshEmployee", true)
                    setGlobalState("showSnackBar", true)
            })

        }
    }

    const isValid = () => {
        return firstName.length > 0 && lastName.length > 0
            && location.length > 0 && email.length > 0
            && telephone.length === 8 && birthday.length > 0 && email.includes("@")
    }

    const [focus, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    useEffect(() => {
        setFirstName(first_name)
        setLastName(last_name)
        setBirthday(_birthday)
        setLocation(_location)
        setEmail(_email)
        setTelephone(_telephone)

    }, [first_name, last_name, _location, _birthday, _telephone, _email])

    return(
        <Dialog open={isDialogOpened} onClose={handleClose} sx={{Width: 587}}>
            <DialogTitle>Edit employee: {id}</DialogTitle>
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
                    defaultValue={firstName}
                    onChange={(event) => setFirstName(event.target.value)}

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
                    defaultValue={lastName}
                    onChange={(event) => setLastName(event.target.value)}

                />

                <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Location</InputLabel>
                    <Select
                        native
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        onChange={handleChange}
                        defaultValue={location}
                    >
                        <option value="Tallinn">Tallinn</option>
                        <option value="Tartu">Tartu</option>
                        <option value="Viljandi">Viljandi</option>
                        <option value="Rakvere">Rakvere</option>
                        <option value="Maardu">Maardu</option>
                        <option value="Narva">Narva</option>
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
                    defaultValue={moment(birthday).utc().format('YYYY-MM-DD')}
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
                    defaultValue={email}
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
                    defaultValue={telephone}
                    required
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
                    }}
                    onChange={(event) => setTelephone(event.target.value)}


                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => updateEmployee()} disabled={!isValid()}>Update</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )

}