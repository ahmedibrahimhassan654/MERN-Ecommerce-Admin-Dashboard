import React, { useState, useEffect } from 'react'
import { auth } from '../../firbase'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { createOrUpdateUser } from '../../function/auth'

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	// const { user } = useSelector((state) => ({ ...state }))
	let dispatch = useDispatch()
	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegisteration'))
		setRole(window.localStorage.getItem('registerRole'))
   
      console.log(window.localStorage.getItem('emailForRegisteration'));
      console.log(window.localStorage.getItem('registerRole'));
   }, [])

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	}

	const handelSubmit = async (e) => {
		e.preventDefault()
		//validation
		if (!email || !password) {
			toast.error('email and password is required')
			return
		}
		if (password.length < 6) {
			toast.error('password should be at least 6 character long')
			return
		}

		try {
			const result = await auth.signInWithEmailLink(email, window.location.href)
			console.log(result)
			if (result.user.emailVerified) {
				//remove user email from local storage
				window.localStorage.removeItem('emailForRegisteration', 'registerRole')

				//get user id token
				let user = auth.currentUser
				console.log(user)
				await user.updatePassword(password)
				const idTokenResult = await user.getIdTokenResult()

				//redux store
				console.log('user', user, 'idtoken', idTokenResult, 'role', role)

				createOrUpdateUser(idTokenResult.token, role)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								picture: res.data.picture,
								_id: res.data._id,
							},
						})
					})
					.catch((err) => console.log(err))

				//redirect
				history.push('/')
			}
      } catch (error) {
         console.log(error);
			toast.warning(error.message)
		}
	}
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	}
	const completeRegisterForm = () => (
		<Form
			{...layout}
			name='basic'
			initialValues={{ remember: true }}
			onSubmitCapture={handelSubmit}
		>
			<Form.Item
				label='Email'
            name='email'
            value={email}
				//rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<Input type='email' value={email} disabled />
         </Form.Item>
         

			<Form.Item
				label='Password'
				name='password'
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password
					type='password'
					placeholder='Enter valid password'
					className='form-control mt-3'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
					autoFocus
				/>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					Register Complete
				</Button>
			</Form.Item>
		</Form>
		// {/* // <form onSubmit={handelSubmit}>
		// // 	<input
		// 		type='email'
		// 		placeholder='Enter valid email'
		// 		className='form-control'
		// 		value={email}
		// 		disabled
		// 	/>
		// 	<input type='role' className='form-control' value={role} disabled />
		// 	<input
		// 		type='password'
		// 		placeholder='Enter valid password'
		// 		className='form-control mt-3'
		// 		value={password}
		// 		onChange={(e) => {
		// 			setPassword(e.target.value)
		// 		}}
		// 		autoFocus
		// 	/>

		// 	<br />
		// 	<button
		// 		type='submit'
		// 		className='btn btn-raised btn-outline-primary mt-3 '
		// 	>
		// 		Register Complete
		// 	</button>
		// </form> */}
	)

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-6 offset-lg-3'>
					<h4 className='md-3'>Register Complete</h4>
					{completeRegisterForm()}
				</div>
			</div>
		</div>
	)
}

export default RegisterComplete
