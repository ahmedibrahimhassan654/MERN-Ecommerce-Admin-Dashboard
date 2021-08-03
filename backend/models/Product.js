const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
	{


		title: {
			type: String,
			required: [true, 'please add product name '],
			trim: true,
			maxlength: [50, 'name can not be more than 50 characters'],
			text: true, //used when use search
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},

		description: {
			type: String,
			required: [true, 'please add product description '],
			maxlength: [5000, 'description can not be more than 5000 characters'],
			text: true, //used when use search
			trim: true,
		},

		quantity: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			maxlength: [32, 'price can not be more than 32 characters'],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProductCategory',

		},
		subs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProductSub',
			},
		],



		images: {
			type: Array,
		},


		shipping: {
			type: String,
			enum: ['Yes', 'No'],
		},
		quality: {
			type: String,
			enum: ['Original', 'Hieght Quality', 'Used'],
		},

		warrantyAvailable: {
			type: String,
			enum: ['Yes', 'No'],
		},

		madeIn: {
			type: String,
		},

		cratedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',

		},
		ratings: [
			{
				star: Number,
				postedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				advantage: String,
				disAdvantage: String
			}
		]
	},
	{ timestamps: true }
);



module.exports = Product = mongoose.model('Product', ProductSchema);
