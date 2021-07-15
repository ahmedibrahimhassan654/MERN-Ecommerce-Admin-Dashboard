import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getProducts } from '../../function/product';

import LoadingCard from '../../components/cards/LoadingCard';

const NewArrivals = () => {


    const [products, setProducts] = useState([])
    const [loading, setloadind] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setloadind(true)
        // sort, order,limit
        getProducts('createdAt', 'desc', 3).then((res) => {
            console.log(res);
            setProducts(res.data)
        })
        setloadind(false)
    }
    return (
        <>


            <div className='container'>

                {loading ? <LoadingCard

                    count={3}

                /> : <div className="row">

                    {products.map((product) => (
                        <div key={product._id} className='col-md-4'>
                            <ProductCard product={product} />
                        </div>

                    ))}

                </div>}


            </div>
        </>
    );
};

export default NewArrivals;


