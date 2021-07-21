
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getProducts, getProductsCount } from '../../function/product';
import { Pagination } from 'antd';
import LoadingCard from '../../components/cards/LoadingCard';
import { Badge } from 'antd';
const BestSold = () => {


    const [products, setProducts] = useState([])
    const [loading, setloadind] = useState(false)
    const [page, setPage] = useState(1)
    const [productsCount, setProductsCount] = useState(0)
    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount().then((res) => {

            setProductsCount(res.data)

        })
    }, [])

    const loadAllProducts = () => {
        setloadind(true)
        // sort, order,limit
        getProducts('sold', 'desc', page).then((res) => {
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
                        <>
                            {product.sold > 0 ?

                                <div key={product._id} className='col-md-4 pt-5'>






                                    <Badge.Ribbon text={`sold ${product.sold} times`} color="magenta" >

                                        <ProductCard product={product} />
                                    </Badge.Ribbon>
                                </div> : ''}

                        </>

                    ))}

                </div>}


            </div>

            <div className='row'>
                <nav className='col-md-4 offset-md-4 text-center pt-4 p-4'>
                    <Pagination
                        products={products}
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

export default BestSold;


