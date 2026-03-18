// import { Card } from 'antd';
// import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';

// /*
//  * Nhiệm vụ Người 3:
//  * - Sử dụng Model: QuanLyVanBang.VanBang, QuanLyVanBang.TruongDuLieu
//  * - Tích hợp các trường động từ cấu hình biểu mẫu của Người 2.
//  */

// const ThongTinVanBang = () => {
//     return (
//         <Card title="Quản lý Thông tin văn bằng">
//             <p>Người phụ trách: Người 3</p>
//             <div>
//                 <p>Nhiệm vụ: Render form nhập liệu dựa trên cấu hình biểu mẫu.</p>
//                 <p>Base Model đã sẵn sàng trong: <code>@/services/QuanLyVanBang/typing</code></p>
//             </div>
//         </Card>
//     );
// };

// export default ThongTinVanBang;
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, Select, Space, message, Row, Col } from 'antd';

const { Option } = Select;

/* ===== CẤU HÌNH FIELD ĐỘNG (GIẢ LẬP ADMIN CONFIG) ===== */
const fieldConfigs = [
	{ name: 'danToc', label: 'Dân tộc', type: 'string' },
	{ name: 'noiSinh', label: 'Nơi sinh', type: 'string' },
	{ name: 'diemTrungBinh', label: 'Điểm trung bình', type: 'number' },
	{ name: 'ngayNhapHoc', label: 'Ngày nhập học', type: 'date' },
];

/* ===== GIẢ LẬP DANH SÁCH QUYẾT ĐỊNH ===== */
const quyetDinhs = [
	{ id: 'QD1', name: 'QĐ 01/2024 - Đợt 1' },
	{ id: 'QD2', name: 'QĐ 02/2024 - Đợt 2' },
];

export default function VanBangPage() {
	const [data, setData] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<any>(null);

	const [form] = Form.useForm();
	const [searchForm] = Form.useForm();

	/* ===== SỐ VÀO SỔ TỰ ĐỘNG ===== */
	const getNextSoVaoSo = () => {
		if (data.length === 0) return 1;
		return Math.max(...data.map((i) => i.soVaoSo)) + 1;
	};

	/* ===== THÊM ===== */
	const handleAdd = () => {
		setEditing(null);
		form.resetFields();
		form.setFieldsValue({
			soVaoSo: getNextSoVaoSo(),
		});
		setOpen(true);
	};

	/* ===== SỬA ===== */
	const handleEdit = (record: any) => {
		setEditing(record);
		form.setFieldsValue(record);
		setOpen(true);
	};

	/* ===== XÓA ===== */
	const handleDelete = (id: number) => {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
		setFilteredData(newData);
		message.success('Đã xóa văn bằng');
	};

	/* ===== LƯU ===== */
	const handleSubmit = (values: any) => {
		if (editing) {
			const newData = data.map((item) => (item.id === editing.id ? { ...editing, ...values } : item));
			setData(newData);
			setFilteredData(newData);
			message.success('Cập nhật thành công');
		} else {
			const newItem = {
				id: Date.now(),
				...values,
			};

			const newData = [...data, newItem];
			setData(newData);
			setFilteredData(newData);

			message.success('Thêm văn bằng thành công');
		}

		setOpen(false);
	};

	/* ===== TRA CỨU (≥2 THAM SỐ) ===== */
	const handleSearch = (values: any) => {
		const filled = Object.values(values).filter((v) => v);

		if (filled.length < 2) {
			message.error('Vui lòng nhập ít nhất 2 tham số tra cứu');
			return;
		}

		const result = data.filter((item) => {
			return (
				(!values.soHieuVanBang || item.soHieuVanBang?.includes(values.soHieuVanBang)) &&
				(!values.soVaoSo || item.soVaoSo === Number(values.soVaoSo)) &&
				(!values.maSinhVien || item.maSinhVien?.includes(values.maSinhVien)) &&
				(!values.hoTen || item.hoTen?.includes(values.hoTen))
			);
		});

		setFilteredData(result);
	};

	/* ===== RESET SEARCH ===== */
	const handleResetSearch = () => {
		searchForm.resetFields();
		setFilteredData(data);
	};

	/* ===== RENDER FIELD ĐỘNG ===== */
	const renderField = (field: any) => {
		switch (field.type) {
			case 'number':
				return <InputNumber style={{ width: '100%' }} min={0} max={10} />;

			case 'date':
				return <DatePicker style={{ width: '100%' }} />;

			default:
				return <Input />;
		}
	};

	/* ===== TABLE ===== */
	const columns = [
		{
			title: 'Số vào sổ',
			dataIndex: 'soVaoSo',
		},
		{
			title: 'Số hiệu văn bằng',
			dataIndex: 'soHieuVanBang',
		},
		{
			title: 'Mã sinh viên',
			dataIndex: 'maSinhVien',
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'ngaySinh',
		},
		{
			title: 'Quyết định',
			dataIndex: 'quyetDinh',
		},
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<Space>
					<Button onClick={() => handleEdit(record)}>Sửa</Button>
					<Button danger onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 20 }}>
			<h2>Quản lý thông tin văn bằng</h2>

			{/* ===== TRA CỨU ===== */}
			<Form form={searchForm} onFinish={handleSearch}>
				<Row gutter={10}>
					<Col span={4}>
						<Form.Item name='soHieuVanBang'>
							<Input placeholder='Số hiệu văn bằng' />
						</Form.Item>
					</Col>

					<Col span={4}>
						<Form.Item name='soVaoSo'>
							<Input placeholder='Số vào sổ' />
						</Form.Item>
					</Col>

					<Col span={4}>
						<Form.Item name='maSinhVien'>
							<Input placeholder='Mã sinh viên' />
						</Form.Item>
					</Col>

					<Col span={4}>
						<Form.Item name='hoTen'>
							<Input placeholder='Họ tên' />
						</Form.Item>
					</Col>

					<Col span={8}>
						<Button type='primary' htmlType='submit'>
							Tra cứu
						</Button>

						<Button style={{ marginLeft: 10 }} onClick={handleResetSearch}>
							Reset
						</Button>
					</Col>
				</Row>
			</Form>

			<Button type='primary' onClick={handleAdd} style={{ marginBottom: 20 }}>
				Thêm văn bằng
			</Button>

			<Table rowKey='id' columns={columns} dataSource={filteredData} />

			{/* ===== FORM ===== */}
			<Modal
				title='Thông tin văn bằng'
				visible={open}
				onCancel={() => setOpen(false)}
				onOk={() => form.submit()}
				width={600}
			>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Form.Item label='Số vào sổ' name='soVaoSo'>
						<Input disabled />
					</Form.Item>

					<Form.Item
						label='Số hiệu văn bằng'
						name='soHieuVanBang'
						rules={[{ required: true, message: 'Nhập số hiệu văn bằng' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item label='Mã sinh viên' name='maSinhVien'>
						<Input />
					</Form.Item>

					<Form.Item label='Họ tên' name='hoTen'>
						<Input />
					</Form.Item>

					<Form.Item label='Ngày sinh' name='ngaySinh'>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item label='Quyết định tốt nghiệp' name='quyetDinh'>
						<Select>
							{quyetDinhs.map((q) => (
								<Option key={q.id} value={q.name}>
									{q.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					{/* ===== FIELD ĐỘNG ===== */}
					{fieldConfigs.map((field) => (
						<Form.Item key={field.name} label={field.label} name={field.name}>
							{renderField(field)}
						</Form.Item>
					))}
				</Form>
			</Modal>
		</div>
	);
}
