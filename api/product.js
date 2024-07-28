import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products where one of his tags is 'Electronic'
    // amani boutiche khorf


    //To retrieve all products where price > 30
    //Dib mehdi mouad
    // anis maamra

    //mehdi
    router.get("/", async (req, res) => {
        let Exception = { message: "!!there is no product which price >30" };
        try {
            await productsCollection
                .find({ price: { $gt: 30 } })
                .then((products_30) => {
                    if (products_30.length === 0) {
                        throw Exception;
                    }
                    res.status(200).send({ playload: products_30 });
                });
        } catch (error) {
            res.send({
                success: false,
                message: "!!there is no product which price >30",
            });
        }
    });


    //Abdallah Not working
    router.get("/prod", async (req, res) => {
        try {
            console.log(req.query)
            if (req.query.price < 0) {
                res.status(400).send({ message: "Price cannot be negative" });
            } else {
                const products = await productsCollection.find({
                    price: { $gt: req.params.price },
                });
                res.json(products);

            }
        } catch (err) {
            res.status(500).json({ message: "Error fetching products" });
        }
    });

    //Add a field into all products 
    //which is 'stocked' true or false (if stock > 0 true else false)
    //afaf mouffok meliani dahmani
    // younes frigaa abdou

    //mouffok
    router.patch('/add', async (req, res) => {
        try {
            await productsCollection.updateMany({ stock: { $gt: 0 } }, [{ $set: { stocked: true } }]);
            await productsCollection.updateMany({ $or: [{ stock: { $eq: 0 } }, { stock: { $lt: 0 } }] }, [{ $set: { stocked: false } }]);

            res.status(200).send('Update successful');
        }
        catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    // router.patch("/add", async (req, res) => {
    //     try {
    //         await productsCollection.updateMany({}, [
    //             {
    //                 $set: { stocked: { $cond: { if: { $gt: ["$stock", 0] }, then: true, else: false, }, }, },
    //             },
    //         ]);
    //         res.status(200).send({ message: "Products updated successfully with the stocked field ", });
    //     } catch (error) {
    //         res.status(500).send({ message: "Error updating products", error });
    //     }
    // });



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