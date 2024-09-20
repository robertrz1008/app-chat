import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, cb) => {
        const originalName= file.originalname
        const ext = path.extname(originalName)
        const uniqueSuffix = Date.now() + "-facichat-" + ext
        cb(null, uniqueSuffix)
    }
})

const upload = multer({
    storage: storage
}).single('image');

export default upload