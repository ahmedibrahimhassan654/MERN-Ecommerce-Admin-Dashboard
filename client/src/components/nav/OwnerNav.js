import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Menu, Layout } from 'antd'
const { Sider } = Layout

const { SubMenu } = Menu
const OwnerNav = () => {
	const [collapse, SetCollapsed] = useState()

	const { user } = useSelector((state) => ({ ...state }))

	let history = useHistory()
	const redirectToRoleDashbord = (e) => {
		console.log(e)
		if (user.role === 'admin') {
			history.push('/admin/dashboard')
		} else if (user.role === 'employee') {
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
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}
				collapsed={collapse}
				onCollapse={SetCollapsed}
			>
				<div className='logo' />
				<p
					onClick={redirectToRoleDashbord}
					className='text-center p-2 m-3 bg-gradient-primary text-white bold border border-primary rounded-pill rounded-sm'
				>
					Owner Options
				</p>
				<Menu theme='dark' defaultSelectedKeys={['sub1']} mode='inline'>
					<SubMenu key='sub1' icon={<UserOutlined />} title='Profile'>
						<Menu.Item key='5'>
							<Link className='nav-link' to='/owner/password'>
								Password
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
						<Menu.Item key='6'>Team 1</Menu.Item>
						<Menu.Item key='8'>Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key='9' icon={<FileOutlined />}>
						Files
					</Menu.Item>
					<Menu.Item key='1' icon={<PieChartOutlined />}>
						Option 1
					</Menu.Item>
					<Menu.Item key='2' icon={<DesktopOutlined />}>
						Option 2
					</Menu.Item>
				</Menu>
			</Sider>
			{/* <Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapse} onCollapse={SetCollapsed}>
					<p className='text-center p-2 m-3 bg-gradient-primary text-white bold border border-primary rounded-pill rounded-sm'>
						Owner Options
					</p>
					<Menu theme='dark' defaultSelectedKeys={['sub1']} mode='inline'>
						<SubMenu key='sub1' icon={<UserOutlined />} title='Profile'>
							<Menu.Item key='5'>
								<Link className='nav-link' to='/owner/password'>
									Password
								</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
							<Menu.Item key='6'>Team 1</Menu.Item>
							<Menu.Item key='8'>Team 2</Menu.Item>
						</SubMenu>
						<Menu.Item key='9' icon={<FileOutlined />}>
							Files
						</Menu.Item>
						<Menu.Item key='1' icon={<PieChartOutlined />}>
							Option 1
						</Menu.Item>
						<Menu.Item key='2' icon={<DesktopOutlined />}>
							Option 2
						</Menu.Item>
					</Menu>
				</Sider>
			</Layout> */}
		</>
	)
}
export default OwnerNav
