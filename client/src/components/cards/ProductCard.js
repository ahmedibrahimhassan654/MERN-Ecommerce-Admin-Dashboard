import React from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import iamge from '../../components/images/awhite_200319_3944_4.0.0.jpg';
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
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
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
