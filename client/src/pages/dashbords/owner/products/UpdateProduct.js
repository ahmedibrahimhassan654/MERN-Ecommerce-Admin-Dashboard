import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';

import { getProduct, updateProduct } from '../../../../function/product'

//import { LoadingOutlined } from "@ant-design/icons";

import { getCategories, getSubs } from '../../../../function/productcategory';
import FileUpload from '../../../../components/forms/FileUpload'
import ProductsUpdateForm from '../../../../components/forms/ProductUpdateForm'
import { Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
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


const UpdateProduct = ({ match, history }) => {
	const [values, setValues] = useState(initialState);

	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([])
	const [arrayOfSubIds, setArrayOfSubIds] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => ({ ...state }));

	const { _id } = match.params

	useEffect(() => {

		loadProduct()
		loadCategories()
	}, [])

	const loadProduct = () => {
		getProduct(_id)
			.then((p) => {
				try {
					//1 load single product
					setValues({ ...values, ...p.data })

					// // //2 load single product category subs
					if (p && p.data && p.data.category) {
						getSubs(p.data.category._id).then((res) => {
							setSubOptions(res.data.subs); // on first load, show default subs
						});
					}
					//3 prepare array of sub ids to show as default sub values in antd Select 
					let arr = []
					p.data.subs.map((s) => {
						arr.push(s._id)
					})
					console.log('ARR', arr);
					setArrayOfSubIds((prev) => arr)//this is required for ant designe to work

				} catch (err) {
					toast.error(err)
					console.log(err);

				}

			})



	}
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
		setSelectedCategory(e.target.value)

		getSubs(e.target.value).then((res) => {
			//	console.log(res);
			setSubOptions(res.data.subs);
		});
		console.log('Old Category _id', values.category);

		if (values.category._id === e.target.value) {
			loadProduct()
		}
		setArrayOfSubIds([])
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		values.subs = arrayOfSubIds
		values.category = selectedCategory ? selectedCategory : values.category

		updateProduct(_id, values, user.token)
			.then(res => {
				setLoading(false)
				toast.success(`${res.data.title} is updated`)
				history.push('/owner/products')
			})
			.catch(err => {
				console.log(err);
				setLoading(false)
				toast.error(err.response.data.err)
			})
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
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h1 className="text-primary m-4 ">update Product</h1>
					)}
					<hr />
					<div className="p-3 m-3">
						<FileUpload values={values} setValues={setValues} setLoading={setLoading} />
					</div>
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
						selectedCategory={selectedCategory}
					/>

				</div>
				<Footer style={{ textAlign: 'center' }}>Ant Design {currentYear} Created by Ant UED</Footer>
			</Content>
		</Layout>
	);
};



export default UpdateProduct;
