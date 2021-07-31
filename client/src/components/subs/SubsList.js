import React, { useEffect, useState } from 'react'
import { getSubCategories } from '../../function/productSubCategory'
import { Link } from "react-router-dom";
import { Button, Radio } from 'antd';

import { Spin, Space } from 'antd';
const SubsList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState('large')

    useEffect(() => {
        getSubCategories().then(c => {
            setLoading(true)
            setSubs(c.data)
            setLoading(false)
        })
    }, [])

    const showSubs = () => (
        subs.map(res => (
            <>

                <Button key={res._id} type="primary" size={size} className='col mr-3 p-1'>
                    <Link to={`sub/${res.slug}`}>{res.name}</Link>
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
                    showSubs()
                )}
            </div>

        </div>
    )
}

export default SubsList
