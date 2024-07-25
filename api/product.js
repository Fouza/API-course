import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products where one of his tags is 'Electronic'
    // amani boutiche khorf

    //To retrieve all products where price > 30
    //Dib mehdi mouad

    //Add a field into all products 
    //which is 'stocked' true or false (if stock > 0 true else false)
    //afaf mouffok meliani dahmani




    // POST /api/product
    router.post('/', async (req, res) => {
        let ErrorException = { message: 'Please fill all the info required' }
        try {
            const newProduct = req.body;
            if (newProduct.name && newProduct.price && newProduct.category && newProduct.stock) {
                await productsCollection.create(newProduct).then(response => {
                    res.send({ success: true, payload: response })
                });
            } else {
                throw ErrorException
            }
        } catch (error) {
            // res.send({ error })
            if (error === ErrorException) {
                res.send({ error })
            } else if (error && error.code == 11000) {
                res.send({ message: 'A product with this name already exists.' })
            } else {
                res.status(500).send({
                    success: false,
                    message: error && error.errorResponse ? error.errorResponse.errmsg : "Error"
                })
            }
        }
    });

    return router
}