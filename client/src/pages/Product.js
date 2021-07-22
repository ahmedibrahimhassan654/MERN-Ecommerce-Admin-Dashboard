import React, { useEffect, useState } from 'react'
import { getProduct, productStar } from '../function/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from "react-redux";
import { Card, Tabs, Input, Form } from 'antd';
const Product = ({ match }) => {

    //redux
    const { user } = useSelector((state) => ({ ...state }))
    const { _id } = match.params

    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [advantage, setAdvantage] = useState('')
    const [disAdvantage, setDisAdvantage] = useState('')
    useEffect(() => {
        loadSingleProduct()
    }, [_id])

    const loadSingleProduct = () => {
        getProduct(_id).then(res => {

            setProduct(res.data)
        })
    }
    const handleChange = (e) => {
        e.preventDefault()
        //setAdvantage(e.taget.value)
        setAdvantage(e.target.value);


    }
    const handledisadvantage = (e) => {
        e.preventDefault()
        setDisAdvantage(e.target.value)


    }
    const onstarClicke = (newRating, name) => {
        setStar(newRating)
        //setAdvantage(e.target.value)
        productStar(name, star, advantage, disAdvantage, user.token)
            // console.log("name", name, 'star', star, 'advantage', advantage, 'disAdvantage', disAdvantage);
            .then(res => {
                console.log('rating clicked', res.data);
                loadSingleProduct() //if you want to see updated rationg in real time
            })

    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <SingleProduct
                    product={product}
                    onstarClicke={onstarClicke}
                    star={star}
                    handleChange={handleChange}
                    handledisadvantage={handledisadvantage}
                    advantage={advantage}
                    // setAdvantage={setAdvantage}
                    disAdvantage={disAdvantage}
                // setDisAdvantage={setDisAdvantage}
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
