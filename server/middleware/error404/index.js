const rfr = require('rfr');
const {getScriptLocation} = rfr("./server/utils/getScripts");

module.exports = (req, res) => {
    const pageStyle = getScriptLocation('cssType', 'error404');
    res.status(404)
    res.render('pages/error404/error404', {pageStyle})
}