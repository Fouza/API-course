import { Router } from 'express'

export default ({ config, db }) => {

    let router = Router()

    router.get('/', (req, res) => {
        res.render('index', { title: 'HOLAA', message: 'HOLAA!' })
    })


    router.get('/email', (req, res) => {
        res.render('promotion_email', { name: 'TEST', couponCode: 'CODE1' })
    })


    return router
}