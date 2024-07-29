import { Router } from "express"
import { productsCollection } from "../models/index.js"
import moment from "moment"

export default ({ config, db }) => {
    let router = Router()


    //Retrieve products
    //That have orders in the last month
    //total quantity
    router.get('/last_month', async (req, res) => {
        try {
            const products = await productsCollection.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: '_id',
                        foreignField: 'products.product_id',
                        as: 'orders'
                    }
                },
                {
                    $unwind: '$orders'
                },
                {
                    $unwind: '$orders.products'
                },
                {
                    $match: {
                        $expr: { $eq: ["$_id", "$orders.products.product_id"] }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'orders.createdAt': 1,
                        'orders.products': 1
                    }
                },
                {
                    $match: {
                        'orders.createdAt': { $gt: moment().subtract(1, 'month').toDate() }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        sum_quantity: { $sum: "$orders.products.quantity" },
                        grouped_orders: { $push: "$orders" }
                    }
                },

            ])
            res.send(products)
        } catch (e) {
            res.send(e)
        }
    })



    // TO retrieve all products where one of his tags is 'Electronic'
    // amani boutiche khorf


    //To retrieve all products where price > 30
    //Dib mehdi mouad
    // anis maamra



    //Abdallah
    router.get("/prod/:price", async (req, res) => {
        try {
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