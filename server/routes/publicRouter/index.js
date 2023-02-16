const rfr = require('rfr');
const express = require('express')
const publicRouter = express.Router()
const {getScriptLocation, getAllScripts} = rfr("./server/utils/getScripts");
const fileMolter = rfr('./server/middleware/file')

publicRouter.get('/', async (req, res) => {
    try {
        const allScripts = getAllScripts('home', ['header', 'footer', 'sidebar'])
        res.status(200)
        res.render('pages/home/home', {
            title: 'Main Page',
            pageTitle: 'Главная страница',
            allScripts
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/about', async (req, res) => {
    try {
        const allScripts = getAllScripts('about', ['header', 'footer', 'sidebar'])
        res.status(200)
        res.render('pages/about/about', {
            title: 'О нас',
            pageTitle: 'Страница о нас',
            allScripts
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/analytics', async (req, res) => {
    try {
        const pageScriptVendor = getScriptLocation('jsTypeVendor'),
            pageScript = getScriptLocation('jsType', 'analytics'),
            pageCssVendor = getScriptLocation('cssTypeVendor');

        res.status(200)
        res.render('pages/analytics/analytics', {
            title: 'Аналитика',
            pageTitle: 'Аналитическая статистика',
            pageScriptVendor,
            pageScript,
            pageCssVendor,
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json(e)
    }
})

publicRouter.get('/add-file', (req, res) => {
    try {
        const allScripts = getAllScripts('add-file')
        res.status(200)
        res.render('pages/add-file/add-file', {allScripts})
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

})

publicRouter.post('/add-file', fileMolter.single('file'),
    async (req, res) => {
        res.status(201)
        res.redirect('/')
    })

module.exports = publicRouter