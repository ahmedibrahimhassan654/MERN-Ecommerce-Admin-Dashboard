import React , { Fragment, useEffect} from 'react'
import OwnernNav from '../../../../components/nav/OwnerNav'
import { connect, useSelector } from 'react-redux'
import {getCurrentBranches} from '../../../../actions/branch'
import Spiner from '../../../Spiner'
import PropTypes from 'prop-types'
import { Layout } from 'antd';
const { Content, Footer } = Layout

function Branches({ getCurrentBranches, branch:{loading,myBranches} }) {
   const { user } = useSelector((state) => ({
		...state,
	}))
  
   useEffect((token=user.token) => {
      getCurrentBranches(token)
      // console.log(getCurrentBranches());
     
   }, [getCurrentBranches, user.token])
   
 
   return (
      loading && myBranches === null ? <Spiner /> :
         <Fragment>
         
         <Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
				}}
         >
            <OwnernNav />
            <Content style={{ margin: '24 16px 0', overflow: 'initial' }}>
					<div
						className='site-layout-background'
						style={{
							padding: 24,
							textAlign: 'center',
						}}
					>
                  <h1 className='text-primary pb-4 pt-5 '>
                     {user&& user.name} Branches
                  </h1>
                     {myBranches.number !== 0 ? (
                        <Fragment>has</Fragment>
                     ) : (
                        <Fragment>has not</Fragment>
                    )} 
								
					</div>
					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2018 Created by Ant UED
					</Footer>
				</Content>
         </Layout>
   </Fragment>
      
   )
}

Branches.propTypes = {
   getCurrentBranches: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   branch: PropTypes.object.isRequired,
   myBranches:PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
   user: state.user,
   branch: state.branch,
   myBranches:state.myBranches
})

export default connect(mapStateToProps,{ getCurrentBranches}) (Branches)

