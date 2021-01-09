const ErrorResponse = require('../utils/errorresponse')
const { transliterate, slugify } = require('transliteration')
const asyncHandler = require('../middelware/async')
const cloudinary=require('cloudinary')


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

exports.create =asyncHandler(async (req, res, next) => {
    let result=await cloudinary.uploader.upload(req.body.image,{
        // puplic_id:`${Date.now()}`,
        public_id: "carcarefolders/productimages",
        resource_type:'auto'
    })
    res.json({
        puplic_id:result.puplic_id,
        url:result.secure_url
    })


}) 

exports.remove = (req, res, next) => {
  let image_id = req.body.public_id;


  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
}
