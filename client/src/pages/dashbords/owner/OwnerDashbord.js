import React, { useEffect}from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import {getCurrentBranches} from '../../../actions/branch'
import PropTypes from 'prop-types'
import OwnerNav from '../../../components/nav/OwnerNav'

const { Header, Content, Footer } = Layout

const OwnerDashbord = ({getCurrentBranches,user,branch}) => {
   useEffect(() => {
      getCurrentBranches()
   },[])
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
							Owner Dash Board
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

OwnerDashbord.propTypes = {
   getCurrentBranches: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   branch:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   user: state.user,
   branch:state.branch
})
export default connect(mapStateToProps,{getCurrentBranches}) (OwnerDashbord)
