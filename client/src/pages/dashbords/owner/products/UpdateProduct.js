import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';

import { getProduct } from '../../../../function/product'

import { LoadingOutlined } from "@ant-design/icons";

import { getCategories, getSubs } from '../../../../function/productcategory';
import FileUpload from '../../../../components/forms/FileUpload'
import ProductsUpdateForm from '../../../../components/forms/ProductUpdateForm'
import { Layout, Row, Col, } from "antd";
import { toast } from "react-toastify";


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
	const { user } = useSelector((state) => ({ ...state }));

	const { _id } = match.params

	useEffect(() => {

		loadProduct()
		loadCategories()
	})

	const loadProduct = () => {
		getProduct(_id)
			.then((res) => {
				setValues({ ...values, ...res.data })

			})



	}

	const loadCategories = () => {

		getCategories().then((c) => { setCategories(c.data) }
		)
	}


	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	};
	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log('Clicked Category _id', e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });
		getSubs(e.target.value).then((res) => {
			console.log(res);
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
					/>

				</div>
				<Footer style={{ textAlign: 'center' }}>Ant Design {currentYear} Created by Ant UED</Footer>
			</Content>
		</Layout>
	);
};



export default UpdateProduct;
