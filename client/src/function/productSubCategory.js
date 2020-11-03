import axios from 'axios'

export const getSubCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/subs`)

export const getSubCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const removeSubCategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
		headers: {
			authtoken,
		},
	})

export const updateSubCategory = async (slug, sub, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
		headers: {
			authtoken,
		},
	})

export const createSubCategory = async (sub, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
		headers: {
			authtoken,
		},
	})
