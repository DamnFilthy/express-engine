const express = require('express')
const publicRouter = express.Router()

publicRouter.get('/', async (req, res) => {
    try {
        res.status(200)
        res.render('pages/home/home', {
            title: 'Main Page',
            pageTitle: 'Главная страница',
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/about', async (req, res) => {
    try {
        res.status(200)
        res.render('pages/about/about', {
            title: 'О нас',
            pageTitle: 'Страница о нас',
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/analytics', async (req, res) => {
    try {
        res.status(200)
        res.render('pages/analytics/analytics', {
            title: 'Аналитика',
            pageTitle: 'Аналитическая статистика',
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})
module.exports = publicRouter