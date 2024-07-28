import { Router } from "express"
import { ordersCollection, productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    //Retrieve all orders where status = 'ordered'
    //hannah lina manar ibtissem

    //linaGM
    router.get("/", async (req, res) => {
        //...
        //...Get product from DB
        //...
        let exeption = { code: 50, message: "there is no oreders with status ordered." }
        try {
            const list = ordersCollection.find({ status: "ordered" })
            await list.then(response => {
                if (response.length === 0) {
                    throw exeption
                }
                res.send({ payload: response })
            })

        }
        catch (error) {
            if (error.code === 50) {
                res.status(400).send({ success: false, message: error.message })
            } else {
                res.status(500).send({ success: false, message: error && error.errorResponse ? error.errorResponse.errmsg : "Error" })
            }
        }
    });

    router.get("/orders_with_users", async (req, res) => {
        try {
            const orders = await ordersCollection.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user_info"
                    }
                },
                {
                    $unwind: "$user_info"
                },
                {
                    $project: {
                        order_id: 1,
                        products: 1,
                        total_price: 1,
                        status: 1,
                        "user_info.username": 1,
                        "user_info.email": 1,
                        "user_info.age": 1,
                        "user_info.orders": 1
                    }
                }
            ])
            res.send(orders);
        } catch (e) {
            res.send(e);
        }
    });

    //Create a new order for product 2001
    //ibtissem boualam chahd malak


    //Create order
    router.post('/', async (req, res) => {
        const newOrder = req.body;
        await ordersCollection.create(newOrder).then(response => {
            res.send({ payload: response })
        });
    });

    return router
}