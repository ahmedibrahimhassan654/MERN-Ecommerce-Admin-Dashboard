import React, { useState } from 'react'
import MangerNav from '../../../components/nav/MangerNav'
import './userdashbord.css'
import { Layout, Form, Input, Button } from 'antd'
import { auth } from '../../../firbase'
import { toast } from 'react-toastify'
const { Content } = Layout

const Password = () => {
	const [password, setpassword] = useState('')

	const [loading, setloading] = useState('')
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	}

	const tailLayout = {
		wrapperCol: {
			offset: 8,
			span: 16,
		},
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setloading(true)
		console.log(password)
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setloading(false)
				setpassword('')
				toast.success('password updated')
			})
			.catch((err) => {
				setloading(false)
				toast.error(err.message)
			})
	}

	const passwordUpdateForm = () => (
		<Form
			{...layout}
			name='basic'
			initialValues={{ remember: true }}
			onSubmitCapture={handleSubmit}
			// onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label='New Password'
				name='password'
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				className='mx-auto '
			>
				<Input.Password
					placeholder='Enter New Password'
					type='password'
					className='form-control '
					onChange={(e) => setpassword(e.target.value)}
					disabled={loading}
					value={password}
				/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button
					disabled={!password || loading || password.length < 6}
					type='primary'
					htmlType='submit'
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='colmd-2'>
						<MangerNav />
					</div>
					<div className='col'>
						<Layout className='site-layout' style={{ minHeight: '100vh' }}>
							<Content style={{ margin: '0 0px' }}>
								<div
									className='site-layout-background'
									style={{ padding: 0, minHeight: '100vh', margin: 0 }}
								>
									{loading ? (
										<h4 className='primary'>loading</h4>
									) : (
										<h4 className='primary'>update password</h4>
									)}
									{passwordUpdateForm()}
								</div>
							</Content>
						</Layout>
					</div>
				</div>
			</div>
		</>
	)
}

export default Password
