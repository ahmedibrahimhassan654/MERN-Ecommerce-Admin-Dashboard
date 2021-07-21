import React, { useEffect, useState } from 'react'
import { getProduct } from '../function/product'
import SingleProduct from '../components/cards/SingleProduct'


const Product = ({ match }) => {

    const { _id } = match.params

    const [product, setProduct] = useState({})

    useEffect(() => {
        loadSingleProduct()
    }, [_id])

    const loadSingleProduct = () => {
        getProduct(_id).then(res => {
            console.log(res);
            setProduct(res.data)
        })
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <SingleProduct
                    product={product}
                />
            </div>

            <div className='row p-5 ' >
                <div className='col text-center pt-5 pb-5  '>
                    <hr />
                    <h4 > Related products</h4>
                    <hr />
                </div>

            </div >
        </div >
    )
}

export default Product
