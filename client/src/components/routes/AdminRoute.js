import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LodingToRedirect from './LodingToRedirect'
import { currentAdmin } from '../../function/auth'

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [ok, setOk] = useState(false)
	useEffect(() => {
		if (user && user.token) {
			currentAdmin(user.token)
				.then((res) => {
					console.log('current admin response', res)
					setOk(true)
				})
				.catch((err) => {
					console.log('admin route error', err)
					setOk(false)
				})
		}
	}, [user])

	return ok ? <Route {...rest} /> : <LodingToRedirect />
}

export default AdminRoute
