import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
}
const CategoryForm = ({
	handleSubmit,
	name,
	setName,
	description,
	setDescription,
}) => (
		<>
			<Row>
				<Col span={12} offset={6}>
					<Form {...layout} name='nest-messages' onSubmitCapture={handleSubmit}>
						<Form.Item label='Name'>
							<Input
								type='text'
								className='form-controle'
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
								required
							/>
						</Form.Item>
						<Form.Item label='description'>
							<Input.TextArea
								className='form-control'
								type='text'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								autoFocus
							/>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								...layout.wrapperCol,
								offset: 8,
							}}
						>
							<Button type='primary' htmlType='submit'>
								Submit
						</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	)

export default CategoryForm
