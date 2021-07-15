import React from 'react'
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import iamge from '../../components/images/awhite_200319_3944_4.0.0.jpg';
import { Link } from 'react-router-dom';
import LoadingCard from '../cards/LoadingCard'
const { Meta } = Card;
const ProductCard = ({ product }) => {
    const { title, description, images, _id } = product
    return (
        <>

            <Card
                hoverable
                style={{ width: 300 }}
                cover={
                    <img
                        alt={title}
                        src={images && images.length ? images[0].url : iamge}
                    />
                }
                actions={[
                    <div className='row'>
                        <div className='col-md-6'>
                            <Link to={`/product/${_id}`}>
                                <EyeOutlined className='text-success' /><br /> View Product
                            </Link>
                        </div>
                        <div className='col-md-6'>
                            < ShoppingCartOutlined className="text-danger" /><br /> Add To Cart
                        </div>
                    </div>
                ]}
            >
                <Meta
                    title={title}
                    description={description}
                />
            </Card>
        </>
    )
}

export default ProductCard
