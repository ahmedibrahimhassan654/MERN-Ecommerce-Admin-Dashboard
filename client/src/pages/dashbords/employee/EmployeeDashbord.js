import React from 'react'
import EmployeeNav from '../../../components/nav/EmployeeNav'
import './userdashbord.css'

import { Layout } from 'antd'

const { Content } = Layout

const EmployeeDashboard = () => {
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='colmd-2'>
						<EmployeeNav />
					</div>
					<div className='col'>
						<Layout className='site-layout' style={{ minHeight: '100vh' }}>
							<Content style={{ margin: '0 0px' }}>
								<div
									className='site-layout-background'
									style={{ padding: 0, minHeight: '100vh', margin: 0 }}
								>
									Employee Dash Board
								</div>
							</Content>
						</Layout>
					</div>
				</div>
			</div>
		</>
	)
}

export default EmployeeDashboard
