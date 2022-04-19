import * as React from 'react';
import SnackBar from "../Snackbar/Snackbar";
import {setGlobalState, useGlobalState} from "../../StateAuth";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function VerifyEmail(){
    const [openSnackBar] = useGlobalState("showSnackBar")
    return(
        <Card sx={{ maxWidth: 400, margin: 'auto', flexDirection: 'column', marginTop: 10 }}>
            <SnackBar
                isSnackbarOpened={openSnackBar}
                handleCloseSnackbar={() => setGlobalState("showSnackBar", false)}
                message="A new email has been sent to your email address"

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Email was successfully confirmed
                </Typography>
            </CardContent>
        </Card>
    )
}