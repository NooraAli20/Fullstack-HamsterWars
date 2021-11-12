import { 
    AppBar, 
    IconButton, 
    Toolbar, 
    Typography, Dialog, DialogTitle, 
    DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React, { useState} from 'react'
import HelpIcon from '@mui/icons-material/Help';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root : {
        margin: '0px',
        '& .MuiAppBar-colorPrimary' : {
            color: '#F228C0Fd2'
        }
    }
});

const Header : React.FC = () => {
    
    const classes = useStyles();

    const [open, setOpen] = useState<boolean>(false);
    const handleMenu = () : any => {
        setOpen(true);
    }
    
    const handleClose = () : any => {
        setOpen(false);
    }

    return (
        <AppBar color="primary" position="static" className={classes.root} >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hamster-Wars
                </Typography>
                <IconButton
                    size="large"
                    aria-label="Gaming rules and regulations"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <HelpIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography>
                            How to play the game goes here
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText id="alert-dialog-description">
                        You will get two random Hamsters to vote on the
                        <br />
                                {"one you find cutest, continue until the game finish"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Got it
                    </Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
