import React from 'react'
import { Card } from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import iamge from '../../components/images/awhite_200319_3944_4.0.0.jpg';
const { Meta } = Card;
const OwnerProductCard = ({ product ,handleReove}) => {
    const { title, description, images ,_id} = product
    return (
        <div className="space-align-container m-5 ">
            <div className="space-align-block ">
                <Card
                    hoverable
                style={{
                   width: 'auto',
                   height: 'auto',
                  //  backgroundColor: 'black',
                   border:'5 solid black',
                }}
                    cover={
                        <img
                            className='p-1'
                            style={{
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                            alt={title}
                          src={images && images.length ? images[0].url : iamge}
                       />
                    }
                actions={
                   [
                      <EditOutlined className='text-warning'/>,
                     <DeleteOutlined onClick={()=>handleReove(_id)} className="text-danger" />
                  ]
               } 
                >
                    <Meta title={title} description={`${description && description.substring(0, 20)}...`} />
                </Card>,
            </div>

        </div>
    )
}

export default OwnerProductCard
