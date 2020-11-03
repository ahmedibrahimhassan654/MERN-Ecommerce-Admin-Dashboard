import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LodingToRedirect from './LodingToRedirect'
import { currentEmployee } from '../../function/auth'

const EmployeeRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [ok, setOk] = useState(false)
	useEffect(() => {
		if (user && user.token) {
			currentEmployee(user.token)
				.then((res) => {
					console.log('current manger response', res)
					setOk(true)
				})
				.catch((err) => {
					console.log('manger route error', err)
					setOk(false)
				})
		}
	}, [user])

	return ok ? <Route {...rest} /> : <LodingToRedirect />
}

export default EmployeeRoute
