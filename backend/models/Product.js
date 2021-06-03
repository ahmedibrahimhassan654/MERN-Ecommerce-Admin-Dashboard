const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
	{	
		branch:{	
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Branch',
				autopopulate: { select: '_id name', maxDepth: 1 },
			},
		// branches: [
		// 	{
		
			
		// 	// quantity:{
		// 	// 	type:Number
		// 	// }
		// 	}
		// ],
		title: {
			type: String,
			required: [true, 'please add product name '],
			trim: true,
			maxlength: [50, 'name can not be more than 50 characters'],
			text: true, //used when use search
		},
		slug: {
			type: String,
			unique: false,
			lowercase: true,
			index: true,
		},

		description: {
			type: String,
			required: [true, 'please add product description '],
			maxlength: [500, 'description can not be more than 50 characters'],
			text: true, //used when use search
			trim: true,
		},
	
		quantity: {
			type: Number,
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
			autopopulate: { select: '_id name ', maxDepth: 1 },
		},
		subs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProductSub',
			},
		],
		


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
			autopopulate: { select: '_id name email', maxDepth: 1 },
		},
	},
	{ timestamps: true }
);

ProductSchema.plugin(require('mongoose-autopopulate'))

module.exports = Product = mongoose.model('Product', ProductSchema);
