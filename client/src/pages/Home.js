import React, { useEffect, useState } from 'react';
import ProductCard from '../components/cards/ProductCard';
import { getProductByCount } from '../function/product';
import Jumptrone from '../components/cards/Jumptrone'



const Home = () => {


  const [products, setProducts] = useState([])
  const [loading, setloadind] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setloadind(true)
    getProductByCount(3).then((res) => {
      setProducts(res.data.products)
    })
    setloadind(false)
  }
  return (
    <>
      <div className='jumbotron text-danger text-center font-weight-bold h1'>
        <Jumptrone text={['latest products', "New Arrivals", 'Best Sellers']} />
      </div>

      <div className='container'>

        <div className="row">

          {products.map((product) => (
            <div key={product._id} className='col-md-4'>
              <ProductCard product={product} />
            </div>

          ))}

        </div>


      </div>
    </>
  );
};

export default Home;
