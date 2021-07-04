import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { toast } from "react-toastify";
import OwnerNav from '../../../../components/nav/OwnerNav'
import { getProductByCount,deleteProduct } from '../../../../function/product'
import OwnerProductCard from '../../../../components/cards/OwnerProductCard'

import { useSelector } from 'react-redux'

const { Header, Content, Footer } = Layout

const AllProducts = () => {
	const { user } = useSelector((state) => ({
		...state,
	}))
	const [products, setProducts] = useState([])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadAllProducts()
	}, [])
	const loadAllProducts = () => {
		setLoading(true)
		getProductByCount(100)
			.then((res) => {
				setProducts(res.data.products);
				setLoading(false)
			})
			.catch(err => {
				setLoading(false)
				console.log(err);
			})
   }
   const handleReove =  (_id) => {
      let answer = window.confirm(' Are you shure you want to delete this product')
      if (answer) {
         deleteProduct(_id, user.token)
            .then((res) => {
               loadAllProducts()
               toast.error(`Product ${res.data.title} is deleted successfully`)
            })
            .catch(err => {
               if (err.response.status === 400) {
                  toast.error(err.response.data);
                  console.log(err);
               }
         })
      }
   }
	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<OwnerNav />
				<Layout className='site-layout'>
					<Header className='site-layout-background' style={{ padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<div
							className='site-layout-background'
							style={{ padding: 10, minHeight: '100%', margin: 0 }}
						>
							<div className='col'>
								{loading ? (<h4 className='text-danger'>Loading ...</h4>) : (<h4 className='text-primary'>{`Number Of Products ${products.length}`}</h4>)}

								<div className='row'>
									{products.map(product => (
										<div className='col-md-4 pb-3 pt-3' key={product._id}>
											<OwnerProductCard handleReove={handleReove} product={product} />

										</div>
									))}
								</div>

							</div>
						</div>
						<Footer style={{ textAlign: 'center' }}>
							Ant Design ©2018 Created by Ant UED
						</Footer>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}




export default AllProducts
	;
