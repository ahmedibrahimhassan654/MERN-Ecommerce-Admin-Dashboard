import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd';
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { StarOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;
const RatingModal = ({ children, product }) => {
    const { _id } = product
    const { user } = useSelector((state) => ({ ...state }))
    const [modalVisible, setModalVisible] = useState(false)


    let history = useHistory()

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true)
        } else {
            history.push('/login')

        }

    }



    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className='text-primary' /><br />{''}
                {user ? 'leave rating' : 'login to leave rating'}
            </div>
            <Modal
                title="leave your rating"
                centered
                visible={modalVisible}
                onOk={
                    () => {
                        setModalVisible(false);
                        toast.success('Thanks for your review')
                    }
                }
                onCancel={() => setModalVisible(false)}
            >
                {children}
                <TextArea className='mt-3' rows={4} placeholder="Say the advatage for this product" />
                <TextArea className='mt-3' rows={4} placeholder="Say the disAdvatage for this product to avoid that " />
            </Modal>
        </>
    )
}

export default RatingModal
