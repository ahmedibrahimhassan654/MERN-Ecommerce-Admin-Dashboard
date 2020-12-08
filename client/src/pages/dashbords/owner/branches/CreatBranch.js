import React, { Fragment } from "react";
 import { useSelector } from "react-redux";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import OwnernNav from "../../../../components/nav/OwnerNav";


import { useState } from "react";
import { Col, Layout, Row  } from "antd";
import { toast } from "react-toastify";
import {createBranch} from '../../../../function/branch'
import BranchForm from "../../../../components/forms/BranchForm";
const { Content, Footer } = Layout;

// const layout = {
//    labelCol: {
//      span: 8,
//    },
//    wrapperCol: {
//      span: 16,
//    },
//  };

 

 const validateMessages = {
   required: '${label} is required!',
   types: {
     text: '${label} is not a valid text!',
     number: '${label} is not a valid number!',
   },
   number: {
     range: '${label} must be between ${min} and ${max}',
   },
 };




const initialState={
   
    name:'',
    description: '',
    email: '',
    phone: '',
    addressLine: '',
  district: '',
    country: '',
     provinceP:'',
    images: [],
    documents:[],
  presents: ['products', 'services'],
   present:'',
  trAvailabilites:['Yes','No'],
  // adminAccept: '',
  
    
    
  }


function CreatBranch(props) {
  
  const [values, setValues] = useState(initialState);

  //redux
  const {user}=useSelector((state)=>({...state}))

   


  const handleSubmit = (e) => {
    // send product to backend 
    e.preventDefault()
     createBranch(values, user.token)
      .then(res => {
        console.log(res.data.branch.name);
       

        window.alert(`${res.data.branch.name} is created`)
        window.location.reload()
      }).catch(err => {
        console.log(err.response.data);
       toast.warning(err.response.data.error)
        
    })

  }
   const handleChange = e => {
       setValues({ ...values, [e.target.name]: e.target.value })

   }


   const [displayBranchUpload,toggleBranchUploade]=useState(false)

   return (
     
    <Layout
      className="site-layout"
      style={{
        minHeight: "100vh",
        // textAlign: 'center',
      }}
    >
      <OwnernNav />
      <Content
        style={{
          margin: "16px 16px",
          // textAlign: 'center',
        }}
      >
        <Fragment
      
         
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Branch</h1>
          <Row >
                 <Col span={20}>
               
               <BranchForm
                 handleChange={handleChange}
                 handleSubmit={handleSubmit}
                //  validateMessages={validateMessages}
                 values={values}
               />
            </Col>
          </Row>
        </Fragment>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
    </Layout>
  );
}



export default CreatBranch;
