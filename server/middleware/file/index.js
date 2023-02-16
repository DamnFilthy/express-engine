const multer = require('multer')
const mainPath = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, mainPath + '/server/uploads/files')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})