import React, { createRef } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, IconButton, Button } from '@mui/material';
import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from '../../hooks';
import { addNewHamster, fetchImagesDatabase, getAllHamsters, updateAddedHamsterToAllHamsters, uploadImageToStorage } from '../../features/hamsterSlice';

class IHamster {
    "loves": string;
    "age": number;
    "wins": number;
    "games": number;
    "imgName": string;
    "favFood": string;
    "name": string;
    "defeats": number;
    "Rank": number;
    "id" : string;
}

interface IFormInputs {
    name : string;
    favFood : string;
    loves : string;
    age : number ;
    imgName : ImageListType ;
}

interface INewHamster {
    name : string;
    age : number;
    defeats : number;
    wins : number;
    games : number;
    favFood : string;
    loves : string;
    imgName :string | undefined;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "16px",

        '& .MuiTextField-root': {
            margin: "8px",
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: "16px",
        },
    },
});

interface FormProps {
    handleClose : () => void
}

const Form = (Props : FormProps) => {

    const classes = useStyles();    
    const dispatch = useAppDispatch();
    const nodeRef = createRef<HTMLDivElement>();
    const [images, setImages] = React.useState<ImageListType>([]);
    const { handleSubmit, control } = useForm<IFormInputs>();

    const maxNumber = 69;   

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {  
        if(imageList.length !== 0){
            const divImage = nodeRef.current as HTMLDivElement;
            const imageName = imageList[0].file?.name as string;
            divImage.innerText = `Image Name : ${imageName}`;
            
            setImages(imageList as never[]);
        }
    };  
    
    const onSubmit = (data: any) => {
        if(images.length < 1) {
            const divImage = nodeRef.current as HTMLDivElement;
            divImage.innerText = "Hamster image needed"
        }
        else{

            const hamster : INewHamster = {
                name : data.name,
                age : data.age,
                defeats : 0,
                wins : 0,
                games : 0,
                favFood : data.favFood,
                loves : "",
                imgName : images[0].file?.name,
            }
            const uploadedFileName = dispatch(uploadImageToStorage(images as ImageListType)).then(x => { return x});
            uploadedFileName.then(fileName => {
                hamster.imgName = fileName.payload;

                const addedNewHM = dispatch(addNewHamster(hamster)).then(t => { return t } );
                addedNewHM.then(hm => { 
                    const gh : any = hm.payload;
                    const newHM : IHamster = {
                        ...gh?.data
                    }
                    dispatch(fetchImagesDatabase());
                    dispatch(updateAddedHamsterToAllHamsters(newHM));
                });
            });

            Props.handleClose();
        }
    }

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller name={'name'} 
            control={control} 
            rules={{ required : 'Name is required'}}
            render={({ field : { onChange, value }, fieldState : { error} }) => (
            <TextField 
                id="outlined-basic" label="Name" 
                name="name" sx={{ m: 1 }}  variant="outlined" type="text" fullWidth={true}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null} />
            )}
        />
        
        <Controller name={'favFood'} 
            control={control} 
            rules={{ required : 'Favourite food is required'}}
            render={({ field :  { onChange, value }, fieldState : { error} }) => (
            <TextField 
                id="outlined-basic" label="Favourite Food" 
                name="favFood" sx={{ m: 1 }}  variant="outlined" type="text" fullWidth={true}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null} />
            )}
        />

        <Controller name={'age'} 
            control={control} 
            rules={{ required : 'Age is required'}}
            render={({ field :  { onChange, value }, fieldState : { error} }) => (
            <TextField 
                id="outlined-basic" label="Age" 
                name="age" sx={{ m: 1 }}  variant="outlined" type="number" fullWidth={true}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null} />
            )}
        />
        <Controller name={'loves'} 
            control={control} 
            rules={{ required : 'Loves is required'}}
            render={({ field :  { onChange, value }, fieldState : { error} }) => (
            <TextField 
                id="outlined-basic" label="Loves" 
                name="age" sx={{ m: 1 }}  variant="outlined" type="text" fullWidth={true}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null} />
            )}
        />
        <ImageUploading onChange={onChange} value={images} maxNumber={maxNumber} dataURLKey="data_url"> 
            {
                ({ imageList, onImageUpload, onImageUpdate  }) => (
                    <div className="upload__image-wrapper"  style={{ textAlign : 'center'}}>
                        <IconButton 
                            color="primary" 
                            sx={{ m: 1, fontSize: "large", margin: "15px"}}  aria-label="upload picture" 
                            component="span"
                            onClick={onImageUpload}>
                            <CloudUploadIcon />
                        </IconButton>
                        &nbsp;
                        {
                            imageList.map((image, index) => (
                            <div key={index} className="image-item" style={{ textAlign : 'center'}}>
                                <img src={image['data_url']} alt="" width="200" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                    
                                </div>
                            </div>
                            ))
                        }
                    </div>
                )
            }
        </ImageUploading>
        <div id='emageName' ref={nodeRef as React.RefObject<HTMLDivElement>} style={{ fontSize:'12px', color : 'red'}}>

        </div>
        <div>
            <Button variant="outlined"  size="small" onClick={Props.handleClose} startIcon={<CancelIcon />}>
             Cancel
            </Button >
            <Button variant="outlined"  size="small" color="primary" type="submit" startIcon={<AddIcon />}>
                Add Hamster
            </Button >
        </div>
    </form>
    );
};

export default Form;