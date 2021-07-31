import React from 'react';
import Jumptrone from '../components/cards/Jumptrone';
import BestSold from '../components/Home/BestSold';
import NewArrivals from '../components/Home/NewArrivals'

import { Layout, } from "antd";
import CategoryList from '../components/category/CategoryList';
import SubsList from '../components/subs/SubsList';
const { Footer } = Layout;

const Home = () => {




  const currentYear = new Date().getFullYear()
  return (
    <>
      <div className='jumbotron text-danger text-center font-weight-bold h1'>
        <Jumptrone text={['latest products', "New Arrivals", 'Best Sellers']} />
      </div>


      <h1 className='jumbotron text-primary  text-center p-3 mt-5 mb-5'>New Arrivals</h1>
      <div className='container  justify-content-center'>
        <NewArrivals />

        <h1 className='jumbotron text-danger  text-center p-3 mt-5 mb-5'>Best Sold</h1>

        <BestSold />
        <h1 className='jumbotron text-info  text-center p-3 mt-5 mb-5'>Categories</h1>

        <CategoryList />

        <h1 className='jumbotron text-warning  text-center p-3 mt-5 mb-5'>Sub Category</h1>
        <SubsList />

      </div>

      <Footer style={{ textAlign: 'center' }}>we are almost there  {currentYear} Created by Ahmed Ibrahim</Footer>

    </>
  );
};

export default Home;
