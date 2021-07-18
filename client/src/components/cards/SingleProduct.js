import React from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, HeartOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, _id } = product
    return (
        <>
            <div className='col-md-7 p-3 mb-2  '>
                iamge product carosol
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

                    <Meta

                        title={title}
                        description={description}
                    />

                </Card>
            </div>
        </>

    )
}

export default SingleProduct
