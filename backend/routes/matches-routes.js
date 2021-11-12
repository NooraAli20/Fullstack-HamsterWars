import * as express from 'express';
import { 
    getAllMatches,
    addNewMatch,
    deleteMatchById,
    getMatchById,
    matchWinners,
    winners,
    losers
} from '../controllers/matchesController.js';

const MatchesRouter = express.Router();

MatchesRouter.get('/', getAllMatches);
MatchesRouter.post('/', addNewMatch);
MatchesRouter.get('/winners', winners);
MatchesRouter.get('/losers', losers);
MatchesRouter.get('/matchwinners/:id', matchWinners);
MatchesRouter.get('/:id', getMatchById);
MatchesRouter.delete('/:id', deleteMatchById);

export default MatchesRouter;