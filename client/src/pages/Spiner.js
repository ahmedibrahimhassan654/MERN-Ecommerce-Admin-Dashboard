import React, { Fragment } from 'react'
import { Spin } from 'antd';
import './spiner.css'
export default  ()=> {
   return (
      <Fragment>
         <div className="example">
            <Spin
            alt='loading ...'
            />
         </div>,
      </Fragment>
      
   )
}

 
