import React, { useEffect, useState } from 'react'
import { getProduct, productStar, getRelated } from '../function/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from "react-redux";
import { Card, Tabs, Input, Form, Badge } from 'antd';
import starRatings from 'react-star-ratings/build/star-ratings';
import ProductCard from '../components/cards/ProductCard';
const Product = ({ match }) => {

    //redux
    const { user } = useSelector((state) => ({ ...state }))
    const { _id } = match.params

    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelted] = useState([])

    useEffect(() => {
        loadSingleProduct()
    }, [_id])




    const loadSingleProduct = () => {
        getProduct(_id).then(res => {
            setProduct(res.data);

            getRelated(res.data._id).then(res =>
                setRelted(res.data)
            )
        })
    }


    const onstarClicke = (newRating) => {
        setStar(newRating)
        console.log('star change', newRating);

    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <SingleProduct
                    product={product}
                    onstarClicke={onstarClicke}
                    star={star}
                    setStar={setStar}
                    loadSingleProduct={loadSingleProduct}
                />

            </div>

            <div className='row  ' >
                <div className='col text-center pt-5 pb-5  '>
                    <hr />
                    <h4 > Related products</h4>
                    <hr />
                </div>
                <div className='row m-5'>
                    {related.length ? (
                        related.map((p) => (
                            <div key={p._id} className='col-md-4'>
                                <Badge.Ribbon text={`${p.price} Egp`} color="purple" >

                                    <ProductCard product={p} />
                                </Badge.Ribbon>
                            </div>
                        ))
                    ) : (
                        <div className='text-center col'>
                            No Product found
                        </div>)}
                </div>

            </div >
        </div >
    )
}

export default Product
