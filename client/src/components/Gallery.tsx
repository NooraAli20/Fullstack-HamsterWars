import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import SideMenu from "./SideMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogContent, DialogContentText, Button, DialogActions, Slide, Grid, TextField } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ImageUploading, { ImageListType }  from 'react-images-uploading';
import IHamster from '../interfaces/IHamster';
import { useAppDispatch, useAppSelector } from '../hooks';
import { DeleteHamster, getAllHamsters } from '../features/hamsterSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const hamster : IHamster = {
    id : "",
    name : "",
    age : 0,
    Rank : 0,
    defeats : 0,
    wins : 0,
    games : 0,
    favFood : "",
    loves : "",
    imgName : "",

}

const Gallery : React.FC = () => {

    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [initialHamster, setInitialHamster] = React.useState<IHamster>(hamster)

    const allHamsters =  useAppSelector((state) => state.hamster.allHamsters);
    const imgLib =  useAppSelector((state) => state.hamster.imagesLibrary);

    const getImageLink = (fileName : string) => {
        return imgLib.find(x => x.fileName === fileName)?.link
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHamster = (id : string) => {
        handleClose();

        dispatch(DeleteHamster(id));
        dispatch(getAllHamsters())
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(initialHamster);
        console.log(images[0]);
    }

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setInitialHamster({
           ...initialHamster, 
           "imgName" : imageList[0].file?.name
        });
        setImages(imageList as never[]);
    };

    const onChangeStatus = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.currentTarget;
        setInitialHamster({
            ...initialHamster, 
            [name] : value
        });
    }

    return (
        <>
            <SideMenu/>
            <Grid container item xs={12} direction="column" spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={(e) => handleSubmit(e)} style={{ margin : "20px", padding : "10px"}}>
                        <Grid container item justifyContent="center" xs={12} alignItems="center">
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 40 }} color="primary" align= "center" gutterBottom>
                                    Gallery
                                </Typography>
                            </Grid>    
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" label="Name" name="name" autoComplete="off" sx={{ m: 1 }} variant="outlined" type="text" fullWidth={true} 
                                    onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) : void => onChangeStatus(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" label="Age" name="age" sx={{ m: 1 }} variant="outlined" type="number" fullWidth={true}
                                    onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) : void => onChangeStatus(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" label="Favourite Food" name="favFood" sx={{ m: 1}} variant="outlined" type="text" fullWidth={true}
                                    onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) : void => onChangeStatus(e)} />
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid xs={11} item>
                                    <TextField id="outlined-basic" label="Image" name="imgName" sx={{ m: 1 }} variant="outlined" type="text" fullWidth={true}
                                        onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) : void => onChangeStatus(e)} />
                                </Grid>
                                <Grid xs={1} item>
                                    <label htmlFor="icon-button-file"> 
                                        
                                    </label>
                                    <ImageUploading onChange={onChange} value={images} maxNumber={maxNumber}>
                                        {
                                            ({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
                                                <div className="upload__image-wrapper">
                                                    <IconButton 
                                                        color="primary" 
                                                        sx={{ m: 1, fontSize: "large", margin: "15px"}}  aria-label="upload picture" 
                                                        component="span"
                                                        onClick={onImageUpload}>
                                                        <AttachFileOutlinedIcon />
                                                    </IconButton>
                                                </div>
                                            )
                                        }
                                    </ImageUploading>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" disableElevation style={{ margin : "10px", padding : "15px"}}>Add new Hamster</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
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
                                                onClick={handleClickOpen}
                                            >
                                                <DeleteIcon  />
                                            </IconButton>
                                            }
                                        />
                                        <Dialog
                                            open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-describedby="alert-dialog-slide-description"
                                            >
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Are you sure you want to delete this Hamster?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>No</Button>
                                                    <Button onClick={() => deleteHamster(`${hamster.id}`)}>Yes</Button>
                                                </DialogActions>
                                        </Dialog>
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
