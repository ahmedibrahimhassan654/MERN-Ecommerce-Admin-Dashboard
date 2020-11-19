import React, { useEffect, useState } from 'react'
import { auth } from '../../firbase'
import { toast } from 'react-toastify'
import './register.css'
import { useSelector ,connect} from 'react-redux'
import {setAlert}from '../../actions/alert'

const Register = ({ history,setAlert}, ) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		if (user && user.token && user.role === 'owner')
			history.push('/owner/dashbord')
	}, [user, history])

	const handelSubmit = async (e) => {
		e.preventDefault()
		setRole(role)
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		}
		await auth.sendSignInLinkToEmail(email, config)
		toast.success(
			`Email is sent to ${email} ,click the link to complete your registeration`,
      )
      setAlert(`Email is sent to ${email} ,click the link to complete your registeration`,'sucess')
		//save user email in local storage
		window.localStorage.setItem('emailForRegisteration', email)

		//save user role in local storage
		window.localStorage.setItem('registerRole', role)
		//clear state
		setEmail('')

		console.log(` user role now is ${role}`)
	}
		
	const registerForm = () => (
		<form onSubmit={handelSubmit}>
			<input
				type='email'
				placeholder='Enter valid email'
				className='form-control'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
			/>
	  {/* <Checkbox 
	  value='owner' 
	  onChange={(e)=>{
		console.log(setRole(e.target.value));
		}}>
		Checkbox</Checkbox> */}
    <br></br>
			<button
				type='submit'
				className='btn btn-raised btn-outline-primary mt-3 '
			>
				Register
			</button>
		</form>
	)

	return (
		<div className='container p-5 header'>
			<div className='row'>
				<div className='col-6 offset-lg-3'>
					<h4 className='mb-3'>Register "IT IS FREE"</h4>
					{registerForm()}
				</div>
				<div className='col-6 offset-lg-3 benifits'>
					<h4>benifits</h4>

					<li>test</li>
					<li>test</li>
					<li>test</li>
				</div>
			</div>
		</div>
	)
}

export default connect(null,{setAlert}) (Register);
