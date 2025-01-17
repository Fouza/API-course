import express from 'express'
import requestLogger from './middlewares/requestLogger.js';
import dotenv from 'dotenv';
import api from './api/index.js';
import CONFIG from './config.json' assert {type: 'json'}
import mongoose from 'mongoose'
import cors from 'cors';

import swagger from './api/swagger.js';


const PORT = CONFIG.port || 7000

const app = express();
app.use(cors({
    origin: CONFIG.corsOrigin,
    optionsSuccessStatus: 200
}));

//connect to Database///////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(CONFIG.mongo_url)
    .then((db) => {
        //Json parsing middleware
        app.use(express.json())

        //custom middleware to log and see requests
        app.use(requestLogger)

        //use cors


        //api config
        app.use('/api', api({ config: CONFIG, db }))

        //template engine config
        app.set('view engine', 'pug')
        app.set('views', './views')


        //swagger
        app.use('/api-docs', swagger({ config: CONFIG, db }))



        app.listen(
            PORT,
            () => console.log(`SERVER IS RUNNIN IN ${PORT}`)
        )
    })
    .catch((err) => { console.log(err, "Received an Error") })



