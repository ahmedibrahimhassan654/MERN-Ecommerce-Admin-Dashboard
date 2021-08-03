import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import { getProductByCount, fetchProductsByFilter } from '../function/product'
import { getCategories } from '../function/productcategory'
import ProductCard from "../components/cards/ProductCard";
import { Slider, Space, Spin, Checkbox } from 'antd';

import { Menu } from 'antd';
import { DollarCircleOutlined, SafetyCertificateOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([])
    const [ok, setOk] = useState(false)
    const [categories, setcategories] = useState([])
    let dispatch = useDispatch()
    let { search } = useSelector(state => ({ ...state }))


    const { text } = search

    useEffect(() => {
        loadProducts()
        //to get all categories
        getCategories().then(res => {
            setcategories(res.data)
            console.log(res.data);
        }
        )
    }, []);

    const fetchProducts = (arg) => {

        fetchProductsByFilter(arg).then(res => {
            setLoading(true)
            //setProducts(res.data);
            setProducts(res.data);

            setLoading(false)


        })


    }
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


    // 3 load products based on price
    useEffect(() => {
        console.log('ok to request');
        fetchProducts({ price })
    }, [ok])

    const handleslider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)

    }

    // 4 load products based on category
    //show category in check box
    const showCategories = () =>
        categories.map((c) =>
        (<div key={c._id}>
            <Checkbox
                className='pb-2 pl-4 pr-4 '
                value={c._id}
                name='Category'>{<span className='text-secondary'> {c.name}</span>}
            </Checkbox>
            <br />
        </div>)
        )


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 border-end border-3 pt-3 '>
                    <h1 className='text-primary text-center '>Search/Filter Menues</h1>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['sub1', 'sub2']}
                        defaultOpenKeys={['sub1', 'sub2']}
                        mode="inline"
                        className='sticky-top'
                    >
                        <SubMenu key="sub1"
                            icon={<DollarCircleOutlined
                                style={{ fontSize: '20px', color: 'gold' }}

                            />}
                            title={
                                <span className='h6 '>Price</span >

                            }>

                            <Slider
                                className='ml-4 mr-4  '
                                tipFormatter={(v) => `Egp ${v}`}
                                value={price}

                                range
                                onChange={handleslider}
                                max='100000'
                            />

                        </SubMenu>
                        <SubMenu key="sub2"
                            icon={<SafetyCertificateOutlined
                                style={{ fontSize: '20px', color: 'red' }}

                            />}
                            title={
                                <span className='h6 '>category</span >

                            }>

                            {showCategories()}

                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">

                        </SubMenu>
                    </Menu>
                </div>

                <div className='col-md-9 pt-2'>
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

                            <div key={p._id} className='col-md-4 p-3  ' >
                                <ProductCard product={p} />
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </div >
    )
}

export default Shop
