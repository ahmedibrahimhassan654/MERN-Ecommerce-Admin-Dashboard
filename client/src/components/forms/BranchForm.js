import {Form, Button, Input } from 'antd';

import React, { Fragment } from 'react'

const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 16,
   },
 };

function BranchForm({ handleSubmit, handleChange, validateMessages, values }) {
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
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default BranchForm
