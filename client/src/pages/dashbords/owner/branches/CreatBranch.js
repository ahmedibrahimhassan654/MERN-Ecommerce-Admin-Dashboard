import React, { Fragment } from "react";
 import { useSelector } from "react-redux";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import OwnernNav from "../../../../components/nav/OwnerNav";


import { useState } from "react";
import { Col, Layout, Row ,Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import {createBranch} from '../../../../function/branch'
const { Content, Footer } = Layout;

const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 16,
   },
 };

 

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

   

 const {
    name,
    description,
    email,
    phone,
    addressLine,
    district,
    country,
    province,
    trAvailable,
    present,
    presents,
    images,
    documents,
  } = values;
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
      
          // style={{
          //   padding: 20,
          //   // textAlign: 'center',
          //   minHeight: "100vh",
          //   margin: 0,
          // }}
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Branch</h1>
          <Row >
                 <Col span={20}>
               <Form {...layout}
                 
                 onSubmitCapture={handleSubmit}
                  layout="horizontal"
           validateMessages={validateMessages}
         >
      <Form.Item
          
          
        label="Branch Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
     <Input
        type='text'   
       value={name}  
         name='name'
                     onChange={handleChange}
                      className='form-control'
           />
   </Form.Item>
          <Form.Item
                 
                   label="Description"
                  rules={[
                      {
                      required: true,
                        },
                      ]}
                 >
                   <Input.TextArea
                       name='description'
            value={description}  
            onChange={handleChange}
           />
      </Form.Item>
      <Form.Item
       
        label="Contact Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
                   <Input
                      name= 'email'
           value={email}  
           onChange={handleChange}
           />
      </Form.Item>
    <Form.Item
        
        label="Contact phone"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
                   <Input
                     name= 'phone'
           value={phone}  
            onChange={handleChange}

           />
      </Form.Item>
    <Form.Item
        
        label="Address line"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
                   <Input
                     name= 'addressLine'
           value={addressLine}  
           onChange={handleChange}

           />
                        </Form.Item>
   <Form.Item
        
        label="district منطقه"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
                   <Input
                     name='district'
            value={district}  
            onChange={handleChange}

           />
   </Form.Item>
   <Form.Item
      
        label="country البلد"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
                   <Input
                       name='country'
            value={country}  
            onChange={handleChange}

           />
</Form.Item>
       

  <Form.Item
      
        label="provience المحافظه"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
                   <Input
                       name='province'
           value={province}  
            onChange={handleChange}

           />
       </Form.Item>                
    
                        
    <Form.Item
       
        label="present "
      className='text-primary'
      >
<select
 
   name='present'                           
   // showSearch
     className='form-control  w-50'
    placeholder="Your Branch Present ?"
  
   onChange={handleChange}
 
    
   
  >
   <option >Please select</option>
    {presents.map((p) => (
      <option key={p} value={p}>
          {p}
      </option>
    ))}
    
  </select>,
</Form.Item>  
                        
  <Form.Item
      
        label="Transportation availale "
        rules={[
          {
            type: 'string',
          },
        ]}
      >
<select
  
   name='trAvailable' 
 className='form-control  w-50'
   
    onChange={handleChange}
  
  
  >
        <option >Please select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
    
  </select>,
</Form.Item>  
      

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
             
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
