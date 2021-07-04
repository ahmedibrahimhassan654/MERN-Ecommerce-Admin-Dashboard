import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'

import OwnerNav from '../../../components/nav/OwnerNav'

import { useSelector } from 'react-redux'

const { Header, Content, Footer } = Layout

const OwnerDashbord = () => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	
	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<OwnerNav />
				<Layout className='site-layout'>
					<Header className='site-layout-background' style={{ padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<div
							className='site-layout-background'
							style={{ padding: 10, minHeight: '100%', margin: 0 }}
						>
							<div className='col'>
							<h4 className='text-danger'>Admin Dashboard</h4>
							

							</div>
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




export default OwnerDashbord
	;
