import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LodingToRedirect from './LodingToRedirect'

const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	return user && user.token ? <Route {...rest} /> : <LodingToRedirect />
}

export default UserRoute
