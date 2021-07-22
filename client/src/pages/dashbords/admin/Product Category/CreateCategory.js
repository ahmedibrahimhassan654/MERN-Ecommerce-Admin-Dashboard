import React, { useState, useEffect } from 'react'
import OwnerNav from '../../../../components/nav/OwnerNav'
import './userdashbord.css'
import { Layout, Card } from 'antd'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	createCategory,
	getCategories,
	removeCategory,
} from '../../../../function/productcategory'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Meta from 'antd/lib/card/Meta'
import { Link } from 'react-router-dom'
import SearchForm from '../../../../components/forms/SearchForm'
import Spiner from '../../../Spiner';
const { Content, Footer } = Layout

const CreateCategory = () => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setloadings] = useState(false)
	const [categories, setCategories] = useState([])

	//searching filtering
	//step1
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data))

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(name,description);
		setloadings(true)
		createCategory(
			{
				name,
				description,
			},
			user.token,
		)
			.then((res) => {
				console.log(res)
				setloadings(false)
				setName('')
				setDescription('')
				toast.success(`"${res.data.name}" is created`)
				loadCategories()
			})
			.catch((err) => {
				console.log(err)
				setloadings(false)

				if (err.response.status === 400) toast.error(err.response.data)
			})
	}

	const handleRemove = async (slug) => {
		if (window.confirm('Are you sure you want to delete category')) {
			setloadings(true)
			removeCategory(slug, user.token)
				.then((res) => {
					setloadings(false)
					toast.success(`${res.data.name} is deleted`)
					loadCategories()
				})
				.catch((err) => {
					if (err.response.state === 400) {
						setloadings(false)
						toast.error(err.response.data)
					}
				})
		}
	}

	//step 4

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	return (
		<>
			<Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
				}}
			>
				<OwnerNav />
				<Content style={{ margin: '24 16px 0', overflow: 'initial' }}>
					<div
						className='site-layout-background'
						style={{
							padding: 24,
							textAlign: 'center',
						}}
					>
						{!loading ? (
							<h4 className='text-primary pb-4 pt-5 '>Create New Category</h4>
						) : (
							// <h4 className='text-danger'> loading </h4>
							<Spiner />
						)}
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
							<span className='font-weight-bold text-primary mb-3 text-center'>
								number of categories {categories.filter(searched(keyword)).length}
							</span>
							<div className='row'>
								{categories.filter(searched(keyword)).map((c) => (
									<>

										<div className='col-md-4 mt-4 text-center'>
											<Card
												hoverable
												key={c._id}
												style={{
													width: 300,
													backgroundColor: '#F0F8FF	'
												}}
											>
												<Meta title={c.name} description={c.description} />
												<div className='mt-2'>
													<span
														className='btn btn-sm float-right'
														onClick={() => handleRemove(c.slug)}
													>
														<DeleteOutlined className='text-primary' />
													</span>
													<Link to={`/owner/productcategory/${c.slug}`}>
														<span className='btn btn-sm float-left'>
															<EditOutlined className='text-warning' />
														</span>
													</Link>
												</div>
											</Card>
										</div>


									</>
								))}
							</div>
						</div>

						{/* step 5 */}

					</div>
					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2018 Created by Ant UED
					</Footer>
				</Content>
			</Layout>
		</>
	)
}

export default CreateCategory
