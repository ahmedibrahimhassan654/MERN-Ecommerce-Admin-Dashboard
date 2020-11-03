const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			index: true,
		},
		role: {
			type: String,
			enum: ['user', 'owner', 'manger', 'employee', 'admin'],
			default: 'user',
		},
		cart: {
			type: Array,
			default: [],
		},
		address: String,
		//   wishlist: [{ type: ObjectId, ref: "Product" }],
		picture: String,
	},
	{ timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
