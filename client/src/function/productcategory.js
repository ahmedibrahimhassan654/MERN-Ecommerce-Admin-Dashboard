import axios from 'axios'

export const getCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/productcategories`)

export const getCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/productcategory/${slug}`)

export const removeCategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/productcategory/${slug}`, {
		headers: {
			authtoken,
		},
	})

export const updateCategory = async (slug, category, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/productcategory/${slug}`,
		category,
		{
			headers: {
				authtoken,
			},
		},
	)

export const createCategory = async (category, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/productcategory`, category, {
		headers: {
			authtoken,
		},
	})
