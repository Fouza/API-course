import { Router } from "express"

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert {type: 'json'};


export default ({ config, db }) => {

    let router = Router()

    router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return router
}