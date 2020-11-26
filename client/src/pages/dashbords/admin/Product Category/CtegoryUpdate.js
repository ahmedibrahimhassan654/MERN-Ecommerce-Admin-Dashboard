import React, { useState, useEffect } from 'react'

import './userdashbord.css'
import { Layout } from 'antd'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	getCategory,
	updateCategory,
} from '../../../../function/productcategory'
import CategoryForm from '../../../../components/forms/CategoryForm'
import AdminNav from '../../../../components/nav/AdminNav'
//import { useParams } from 'react-router-dom'
const { Content } = Layout

const CategoryUpdate = ({ history, match }) => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setloadings] = useState(false)

	const loadCategory = () =>
		getCategory(match.params.slug).then((c) => {
			console.log(c)
			setName(c.data.name)
			setDescription(c.data.description)
		})

	useEffect(() => {
		console.log(match)
		loadCategory()
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(name,description);
		setloadings(true)
		updateCategory(
			match.params.slug,
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
				toast.success(`"${res.data.updated.name}" is updated`)
				history.push('/admin/productCategory')
			})
			.catch((err) => {
				console.log(err)
				setloadings(false)

				if (err.response.status === 400) toast.error(err.response.data)
			})
	}

	return (
		<>
			<Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
				}}
			>
				<AdminNav />
				<Content
					style={{
						padding: '25 25px',
						alignContent: 'center',
						minHeight: '100vh',
					}}
				>
					<div
						className='site-layout-background'
						style={{
							padding: 10,
							minHeight: '100vh',
							margin: 0,
						}}
					>
						{!loading ? (
							<h4 className='text-primary pb-4 pt-5 '>Update Category</h4>
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
					</div>
				</Content>
			</Layout>
		</>
	)
}

export default CategoryUpdate
