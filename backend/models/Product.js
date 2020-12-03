const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  branches: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  
  }
],
  title: {
    type: String,
    required: [true, 'please add product name '],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
    text:true//used when use search
  },
  slug: {
    type: String,
    unique:true,
   lowercase:true,
   index:true
  },

  description: {
    type: String,
    required: [true, 'please add product description '],
    maxlength: [500, 'description can not be more than 50 characters'],
    text:true //used when use search
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: [32, 'price can not be more than 32 characters'],
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProductCategory'
  },
   subs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProductSub'
  }],

  quantity: {
    type: Number,
  },
  sold:{
    type:Number,
    default:0
  },

  images: {
   type:Array,
  },
 
//   ratings: [
//     {
//   star:Number,
//   postedBy:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User'
//   }
//   }
// ],
  shipping: {
    type: String,
    enum:['Yes','No']
  },
 quality: {
    type: String,
    enum:['Original','Hieght Quality','Used']
  },

warrantyAvailable:{
 type: String,
   enum:['Yes','No']
},

  madeIn: {
    type: String,
  },

cratedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
},
  
},
{ timestamps: true }
);



module.exports = Product = mongoose.model('product', ProductSchema);
