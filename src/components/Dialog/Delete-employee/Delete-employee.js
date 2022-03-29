import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import moment from "moment";
import {DialogActions, List, ListItem, ListItemText} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { deleteEmployees } from "../../../Services/Employee/Employee-services";
import {setGlobalState} from "../../../StateAuth";

export default function DeleteEmployee ({isDialogOpened, handleCloseDialog, id, first_name, last_name, location, birthday, telephone, email, created_at, updated_at}){
    const handleClose = () => {
        handleCloseDialog(false);
    }
    const deleteEmployee = () => {
        deleteEmployees(id).then(res => {
            handleCloseDialog(true)
            setGlobalState("refreshEmployee", true)
        })
    }

    return(
        <Dialog open={isDialogOpened} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent sx={{width: 587}}>
                <List >
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Id: {id}
                                </Typography>
                            }

                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                            <Typography style={{ fontWeight: 600 }} >
                                First name: {first_name}
                            </Typography>}

                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Last name: {last_name}
                                </Typography>
                            }

                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Location: {location}
                                </Typography>
                            }

                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 550 }}>
                                    Birthday: {moment(birthday).utc().format('YYYY-MM-DD')}
                                </Typography >
                            }

                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Email: {email}
                                </Typography>
                            }

                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Telephone: {telephone}
                                </Typography>
                            }

                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Created at: {moment(created_at).utc().format('YYYY-MM-DD')}
                                </Typography>
                            }

                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography style={{ fontWeight: 600 }}>
                                    Updated at: {moment(updated_at).utc().format('YYYY-MM-DD')}
                                </Typography>
                            }

                        />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => deleteEmployee()}>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )

}