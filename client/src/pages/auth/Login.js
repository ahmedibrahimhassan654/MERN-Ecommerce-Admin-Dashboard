import React, { useEffect, useState } from 'react'
import { auth, googleAuthProvider } from '../../firbase'
import { useDispatch, useSelector } from 'react-redux'
// import { redirectBasedOnRole } from '../../function/redirectBasedOnRole'
import { toast } from 'react-toastify'
import { Button, Form, Input } from 'antd'
import {
	DollarCircleTwoTone,
	LoadingOutlined,
	GoogleOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from '../../function/auth'



const Login = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setloading] = useState(false)
	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		let intended = history.location.state
		if (intended) {
			return
		} else {
			if (user && user.token && user.role) history.push('/')
		}

	}, [user, history])
	const redirectBasedOnRole = (res) => {

		let intended = history.location.state
		if (intended) {
			history.push(intended.from)
		} else {

			if (res.data.role === 'admin') {
				history.push('/admin/dashboard')
			} else if (res.data.role === 'owner') {
				history.push('/owner/dashboard')
			} else if (res.data.role === 'manger') {
				history.push('/manger/dashboard')
			} else if (res.data.role === 'employee') {
				history.push('/employee/dashboard')
			} else {
				history.push('/user/history')
			}
		}

	}

	let dispatch = useDispatch()




	const loginWithGoogle = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result
				const IdTokenResult = await user.getIdTokenResult()

				createOrUpdateUser(IdTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: IdTokenResult.token,
								role: res.data.role,
								picture: res.data.picture,
								_id: res.data._id,
							},
						})

						redirectBasedOnRole(res)
					})
					.catch((err) => console.log(err))
			})
			.catch((err) => {
				console.log(err)
				toast.error(err.message)
			})
	}
	const handelSubmit = async (e) => {
		e.preventDefault()
		setloading(true)

		try {
			const result = await auth.signInWithEmailAndPassword(email, password)

			const { user } = result
			const IdTokenResult = await user.getIdTokenResult()

			createOrUpdateUser(IdTokenResult.token)
				.then((res) => {
					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: user.email.split('@')[0],
							email: res.data.email,
							token: IdTokenResult.token,
							role: res.data.role,
							picture: res.data.picture,
							_id: res.data._id,
						},
					})
					redirectBasedOnRole(res)
				})
				.catch((err) => console.log(err))

			// history.push('/')
		} catch (error) {
			console.log(error)
			toast.error(error.message)
			setloading(false)
		}
	}
	const loginForm = () => (
		<form onSubmit={handelSubmit}>
			<input
				type='email'
				placeholder='Enter valid email'
				className='form-control'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
			/>
			<br />
			{/* <input
				type='password'
				placeholder='Enter valid password'
				className='form-control'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoFocus
			/> */}
			<Form.Item

				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				className='mx-auto '

			>
				<Input.Password
					placeholder='Enter  Password'
					type='password'
					className='form-control '
					onChange={(e) => setPassword(e.target.value)}
					disabled={loading}
					value={password}
					autoFocus
				/>
			</Form.Item>
			<Button
				onClick={handelSubmit}
				className='mt-3'
				type='primary'
				block
				shape='round'
				icon={
					<DollarCircleTwoTone
						style={{
							fontSize: '20px',
							color: '#08c',
							justifyContent: 'center ',
						}}
					/>
				}
				size='large'
				disabled={!email || password.length < 6}
			>
				Login Now
			</Button>

			<Button
				onClick={loginWithGoogle}
				className='mt-3'
				type='danger'
				block
				shape='round'
				icon={
					<GoogleOutlined
						style={{
							fontSize: '20px',
							color: 'white',
							justifyContent: 'center ',
						}}
					/>
				}
				size='large'
			>
				Login with google
			</Button>
			<Link to='/forgot/password' className='float-right text-danger mt-3'>
				Forgot Password
			</Link>
		</form>
	)

	return (
		<div className='container p-5 header'>
			<div className='row'>
				<div className='col-6 offset-lg-3'>
					{!loading ? (
						<h4>log in</h4>
					) : (
						<LoadingOutlined style={{ fontSize: '100px', color: '#08c' }} />
					)}
					{loginForm()}
				</div>
			</div>
		</div>
	)
}

export default Login
