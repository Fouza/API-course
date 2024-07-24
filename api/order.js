import { Router } from "express"
import { ordersCollection, productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    //Create order
    router.post('/', async (req, res) => {
        const newOrder = req.body;
        await ordersCollection.create(newOrder).then(response => {
            res.send({ payload: response })
        });
    });

    return router
}