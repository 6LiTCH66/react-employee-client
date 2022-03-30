import * as React from 'react';
import SnackBar from "../../Snackbar/Snackbar";
import {setGlobalState, useGlobalState} from "../../../StateAuth";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {changePassword, verifyEmail} from "../../../Services/Auth/Auth-services";
import Card from "@mui/material/Card";
import {CardActions, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ChangePassword(){
    const [openSnackBar] = useGlobalState("showSnackBar")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const resetPassword = () => {

        if (isValid()){
            changePassword(email, password, confirmPassword)
                .then(res => {
                    setMessage("Your password has been successfully changed")
                    setGlobalState("showSnackBar", true)
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                }).catch(err => {
                    setMessage("Invalid Credentials")
                setGlobalState("showSnackBar", true)
            })
        }

    }
    const isValid = () => {
        return email.length > 0 && email.includes("@") && password.length > 0 && confirmPassword.length > 0;
    }

    return(
        <Card sx={{ maxWidth: 932, margin: 'auto', flexDirection: 'column', marginTop: 10 }}>
            <SnackBar
                isSnackbarOpened={openSnackBar}
                handleCloseSnackbar={() => setGlobalState("showSnackBar", false)}
                message={message}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Reset password
                </Typography>
                <Grid container direction={"column"} spacing={4}>
                    <Grid item>
                        <TextField
                            value={email}
                            name="email"
                            id="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={password}
                            fullWidth
                            label="Current password"
                            variant="outlined"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}

                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={confirmPassword}
                            fullWidth
                            type='password'
                            label="New password"
                            variant="outlined"
                            name="confirm-password"
                            id="confirm-password"
                            onChange={(event) => setConfirmPassword(event.target.value)}

                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={() => resetPassword()} disabled={!isValid()}>Reset password</Button>
            </CardActions>
        </Card>
    )
}