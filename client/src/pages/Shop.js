import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProductByCount } from '../function/product'
import ProductCard from "../components/cards/ProductCard";
import { Space, Spin } from 'antd';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadProducts()
    });
    const loadProducts = () => {
        getProductByCount(20).then((p) => {
            setProducts(p.data.products);
            setLoading(false)
        })
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <h1 className='text-primary text-center'>  Search /Filter Menues</h1>
                </div>
                <hr></hr>
                <div className='row pagination-centered text-center'>
                    {loading ? (<>
                        <Space size="middle">

                            <Spin size="large" />
                        </Space>
                    </>) : (
                        <h4 className='text-danger'>
                            Products
                        </h4>

                    )}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='row pb-5'>
                        {products.map((p) => (

                            <div key={p._id} className='col-md-3 text-center mb-4 mt-4 ml-2 row align-items-center' >
                                <ProductCard product={p} />
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Shop
