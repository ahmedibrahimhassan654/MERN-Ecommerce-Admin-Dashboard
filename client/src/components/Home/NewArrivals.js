import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getProducts, getProductsCount } from '../../function/product';
import { Pagination } from 'antd';
import LoadingCard from '../../components/cards/LoadingCard';

const NewArrivals = () => {


    const [products, setProducts] = useState([])
    const [loading, setloadind] = useState(false)
    const [page, setPage] = useState(1)
    const [productsCount, setProductsCount] = useState(0)

    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount().then((res) => {
            //console.log(res.data);
            setProductsCount(res.data)
        })
    }, [])

    const loadAllProducts = () => {
        setloadind(true)
        // sort, order,limit
        getProducts('createdAt', 'desc', page).then((res) => {
            // console.log(res);
            setProducts(res.data)
        })
        setloadind(false)
    }
    return (
        <>


            <div className='container  justify-content-center'>

                {loading ? <LoadingCard

                    count={3}

                /> : <div className="row ">

                    {products.map((product) => (
                        <div key={product._id} className='col-md-4'>
                            <ProductCard product={product} />
                        </div>

                    ))}

                </div>}


            </div>
            <div className='row'>
                <nav className='col-md-4 offset-md-4 text-center pt-4 p-4'>
                    <Pagination
                        current={page}
                        //(productsCount / 3)where 3 for total number per page 
                        total={(productsCount / 3) * 10}
                        onChange={(value) => setPage(value)}
                    />
                </nav>
            </div>
        </>
    );
};

export default NewArrivals;


