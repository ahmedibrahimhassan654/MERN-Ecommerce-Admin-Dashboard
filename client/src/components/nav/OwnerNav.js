import React, { useState } from 'react'

// import { useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import {
	UserOutlined,
	
   BranchesOutlined,
} from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import { useSelector } from 'react-redux'
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
				collapsible
				style={
					{
						// overflow: 'auto',
						// height: '100vh',
						// position: 'fixed',
						// left: 0,
					}
				}
				collapsed={collapse}
				onCollapse={SetCollapsed}
			>
				<div className='logo' />
				<p
					onClick={redirectToRoleDashbord}
					className='text-center p-2 m-3 bg-gradient-primary text-white bold border border-primary rounded-pill rounded-sm'
					key='dash board'
				>
					Owner Dash Bord
				</p>
				<Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
					<SubMenu
						key='Product Category'
						icon={<BranchesOutlined />}
						title='Branches'
					>
						{/* <Menu.Item
							key='productCategory'
							icon={<SafetyCertificateOutlined />}
							title='ProductCategory'
						>
							Product Category
							<Link className='nav-link' to='/admin/productCategory'></Link>
						</Menu.Item>

						<Menu.Item
							key='productSubCategory'
							icon={<SubnodeOutlined />}
							title='productSubCategory'
						>
							product Sub-Category
							<Link className='nav-link' to='/admin/productSubCategory'></Link>
						</Menu.Item> */}
					</SubMenu>

					<SubMenu key='sub1' icon={<UserOutlined />} title='profile'>
					
						<Menu.Item key='4'>
							<Link className='nav-link' to='/owner/password'>
								Password
							</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		</>
	)
}
export default OwnerNav
