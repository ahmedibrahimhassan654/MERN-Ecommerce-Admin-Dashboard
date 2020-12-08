import React, { Fragment } from 'react'
import { Layout, Form,Input, Button, Row, Col, } from "antd";
const layout = {
   labelCol: {
     span: 8,
   },
   wrapperCol: {
     span: 16,
   },
 };
function ProductsForm({ handleSubmit, handleChange, values }) {
     //destructure
  const
    {
    title,
    description,
    price,
    category,
    categories,
    subs,
    quantity,
    sold,
    images,
    shipping,
    quality,
    qualities,
    warrantyAvailable,
    madeIn,
   
    branche,
    
    } = values
    return (
        <Fragment>
         <Form
            onSubmitCapture={handleSubmit}
             //className='container site-layout-background'

             labelCol={{
                      span: 7,
                      }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
       
       
           >
             <div className='form-group'>
               <Form.Item
                   rules={[
                      {
                      required: true,
                       },
                          ]}
                 label="Title"
                className='text-primary'
               >
                 <Input
                  type='text'
                 name='title'
                 className='form-control'
                   value={title}
                   onChange={handleChange}
                 />
        </Form.Item>
            
             </div>

                 <div className='form-group'>
               <Form.Item
                   rules={[
                      {
                       required: true,
                        type:Number
                       },
                          ]}
                 label="Sold Value"
                className='text-primary'
               >
                 <Input
                  type='number'
                 name='sold'
                 className='form-control'
                   value={sold}
                   onChange={handleChange}
                 />
        </Form.Item>
            
             </div>

              <div className='form-group'>
               <Form.Item
                  
                 label="Description"
                className='text-primary'
               >
                 <Input.TextArea
                 type='text'
                 name='description'
                 className='form-control'
                   value={description}
                   onChange={handleChange}
                 />
               
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="Price"
                className='text-primary'
               >
                 <Input
                  type='number'
                 name='price'
                 className='form-control  w-50'
                   value={price}
                   onChange={handleChange}
                 />
        </Form.Item>
            
             </div>

                <div className='form-group '>
               <Form.Item
                   
                 label="quality"
                className='text-primary'
               >
                 <select
                
                 name='quality'
                
                   className='form-control  w-50'
                   onChange={handleChange}
                   
                 >
                 <option >Please select</option>
                  {qualities.map((q) => (
                   <option key={q} value={q}>
                      {q}
                   </option>
                 ))}
                 </select>
               
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="shipping option"
                className='text-primary'
               >
                 <select
                
                 name='shipping'
                 className='form-control  w-50'
                  
                   onChange={handleChange}
                 >
                 <option >Please select</option>
                 <option value="No">No</option>
                <option value="Yes">Yes</option>
                </select>
        </Form.Item>
            
             </div>

          <div className='form-group '>
               <Form.Item
                   
                 label="warranty Available"
                className='text-primary'
               >
                 <select
                
                 name='warrantyAvailable'
                 className='form-control  w-50'
                  
                   onChange={handleChange}
                 >
                  <option >Please select</option>
                 <option value="No">No</option>
                <option value="Yes">Yes</option>
                 </select>
        </Form.Item>
            
             </div>
        <div className='form-group '>
               <Form.Item
                   
                 label="Quantity"
                className='text-primary'
               >
               <Input
                type="number"
                name="quantity"
                className="form-control w-50"
                value={quantity}
                onChange={handleChange}
              /> 
        </Form.Item>
            
             </div>

             <div className='form-group '>
               <Form.Item
                   
                 label="made In"
                className='text-primary'
               >
               <Input
                type="text"
                name="madeIn"
                className="form-control w-50"
                value={madeIn}
                onChange={handleChange}
              /> 
        </Form.Item>
            
             </div>
     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset:7}}>
               <Button type="primary"
                 htmlType="submit"
               >
          Submit
        </Button>
      </Form.Item>
           </Form>    
        </Fragment>
    )
}

export default ProductsForm
