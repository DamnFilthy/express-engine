const fs = require('fs');

const types = {
    cssType: 'public/css/pages/',
    cssTypeMain: 'public/css/styles/main',
    cssTypeVendor: 'public/css/styles/vendor',
    jsType: 'public/js/pages/',
    jsTypeMain: 'public/js/js-main/',
    jsTypeVendor: 'public/js/js-vendor/'
}

function getScriptLocation(type, page=false) {
    try {
        if(page) {
            const [nameScript] = fs.readdirSync(types[type] + page);
            return `/${types[type]}${page}/${nameScript}`;
        } else {
            const [nameScript] = fs.readdirSync(types[type]);
            return `/${types[type]}/${nameScript}`;
        }

    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = getScriptLocation