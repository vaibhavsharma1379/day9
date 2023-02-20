const path=require("path");
const multer=require("multer");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"content");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage:storage,
    limits:{fieldSize:1000000*100},
    fileFilter:(req,file,cb)=>{
        const filetypes=/jpg|png|mp4|mkv|flv|mov|wmv|gif/;
    return cb(null,true);
    },
}).single("content")

module.exports=upload;