import React, { Fragment } from 'react';
import { Form, Input, Button, Select, Tag } from 'antd';
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
function ProductsForm({ handleSubmit, handleChange, values, setValues, handleCategoryChange, subOptions, showSub }) {
	//destructure
	const {
		title,
		description,
		price,
		category,
		categories,
		subs,
		quantity,
		branches,
		sold,
		images,
		shipping,
		quality,
		qualities,
		warrantyAvailable,
		madeIn,
		branche,
	} = values;
	//const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }, { value: 'red' }];

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
					<Form.Item label="Price" className="text-primary">
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
						<select name="quality" className="form-control  w-50" onChange={handleChange}>
							<option>Please select</option>
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
						<select name="shipping" className="form-control  w-50" onChange={handleChange}>
							<option>Please select</option>
							<option value="No">No</option>
							<option value="Yes">Yes</option>
						</select>
					</Form.Item>
				</div>

				<div className="form-group ">
					<Form.Item label="Chose Category" className="text-primary">
						<select name="category" className="form-control" onChange={handleCategoryChange}>
							<option>Please select</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</Form.Item>
				</div>

				{showSub && (
					<div className="form-group ">
						<Form.Item label="Chose Sub Category" className="text-primary">
							<Select
								mode="multiple"
								// showArrow
								// defaultValue={[]}
								style={{ width: '50%' }}
								value={subs}
								// name="subs"
								onChange={(value) => setValues({ ...values, subs: value })}
							>
								{subOptions.length &&
									subOptions.map((sub) => (
										<Option key={sub._id} value={sub._id}>
											{sub.name}
										</Option>
									))}
							</Select>
						</Form.Item>
					</div>
				)}

				<div className="form-group ">
					<Form.Item label="warranty Available" className="text-primary">
						<select name="warrantyAvailable" className="form-control  w-50" onChange={handleChange}>
							<option>Please select</option>

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

export default ProductsForm;
