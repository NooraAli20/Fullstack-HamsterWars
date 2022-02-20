import React, { } from 'react'
import { Box, Grid, Typography} from "@mui/material";
import { makeStyles } from '@mui/styles';
import ImageListItem from './ImageListItem'
import SideMenu from './SideMenu';
import { useAppSelector } from '../hooks';

const useStyles = makeStyles({
    root : {
        padding : '30px',
        '& .MuiTypography-root' : {
            fontWeight : '900'
        },
        '& .MuiImageListItem-root' : {
            width : '30px',
        },
        '& .MuiGrid-root' : {
            '& .MuiGrid-root' : {
                '& .MuiImageListItem-img' : {
                    width : '350px'
                }
            }
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
    const cutest =  useAppSelector((state) => state.hamster.cutestHamster);
    const imgLib =  useAppSelector((state) => state.hamster.imagesLibrary);

    const getImageLink = (fileName : string) => {
        return imgLib.find(x => x.fileName === fileName)?.link
    }

    return (
            <>
                <SideMenu />
                <Box className={classes.root} alignItems="center" justifyContent="center"> 
                    <Grid container xs={12} item direction="column" alignItems="center" justifyContent="center" spacing={1}>
                        <Grid xs={12} item  justifyContent="center"  alignItems="center">
                            <ImageListItem imageName={getImageLink(cutest.imgName)} name={cutest.name as string} />
                        </Grid>
                        <Grid xs={12} item justifyContent="center"  alignItems="center">
                            <Typography variant="body1" color="inherit" align= "center" gutterBottom >
                               Previous Winner
                            </Typography>
                            <Typography variant="body2" color="primary" align= "justify" >
                                Name : { cutest.name}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" align= "justify" gutterBottom>
                                    Wins : { cutest.wins}
                            </Typography>
                        
                        </Grid>
                    </Grid>
                </Box>
             </>
        )
}

export default Start
