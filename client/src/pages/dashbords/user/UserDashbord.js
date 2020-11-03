import React, {   } from 'react'
import UserNav from '../../../components/nav/UserNav'
import './userdashbord.css'

import { Layout } from 'antd'




const { Content} = Layout




const UserDashbord =()=> {
	
	

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='colmd-2'>
						<UserNav />
					</div>
					<div className='col'>
						<Layout className='site-layout' style={{ minHeight: '100vh' }}>
							<Content style={{ margin: '0 0px' }}>
								<div
									className='site-layout-background'
									style={{ padding: 0, minHeight: '100vh', margin: 0 }}
								>
									User Dash Bord
								</div>
							
							</Content>
						
						</Layout>
					
					</div>
				</div>
			</div>
		</>
	)

	
}


export default UserDashbord