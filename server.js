import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import HamsterRouter from "./routes/hamster-routes.js";
import MatchesRouter from "./routes/matches-routes.js";
import ImagesRouter from './routes/images-routes.js';
import AllRouter from "./routes/all-routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

/*
const whiltelist = ['http://localhost:3000', 'https://fullstack-hamsterkrig.herokuapp.com'];
const corsOptions = {
    origin : function (origin, callback) {
        console.log("** Origin of request " + origin)
        if(whiltelist.indexOf(origin) !== -1 || !origin){
            console.log("Origin acceptable");
            callback(null, true);
        }else {
            console.log("Origin rejected");
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

*/

app.use(cors({
    origin: '*'
}))

app.use(express.urlencoded());
app.use(express.static('uploads'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    console.log(`${req.method}  ${req.url} `, req.body)
    next()
});

app.use('/hamsters', HamsterRouter);
app.use('/matches', MatchesRouter);
app.use('/images', ImagesRouter);
app.use('/', AllRouter)

// --> Add this
if (process.env.NODE_ENV === 'production') {

    const __dirname = path.resolve()

    // Serve any static files
    app.use(express.static(path.resolve(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

const PORT = parseInt(process.env.PORT) ||  4000;
app.listen(PORT, () => {
    console.log('App is listening on port '+ PORT);
});