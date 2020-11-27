import React , { Fragment, useEffect} from 'react'
import OwnernNav from '../../../../components/nav/OwnerNav'
import { connect, useSelector } from 'react-redux'
import {getCurrentBranches} from '../../../../actions/branch'
import Spiner from '../../../Spiner'
import PropTypes from 'prop-types'
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

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
               <Content style={{
                  margin: '16px 16px',
               
               }}>
					<div
						className='site-layout-background'
						style={{
							padding: 20,
                     // textAlign: 'center',
                     minHeight: '100%',
                     margin: 0 
						}}
					>
                  <h1 className='text-primary pb-4 pt-5 '>
                     {user&& user.name} Branches
                  </h1>
                     {myBranches.number !== 0 ? (
                        <Fragment><p className=' h5'> {myBranches.number > 1 ? (<p>has<strong><mark>{myBranches.number}</mark> </strong>Branches</p>) : (<p> has <strong><mark>{myBranches.number}</mark> </strong>Branch</p>)}</p>
                        <Link to='/create-branch' className='btn btn-primary my-5'>
                                 Add More Branches
                              </Link>
                        </Fragment>
                        
                     ) : (
                           <Fragment>
                              <p className=' h5'>you have not yet setup  branches,please create one</p>
                              <Link to='/create-branch' className='btn btn-primary my-5'>
                                 Create Branch
                              </Link>
                           </Fragment>
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
   // myBranches:PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
   user: state.user,
   branch: state.branch,
   // myBranches:state.myBranches
})

export default connect(mapStateToProps,{ getCurrentBranches}) (Branches)

