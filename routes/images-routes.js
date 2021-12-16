import * as express from 'express';
import { 
    allImagesAndUrls,
    getImageById, uploadImage, makeBucketPublic
 } from "../controllers/imageController.js";

const ImagesRouter = express.Router();

ImagesRouter.get('/list', allImagesAndUrls);
ImagesRouter.post('/', uploadImage);
ImagesRouter.get('/:id', getImageById);
ImagesRouter.get('/make/:id', makeBucketPublic)

export default ImagesRouter;