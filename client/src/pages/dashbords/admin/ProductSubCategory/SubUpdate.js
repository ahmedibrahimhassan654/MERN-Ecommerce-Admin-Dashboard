import React, { useState, useEffect } from 'react'
import AdminNav from '../../../../components/nav/AdminNav'
import './sub.css'
import { Layout } from 'antd'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	getSubCategory,
	updateSubCategory,
} from '../../../../function/productSubCategory'

import { getCategories } from '../../../../function/productcategory'

const { Content, Footer } = Layout

const SubUpdate = ({ match, history }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setloadings] = useState(false)
	const [categories, setCategories] = useState([])
	const [parent, setParent] = useState('')

	//searching filtering
	//step1

	useEffect(() => {
		loadCategories()
		loadSub()
	}, [match])

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data))

	const loadSub = () =>
		getSubCategory(match.params.slug).then((s) => {
			setName(s.data.name)
			setDescription(s.data.description)
			setParent(s.data.parent)
		})

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(name,description);
		setloadings(true)
		updateSubCategory(
			match.params.slug,
			{
				name,
				description,
				parent,
			},
			user.token,
		)
			.then((res) => {
				console.log(res)
				setloadings(false)
				setName('')
				setDescription('')
				// setParent('')
				toast.success(`"${res.data.name}" is updated`)
				history.push('/admin/productSubCategory')
			})
			.catch((err) => {
				console.log(err)
				setloadings(false)

				if (err.response.status === 400) toast.error(err.response.data)
			})
	}

	//step 4

	return (
		<>
			<Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
				}}
			>
				<AdminNav />
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<div
						className='site-layout-background'
						style={{
							padding: 24,

							minHeight: '100vh',
							margin: 0,
						}}
					>
						{!loading ? (
							<h4 className='text-primary pb-4 pt-5 '>Update Sub-Category</h4>
						) : (
							<h4 className='text-danger'> loading </h4>
						)}

						<div className='form-group'>
							<label>Parent category</label>
							<select
								name='category'
								className='form-control'
								onChange={(e) => setParent(e.target.value)}
							>
								<option>Please select</option>
								{categories.length > 0 &&
									categories.map((c) => (
										<option
											key={c._id}
											value={c._id}
											selected={c._id === parent}
										>
											{c.name}
										</option>
									))}
							</select>
						</div>
						{JSON.stringify(parent)}
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
							description={description}
							setDescription={setDescription}
						/>

						<hr />

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

export default SubUpdate
