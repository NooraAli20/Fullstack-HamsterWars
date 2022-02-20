import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import React, { useEffect} from 'react'
import SideMenu from './SideMenu';
import { useAppSelector, useAppDispatch } from '../hooks';
import { makeStyles } from '@mui/styles';
import { fetchLosers, fetchWinners } from '../features/hamsterSlice';

const useStyles = makeStyles({
    root : {
        marginTop : "15px",
        "& .MuiGrid-item": {
            textAlign : "center",
            "& .MuiTypography-root" : {
                textAlign : "center"
            }
        }
    }
})

const Stats : React.FC  = () => {

    const dispatch = useAppDispatch();
    const classes = useStyles();

    let winners = useAppSelector((state) => state.hamster.winners);
    let losers = useAppSelector((state) => state.hamster.losers);
    const imgLib =  useAppSelector((state) => state.hamster.imagesLibrary);

    const getImageLink = (fileName : string) => {
        return imgLib.find(x => x.fileName === fileName)?.link
    }

    useEffect(() => {
        dispatch(fetchWinners());
        dispatch(fetchLosers());
    }, [dispatch])

    return (
        <>
            <SideMenu/>
            <Grid container item xs={12} spacing={1} justifyContent="center" alignContent="center" className={classes.root}> 
                <Grid item xs={6}  style={{ textAlign : "center"}}>
                    <Typography variant="h5" color="primary">
                        Winners
                    </Typography>
                    {
                        <ImageList cols={1} style={{ margin : "10px"}}>                  
                        {
                            winners.map((hamster) => (
                                <ImageListItem key={hamster.imgName}>
                                    <img src={getImageLink(hamster.imgName ?? "")} alt={hamster.imgName} />
                                    <ImageListItemBar
                                        title={hamster.name}
                                        subtitle={hamster.wins}
                                    />
                                </ImageListItem>
                            ))
                        }
                    </ImageList> 
                    }
                </Grid>
                <Grid  item xs={6} style={{ textAlign : "center"}}>
                    <Typography variant="h5" component="div" color="primary" align="inherit">
                        Losers
                    </Typography>
                    {
                        <ImageList cols={1} style={{ margin : "10px"}}>                  
                        {
                            losers.map((hamster) => (
                                <ImageListItem key={hamster.imgName}>
                                    <img src={getImageLink(hamster.imgName ?? "")} alt={hamster.imgName} />
                                    <ImageListItemBar
                                        title={hamster.name}
                                        subtitle={hamster.defeats}
                                    />
                                </ImageListItem>
                            ))
                        }
                    </ImageList> 
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Stats;
