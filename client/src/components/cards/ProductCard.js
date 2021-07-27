import React from 'react'
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import iamge from '../../components/images/awhite_200319_3944_4.0.0.jpg';
import { Link } from 'react-router-dom';
import { showAverage } from '../../function/rating'
import { Badge } from 'antd';
const { Meta } = Card;
const ProductCard = ({ product }) => {
    const { title, description, images, _id, price } = product
    return (
        <>

            <Badge.Ribbon text={`${price} Egp`} color="purple" offset={[10, 10]} >



                <Link to={`/product/${_id}`}>

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
                        {product && product.ratings && product.ratings.length > 0 ? (showAverage(product)) :
                            <div className='text-center pt-1 pb-3 text-info'>
                                No Rating Yet
                            </div>}
                        <Meta
                            title={title}
                            //                            description={description}
                            description={`${description && description.substring(0, 20)}...`}


                        />
                    </Card>
                </Link>

            </Badge.Ribbon >
        </>
    )
}

export default ProductCard
