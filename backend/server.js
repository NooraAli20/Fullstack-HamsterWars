import express from 'express';
import cors from 'cors';
import HamsterRouter from "./routes/hamster-routes.js";
import MatchesRouter from "./routes/matches-routes.js";
import AllRouter from "./routes/all-routes.js";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.url} `, req.body)
    next()
});

app.use('/hamsters', HamsterRouter);
app.use('/matches', MatchesRouter);
app.use('/', AllRouter)

const PORT = parseInt(process.env.PORT)
app.listen(PORT, () => {
    console.log('App is listening on port '+ PORT);
});