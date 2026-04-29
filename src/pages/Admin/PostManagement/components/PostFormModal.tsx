import React from 'react';
import { Modal, Form, Input, Select, FormInstance } from 'antd';
import { Post, PostStatus } from '@/services/blog/typings';

interface PostFormValues {
	title: string;
	slug: string;
	content: string;
	coverUrl: string;
	tags: string[];
	status: PostStatus;
}

interface PostFormModalProps {
	visible: boolean;
	form: FormInstance<PostFormValues>;
	onCancel: () => void;
	onSubmit: () => void;
	editingPost: Post | null;
	tagOptions: Array<{ label: string; value: string }>;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
	visible,
	form,
	onCancel,
	onSubmit,
	editingPost,
	tagOptions,
}) => {
	const isMobile = window.innerWidth < 768;

	return (
		<Modal
			title={editingPost ? 'Sua bai viet' : 'Them bai viet'}
			visible={visible}
			onCancel={onCancel}
			onOk={onSubmit}
			okText={editingPost ? 'Cap nhat' : 'Tao moi'}
			cancelText='Huy'
			destroyOnClose
			width={isMobile ? '95vw' : 780}
			style={{ maxWidth: '95vw' }}
		>
			<Form form={form} layout='vertical' initialValues={{ status: PostStatus.DRAFT, tags: [] }}>
				<Form.Item label='Tieu de' name='title' rules={[{ required: true, message: 'Vui long nhap tieu de.' }]}>
					<Input placeholder='Nhap tieu de bai viet' />
				</Form.Item>

				<Form.Item label='Slug' name='slug' rules={[{ required: true, message: 'Vui long nhap slug.' }]}>
					<Input placeholder='vi-du-bai-viet' />
				</Form.Item>

				<Form.Item
					label='Noi dung'
					name='content'
					rules={[{ required: true, message: 'Vui long nhap noi dung bai viet.' }]}
				>
					<Input.TextArea rows={isMobile ? 4 : 6} placeholder='Nhap noi dung' />
				</Form.Item>

				<Form.Item
					label='Anh dai dien (URL)'
					name='coverUrl'
					rules={[
						{ required: true, message: 'Vui long nhap URL anh dai dien.' },
						{ type: 'url', message: 'URL khong hop le.' },
					]}
				>
					<Input placeholder='https://example.com/cover.jpg' />
				</Form.Item>

				<Form.Item
					label='The'
					name='tags'
					rules={[{ required: true, message: 'Vui long chon it nhat 1 the tu Quan ly the.' }]}
				>
					<Select mode='multiple' placeholder='Chon the' options={tagOptions} />
				</Form.Item>

				<Form.Item label='Trang thai' name='status' rules={[{ required: true, message: 'Vui long chon trang thai.' }]}>
					<Select
						options={[
							{ label: 'Nhap', value: PostStatus.DRAFT },
							{ label: 'Da dang', value: PostStatus.PUBLISHED },
						]}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default PostFormModal;
