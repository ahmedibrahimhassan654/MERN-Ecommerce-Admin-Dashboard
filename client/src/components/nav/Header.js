import React, { useState } from 'react';

import { Menu, Avatar, notification } from 'antd'
import {
	GroupOutlined,
	TeamOutlined,
	IdcardOutlined,
	UserAddOutlined,
	UserOutlined,
	LoginOutlined,
	LogoutOutlined,
	ProfileOutlined,
	SmileOutlined,
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
		console.log(e)
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
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' >


			<Item
				key='home'
				icon={<GroupOutlined />}
			>
				<Link to='/'>Home </Link>
			</Item>




			{!user && (
				<>

					<Item
						className="float-end"
						key='login'
						icon={<LoginOutlined />}
					>
						<Link to='/login'>Login</Link>
					</Item>

					<Item
						className="float-end"
						key='customer'
						icon={<TeamOutlined />}
					>
						<Link to='/register'>Register</Link>
					</Item>

				</>
			)}



			{user && (
				<>
					<SubMenu
						key='User Name'
						// className='float-right '
						icon={
							<Avatar

								icon={<UserOutlined />}
								src={user.picture}
								className='mr-2 mt-2 m-2 '
								size={40}
							/>
						}
						// title={user.email && user.email.split('@')[0]}
						title={user.name}
					>
						<Item
							key='username 1'
							icon={
								<ProfileOutlined style={{ fontSize: '20px', color: '#08c' }} />
							}
							onClick={redirectToRoleDashbord}
						>
							DashBoard
						</Item>

						<Item
							icon={
								<LogoutOutlined style={{ fontSize: '20px', color: '#08c' }} />
							}
							onClick={logout}
						>
							logout
						</Item>
					</SubMenu>
				</>
			)}
			<SearchComp />
		</Menu>


	)
};

export default Header;
