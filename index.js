const express = require('express'); //Creation d'une instance app express js
const PORT = 8000

const app = express();

app.use(express.json())



app.get('/products', (req, res) => {
    //...
    //...Get product from DB
    //...
    res.status(200).send({
        product_count: 1,
        size: 'L'
    })
})

// /products/1 /products/100 /products/

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



