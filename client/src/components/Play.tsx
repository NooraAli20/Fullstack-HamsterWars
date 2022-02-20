import { Grid, Typography,Button, Card, CardContent, 
    CardMedia, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import React,{ useEffect } from 'react'
import SideMenu from './SideMenu';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WineBarIcon from '@mui/icons-material/WineBar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRandomHamster, updateWinnerWins, updateHamsterMatch, refreshWinnersLosesList, fetchCutest } from '../features/hamsterSlice';
import IMatch from '../interfaces/IMatch';

const Play : React.FC = () => { 

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        }
    }, [])


    const dispatch = useAppDispatch();

    const rhs =  useAppSelector((state) => state.hamster.randomHamsters);
    const imgLib =  useAppSelector((state) => state.hamster.imagesLibrary);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const winnerClicked = (id : string) => {
        
        if(!loading){
            setSuccess(false);
            setLoading(true);
            dispatch(updateWinnerWins(id));

            const loserId = rhs.find(x => { return x.id !== id})?.id;
    
            const data : IMatch = {
                winnerId : id,
                loserId : loserId
            }
            dispatch(updateHamsterMatch(data));

            setTimeout(() => {
                dispatch(fetchRandomHamster());
                dispatch(refreshWinnersLosesList);
                setSuccess(true);
                setLoading(false);
                dispatch(fetchCutest());
            }, 700)
        }
        
        /*dispatch(fetchWinners());
        dispatch(fetchLosers());*/
    }

    const getImageLink = (fileName : string) => {
        return imgLib.find(x => x.fileName === fileName)?.link
    }

    return (
        <>
            {
                <>
                    <SideMenu />
                    <Grid container xs={12} item direction="column" spacing={2} justifyContent="center" alignItems="center" 
                        style={{ marginTop : '15px', marginBottom : "15px"}}>
                        <Grid container xs={12} item justifyContent="center" alignItems="center" spacing={2} >
                            <Grid item xs={6} style={{ textAlign : "center"}}>
                                <Card style={{ margin : "20px"}}>
                                    <CardMedia 
                                        component="img"
                                        height="300"
                                        image={ getImageLink(rhs[0].imgName)}
                                    />
                                    <CardContent>
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="h6">{rhs[0].name}</Typography>} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <WineBarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="h6">{rhs[0].wins}</Typography>} />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                                <Button variant="contained"  style={{ fontSize : "15px" }}  onClick={() => winnerClicked(rhs[0].id ?? "")}> Choose Me</Button>
                            </Grid>
                            <Grid item xs={6}  style={{ textAlign : "center"}}>
                                <Card style={{ margin : "20px"}}>
                                    <CardMedia 
                                        component="img"
                                        height="300"
                                        image={getImageLink(rhs[1].imgName)}
                                    />
                                    <CardContent >
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="h6">{rhs[1].name}</Typography>} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <WineBarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="h6">{rhs[1].wins}</Typography>} />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                                <Typography component="div">
                                    <Button variant="contained" style={{ fontSize : "15px" }} onClick={() => winnerClicked(rhs[1].id ?? "")}> Choose Me</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid xs={12} item style={{ marginTop : "2px" }}> 
                        {loading && (
                            <CircularProgress color="secondary" />
                            )
                        }
                        </Grid>
                    </Grid>
                </>
            }
        </> 
    )
}

export default Play


