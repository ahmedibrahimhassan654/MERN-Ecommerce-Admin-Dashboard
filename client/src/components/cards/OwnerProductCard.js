import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
const OwnerProductCard = ({ product }) => {
    const { title, description, images } = product
    return (
        <div className="space-align-container m-5 ">
            <div className="space-align-block ">
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            className='p-2'
                            style={{
                                height: '150px',
                                objectFit: 'cover'
                            }}
                            alt={title}
                            src={images && images.length ? images[0].url : ''} />}
                >
                    <Meta title={title} description={description} />
                </Card>,
            </div>

        </div>
    )
}

export default OwnerProductCard
