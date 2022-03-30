import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SnackBar({isSnackbarOpened, handleCloseSnackbar, message}) {

    const handleClick = () => {
        handleCloseSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        handleCloseSnackbar(false);
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={isSnackbarOpened}
                autoHideDuration={2000}
                onClose={handleClose}
                message={message}
            />
        </div>
    );
}
