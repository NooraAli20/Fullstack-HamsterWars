import * as express from 'express';
import multer from 'multer'

import { 
    allImagesAndUrls,
    getImageById, uploadImage, makeBucketPublic
 } from "../controllers/imageController.js";
import upload from '../upload.js';

const ImagesRouter = express.Router();

ImagesRouter.get('/list', allImagesAndUrls);
ImagesRouter.post('/upload', upload, uploadImage);
ImagesRouter.get('/:id', getImageById);
ImagesRouter.get('/make/:id', makeBucketPublic)

export default ImagesRouter;