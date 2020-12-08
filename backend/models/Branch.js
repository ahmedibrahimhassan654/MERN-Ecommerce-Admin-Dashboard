const mongoose=require('mongoose')
const { transliterate, slugify } = require('transliteration')


const BranchSchema = new mongoose.Schema({
   owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      autopopulate: { select: '_id name email', maxDepth: 1 },
      // required:true
   },

   name:{
      type:String,
      trim:true,
      maxlength: [50, 'name can not be more than 50 characters'],
      text: true,//used when use search
     required:true

   },
   slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
   },

   description: {
      type:String,
      
      trim:true,
      maxlength: [500, 'name can not be more than 500 characters'],
      
   },
   email: {

      type: String,
      match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please use valid email']
   },
   phone: {
      type: String,
      maxlength:[20,'please number can not be longer than 20 characters']
   },
   addressLine: String,
	district: String,
   country:String,
   province: String,
   // location: {
   //    type: {
   //      type: String, 
   //      enum: ['Point'], // 'location.type' must be 'Point'
   //    //   required: true
   //    },
   //    coordinates: {
   //      type: [Number],
   //       // required: true,
   //       index: '2dsphere'
        
   //    }
   // },
   images:{
      type:Array
   } ,
   documents: {
     type:Array
   },
   present: {
      type: String,
      enum: ['products', 'services'],
      default:'products'
   },
   trAvailable: {
      type: String,
       enum:['Yes','No']
   },
   adminAccept: {
      type: Boolean,
      default: false,
      required:true
   },
   // mangers: [
   //    {
        
   //    type: mongoose.Schema.ObjectId,
   //    ref: 'User',
   //    //autopopulate: { select: '_id name email', maxDepth: 1 }
   //    },
         
      
   // ]
   
        
      
   


}, { timestamps: true });

// BranchSchema.pre('save', function (next) {
// 	this.slug = slugify(this.name, { lower: true })
	
// 	next()
// })

BranchSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Branch', BranchSchema);