const fs = require('fs');

const types = {
    cssType: 'public/css/pages/',
    cssTypeMain: 'public/css/styles/main',
    cssTypeVendor: 'public/css/styles/vendor',
    cssTypeComponent: 'public/css/components/',
    jsType: 'public/js/pages/',
    jsTypeMain: 'public/js/js-main/',
    jsTypeVendor: 'public/js/js-vendor/',
    jsTypeComponent: 'public/js/components/'
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

function getAllScripts(name, componentsArr=null) {
    const pageScriptVendor = getScriptLocation('jsTypeVendor'),
        pageScriptMain = getScriptLocation('jsTypeMain'),
        pageScript = getScriptLocation('jsType', name),
        pageCssVendor = getScriptLocation('cssTypeVendor'),
        pageCssMain = getScriptLocation('cssTypeMain'),
        pageCss = getScriptLocation('cssType', name);

    let components = {}
    if (componentsArr && componentsArr.length > 0) {
        componentsArr.forEach(component => {
            components[component] = {
                cssScript: getScriptLocation('cssTypeComponent', component),
                jsScript: getScriptLocation('jsTypeComponent', component)
            }
        })
    }
    return {pageScriptVendor, pageScriptMain, pageScript, pageCssVendor, pageCssMain, pageCss, components}
}

module.exports = {getScriptLocation, getAllScripts}