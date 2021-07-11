import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';

import { getProduct } from '../../../../function/product'

//import { LoadingOutlined } from "@ant-design/icons";

import { getCategories, getSubs } from '../../../../function/productcategory';
//import FileUpload from '../../../../components/forms/FileUpload'
import ProductsUpdateForm from '../../../../components/forms/ProductUpdateForm'
import { Layout } from "antd";
//import { toast } from "react-toastify";


const { Content, Footer } = Layout;



const initialState = {
	title: '',
	description: '',
	price: '',
	category: '',

	subs: [],


	quantity: '',

	images: [],
	shipping: ['Yes', 'No'],
	qualities: ['Original', 'Hieght Quality', 'Used'],
	warrantyAvailable: ['Yes', 'No'],
	madeIn: '',
	cratedBy: ''

}


const UpdateProduct = ({ match }) => {
	const [values, setValues] = useState(initialState);

	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([])
	const [arrayOfSubIds, setArrayOfSubIds] = useState([])

	const { user } = useSelector((state) => ({ ...state }));

	const { _id } = match.params


	const loadProduct = () => {
		getProduct(_id)
			.then((p) => {
				//1 load single product
				setValues({ ...values, ...p.data })

				// // //2 load single product category subs
				getSubs(p.data.category._id).then(res => {
					//console.log(res);
					setSubOptions(res.data.subs)// on first load show default subs from backend api
				})
				//3 prepare array of sub ids to show as default sub values in antd Select 
				let arr = []
				p.data.subs.map((s) => {
					arr.push(s._id)
				})
				console.log('ARR', arr);
				setArrayOfSubIds((prev) => arr)//this is required for ant designe to work

			})



	}

	useEffect(() => {

		loadProduct()
		loadCategories()
	})
	const loadCategories = () => {

		getCategories().then((c) => {
			setCategories(c.data)
		}
		)
	}


	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log('Clicked Category _id', e.target.value);
		setValues({ ...values, subs: [] });
		getSubs(e.target.value).then((res) => {
			//	console.log(res);
			setSubOptions(res.data.subs);
		});

	};

	const handleSubmit = (e) => {
		console.log(e);
	}



	const currentYear = new Date().getFullYear()
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
				<div className="container">
					<h1>update Product</h1>
					{JSON.stringify(values)}
					<ProductsUpdateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
						setValues={setValues}
						handleCategoryChange={handleCategoryChange}
						subOptions={subOptions}
						categories={categories}
						arrayOfSubIds={arrayOfSubIds}
						setArrayOfSubIds={setArrayOfSubIds}
					/>

				</div>
				<Footer style={{ textAlign: 'center' }}>Ant Design {currentYear} Created by Ant UED</Footer>
			</Content>
		</Layout>
	);
};



export default UpdateProduct;
