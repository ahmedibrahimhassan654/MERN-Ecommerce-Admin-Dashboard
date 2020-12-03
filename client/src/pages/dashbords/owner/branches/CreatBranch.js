import React, { Fragment } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import OwnernNav from "../../../../components/nav/OwnerNav";


import { useState } from "react";
import { Col, Layout, Row ,Form, Input, Button } from "antd";

const { Content, Footer } = Layout;

const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 16,
   },
 };
 const onFinish = (values) => {
   console.log(values);
};
 

//  const validateMessages = {
//    required: '${label} is required!,
//    types: {
//      email: '${label} is not a valid email!',
//      number: '${label} is not a valid number!',
//    },
//    number: {
//      range: '${label} must be between ${min} and ${max}',
//    },
//  };

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

function CreatBranch(props) {
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    addressLine: "",
    district: "",
    country: "",
    province: "",
    trAvailable: "",
    present: "",
    images: "",
    documents: "",
  });
   const [displayBranchUpload,toggleBranchUploade]=useState(false)

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
    // images,
    // documents,
  } = formData;
   const onChange = e => {
      console.log(`selected ${ e.target.value }`);
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <Fragment
          className="site-layout-background"
          style={{
            padding: 20,
            // textAlign: 'center',
            minHeight: "100%",
            margin: 0,
          }}
        >
          <h1 className="text-primary pb-4 pt-5 ">Create New Branch</h1>
          <Row >
                 <Col span={20}>
         <Form {...layout} name="nest-messages"
         onFinish={onFinish}
        //  validateMessages={validateMessages}
         >
      <Form.Item
           name='name'
          
        label="Branch Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
     <Input
           value={name}  
           onChange={e=>onChange(e)}
           />
   </Form.Item>
          <Form.Item
           name='description' label="Description">
           <Input.TextArea
            value={description}  
           onChange={e=>onChange(e)}
           />
      </Form.Item>
      <Form.Item
        name= 'email'
        label="Contact Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
           <Input
           value={email}  
           onChange={e=>onChange(e)}
           />
                        </Form.Item>
                        <Form.Item
        name= 'phone'
        label="Contact phone"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
           <Input
           value={phone}  
           onChange={e=>onChange(e)}

           />
                        </Form.Item>
                        <Form.Item
        name= 'addressLine'
        label="Address line"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
           <Input
           value={addressLine}  
           onChange={e=>onChange(e)}

           />
                        </Form.Item>
   <Form.Item
        name='district'
        label="district منطقه"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
           <Input
            value={district}  
           onChange={e=>onChange(e)}

           />
   </Form.Item>
   <Form.Item
        name='country'
        label="country البلد"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
           <Input
            value={country}  
           onChange={e=>onChange(e)}

           />
</Form.Item>
       

  <Form.Item
        name='province'
        label="provience المحافظه"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
           <Input
           value={province}  
           onChange={e=>onChange(e)}

           />
       </Form.Item>                
    
                        
                           <Form.Item
        name='present'
        label="present "
        rules={[
          {
            type: 'boolean',
          },
        ]}
      >
<select
   value={present}
   name='present'                           
    showSearch
    style={{ width: 200 }}
    placeholder="Your Branch Present ?"
    optionFilterProp="children"
   onChange={e => onChange(e)}
 
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <option value="Products">Products</option>
    <option value="services">services</option>
    
  </select>,
</Form.Item>  
                        
  <Form.Item
        name='trAvailable'
        label="Transportation availale "
        rules={[
          {
            type: 'string',
          },
        ]}
      >
<select
  value={trAvailable}
   name='trAvailable' 
    showSearch
    style={{ width: 200 }}
    placeholder="Your Branch have transportaion ?"
    optionFilterProp="children"
   
      onChange={e=>onChange(e)}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <option value="true">true</option>
    <option value="false">false</option>
    
  </select>,
</Form.Item>  
      
<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
   <Button
   onClick={()=>toggleBranchUploade(!displayBranchUpload)}
   type="primary" htmlType="submit">
      uploade Branch Iamges
   </Button>
</Form.Item>
{displayBranchUpload && <Fragment>
  <Form.Item name='images' label="Branch Images">
     <p>uploade image comp</p>
      </Form.Item>
           
 
<Form.Item name= 'documents' label="Branch Images">
       <p>uploade image files comp</p>
      </Form.Item>
     
  </Fragment>}  
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

CreatBranch.propTypes = {};

export default CreatBranch;
