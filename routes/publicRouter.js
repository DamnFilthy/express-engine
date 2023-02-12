const express = require('express')
const publicRouter = express.Router()
const getScriptLocation = require("../utils/getScript");

publicRouter.get('/', async (req, res) => {
    try {
        const pageScriptVendor = getScriptLocation('jsTypeVendor'),
            pageScriptMain = getScriptLocation('jsTypeMain'),
            pageScript = getScriptLocation('jsType', 'home'),
            pageCssVendor = getScriptLocation('cssTypeVendor'),
            pageCssMain = getScriptLocation('cssTypeMain'),
            pageCss = getScriptLocation('cssType', 'home');

        res.status(200)
        res.render('pages/home/home', {
            title: 'Main Page',
            pageTitle: 'Главная страница',
            pageScriptVendor,
            pageScriptMain,
            pageScript,
            pageCssVendor,
            pageCssMain,
            pageCss
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/about', async (req, res) => {
    try {
        const pageScriptVendor = getScriptLocation('jsTypeVendor'),
            pageScriptMain = getScriptLocation('jsTypeMain'),
            pageScript = getScriptLocation('jsType', 'about'),
            pageCssVendor = getScriptLocation('cssTypeVendor'),
            pageCssMain = getScriptLocation('cssTypeMain'),
            pageCss = getScriptLocation('cssType', 'about');

        res.status(200)
        res.render('pages/about/about', {
            title: 'О нас',
            pageTitle: 'Страница о нас',
            pageScriptVendor,
            pageScriptMain,
            pageScript,
            pageCssVendor,
            pageCssMain,
            pageCss
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