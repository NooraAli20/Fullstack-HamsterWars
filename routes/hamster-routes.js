import * as express from 'express';
import { 
    addHamster, 
    getAllHamsters, 
    getHamsterById, 
    getRandom,
    getHamsterWithHighestWins,
    deleteHamsterById,
    updateHamster,
    resetHamsters,
 } from "../controllers/hamsterController.js";

const HamsterRouter = express.Router();

HamsterRouter.get('/', getAllHamsters);
HamsterRouter.post('/', addHamster);
HamsterRouter.get('/resetdb', resetHamsters)
HamsterRouter.get('/cutest', getHamsterWithHighestWins);
HamsterRouter.get('/random1', getRandom);
HamsterRouter.get('/random2', getRandom);
HamsterRouter.put('/:id', updateHamster);
HamsterRouter.get('/:id', getHamsterById);
HamsterRouter.delete('/:id', deleteHamsterById);

export default HamsterRouter;