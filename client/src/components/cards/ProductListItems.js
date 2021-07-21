import React from 'react'
import { Link } from 'react-router-dom'

const ProductListItems = ({ product }) => {
    const {
        sold,
        madeIn,
        quality,
        warrantyAvailable,
        subs,
        shipping,
        title,
        description,
        price,
        category,
        quantity
    } = product

    return (
        <>

            < ul className='list-group' >
                <li className='list-group-item '>
                    price{' '}
                    <span className=' float-right'>
                        {price} EGP
                    </span>

                </li>

                {category && (
                    <li className='list-group-item'>
                        Category
                        <Link

                            to={`/category/${category.slug}`}
                            className='label label-default label-pill float-right  '
                        >
                            {category.name}
                        </Link>
                    </li>
                )}
                {subs && (
                    <li className='list-group-item '>
                        sub Category{' '}
                        {subs.map((s) =>
                            <div className='row-md-3'>
                                <Link key={s._id} to={`/sub/${s.slug}`} className=' m-3 float-right'>
                                    {s.name}
                                </Link>
                            </div>
                        )}


                    </li>
                )}


                <li className='list-group-item '>
                    shipping{' '}
                    <span className=' float-right'>
                        {shipping}
                    </span>

                </li>

                <li className='list-group-item '>
                    Available{' '}
                    <span className=' float-right'>
                        {quantity} Pieces
                    </span>

                </li>

                <li className='list-group-item '>
                    sold{' '}
                    <span className=' float-right'>
                        {sold} piece
                    </span>

                </li>

                <li className='list-group-item '>
                    madeIn{' '}
                    <span className=' float-right'>
                        {madeIn}
                    </span>

                </li>

                <li className='list-group-item '>
                    quality{' '}
                    <span className=' float-right'>
                        {quality}
                    </span>

                </li>

                <li className='list-group-item '>
                    warranty Available{' '}
                    <span className=' float-right'>
                        {warrantyAvailable}
                    </span>

                </li>



            </ul >
        </>
    )
}

export default ProductListItems
