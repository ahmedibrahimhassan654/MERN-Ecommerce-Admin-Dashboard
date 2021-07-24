import React, { useEffect, useState } from 'react'
import { Card, Tabs, Input, Form, Button } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../components/images/awhite_200319_3944_4.0.0.jpg'
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { getProduct, productStar } from '../../function/product'
import { useSelector } from 'react-redux';
import { List } from 'antd/lib/form/Form';
import Product from '../../pages/Product';
import Meta from 'antd/lib/card/Meta';




const { TabPane } = Tabs;
const { TextArea } = Input;

const SingleProduct = ({ product, onstarClicke, star, loadSingleProduct, setStar }) => {
    const { title, description, images, _id, ratings } = product
    const [advantage, setAdvantage] = useState('')
    const [disAdvantage, setDisAdvantage] = useState('')

    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        loadSingleProduct()
    }, [_id])




    const handleshare = () => {
        const url = window.document.location.href
        const title = window.document.title
        if (navigator.share) {
            navigator.share({
                url: `${url}`,
                title: `${title}`
            }).then(() => {
                console.log(`Thanks for sharing ${url} with title ${title}`);
            })
                .catch(console.error)
        }
    }

    const handleSubmitRatin = () => {
        productStar(_id, star, advantage, disAdvantage, user.token).then((res) => {
            console.log("rating clicked", res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    }
    return (
        <>
            <div className='col-md-7 p-3 mb-2  '>
                {images && images.length ? (<Carousel
                    autoPlay={true}
                    infiniteLoop={true}


                >
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>) : (
                    <Card cover={
                        <img
                            src={Laptop}
                            className='mb-3 card-image'
                        />
                    }>

                    </Card>
                )}

                <Tabs type="card" className='container'>
                    <TabPane tab="Description" key="1" className='text-center'>
                        {description && description}
                    </TabPane>
                    <TabPane tab="Reviews" key="2" className='text-center'>
                        {ratings && ratings.length ? (
                            <ul className="list-group">
                                {ratings && ratings.map(

                                    (r) =>
                                        <>
                                            <div className='container'>
                                                <div class="mgb-40 padb-30 auto-invert line-b-4 align-center">
                                                    <h5 class="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg" contenteditable="false">Read Customer Reviews</h5>
                                                </div>
                                                <div className='col-md-5' >
                                                    <Card
                                                        hoverable
                                                        key={r._id}
                                                        className='m-5'
                                                    >
                                                        <StarRatings

                                                            rating={r.star}
                                                            starRatedColor="gold"

                                                        />

                                                        <Meta title="Advantage" description={r.advantage} />
                                                        <Meta title="Disadvantage" description={r.disAdvantage} />

                                                    </Card>,


                                                </div>
                                            </div>


                                        </>


                                )

                                }


                            </ul>) : (
                            <h1 >
                                this device not rated yet
                            </h1>
                        )}
                    </TabPane>

                </Tabs>,
            </div >
            <div className='col-md-5 p-3 mb-2  '>

                <Card
                    style={{ width: '100%' }}
                    hoverable
                    actions={[
                        <div className='row'>


                            <div className='col-md-4'>

                                <ShoppingCartOutlined className='text-success' /><br /> Add To Cart

                            </div>
                            <div className='col-md-4 border-left border-danger border-right  '>
                                <Link>
                                    < HeartOutlined className="text-danger" /><br /> Add To Whishlist

                                </Link>
                            </div>
                            <div className='col-md-4'>
                                <RatingModal
                                    product={product}
                                    handleSubmitRatin={handleSubmitRatin}
                                >
                                    <StarRatings

                                        rating={star}
                                        starRatedColor="gold"
                                        changeRating={onstarClicke}
                                        numberOfStars={5}
                                        name={_id}
                                        isSelectable={true}
                                    />


                                    <Form.Item >
                                        <TextArea
                                            className='mt-3'
                                            rows={4}
                                            placeholder="Say the advatage for this product"
                                            type='text'
                                            value={advantage}
                                            onChange={(e) => {
                                                //    console.log('e', e.target.value);
                                                e.preventDefault()
                                                setAdvantage(e.target.value)
                                                console.log('advantage change', advantage);
                                                // //setAdvantage(e.taget.value)
                                                // setAdvantage(e.target.value);
                                            }}
                                            autoFocus
                                        />
                                    </Form.Item>

                                    <Form.Item >
                                        <Input.TextArea
                                            className='mt-3'
                                            rows={4}
                                            placeholder="Say the disAdvatage for this product to avoid that"
                                            type='text'
                                            value={disAdvantage}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                setDisAdvantage(e.target.value)
                                                console.log('disadvantage change', disAdvantage);
                                                //setAdvantage(e.taget.value)
                                                // setAdvantage(e.target.value);
                                            }}

                                            autoFocus
                                        />
                                    </Form.Item>



                                    {/* <TextArea className='mt-3' rows={4} placeholder="Say the advatage for this product" /> */}
                                    {/* // <TextArea className='mt-3' rows={4} placeholder="Say the disAdvatage for this product to avoid that " /> */}
                                </RatingModal>

                            </div>

                            <div className='mt-4'>
                                <Button onClick={handleshare} type="primary" >
                                    share the product
                                </Button>

                            </div>
                        </div>
                    ]}
                >
                    <h1 className='text-center text-white p-3 mb-2 bg-success '>{title}</h1>


                    <ProductListItems product={product} />

                </Card>
            </div >
        </>

    )
}

export default SingleProduct
