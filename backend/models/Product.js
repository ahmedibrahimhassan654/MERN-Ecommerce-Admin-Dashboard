const mongoose = require('mongoose');

const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'please add product name '],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
  },
  slug: String,

  description: {
    type: String,
    required: [true, 'please add product description '],

    maxlength: [500, 'description can not be more than 50 characters'],
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
  },

  photo: {
    data: Buffer,
    type: [String],
    default: 'photo-img.jpg',
  },
 
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at lest 1'],
    max: [10, 'Rating can not be more than 10 '],
  },
  transportationAvailable: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

//create product slug from the name
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

module.exports = Product = mongoose.model('product', ProductSchema);
