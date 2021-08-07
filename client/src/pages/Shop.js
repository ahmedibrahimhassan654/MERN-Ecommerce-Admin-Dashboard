import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProductByCount, fetchProductsByFilter } from '../function/product'
import { getCategories } from '../function/productcategory'
import { getSubCategories } from '../function/productSubCategory'
import ProductCard from "../components/cards/ProductCard";
import { Slider, Space, Spin, Checkbox } from 'antd';
import Star from '../components/forms/Star'
import { Menu } from 'antd';
import { DollarCircleOutlined, SafetyCertificateOutlined, StarOutlined, SubnodeOutlined, } from '@ant-design/icons';

const { SubMenu } = Menu;
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([])
    const [ok, setOk] = useState(false)
    const [categories, setcategories] = useState([])
    const [categoriyIds, setCategoryIds] = useState([])
    const [subs, setSubs] = useState([])

    let dispatch = useDispatch()
    let { search } = useSelector(state => ({ ...state }))


    const { text } = search

    useEffect(() => {
        loadProducts()
        //to get all categories
        getCategories().then(res => {
            setcategories(res.data)

        }

        )

        getSubCategories().then(res => {
            setSubs(res.data)
        })
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
        setCategoryIds([])
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
                name='category'
                onChange={onChange}
                checked={categoriyIds.includes(c._id)}
            >
                {c.name}
            </Checkbox>
            <br />
        </div>)
        )
    const onChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setPrice([0, 0])
        let jsutChecked = e.target.value
        let inTheState = [...categoriyIds]
        let foundInTheState = inTheState.indexOf(jsutChecked)
        //if foundInTheState equal -1 it means doesn't found in the array so
        //we will push it inTheState Array
        if (foundInTheState === -1) {
            inTheState.push(jsutChecked)
        } else {
            // if foundInTheState not equal -1 it means found in the array so
            //we will pull it from inTheState Array
            inTheState.splice(foundInTheState, 1)
        }
        setCategoryIds(inTheState)
        fetchProducts({ category: inTheState })

        // console.log('in the state', inTheState);

    }


    // 5 handle star
    const handleStarClicked = (number) => {
        // console.log(number);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setPrice([0, 0])
        setCategoryIds([])
        // setStar(number)
        fetchProducts({ stars: number })

    }

    const showStars = () => (
        <div className='pb-2 pl-4 pr-2 '>
            <Star
                numberOfStars={5}
                starClick={handleStarClicked}
            />
            <Star
                numberOfStars={4}
                starClick={handleStarClicked}
            />
            <Star
                numberOfStars={3}
                starClick={handleStarClicked}
            />
            <Star
                numberOfStars={2}
                starClick={handleStarClicked}
            />
            <Star
                numberOfStars={1}
                starClick={handleStarClicked}
            />


        </div>

    )
    const showSubs = () =>
        subs.map((c) =>
        (<div key={c._id}>
            <Checkbox
                className='pb-2 pl-4 pr-4 '
                value={c._id}
                name='category'
                onChange={onChange}
                checked={categoriyIds.includes(c._id)}
            >
                {c.name}
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
                        // // onClick={this.handleClick}
                        style={{ ' background- color': 'blue' }}

                        defaultSelectedKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                        mode="inline"
                        className='sticky-top '
                    >
                        {/* Menu price */}
                        <SubMenu key="sub1"
                            icon={<DollarCircleOutlined
                                style={{ fontSize: '20px', color: 'green' }}

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
                                max='60000'
                            />

                        </SubMenu>
                        {/* Menu Category */}
                        <SubMenu key="sub2"
                            icon={<SafetyCertificateOutlined
                                style={{ fontSize: '20px', color: 'red' }}

                            />}
                            title={
                                <span className='h6 '>category</span >

                            }>

                            {showCategories()}

                        </SubMenu>
                        <SubMenu key="sub3"



                            icon={<StarOutlined
                                style={{ fontSize: '25px', color: 'gold' }}

                            />}
                            title={
                                <span className='h6 '>Ratings</span >

                            }

                        >
                            <div style={{ marginTop: '-10px' }}>
                                {showStars()}
                            </div>

                        </SubMenu>

                        <SubMenu key="sub4"



                            icon={<SubnodeOutlined
                                style={{ fontSize: '25px', color: 'purple ' }}

                            />}
                            title={
                                <span className='h6 '>Subs</span >

                            }

                        >
                            <div style={{ marginTop: '-10px' }}>
                                {showSubs()}
                            </div>

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
                            <u> {products.length} Product{products.length > 1 ? "s" : ''}</u>
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
