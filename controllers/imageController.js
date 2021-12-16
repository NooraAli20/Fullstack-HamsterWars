import { store } from '../db.js'
import _ from 'lodash';

const bucket = store.bucket();

export const getImageById = async(req , res , next ) => {
    try {
        const id = req.params.id; 
        const fileRef = bucket.file(id);

        fileRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        }).then(urls => {
            res.status(200).send(urls[0])
        });
       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const makeBucketPublic = async(req , res , next ) => {
    try {

        const id = req.params.id; 

        if(id == "on"){
            await bucket.makePublic();
            res.status(200).send("Bucket made public")
        }else{
            await bucket.makePrivate();
            res.status(200).send("Bucket make private")
        }
            

        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getSignedURL(fileName) {

    const file = bucket.file(fileName);
    const signedURLconfig = { action: 'read', expires: '03-09-2491' };

    return file.getSignedUrl(signedURLconfig).then(url => {

        return {
            link : url[0],
            fileName
        }
    });
}

export const allImagesAndUrls = async(req, res, next ) => {
    try {
        const [ files ] = await  bucket.getFiles();   
        
        const allFiles = files.map(async (file) => {
            const links = await getSignedURL(file.name);
            return links;
        })
        
        Promise.all([...allFiles]).then(data => {
            res.status(200).send(data)
        })
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const uploadImage = async(req, res, next ) => {
    try {

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        res.status(200).send(req)
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}