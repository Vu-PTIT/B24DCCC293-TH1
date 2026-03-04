import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Space, Popconfirm, Card, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ISubject {
	_id?: string;
	maMonHoc: string;
	tenMonHoc: string;
	soTinChi: number;
	moTa?: string;
}

const initialSubjects: ISubject[] = [
	{
		_id: '1',
		maMonHoc: 'CS101',
		tenMonHoc: 'Lập trình Web',
		soTinChi: 3,
		moTa: 'Học cơ bản về phát triển web với HTML, CSS, JavaScript',
	},
	{
		_id: '2',
		maMonHoc: 'CS102',
		tenMonHoc: 'Cơ sở dữ liệu',
		soTinChi: 4,
		moTa: 'Thiết kế và quản lý cơ sở dữ liệu',
	},
	{
		_id: '3',
		maMonHoc: 'CS103',
		tenMonHoc: 'Lập trình hướng đối tượng',
		soTinChi: 3,
		moTa: 'Khái niệm OOP và ứng dụng',
	},
];

export default function SubjectPage() {
	const [form] = Form.useForm();
	const [subjects, setSubjects] = useState<ISubject[]>(initialSubjects);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleAdd = () => {
		form.resetFields();
		setEditingId(null);
		setModalVisible(true);
	};

	const handleEdit = (record: ISubject) => {
		form.setFieldsValue({
			maMonHoc: record.maMonHoc,
			tenMonHoc: record.tenMonHoc,
			soTinChi: record.soTinChi,
			moTa: record.moTa,
		});
		setEditingId(record._id || null);
		setModalVisible(true);
	};

	const handleDelete = (id: string | undefined) => {
		if (!id) return;
		setSubjects(subjects.filter((s) => s._id !== id));
		message.success('Xóa môn học thành công');
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			if (editingId) {
				setSubjects(subjects.map((s) => (s._id === editingId ? { ...s, ...values } : s)));
				message.success('Cập nhật môn học thành công');
			} else {
				const newId = String(Math.max(...subjects.map((s) => parseInt(s._id || '0')), 0) + 1);
				setSubjects([...subjects, { _id: newId, ...values }]);
				message.success('Thêm môn học thành công');
			}
			setModalVisible(false);
		} catch (error) {
			message.error('Vui lòng kiểm tra lại thông tin');
		}
	};

	const columns = [
		{ title: 'Mã Môn Học', dataIndex: 'maMonHoc', key: 'maMonHoc', width: 120 },
		{ title: 'Tên Môn Học', dataIndex: 'tenMonHoc', key: 'tenMonHoc', width: 250 },
		{ title: 'Số Tín Chỉ', dataIndex: 'soTinChi', key: 'soTinChi', width: 100, align: 'center' as const },
		{ title: 'Mô Tả', dataIndex: 'moTa', key: 'moTa', ellipsis: true },
		{
			title: 'Thao Tác',
			key: 'action',
			width: 150,
			render: (_: any, record: ISubject) => (
				<Space>
					<Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xác nhận xóa?' onConfirm={() => handleDelete(record._id)} okText='Xóa' cancelText='Hủy'>
						<Button type='primary' danger size='small' icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '24px' }}>
			<Card>
				<Row gutter={16} style={{ marginBottom: '16px' }}>
					<Col>
						<h1>Quản lý Môn Học</h1>
					</Col>
					<Col style={{ marginLeft: 'auto' }}>
						<Button type='primary' icon={<PlusOutlined />} size='large' onClick={handleAdd}>
							Thêm Môn Học
						</Button>
					</Col>
				</Row>

				<Table
					columns={columns}
					dataSource={subjects}
					rowKey={(record) => record._id || ''}
					pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Tổng: ${total}` }}
				/>
			</Card>

			<Modal
				title={editingId ? 'Chỉnh sửa Môn Học' : 'Thêm Môn Học'}
				visible={modalVisible}
				onOk={handleSave}
				onCancel={() => setModalVisible(false)}
				okText='Lưu'
				cancelText='Hủy'
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Mã Môn Học'
						name='maMonHoc'
						rules={[{ required: true, message: 'Vui lòng nhập mã môn học' }]}
					>
						<Input placeholder='Ví dụ: CS101' />
					</Form.Item>

					<Form.Item
						label='Tên Môn Học'
						name='tenMonHoc'
						rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
					>
						<Input placeholder='Ví dụ: Lập trình Web' />
					</Form.Item>

					<Form.Item
						label='Số Tín Chỉ'
						name='soTinChi'
						rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ' }]}
					>
						<InputNumber min={1} max={10} />
					</Form.Item>

					<Form.Item label='Mô Tả' name='moTa'>
						<Input.TextArea rows={4} placeholder='Nhập mô tả (không bắt buộc)' />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
