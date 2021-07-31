import React, { useEffect, useState } from 'react'
import { getSubCategory } from "../../function/productSubCategory";
import ProductCard from "../../components/cards/ProductCard";
import { Spin, Space } from 'antd';
const SubHome = ({ match }) => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getSubCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setSub(res.data.sub);
            setProducts(res.data.products)
            setLoading(false)

        });
    }, []);
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    {loading ? (
                        // <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
                        //     Loading ....
                        // </h4>
                        <>
                            <Space size="middle">

                                <Spin size="large" />
                            </Space>
                        </>

                    ) : (
                        <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
                            {products.length} Products in '{sub.name}' sub category
                        </h4>
                    )}
                </div>
            </div>
            <div className='row'>
                {products.map((p) =>
                    <div className='container col-md-3 p-5' key={p._id}>
                        <ProductCard product={p} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubHome
