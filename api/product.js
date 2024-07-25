import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products where one of his tags is 'Electronic'
    // amani boutiche khorf


    //To retrieve all products where price > 30
    //Dib mehdi mouad
    // anis maamra

    //Add a field into all products 
    //which is 'stocked' true or false (if stock > 0 true else false)
    //afaf mouffok meliani dahmani
    // younes frigaa abdou




    // POST /products
    router.post('/', async (req, res) => {
        let BreakException = { message: 'My error ! Please fill all info required' };
        try {

            const newProduct = req.body;
            if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
                await productsCollection.create(newProduct).then(response => {
                    res.send({ success: true, payload: response })
                });
            } else {
                throw BreakException
            }
        } catch (error) {
            if (error == BreakException) {
                res.send({ error })
            } else if (error && error.code === 11000) {
                res.status(400).send({
                    success: false,
                    message: "Product with this name already exists"
                })
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