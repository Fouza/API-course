import { Router } from "express"


export default ({ config, db }) => {
    let router = Router()

    router.get('/', (req, res) => {
        res.send({ test: 1 })
    })

    return router
}