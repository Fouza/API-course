import { Router } from "express"


export default ({ config, db }) => {
    let router = Router()

    router.get('/', (req, res) => {
        res.status(200).send({
            product_count: 1,
            size: 'L'
        })
    })

    router.get('/:id([1-9]+)', (req, res) => {
        const { id } = req.params
        //params are in the url after /
        //query params are in the url after ?
        //body is insivible and accessible by body.
        // Regular Expressions
        //Logic of retireving a product from DB
        // const product = { name: 'Shirt', size: 'M' }
        const product = null
        if (!product) {
            res.status(404).send({ message: `Product with id=${id} not found` })
        } else {
            res.status(200).send({ product: product })
        }
    })

    router.post('/:id([1-9]+)', (req, res) => {
        // req.params
        // req.query
        // req.body
        const { id } = req.params;
        const { image } = req.body //Body not parsed yet
        //...
        //Do something in DB ...
        //...
        if (!image) {
            res.status(418).send({ message: 'No image sent' })
        }
        //...
        //Do something in DB ...
        //...
        res.status(200).send({
            product: `Image of product with id=${id} inserted`,
        })
    })

    return router
}