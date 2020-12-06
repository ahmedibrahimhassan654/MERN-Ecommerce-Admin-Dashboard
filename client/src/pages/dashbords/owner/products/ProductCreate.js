import React, { useState,useEffect, Fragment } from "react";
 import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';
import {createProduct} from '../../../../function/product'


import { Layout, Form,Input, Select, Button, } from "antd";

const { Content, Footer } = Layout;
const { Option } = Select;
const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 8,
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
    myBranches:[],
    cratedBy:''
    
  }



const ProductCreate=(props) =>{
  const [values, setValues] = useState(initialState)
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
    branches,
    branche,
    cratedBy
    } = values
  const handleSubmit = (e) => {
    // send product to backend 
    e.preventDefault()

  }
  const handleChange = (e) => {
    
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(e.target.name,'-----',e.target.value);
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
          // textAlign: 'center',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 20,
            // textAlign: 'center',
            minHeight: '100vh',
            margin: 0,
          }}
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Product</h1>
           <Form
            onSubmit={handleSubmit}
             className='container site-layout-background'

             labelCol={{
                      span: 4,
                      }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
       
       
           >
             <div className='form-group'>
               <Form.Item
                   rules={[
                      {
                      required: true,
                       },
                          ]}
                 label="Title"
                className='text-primary'
               >
                 <Input
                  type='text'
                 name='title'
                 className='form-control'
                   value={title}
                   onChange={handleChange}
                 />
        </Form.Item>
            
             </div>

              <div className='form-group'>
               <Form.Item
                  
                 label="Description"
                className='text-primary'
               >
                 <Input.TextArea
                 type='text'
                 name='description'
                 className='form-control'
                   value={description}
                   onChange={handleChange}
                 />
               
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="Price"
                className='text-primary'
               >
                 <Input
                  type='number'
                 name='price'
                 className='form-control  w-25'
                   value={price}
                   onChange={handleChange}
                 />
        </Form.Item>
            
             </div>

                <div className='form-group '>
               <Form.Item
                   
                 label="quality"
                className='text-primary'
               >
                 <select
                
                 name='quality'
                 className='form-control  w-25'
                  
                   onChange={handleChange}
                   
                 >
                
                  {qualities.map((q) => (
                   <option key={q} value={q}>
                      {q}
                   </option>
                 ))}
                 </select>
               
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="shipping option"
                className='text-primary'
               >
                 <select
                
                 name='shipping'
                 className='form-control  w-25'
                  
                   onChange={handleChange}
                 >
                
                 <option value="No">No</option>
                <option value="Yes">Yes</option>
                </select>
        </Form.Item>
            
             </div>

          <div className='form-group '>
               <Form.Item
                   
                 label="warranty Available"
                className='text-primary'
               >
                 <select
                
                 name='warrantyAvailable'
                 className='form-control  w-25'
                  
                   onChange={handleChange}
                 >
                 
                 <option value="No">No</option>
                <option value="Yes">Yes</option>
                 </select>
        </Form.Item>
            
             </div>
        <div className='form-group '>
               <Form.Item
                   
                 label="Quantity"
                className='text-primary'
               >
               <Input
                type="number"
                name="quantity"
                className="form-control w-25"
                value={quantity}
                onChange={handleChange}
              /> 
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="madeIn"
                className='text-primary'
               >
               <Input
                type="text"
                name="madeIn"
                className="form-control w-25"
                value={madeIn}
                onChange={handleChange}
              /> 
        </Form.Item>
            
             </div>
     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset:8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
           </Form>
   

        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
       </Layout>
      
  )
}



export default ProductCreate;
