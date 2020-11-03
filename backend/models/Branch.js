const mongoose=require('mongoose')


const BranchSchema=new mongoose.Schema({
   name:{
      type:String,
      required:[true,'please add a name for branch'],
      unique:true,
      trim:true,
      maxlength:[50,'name can not be more than 50 characters']
   },
   slug: String,
   description: {
      type:String,
      required:[true,'please add a name for branch'],
      trim:true,
      maxlength:[500,'name can not be more than 500 characters']
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
   location: {
      type: {
        type: String, 
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
         required: true,
        index:'2dsphere'
      }
   },
   images:[String] ,
   documents: [String],
   present: {
      type: String,
      enum: ['products', 'Services'],
      default:'products'
   },
   trAvailable: {
      type: Boolean,
      default:false
   },
   adminAccept: {
      type: Boolean,
      default:false
   },
   

}, { timestamps: true });

module.exports = mongoose.model('Branch', BranchSchema);