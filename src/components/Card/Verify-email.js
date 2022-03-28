import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {verifyEmail} from "../../Services/Auth/Auth-services";

export default function VerifyEmail() {
    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', flexDirection: 'column', marginTop: 10 }}>
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
