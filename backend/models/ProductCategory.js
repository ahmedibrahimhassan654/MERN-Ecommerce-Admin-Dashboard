const mongoose = require('mongoose')
const { transliterate, slugify } = require('transliteration')

const productCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'please add an category name'],
			minlength: [3, 'too short'],
			maxlength: [100, 'Too Long'],
			unique: true
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'please add  category description'],
			minlength: [3, 'too short'],
			maxlength: [100, 'Too Long'],
		},
		slug: {
			type: String,
			lowercase: true,
			index: true,
			unique: true,
		},

	},
	{ timestamps: true },
)

productCategorySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	this.tr = transliterate(this.name)
	next()
})
// productCategorySchema.index({ name: 1, slug: 1,tr:1 }, { unique: true});
module.exports = mongoose.model('ProductCategory', productCategorySchema)
