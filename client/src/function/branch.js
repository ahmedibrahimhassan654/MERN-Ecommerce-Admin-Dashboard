import axios from 'axios'

export const createBranch = async (branch, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/branches/owner`, branch, {
		headers: {
			authtoken,
		},
	})


	export const getMyBranches = async ( authtoken) =>
		await axios.get(`${process.env.REACT_APP_API}/branches/owner`, {
			headers: {
				authtoken,
			},
		});

		export const createProductForBranch = async (slug, authtoken) =>
			await axios.put(`${process.env.REACT_APP_API}/branches/owner/${slug}/products`, {
				headers: {
					authtoken,
				},
			});