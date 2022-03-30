import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {verifyEmail} from "../../Services/Auth/Auth-services";
import SnackBar from "../Snackbar/Snackbar";
import {useGlobalState,setGlobalState} from "../../StateAuth";

export default function VerifyEmail() {
    const [openSnackBar] = useGlobalState("showSnackBar")
    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', flexDirection: 'column', marginTop: 10 }}>
            <SnackBar
                isSnackbarOpened={openSnackBar}
                handleCloseSnackbar={() => setGlobalState("showSnackBar", false)}
                message="A new email has been sent to your email address"

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Verify email
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left'}}>
                    <Typography variant="p">
                        An email has been sent to you to verify your email.
                    </Typography>
                    <br/>
                    <Typography variant="p">
                        If you did not receive an email, click
                        <a onClick={() => verifyEmail()} style={{cursor: "pointer", fontWeight: "bold"}}> here </a>
                        to receive a new confirmation email
                    </Typography>

                </Typography>
            </CardContent>
        </Card>
    );
}
