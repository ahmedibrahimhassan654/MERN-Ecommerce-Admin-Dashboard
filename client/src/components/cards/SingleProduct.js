import React from 'react'
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../components/images/awhite_200319_3944_4.0.0.jpg'
import ProductListItems from './ProductListItems';

const { TabPane } = Tabs;
const SingleProduct = ({ product }) => {
    const { title, description, images, _id, ratings } = product
    return (
        <>
            <div className='col-md-7 p-3 mb-2  '>
                {images && images.length ? (<Carousel
                    autoPlay={true}
                    infiniteLoop={true}


                >
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>) : (
                    <Card cover={
                        <img
                            src={Laptop}
                            className='mb-3 card-image'
                        />
                    }>

                    </Card>
                )}

                <Tabs type="card" className='container'>
                    <TabPane tab="Description" key="1" className='text-center'>
                        {description && description}
                    </TabPane>
                    <TabPane tab="Reviews" key="2" className='text-center'>
                        {ratings ? ratings : 'there is no review yet for this product'}
                    </TabPane>

                </Tabs>,
            </div>
            <div className='col-md-5 p-3 mb-2  '>

                <Card
                    style={{ width: '100%' }}
                    hoverable
                    actions={[
                        <div className='row'>
                            <div className='col-md-6'>

                                <ShoppingCartOutlined className='text-success' /><br /> Add To Cart

                            </div>
                            <div className='col-md-6'>
                                <Link>
                                    < HeartOutlined className="text-danger" /><br /> Add To Whishlist

                                </Link>
                            </div>
                        </div>
                    ]}
                >
                    <h1 className='text-center text-white p-3 mb-2 bg-success '>{title}</h1>
                    <ProductListItems product={product} />

                </Card>
            </div>
        </>

    )
}

export default SingleProduct
