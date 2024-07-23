import express from 'express'
import requestLogger from './middlewares/requestLogger.js';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 7000

const app = express();

app.use(express.json())
app.use(requestLogger)


app.get('/products', (req, res) => {
    //...
    //...Get product from DB
    //...
    // console.log(!'21312', !'')

    // console.log(![], ![45, 43534, 45])
    res.status(200).send({
        product_count: 1,
        size: 'L'
    })
})

//Purpose: Retrieve a specific product by ID.
app.get('/products/:id([0-9]+)', (req, res) => {
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
    }
    res.status(200).send({ product: product })
})

//Purpose: Create a new product.

//Purpose: Update an existing product by ID.

//Purpose: Partially update an existing user by ID.

//Purpose: Delete a user by ID.



app.post('/products/:id', (req, res) => {
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

app.listen(
    PORT,
    () => console.log('Server is RUNNING !')
)













///products/:id?sort=asc
// => :id => parameter
// => sort => query parameter
// => body is not visible in the URL

// app.post('/products/:id', (req, res) => {
//     const { id } = req.params
//     // const { image } = req.body //Body not parsed yet
//     const { image } = req.body

//     //...
//     //Do something in DB ...
//     //...
//     if (!image) {
//         res.status(418).send({ message_client: "Try again !", message: 'image_not_sent' })
//     }

//     res.send({
//         product: `Product with ${id} created`,

//     })
// })



