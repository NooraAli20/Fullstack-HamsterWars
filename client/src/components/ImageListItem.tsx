//import { ImageList, ImageListItem as MuiImageListItem } from '@mui/material'
//import moment from 'moment'
import React from 'react';
import { makeStyles } from '@mui/styles';

type Props = {
    imageName? : string,
    name :string
};

const useStyles = makeStyles({
    root : {
        width: "300px",
        textAlign : "center",
        "& .MuiImageListItem-root" : {
            "& .img" :  {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "40%",
              }
        }
    }
})

const ImageListItem : React.FC<Props> = ({ imageName }) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <img src={imageName} width="350px" height="350px" loading="lazy" alt={imageName} />
        </div>
    )
}

export default ImageListItem 
