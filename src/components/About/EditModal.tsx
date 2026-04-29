import React from 'react';
import { Modal, Form, Input } from 'antd';

interface Props {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	initialValues: any;
}

const EditModal: React.FC<Props> = ({ open, onCancel, onSubmit, initialValues }) => {
	const [form] = Form.useForm();

	return (
		<Modal
			title='Cập nhật thông tin'
			visible={open}
			onOk={() => {
				form.validateFields().then((values) => {
					onSubmit(values);
				});
			}}
			onCancel={onCancel}
		>
			<Form layout='vertical' form={form} initialValues={initialValues}>
				<Form.Item name='name' label='Tên' rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item name='avatar' label='Avatar URL'>
					<Input />
				</Form.Item>

				<Form.Item name='bio' label='Tiểu sử'>
					<Input.TextArea />
				</Form.Item>

				<Form.Item name='skills' label='Kỹ năng (cách nhau bởi dấu ,)'>
					<Input />
				</Form.Item>

				<Form.Item name={['social', 'facebook']} label='Facebook'>
					<Input />
				</Form.Item>

				<Form.Item name={['social', 'github']} label='GitHub'>
					<Input />
				</Form.Item>

				<Form.Item name={['social', 'linkedin']} label='LinkedIn'>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditModal;
