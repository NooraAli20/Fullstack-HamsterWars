import React, { useEffect, useState} from 'react'
import { Box, Grid, Typography} from "@mui/material";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import ImageListItem from './ImageListItem'
import SideMenu from './SideMenu';
import IHamster from '../interfaces/IHamster';

const useStyles = makeStyles({
    root : {
        padding : '30px',
        '& .MuiTypography-root' : {
            fontWeight : '900'
        },
        '& .MuiImageListItem-root' : {
            width : '30px',
        }
    },
    typographyPriceFormatter : {
        fontWeight:'bolder',
        color : 'Black',
        marginRight: '30px',
        width:'80px'
    }
})

const Start : React.FC = () => {

    const classes = useStyles();
    const cutestHamster : IHamster[] = [];

    const [cutestHamsters, setCutestHamsters]: [IHamster[], (posts: IHamster[]) => void] = React.useState(cutestHamster);
    const [loading, setLoading] : [boolean, (loading : boolean) => void] = useState<boolean>(true);

    useEffect(() => {
        
        axios.get<IHamster[]>(`hamsters/cutest`, {
            headers : {
                "Contet-Type" : "application/json"
            }
        })
        .then(response => {
            setCutestHamsters(response.data);
            setLoading(false);
        })
    }, [])

    return (
        <> 
           {
               !loading && 
               (
                   <>
                        <SideMenu />
                        <Box className={classes.root} alignItems="center" justifyContent="center">
                            <Grid container xs={12} item direction="column" alignItems="center" justifyContent="center" spacing={1}>
                                <Grid xs={12} item>
                                    <ImageListItem imageName={cutestHamsters[0].imgName} name={cutestHamsters[0].name as string} />
                                </Grid>
                                <Grid xs={12} item>
                                    <Typography variant="h5" color="inherit" align= "center" gutterBottom >
                                       Previous Winner
                                    </Typography>
                                    <Typography variant="h6" color="primary" align= "justify" >
                                        Name : { cutestHamsters[0].name}
                                    </Typography>
                                    <Typography variant="h6"color="primary" align= "justify" >
                                        Rank : { cutestHamsters[0].Rank}
                                    </Typography>
                                    <Typography variant="h6" color="primary" align= "justify" gutterBottom>
                                            Wins : { cutestHamsters[0].wins}
                                    </Typography>
                                
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )
            } 
        </>
    )
}

export default Start
