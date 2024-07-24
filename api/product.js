import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products
    router.get('/', async (req, res) => {

        const result = await productsCollection.find()
        res.json(result)
    })

    router.get('/:id([1-9]+)', (req, res) => {
        const { id } = req.params
        const product = null
        if (!product) {
            res.status(404).send({ message: `Product with id=${id} not found` })
        } else {
            res.status(200).send({ product: product })
        }
    })

    router.post('/:id([1-9]+)', (req, res) => {

        const { id } = req.params;
        const { image } = req.body //Body not parsed yet

        if (!image) {
            res.status(418).send({ message: 'No image sent' })
        }
        res.status(200).send({
            product: `Image of product with id=${id} inserted`,
        })
    })

    return router
}