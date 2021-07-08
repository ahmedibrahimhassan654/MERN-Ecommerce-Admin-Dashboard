import React, { Fragment } from 'react';
import { Form, Input, Button, Select } from 'antd';
;

const { Option } = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const ProductsUpdateForm = ({
	handleSubmit,
	handleChange,
	values,
	setValues,
	handleCategoryChange,
	subOptions,
	categories



}) => {
	//destructure
	const {
		title,
		description,
		price,
		category,
		subs,
		quantity,
		sold,
		images,
		shipping,
		quality,
		qualities,
		warrantyAvailable,
		madeIn,


	} = values;


	return (
		<Fragment>
			<Form
				onSubmitCapture={handleSubmit}
				labelCol={{
					span: 7,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
			>
				<div className="form-group">
					<Form.Item
						rules={[
							{
								required: true,
							},
						]}
						label="Title"
						className="text-primary"
					>
						<Input
							type="text"
							name="title"
							className="form-control  "
							value={title}
							onChange={handleChange}
						/>
					</Form.Item>
				</div>

				<div className="form-group">
					<Form.Item label="Description" className="text-primary">
						<Input.TextArea
							type="text"
							name="description"
							className="form-control  "
							value={description}
							onChange={handleChange}
						/>
					</Form.Item>
				</div>

				<div className="form-group ">
					<Form.Item label="Price with EGP" className="text-primary">
						<Input
							type="number"
							name="price"
							className="form-control  w-50"
							value={price}
							onChange={handleChange}
						/>
					</Form.Item>
				</div>
				<div className="form-group ">
					<Form.Item label="quality" className="text-primary">
						<select value={quality} name="quality" className="form-control  w-50" onChange={handleChange}>

							{qualities.map((q) => (
								<option key={q} value={q}>
									{q}
								</option>
							))}
						</select>
					</Form.Item>
				</div>
				<div className="form-group ">
					<Form.Item label="shipping option" className="text-primary">
						<select
							value={shipping === 'Yes' ? 'Yes' : 'No'}
							name="shipping"
							className="form-control  w-50"
							onChange={handleChange}>

							<option value="No">No</option>
							<option value="Yes">Yes</option>
						</select>
					</Form.Item>
				</div>





				<div className="form-group ">
					<Form.Item label="Quantity" className="text-primary">
						<Input
							type="number"
							name="quantity"
							className="form-control w-50"
							value={quantity}
							onChange={handleChange}
						/>
					</Form.Item>
				</div>



				<div className="form-group ">
					<Form.Item label="warranty Available" className="text-primary">
						<select value={warrantyAvailable} name="warrantyAvailable" className="form-control  w-50" onChange={handleChange}>


							<option value="No">No</option>
							<option value="Yes">Yes</option>
						</select>
					</Form.Item>
				</div>

				<div className="form-group ">
					<Form.Item label="made In" className="text-primary">
						<Input
							type="text"
							name="madeIn"
							className="form-control w-50"
							value={madeIn}
							onChange={handleChange}
						/>
					</Form.Item>
				</div>
				<div className="form-group ">
					<Form.Item label="Chose Category" className="text-primary">
						<select name="category" className="form-control" onChange={handleCategoryChange}>
							<option>{
								category ? category.name : 'Please select'

							}</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</Form.Item>
					{categories.length}
				</div>
				<br />
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
					<Button type="primary" htmlType="submit">
						Submit
						{/* {subOptions ? subOptions.length : 'no subs yet'} */}
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
}

export default ProductsUpdateForm;
