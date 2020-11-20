import axios from 'axios'

// import { useSelector } from 'react-redux'

export const createOrUpdateUser = async (authtoken, role) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{role},
		
		{
			headers: {
				authtoken,
				
			},
		},
	)
}

export const currentuser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/curent-user`,
		{},
		{
			headers: {
				authtoken,
			},
		},
	)
}


//curent admin

export const currentAdmin = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/curent-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		},
	)
}
export const currentManger = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/curent-manger`,
		{},
		{
			headers: {
				authtoken,
			},
		},
	)
}
export const currentEmployee = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/curent-employee`,
		{},
		{
			headers: {
				authtoken,
			},
		},
	)
}



// /curent-owner
export const currentOwner = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/curent-owner`,
		{},
		{
			headers: {
				authtoken,
			},
		},
	)
}







