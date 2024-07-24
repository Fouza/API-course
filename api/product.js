import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products
    // POST /products
    router.post('/', async (req, res) => {
        try {
            const newProduct = req.body;
            await productsCollection.create(newProduct).then(response => {
                res.send({ payload: response })
            });
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).send({ success: false, message: "Product with this name already exists" })
            } else {
                res.status(500).send({ success: false, message: error.errorResponse.errmsg })
            }
        }
    });

    return router
}