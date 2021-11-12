import React from 'react'
import {Box, Grid} from "@mui/material";
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    root : {
        margin: '0px',
        padding : '50px',
        '& .MuiCard-root' : {
            minHeight : '400px'
        }
    },
    startButton : {
        borderRadius : '50%',
        width : '15vh',
        height : '15vh',
        position: 'relative',
        background: 'linear-gradient(#F28C0Fd2)',
        padding: '25px'
    }
})

const Game : React.FC = () => {
    let haroon = useNavigate();

    const StartGame = () => {
        haroon('/play');
    }

    const classes = useStyles();
    return (
        <>
            <Box className={classes.root} display="flex" alignItems="center" justifyContent="center" >
                <Grid container xs={12} item direction="column" spacing={3} justifyContent="center" alignItems="center">
                    <Grid xs={12} item  style={{ textAlign : "center"}}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 40 }} color="primary" align= "center" gutterBottom>
                                Hamster wars
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" align= "center" component="div" gutterBottom style={{ margin : "15px", padding : "10px"}}>
                                    How to play:
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" align= "inherit" gutterBottom style={{ margin : "10px", padding : "5px"}}>
                                Each game you will get images randomly, that you will vote on. 
                                <br/>{"As a player you will get two images at a time, where you will "}
                                <br />
                                {" have the chance on voting on which one you find the cutest."}
                                <br />
                                {" You will get two random Hamsters to vote on"}
                                </Typography>
                                <Grid xs={12} item  style={{ textAlign : "center"}}>
                                    <Button className={classes.startButton} onClick={StartGame} variant="contained" color="secondary">Play</Button>
                                </Grid>
                            </CardContent>  
                        </Card>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    )
}

export default Game
