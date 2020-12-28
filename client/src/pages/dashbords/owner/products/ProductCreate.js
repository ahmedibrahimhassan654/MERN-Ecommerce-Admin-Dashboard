import React, { useState, Fragment, useEffect } from "react";
 import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';
import {createProduct,} from '../../../../function/product'

import { getCategories, getSubs } from '../../../../function/productcategory';
import { getMyBranches, } from '../../../../function/branch';




import { Layout, Row, Col, } from "antd";
import { toast } from "react-toastify";
import ProductsForm from "../../../../components/forms/ProductsForm";

const { Content, Footer } = Layout;




const initialState={
    title: '',
    description: '',
    price: '',
    category: '',
    categories:[],
    subs: [],
    branches: [],
    branch:{},
    quantity: '',
   
    images: [],
    shipping: '',
    qualities: ['Original', 'Hieght Quality', 'Used'],
    warrantyAvailable: '',
    madeIn: '',
   
    cratedBy:''
    
  }



const ProductCreate = (props) => {
	const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);

	const [branches, setBranches] = useState([]);
	const [branch,setBranch]=useState({})

  



	const [showSub, SetShowSub] = useState(false);
	//redux
  const { user } = useSelector((state) => ({ ...state }));
  

	const loadCategories = () => {
		getCategories().then((c) => setValues({ ...values, categories: c.data }));
	};

	const ownerBranches = () =>
		getMyBranches(user.token).then((b) => {
			
			const branches = b.data.branches;
			console.log(branches);
			setBranches(branches);
    });
  
	useEffect(() => {
		loadCategories();
			ownerBranches();
	}, []);

	const handleSubmit = (e) => {
		// send product to backend
		e.preventDefault();
		ownerBranches()

		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				window.alert(`${res.data.title} is created`);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.response.data);
				toast.warning(err.response.data.error);
			});
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		// console.log(e.target.name,'-----',e.target.value);
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log('Clicked Category _id', e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });
		getSubs(e.target.value).then((res) => {
			console.log(res);
			setSubOptions(res.data.subs);
		});
		SetShowSub(true);
	};
   const handleBranchChange = (e) => {
      
     console.log('branch id ',e);
    //   e.preventDefault();
      setBranch([e]);
      console.log('setBranch', setBranch());
     
	
}
	return (
		<Layout
			className="site-layout"
			style={{
				minHeight: '100vh',
				// textAlign: 'center',
			}}
		>
			<OwnernNav />
			<Content
				style={{
					margin: '16px 16px',
					background: 'site-layout-background',
					// textAlign: 'center',
				}}
			>
				<Fragment>
					<h1 className="text-primary pb-4 pt-5 ">Create New Product</h1>
					{/* {JSON.stringify(values.subs)} */}
					<Row className="container">
						{JSON.stringify(values.categories)}
						<br />
						{JSON.stringify(branches)}
						<Col span={20}>
							<ProductsForm
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								values={values}
								setValues={setValues}
								handleCategoryChange={handleCategoryChange}
								handleBranchChange={handleBranchChange}
								branches={branches}
								branch={branch}
								setBranch={setBranch}
								setBranches={setBranches}
								branch={branch}
								setBranch={setBranch}
								subOptions={subOptions}
								showSub={showSub}
							/>
						</Col>
					</Row>
				</Fragment>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Content>
		</Layout>
	);
};



export default ProductCreate;
