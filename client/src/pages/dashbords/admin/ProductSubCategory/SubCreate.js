import React, { useState, useEffect } from 'react'
import OwnerNav from '../../../../components/nav/OwnerNav'
import './sub.css'
import { Layout, Card, Row, Col } from 'antd'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	createSubCategory,
	getSubCategories,
	removeSubCategory,
} from '../../../../function/productSubCategory'

import { getCategories } from '../../../../function/productcategory'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Meta from 'antd/lib/card/Meta'
import { Link } from 'react-router-dom'
import SearchForm from '../../../../components/forms/SearchForm'
import { Form } from 'antd';

const { Content, Footer } = Layout

const SubCreate = () => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setloadings] = useState(false)
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState('')
	const [subs, setSub] = useState([])

	//searching filtering
	//step1
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		loadCategories()
		loadSubCategories()
	}, [])

	const loadCategories = () =>

		getCategories().then((c) => setCategories(c.data))


	const loadSubCategories = () => getSubCategories().then((s) => setSub(s.data))

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(name,description);
		setloadings(true)
		createSubCategory(
			{
				name,
				description,
				parent: category,
			},
			user.token,
		)
			.then((res) => {
				console.log(res)
				setloadings(false)
				// setCategories('')
				// categories('')
				setCategory('')
				setName('')
				setDescription('')
				setCategory('')


				toast.success(`"${res.data.name}" is created`)
				loadSubCategories()
			})
			.catch((err) => {
				//console.log(err.response.data.error);
				toast.warning(err.response.data.error);
				setloadings(false)

				// if (err.response.status === 400) toast.error(err.response.data.error);
			})
	}

	const handleRemove = async (slug) => {
		if (window.confirm('Are you sure you want to delete category')) {
			setloadings(true)
			removeSubCategory(slug, user.token)
				.then((res) => {
					setloadings(false)
					toast.success(`${res.data.name} is deleted`)
					loadSubCategories()
				})
				.catch((err) => {
					if (err.response.state === 400) {
						setloadings(false)
						toast.error(err.response.data)
					}
				})
		}
	}
	function onSearch(val) {
		console.log('search:', val)
	}

	//step 4

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	return (
		<>
			<Layout
				className="site-layout"
				style={{
					minHeight: '100vh',
				}}
			>
				<OwnerNav />
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<div
						className="site-layout-background"
						style={{
							padding: 24,

							minHeight: '100vh',
							margin: 0,
						}}
					>
						<div className='col'>
							{!loading ? (
								<h4 className="text-primary pb-4 pt-5 ">Create New Sub-Category</h4>
							) : (
								<h4 className="text-danger"> loading </h4>
							)}

						</div>

						<div className="form-group ">
							<Row>
								<Col span={12} offset={6}>
									<Form.Item label="Parent">
										<select
											// showSearch
											// onSearch={onSearch}
											onChange={(e) => {
												e.preventDefault();
												setCategory(e.target.value);
											}}
											style={{
												width: 200,
												marginBottom: 100,
												alignContent: 'center',
											}}
											className="form-controler"
										>
											<option>Please select category</option>
											{categories.length > 0 &&
												categories.map((c) => (
													<>
														{/* console.log(c); */}
														<option key={c.id} value={c._id}>
															{c.name}
														</option>
													</>
												))}
										</select>
									</Form.Item>

									{JSON.stringify(category)}
								</Col>
							</Row>
						</div>

						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
							description={description}
							setDescription={setDescription}
						/>
						{/* step2 and step 3 */}
						<SearchForm keyword={keyword} setKeyword={setKeyword} />
						<hr />
						<div className='col'>
							<span className="font-weight-bold text-primary mb-3">
								number of sub-categories {subs.filter(searched(keyword)).length}
							</span>
							<div className='row'>
								{subs.filter(searched(keyword)).map((s) => (


									<div className="col-md-4">
										<Card

											hoverable
											key={s._id}
											style={{
												width: 240,
												backgroundColor: '#AFFF33'
											}}
										>
											<Meta title={s.name} description={s.description} />

											<div className="mt-2">
												<span
													className="btn btn-sm float-right"
													onClick={() => handleRemove(s.slug)}
												>
													<DeleteOutlined className="text-primary" />
												</span>
												<Link to={`/owner/sub/${s.slug}`}>
													<span className="btn btn-sm float-left">
														<EditOutlined className="text-warning" />
													</span>
												</Link>
											</div>
										</Card>
									</div>



								))}
							</div>
						</div>

						{/* step 5 */}

					</div>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Content>
			</Layout>
		</>
	);
}

export default SubCreate
