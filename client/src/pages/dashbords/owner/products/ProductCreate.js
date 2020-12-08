import React, { useState, Fragment } from "react";
 import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';
import {createProduct} from '../../../../function/product'


import { Layout, Form,Input, Button, Row, Col, } from "antd";
import { toast } from "react-toastify";
import ProductsForm from "../../../../components/forms/ProductsForm";

const { Content, Footer } = Layout;

const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 16,
   },
 };

const initialState={
    title: '',
    description: '',
    price: '',
    category: '',
    categories:[],
    subs: [],
    quantity: '',
    sold: '',
    images: [],
    shipping: '',
    qualities: ['Original', 'Hieght Quality', 'Used'],
    warrantyAvailable: '',
    madeIn: '',
    branche: '',
    cratedBy:''
    
  }



const ProductCreate=(props) =>{
  const [values, setValues] = useState(initialState)
  //redux
  const {user}=useSelector((state)=>({...state}))

  //destructure
  const
    {
    title,
    description,
    price,
    category,
    categories,
    subs,
    quantity,
    sold,
    images,
    shipping,
    quality,
    qualities,
    warrantyAvailable,
    madeIn,
   
    branche,
    
    } = values
  const handleSubmit = (e) => {
    // send product to backend 
    e.preventDefault()
    createProduct(values, user.token)
      .then(res => {
        console.log(res);
        window.alert(`${res.data.title} is created`)
        window.location.reload()
      }).catch(err => {
        console.log(err.response.data);
       toast.warning(err.response.data.error)
        
    })

  }
  const handleChange = (e) => {
    
    setValues({ ...values, [e.target.name]: e.target.value })
   // console.log(e.target.name,'-----',e.target.value);
  }
  
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
          background:"site-layout-background"
          // textAlign: 'center',
        }}
      >
        <Fragment
          
       
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Product</h1>
           <Row >

             <Col span={20}>
               <ProductsForm handleChange={handleChange} handleSubmit={handleSubmit} values={values }/>
              </Col>
           </Row>
           
   

        </Fragment>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
       </Layout>
      
  )
}



export default ProductCreate;
