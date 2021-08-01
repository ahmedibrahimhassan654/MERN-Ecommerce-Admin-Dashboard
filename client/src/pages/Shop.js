import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProductByCount, fetchProductsByFilter } from '../function/product'
import ProductCard from "../components/cards/ProductCard";
import { Space, Spin } from 'antd';


const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    let { search } = useSelector(state => ({ ...state }))

    const { text } = search

    useEffect(() => {
        loadProducts()
    }, []);
    // 1. load all products
    const loadProducts = () => {

        getProductByCount(20).then((p) => {
            setLoading(true)
            setProducts(p.data.products);
            setLoading(false)
        })

    }
    //2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
        }, 300)
        return () => {
            clearTimeout(delayed)

        }


    }, [text])

    const fetchProducts = (arg) => {

        fetchProductsByFilter(arg).then(res => {
            setLoading(true)
            //setProducts(res.data);
            setProducts(res.data);

            setLoading(false)


        })


    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <h1 className='text-primary text-center'>  Search /Filter Menues</h1>
                </div>

                <div className='col-md-9 '>
                    {loading ? (<>
                        <Space size="middle">

                            <Spin size="large" />
                        </Space>
                    </>) : (
                        <h4 className='text-danger m-5'>
                            <u> {products.length} Products</u>
                        </h4>

                    )}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='row pb-5'>
                        {products.map((p) => (

                            <div key={p._id} className='col-md-4 text-center  mt-4 ' >
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
