import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import SideMenu from "./SideMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Tooltip } from '@mui/material';
import IHamster from '../interfaces/IHamster';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useConfirm } from 'material-ui-confirm';
import { DeleteHamster, deleteHamsterFromState } from '../features/hamsterSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalDialog from './common/ModalDialog';

const Gallery : React.FC = () => {

    const dispatch = useAppDispatch();
    const confirm = useConfirm();
    const [open, setOpen] = useState(false);

    const allHamsters =  useAppSelector((state) => state.hamster.allHamsters);
    const imgLib =  useAppSelector((state) => state.hamster.imagesLibrary);

    const getImageLink = (fileName : string) => {
        return imgLib.find(x => x.fileName === fileName)?.link
    }

    const handleDeleteClick = (hamster : IHamster) => {
        confirm({ 
            title : "Delete a hamster",
            description : `Are you sure you want to delete hamster: ${hamster.name}`,
            confirmationText : "Yes",
            cancellationText : "No"
        })
        .then(() => {
            dispatch(DeleteHamster(hamster.id ?? ""));
            dispatch(deleteHamsterFromState(hamster.id ?? ""))
        })
        .catch(() => { /* ... */ });
    }

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <SideMenu/>
            <ModalDialog open={open} handleClose={handleClose} />
            <Grid container item xs={12} direction="column" spacing={3}>
                <Grid item xs={12} container justifyContent="center" alignContent="center">
                    <Tooltip title="Click to add a new hamster">
                        <IconButton 
                            aria-label={`Add new hamster`}
                            onClick={handleOpen}
                        >
                            <AddCircleIcon fontSize='large'  />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    {
                        <ImageList cols={3} style={{ margin : "10px"}}>                  
                            {
                                allHamsters.map(hamster => (
                                    <ImageListItem key={hamster.id}>
                                        <img src={getImageLink(hamster.imgName ?? "")} alt={hamster.imgName} />
                                        <ImageListItemBar
                                            title={hamster.name}
                                            subtitle={hamster.wins}
                                            actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${hamster.name}`}
                                                onClick={() => handleDeleteClick(hamster)}
                                            >
                                                <DeleteIcon  />
                                            </IconButton>
                                            }
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

export default Gallery
