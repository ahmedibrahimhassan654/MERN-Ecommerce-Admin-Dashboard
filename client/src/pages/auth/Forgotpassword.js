import React ,{useState,useEffect}from 'react';
import {auth}from '../../firbase'
import { useSelector } from "react-redux";
import {toast}from 'react-toastify'

import { CheckOutlined } from '@ant-design/icons';

const Forgotpassword = ({history}) => {
    const [email,setEmail]=useState('')
    const [loading,setLoding]=useState(false)

    const { user } = useSelector((state) => ({ ...state }))
    
    useEffect(() => {
			if (user && user.token) history.push('/')
		}, [user, history])
    const handleSubmit =async (e) => {
       e.preventDefault() 
       
        setLoding(true)

       const config = {
          url: process.env.REACT_APP_Forgot_password_REDIRECT,
          handleCodeInApp: true

       };
        await auth.sendPasswordResetEmail(email, config).then(() => {
                setEmail('')
                setLoding(true)
                toast.success('please check your mail for password reset link')

            }).catch((error) => {
                setLoding(false)
                toast.error(error.message)
                console.log('error message in forgot password',error);
        })
        
           
            
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading</h4> : <h4 className="text-primary">Forgot password</h4>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    placeholder="type your email"
                    
                />
                <br />
                <button
                    className="btn btn-raised btn-primary"
                    disabled={!email}
                  
                    shape="round"
                    icon={<CheckOutlined style={{ fontSize: '20px', color: 'white' ,justifyContent:"center "}}/>}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Forgotpassword