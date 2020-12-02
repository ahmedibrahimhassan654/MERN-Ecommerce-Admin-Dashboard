import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OwnernNav from "../../../../components/nav/OwnerNav";

import { useState } from "react";
import { Col, Layout, Row ,Form, Input, InputNumber, Button} from "antd";

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
  } = formData;

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
          <h1 className="text-primary pb-4 pt-5 ">Create New Branch</h1>
          <Row className="container">
                 <Col span={12}>
                    <Form {...layout} name="nest-messages"
                       onFinish={onFinish} validateMessages={validateMessages}
                    >
      <Form.Item
        name={['branch', 'name']}
        label="Branch Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['branch', 'email']}
        label="Contact Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
     
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['branch', 'description']} label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
             
            </Col>
          </Row>
        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
    </Layout>
  );
}

CreatBranch.propTypes = {};

export default CreatBranch;
