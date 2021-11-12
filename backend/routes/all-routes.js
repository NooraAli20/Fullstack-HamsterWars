import * as express from 'express';
import { 
    matchWinners,
    winners,
    losers,
    readVariables
} from '../controllers/matchesController.js';

const AllRouter = express.Router();

AllRouter.get('/', readVariables);
AllRouter.get('/winners', winners);
AllRouter.get('/losers', losers);
AllRouter.get('/matchwinners/:id', matchWinners);

export default AllRouter;