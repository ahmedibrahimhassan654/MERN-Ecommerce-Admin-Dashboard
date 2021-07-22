import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd';
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { StarOutlined } from '@ant-design/icons'

const { TextArea } = Input;
const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [modalVisible, setModalVisible] = useState(false)





    return (
        <>
            <div onClick={() => setModalVisible(true)}>
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
                <TextArea className='mt-3' rows={4} placeholder="Say the advatage for this project" />
                <TextArea className='mt-3' rows={4} placeholder="Say the disAdvatage for this project to avoid that " />
            </Modal>
        </>
    )
}

export default RatingModal
