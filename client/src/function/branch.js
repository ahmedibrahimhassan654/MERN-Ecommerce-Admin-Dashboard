import axios from 'axios'

export const createBranch = async (branch, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/branches/owner`, branch, {
		headers: {
			authtoken,
		},
	})