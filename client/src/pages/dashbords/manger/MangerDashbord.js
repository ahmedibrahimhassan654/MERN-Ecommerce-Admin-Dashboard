import React from 'react'
import MangerNav from '../../../components/nav/MangerNav'
import './userdashbord.css'

import { Layout } from 'antd'

const { Content } = Layout

const MangerDashbord = () => {
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
									Manger Dash Bord
								</div>
							</Content>
						</Layout>
					</div>
				</div>
			</div>
		</>
	)
}

export default MangerDashbord
