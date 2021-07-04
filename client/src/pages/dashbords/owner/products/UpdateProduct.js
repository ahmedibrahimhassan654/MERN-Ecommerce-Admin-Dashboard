import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import OwnernNav from '../../../../../src/components/nav/OwnerNav';


import { Layout, Row, Col, } from "antd";
import { toast } from "react-toastify";


const { Content, Footer } = Layout;






const UpdateProduct = (props) => {


	//redux
	const { user } = useSelector((state) => ({ ...state }));


	const currentYear = new Date().getFullYear()
	return (
		<Layout
			className="site-layout"
			style={{
				minHeight: '100vh',
				// textAlign: 'center',
			}}
		>
			<OwnernNav />
			<Content
				style={{
					margin: '16px 16px',
					background: 'site-layout-background',
					// textAlign: 'center',
				}}
			>
            <div className="container">
               <h1>update Product</h1>

            </div>
				<Footer style={{ textAlign: 'center' }}>Ant Design {currentYear} Created by Ant UED</Footer>
			</Content>
		</Layout>
	);
};



export default UpdateProduct;
