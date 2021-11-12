import { Grid, Typography,Button, Card, CardContent, 
    CardMedia, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React,{ } from 'react'
import SideMenu from './SideMenu';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WineBarIcon from '@mui/icons-material/WineBar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRandomHamster, updateWinnerWins } from '../features/hamsterSlice';
import axios from 'axios';

const Play : React.FC = () => { 

    const dispatch = useAppDispatch();
    const rhs =  useAppSelector((state) => state.hamster.randomHamsters);

    const winnerClicked = (id? : string) => {
        dispatch(updateWinnerWins(id ?? ""))

        const loserId = rhs.find(x => { return x.id !== id})?.id;

        const data = {
            winnerId : id,
            loserId : loserId
        }

        axios.post(`/matches`, data);

        setTimeout(() => dispatch(fetchRandomHamster()), 500)
        
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
                                        image={`../img/${rhs[0].imgName}`}
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
                                <Button variant="contained"  style={{ fontSize : "15px" }}  onClick={() => winnerClicked(rhs[0].id)}> Choose Me</Button>
                            </Grid>
                            <Grid item xs={6}  style={{ textAlign : "center"}}>
                                <Card style={{ margin : "20px"}}>
                                    <CardMedia 
                                        component="img"
                                        height="300"
                                        image={`../img/${rhs[1].imgName}`}
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
                                    <Button variant="contained" style={{ fontSize : "15px" }} onClick={() => winnerClicked(rhs[1].id)}> Choose Me</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid xs={12} item style={{ marginBottom : "20px", marginTop : "50px" }}> 
                            <Button variant="contained"  style={{ fontSize : "15px" }}> End</Button>
                        </Grid>
                    </Grid>
                </>
            }
        </> 
    )
}

export default Play


