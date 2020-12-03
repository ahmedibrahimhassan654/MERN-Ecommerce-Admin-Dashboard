import React, { useState,useEffect, Fragment } from "react";
 import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';
import {createProduct} from '../../../../function/product'


import { Layout } from "antd";

const { Content, Footer } = Layout;

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
    shipping: ['Yes', 'No'],
    quality: ['Original', 'Hieght Quality', 'Used'],
    warrantyAvailable: ['Yes', 'No'],
    madeIn: '',
  branche: '',
    branches:[],
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
    warrantyAvailable,
    madeIn,
    branches,
    branche,
    cratedBy
    }=values
  
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
            minHeight: "100%",
            margin: 0,
          }}
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Product</h1>
           <form
           //  onSubmit={handleSubmit}
             className='container'
           >
             <div className='form-group'>
               <label className='text-primary'>Title</label>
               <input
                 type='text'
                 name='title'
                 className='form-control'
                 value={title}
                 //onChange={handleChange}
               />
             </div>
        </form>
        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
       </Layout>
      
  )
}



export default ProductCreate;
