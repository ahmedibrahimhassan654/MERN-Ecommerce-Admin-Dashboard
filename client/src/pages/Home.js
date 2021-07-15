import React from 'react';
import Jumptrone from '../components/cards/Jumptrone';
import BestSold from '../components/Home/BestSold';
import NewArrivals from '../components/Home/NewArrivals'

const Home = () => {





  return (
    <>
      <div className='jumbotron text-danger text-center font-weight-bold h1'>
        <Jumptrone text={['latest products', "New Arrivals", 'Best Sellers']} />
      </div>


      <h1 className='jumbotron text-primary  text-center p-3 mt-5 mb-5'>New Arrivals</h1>

      <NewArrivals />

      <h1 className='jumbotron text-danger  text-center p-3 mt-5 mb-5'>Best Sold</h1>

      <BestSold />

    </>
  );
};

export default Home;
