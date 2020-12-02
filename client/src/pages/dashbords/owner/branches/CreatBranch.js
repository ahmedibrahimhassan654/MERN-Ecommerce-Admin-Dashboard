import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OwnernNav from "../../../../components/nav/OwnerNav";

import { useState } from "react";
import { Col, Layout, Row } from "antd";

const { Content, Footer } = Layout;

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
              <button type="submit" class="btn btn-primary">
                Add Branch Information
              </button>
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
