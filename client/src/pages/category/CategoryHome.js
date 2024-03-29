import React, { useEffect, useState } from 'react'
import { getCategory } from "../../function/productcategory";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import { Spin, Space } from 'antd';
const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
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
                            {products.length} Products in '{category.name}' category
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

export default CategoryHome
