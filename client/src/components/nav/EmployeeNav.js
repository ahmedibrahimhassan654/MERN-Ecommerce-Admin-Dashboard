import React, { useState } from 'react'

// import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Menu, Layout } from 'antd'
const { Sider } = Layout

const { SubMenu } = Menu
const EmployeeNav = () => {
	const [collapse, SetCollapsed] = useState()
	// const { user } = useSelector((state) => ({ ...state }))

	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapse} onCollapse={SetCollapsed}>
					<p className='text-center p-2 m-3 bg-gradient-primary text-white bold border border-primary rounded-pill rounded-sm'>
						Employee Options
					</p>
					<Menu theme='dark' defaultSelectedKeys={['sub1']} mode='inline'>
						<SubMenu key='sub1' icon={<UserOutlined />} title='Profile'>
							<Menu.Item key='3'>
								<Link className='nav-link' to='/employee/history'>
									History
								</Link>
							</Menu.Item>
							<Menu.Item key='4'>
								<Link className='nav-link' to='/employee/password'>
									Password
								</Link>
							</Menu.Item>
							<Menu.Item key='5'>
								{/* <Link className='nav-link' to='/user/WishList'>
									WishList
								</Link> */}
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
			</Layout>
		</>
	)
}
export default EmployeeNav
