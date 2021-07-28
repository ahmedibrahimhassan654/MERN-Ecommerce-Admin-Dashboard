import React, { useEffect, useState } from 'react'
import { getCategories } from '../../function/productcategory'
import { Link } from "react-router-dom";
import { Button, Radio } from 'antd';

import { Spin, Space } from 'antd';
const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState('large')

    useEffect(() => {
        getCategories().then(c => {
            setLoading(true)
            setCategories(c.data)
            setLoading(false)
        })
    }, [])

    const showCategories = () => (
        categories.map(c => (
            <>

                <Button key={c._id} type="primary" size={size} className='col mr-5'>
                    <Link to={`category/${c.slug}`}>{c.name}</Link>
                </Button>
            </>
        ))
    )


    return (
        <div className='container'>
            <div className='row'>
                {loading ? (
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                ) : (
                    showCategories()
                )}
            </div>

        </div>
    )
}

export default CategoryList
