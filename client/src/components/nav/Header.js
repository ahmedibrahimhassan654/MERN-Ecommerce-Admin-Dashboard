import React, { useState } from 'react';

import { Menu, Avatar, notification } from 'antd'
import {
	GroupOutlined,
	TeamOutlined,

	UserOutlined,
	LoginOutlined,
	LogoutOutlined,
	ProfileOutlined,
	SmileOutlined,
	ShopOutlined,
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";
import SearchComp from '../forms/SearchComp';
//import { toast } from 'react-toastify';
const { SubMenu, Item } = Menu;


const Header = () => {
	const [current, setCurrent] = useState('home')

	let dispatch = useDispatch()

	const { user } = useSelector((state) => ({ ...state }))

	let history = useHistory()

	const handleClick = (e) => {
		setCurrent(e.key)
	}


	const openNotificationWithIcon = () => {
		notification.open({
			message: 'Logout Message',
			description: 'Thanks For using our services hope see you soon ',
			icon: <SmileOutlined style={{ color: '#108ee9' }} />,
		})
	}
	const logout = () => {
		firebase.auth().signOut()
		dispatch({
			type: 'LOG_OUT',

			payload: null,
		})
		// toast.info('you loged out see you soon ')
		openNotificationWithIcon('sucess')
		history.push('/')
	}
	const redirectToRoleDashbord = (e) => {

		if (user.role === 'admin') {
			history.push('/admin/dashboard')

		}

		else if (user.role === 'employee') {
			history.push('/employee/dashboard')
		} else if (user.role === 'owner') {
			history.push('/owner/dashboard')
		} else if (user.role === 'manger') {
			history.push('/manger/dashboard')
		} else {
			history.push('/user/dashboard')
		}
	}

	return (
		<>

			<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' type="flex">




				<Item
					className="p-3 mb-2 ml-5  mr-5 text-black "
					key='home'
					icon={<GroupOutlined style={{ fontSize: '16px', color: '#08c' }} />}
				>
					<Link to='/'>Home </Link>
				</Item>

				<Item
					className="p-3 mb-2 ml-5  mr-5 text-black "
					key='Shop'
					icon={<ShopOutlined style={{ fontSize: '16px', color: '#08c' }} />}
				>
					<Link to='/shop'>Shop </Link>
				</Item>




				{
					!user && (
						<>

							<Item
								// className="float-end"
								className="p-3 mb-2  ml-5 text-black "

								key='login'
								icon={<LoginOutlined style={{ fontSize: '16px', color: '#08c' }} />}
							>
								<Link to='/login'>Login</Link>
							</Item>

							<Item
								className="p-3 mb-2 ml-5  text-black "
								key='register'
								icon={<TeamOutlined style={{ fontSize: '16px', color: '#08c' }} />}
							>
								<Link to='/register'>Register</Link>
							</Item>

						</>
					)
				}



				{
					user && (
						<>
							<SubMenu
								key='User Name'
								className='p-3 mb-2 '
								icon={
									<Avatar

										icon={<UserOutlined />}
										src={user.picture}
										className='mr-2 mt-2 m-2 '
										size={50}
									/>
								}
								// title={user.email && user.email.split('@')[0]}
								title={user.name}
							>
								<Item
									key='username 1'
									icon={
										<ProfileOutlined style={{ fontSize: '30px', color: '#08c' }} />
									}
									onClick={redirectToRoleDashbord}
								>
									DashBoard
								</Item>

								<Item
									icon={
										<LogoutOutlined style={{ fontSize: '30px', color: '#08c' }} />
									}
									onClick={logout}
								>
									logout
								</Item>
							</SubMenu>
						</>
					)
				}
				<SearchComp className='mr-2 mt-2 ' />
			</Menu >
		</>

	)
};

export default Header;
