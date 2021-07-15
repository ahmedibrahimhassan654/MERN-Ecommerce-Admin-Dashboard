import React from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import iamge from '../../components/images/awhite_200319_3944_4.0.0.jpg';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const OwnerProductCard = ({ product, handleReove }) => {
    const { title, description, images, _id } = product
    return (

        <div className="space-align-container m-5 ">
            <div className="space-align-block ">
                <Card
                    hoverable
                    style={{
                        width: '300',

                    }}
                    cover={
                        <img

                            alt={title}
                            src={images && images.length ? images[0].url : iamge}
                        />
                    }
                    actions={
                        [
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Link to={`/owner/product/${_id}`}>
                                        <EditOutlined className='text-warning' />,
                                    </Link>
                                </div>
                                <div className='col-md-6'>
                                    <DeleteOutlined onClick={() => handleReove(_id)} className="text-danger" />
                                </div>



                            </div>




                        ]
                    }
                >
                    <Meta title={title}
                        description={`${description && description.substring(0, 20)}...`} />
                </Card>,
            </div>

        </div>
    )
}

export default OwnerProductCard
