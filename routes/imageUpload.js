const router = require("express").Router();
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
         console.log(file)
         cb (null, Date.now() + path.extname(file.originalname))
    }

})
 const upload = multer({storage: storage})


 router.get("/form",(req,res)=>{
    res.render("upload")
 })

router.post("/upload", upload.single("image"),  (req,res)=>{
    res.json("uploaded image");
})



module.exports = router