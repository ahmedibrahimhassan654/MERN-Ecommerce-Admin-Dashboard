import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import OwnernNav from '../../../../components/nav/OwnerNav'
import { Layout } from 'antd';
import { useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Form, Input, InputNumber, Button } from 'antd';
import { Select } from 'antd';

const { Option } = Select;


const { Content, Footer } = Layout

function CreatBranch(props) {
   const [formData, setFormData] = useState({

      name:'',
      description:'',
       email:'',
       phone:'',
      addressLine:'',
      district:'',
       country:'',
       province:'',
      trAvailable:'',
       present:'',
       images:'',
       documents:''
   })
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
       images,
       documents,
   } = formData

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
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
   const onFinish = (values) => {
      console.log(values);
    };


    function onChange(value) {
      console.log(`selected ${value}`);
    }
    
    function onBlur() {
      console.log('blur');
    }
    
    function onFocus() {
      console.log('focus');
    }
    
    function onSearch(val) {
      console.log('search:', val);
    }
    
   
   return (
      <Layout
      className='site-layout'
      style={{
         minHeight: '100vh',
         // textAlign: 'center',
      }}
   >
      <OwnernNav />
         <Content style={{
            margin: '16px 16px',
            // textAlign: 'center',
         
         }}>
         <div
            className='site-layout-background'
            style={{
               padding: 20,
               // textAlign: 'center',
               minHeight: '100%',
               margin: 0 
            }}
         >
            <h1 className='text-primary pb-4 pt-5 '>
               Create New Branch
            </h1>
<div className='container'>
   <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={name}
        label="Branch Name "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="desc"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
       <Input />
 </Form.Item>
      
     
       <FormItem                      
         label="Present"
         value={present}>
         <Select
         showSearch
         style={{
            width: 600,
             

         }}
         
         bordered={true}
         placeholder="present"
         optionFilterProp="children"
         onChange={onChange}
         onFocus={onFocus}
         onBlur={onBlur}
         onSearch={onSearch}
         filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         }
      >
         <Option value="products">products</Option>
         <Option value="services">services</Option>
      
      </Select>,            
   </FormItem>

      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
              </div>
                  
         </div>
         <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
         </Footer>
      </Content>
   </Layout>
   )
}

CreatBranch.propTypes = {

}

export default CreatBranch

