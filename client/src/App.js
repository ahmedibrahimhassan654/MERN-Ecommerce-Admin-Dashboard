import React, { Fragment, useEffect } from 'react'
import './app.css'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/nav/Header'
import Login from './pages/auth/Login'

import Owner from './pages/auth/Owner'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import Forgotpassword from './pages/auth/Forgotpassword'

import UserDashBord from './pages/dashbords/user/UserDashbord'
import AdminDashBord from './pages/dashbords/admin/AdminDashbord'
import OwnerDashBoard from './pages/dashbords/owner/OwnerDashbord'

import MangerDashBoard from './pages/dashbords/manger/MangerDashbord'
import EmployeeDashBoard from './pages/dashbords/employee/EmployeeDashbord'

import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import OwnerRoute from './components/routes/OwnerRoute'
import MangerRoute from './components/routes/MangerRoute'
import EmployeeRoute from './components/routes/EmployeeRoute'

import Password from './pages/dashbords/user/Password'
import PasswordOwner from './pages/dashbords/owner/Passwordowner'
import ResetPassword from './pages/dashbords/admin/auth/ResetPassword'
import WishList from './pages/dashbords/user/WishList'
import CreateCategory from './pages/dashbords/admin/Product Category/CreateCategory'
import CtegoryUpdate from './pages/dashbords/admin/Product Category/CtegoryUpdate'
import ProductCreate from './pages/dashbords/owner/products/ProductCreate'
import Products from './pages/dashbords/owner/products/AllProducts'
import Product from './pages/Product'
import { auth } from './firbase'
import {
	useDispatch,
	//Provider
} from 'react-redux'
// import store from './store'
import { currentuser } from './function/auth'
import SubCreate from './pages/dashbords/admin/ProductSubCategory/SubCreate'
import SubUpdate from './pages/dashbords/admin/ProductSubCategory/SubUpdate'
// import AlertComp from './pages/AlertComp';
import CreatBranch from './pages/dashbords/owner/branches/CreatBranch';
import UpdateProduct from './pages/dashbords/owner/products/UpdateProduct';
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/subcategory/SubHome'
import Shop from './pages/Shop'

const App = () => {
	const dispatch = useDispatch()

	//to check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const IdTokenResult = await user.getIdTokenResult()

				currentuser(IdTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: IdTokenResult.token,
								role: res.data.role,
								picture: res.data.picture,
								_id: res.data._id,
							},
						})
					})
					.catch((err) => console.log(err))
			}
		})
		//cleanup
		return () => unsubscribe()
	})
	return (

		<Fragment>

			<Header />
			<ToastContainer />

			<Switch>



				<Route exact path='/' component={Home} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/owner' component={Owner} />
				<Route exact path='/register/complete' component={RegisterComplete} />
				<Route exact path='/forgot/password' component={Forgotpassword} />
				<Route exact path='/product/:_id' component={Product} />
				<Route exact path='/category/:slug' component={CategoryHome} />
				<Route exact path='/sub/:slug' component={SubHome} />
				<Route exact path='/shop' component={Shop} />



				{/* //user routes */}
				<UserRoute exact path='/user/dashboard' component={UserDashBord} />
				<UserRoute exact path='/user/password' component={Password} />
				<UserRoute exact path='/user/wishlist' component={WishList} />
				{/* //admin routes */}
				<AdminRoute exact path='/admin/dashboard' component={AdminDashBord} />
				<AdminRoute exact path='/admin/password' component={ResetPassword} />


				{/* //owner rotes */}
				<OwnerRoute exact path='/owner/password' component={PasswordOwner} />
				<OwnerRoute exact path='/owner/dashboard' component={OwnerDashBoard} />
				{/* <OwnerRoute exact path='/owner/branches' component={CreateBranch} /> */}
				<OwnerRoute exact path='/create-branch' component={CreatBranch} />
				<OwnerRoute exact path='/owner/create-product' component={ProductCreate} />
				<OwnerRoute
					exact
					path='/owner/productCategory'
					component={CreateCategory}
				/>
				<OwnerRoute
					exact
					path='/owner/productcategory/:slug'
					component={CtegoryUpdate}
				/>
				<OwnerRoute
					exact
					path='/owner/productSubCategory'
					component={SubCreate}
				/>
				<OwnerRoute exact path='/owner/sub/:slug' component={SubUpdate} />
				<OwnerRoute exact path='/owner/products' component={Products} />
				<OwnerRoute exact path='/owner/product/:_id' component={UpdateProduct} />


				{/* //manger routes */}
				{/* <MangerRoute exact path='/manger/password' component={Password} /> */}
				<MangerRoute
					exact
					path='/manger/dashboard'
					component={MangerDashBoard}
				/>
				{/* //employee routes */}
				<EmployeeRoute exact path='/employee/password' component={Password} />
				<EmployeeRoute
					exact
					path='/employee/dashboard'
					component={EmployeeDashBoard}
				/>


			</Switch>

		</Fragment>

	)
}
export default App


