import { Router } from "express"


export default ({ config, db }) => {
    let router = Router()

    //Create new user

    //get all users that have 2 orders and more 
    //AND at least one of the orders 
    //has a product with qty >= 2
    //yassine myriam    
    //fatma sellami

    // Create new user with dummy data
    router.post('/add_user', async (req, res) => {
        try {
            const new_user = req.body
            const user = await usersCollection.create(new_user)
            res.send(user)
        } catch (e) {
            res.send(e)
        }
    })

    //get all users that have 2 orders and more
    //AND at least one of the orders
    //has a product with qty >= 2
    router.get("/users_with_orders", async (req, res) => {
        try {
            const users = await usersCollection.aggregate([
                {
                    $lookup: {
                        // jointure de users and orders key=user en commun
                        from: "orders",
                        localField: "_id",
                        foreignField: "user",
                        as: "orders", //nv nom joined collections
                    },
                },
                {
                    $match: {
                        //projection
                        $and: [
                            { "orders.1": { $exists: true } }, // au moins 2 orders
                            { "orders.products.quantity": { $gte: 2 } }, //  product with qty >= 2
                        ],
                    },
                },
                {
                    $project: {
                        username: 1,
                        orders: 1
                    }
                }
            ]);
            res.json(users);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching the users." });
        }
    });

    router.get("/late_age", async (req, res) => {
        try {

            const users = await usersCollection.aggregate([
                {
                    $match: { age: { $gt: 25 } }
                },
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "user",
                        as: "related_orders"
                    }
                },
                {
                    $unwind: "$related_orders"
                },
                {
                    $unwind: '$related_orders.products'
                },
                {
                    $project: {
                        username: 1,
                        email: 1,
                        "related_orders.order_id": 1,
                        "related_orders.products": 1
                    }
                }
            ])
            res.send(users)
        } catch (error) {
            res.send(error)
        }
    })


    router.post("/", async (req, res) => {
        try {
            const user = await usersCollection.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });




    //

    return router
}