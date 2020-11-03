import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LodingToRedirect from './LodingToRedirect'
import { currentOwner } from '../../function/auth'

const OwnerRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [ok, setOk] = useState(false)
	useEffect(() => {
		if (user && user.token) {
			currentOwner(user.token)
				.then((res) => {
					console.log('current owner response', res)
					setOk(true)
				})
				.catch((err) => {
					console.log('owner route error', err)
					setOk(false)
				})
		}
	}, [user])

	return ok ? <Route {...rest} /> : <LodingToRedirect />
}

export default OwnerRoute
