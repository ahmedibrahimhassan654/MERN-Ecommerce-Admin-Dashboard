import React, { useState, useEffect } from 'react'
import AdminNav from '../../../../components/nav/AdminNav'
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
				<AdminNav />
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
							<h4 className='text-danger'> loading </h4>
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
						<span className='font-weight-bold text-primary mb-3'>
							number of categories {categories.filter(searched(keyword)).length}
						</span>
						{/* step 5 */}
						{categories.filter(searched(keyword)).map((c) => (
							<>
								<div className='container'>
									<div className=' row  text-light bg-dark'>
										<div className='ant-col-md-4'>
											<Card
												bordered
												key={c._id}
												style={{
													width: 300,
													height: 150,
													backgroundColor: 'whit',
													marginBottom: '5px',
													marginTop: '5px',
													marginLeft: '5px',
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
													<Link to={`/admin/productcategory/${c.slug}`}>
														<span className='btn btn-sm float-left'>
															<EditOutlined className='text-warning' />
														</span>
													</Link>
												</div>
											</Card>
										</div>
									</div>
								</div>
							</>
						))}
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
