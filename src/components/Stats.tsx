import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import React from 'react'
import SideMenu from './SideMenu';
import { useAppSelector } from '../hooks';

const Stats : React.FC  = () => {

    const winners = useAppSelector((state) => state.hamster.winners);
    const losers = useAppSelector((state) => state.hamster.losers);

    return (
        <>
            <SideMenu/>
            <Grid container item xs={12} spacing={1} justifyContent="center" alignContent="center" style={{ marginTop : "15px"}}> 
                <Grid item xs={6}>
                    <Typography variant="h5" component="div" color="primary" align="inherit">
                        Winners
                    </Typography>
                    {
                        <ImageList cols={1} style={{ margin : "10px"}}>                  
                        {
                            winners.map((hamster) => (
                                <ImageListItem key={hamster.imgName}>
                                    <img src={`../img/${hamster.imgName}`} alt={hamster.imgName} />
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
                <Grid  item xs={6}>
                    <Typography variant="h5" component="div" color="primary" align="inherit">
                        Losers
                    </Typography>
                    {
                        <ImageList cols={1} style={{ margin : "10px"}}>                  
                        {
                            losers.map((hamster) => (
                                <ImageListItem key={hamster.imgName}>
                                    <img src={`../img/${hamster.imgName}`}  alt={hamster.imgName}  />
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
            </Grid>
        </>
    )
}

export default Stats;
