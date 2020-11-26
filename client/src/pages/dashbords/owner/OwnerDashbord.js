import React, { useEffect}from 'react'
import { Layout } from 'antd'
import { connect, useSelector } from 'react-redux'
import {getCurrentBranches} from '../../../actions/branch'
 import PropTypes from 'prop-types'
import OwnerNav from '../../../components/nav/OwnerNav'

const { Header, Content, Footer } = Layout

const OwnerDashbord = ({getCurrentBranches,branch }) => {
   const { user } = useSelector((state) => ({
		...state,
	}))
  
   useEffect(() => {
      getCurrentBranches(user.token,)
      // console.log(getCurrentBranches());
     
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
   // user: PropTypes.object.isRequired,
   branch: PropTypes.object.isRequired,
   myBranches:PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
   // user: state.user,
   branch: state.branch,
   myBranches:state.myBranches
})
export default connect(mapStateToProps,{ getCurrentBranches}) (
   OwnerDashbord
);
