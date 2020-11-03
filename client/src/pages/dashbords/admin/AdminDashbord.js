import React from 'react'
import { Layout } from 'antd'

import AdminNav from '../../../components/nav/AdminNav'

const { Header, Content, Footer } = Layout

const AdminDashbord = () => {
	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<AdminNav />
				<Layout className='site-layout'>
					<Header className='site-layout-background' style={{ padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<div
							className='site-layout-background'
							style={{ padding: 10, minHeight: '100%', margin: 0 }}
						>
							Admin Dash Board
						</div>
						<Footer style={{ textAlign: 'center' }}>
							Ant Design ©2018 Created by Ant UED
						</Footer>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}
export default AdminDashbord
