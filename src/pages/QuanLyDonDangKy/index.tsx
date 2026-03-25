import { PageContainer } from '@ant-design/pro-layout';
import {
	Card,
	Table,
	Button,
	Tag,
	Space,
	Modal,
	Form,
	Input,
	Select,
	message,
	Popconfirm,
	Descriptions,
	Typography,
	Timeline,
} from 'antd';
import {
	CheckOutlined,
	CloseOutlined,
	PlusOutlined,
	HistoryOutlined,
	EditOutlined,
	EyeOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

type RegistrationStatus = 'Pending' | 'Approved' | 'Rejected';

interface IApprovalHistory {
	id: string;
	action: 'APPROVED' | 'REJECTED' | 'CREATED' | 'UPDATED';
	actor: string;
	timestamp: string;
	reason?: string;
}

interface IRegistrationFormValues {
	fullName: string;
	email: string;
	phone: string;
	gender: 'Nam' | 'Nữ' | 'Khác';
	address: string;
	strength: string;
	clubName: string;
	registrationReason: string;
	note?: string;
}

interface IRegistrationItem extends IRegistrationFormValues {
	key: string;
	status: RegistrationStatus;
	appliedAt: string;
	histories: IApprovalHistory[];
}

const CLUB_OPTIONS = [
	{ label: 'CLB Lập trình', value: 'CLB Lập trình' },
	{ label: 'CLB Tiếng Anh', value: 'CLB Tiếng Anh' },
	{ label: 'CLB Truyền thông', value: 'CLB Truyền thông' },
	{ label: 'CLB Bóng đá', value: 'CLB Bóng đá' },
];

const getNowText = () => new Date().toLocaleString('vi-VN');

const createHistory = (action: IApprovalHistory['action'], actor: string, reason?: string): IApprovalHistory => ({
	id: `${Date.now()}-${Math.random()}`,
	action,
	actor,
	timestamp: getNowText(),
	reason,
});

const statusColorMap: Record<RegistrationStatus, string> = {
	Pending: 'gold',
	Approved: 'green',
	Rejected: 'red',
};

const statusLabelMap: Record<RegistrationStatus, string> = {
	Pending: 'Pending',
	Approved: 'Approved',
	Rejected: 'Rejected',
};

const QuanLyDonDangKy = () => {
	const [form] = Form.useForm<IRegistrationFormValues>();
	const [rejectForm] = Form.useForm<{ reason: string }>();

	const [dataSource, setDataSource] = useState<IRegistrationItem[]>([
		{
			key: 'REG-001',
			fullName: 'Nguyễn Văn An',
			email: 'an.nguyen@ptit.edu.vn',
			phone: '0987654321',
			gender: 'Nam',
			address: 'Hà Đông, Hà Nội',
			strength: 'Lập trình React',
			clubName: 'CLB Lập trình',
			registrationReason: 'Muốn phát triển kỹ năng frontend.',
			status: 'Pending',
			note: '',
			appliedAt: '10/03/2026 09:30',
			histories: [createHistory('CREATED', 'System')],
		},
		{
			key: 'REG-002',
			fullName: 'Trần Thu Hà',
			email: 'ha.tran@ptit.edu.vn',
			phone: '0911222333',
			gender: 'Nữ',
			address: 'Thanh Xuân, Hà Nội',
			strength: 'Viết nội dung',
			clubName: 'CLB Truyền thông',
			registrationReason: 'Muốn tham gia các sự kiện truyền thông.',
			status: 'Approved',
			note: '',
			appliedAt: '09/03/2026 14:05',
			histories: [createHistory('CREATED', 'System'), createHistory('APPROVED', 'Admin')],
		},
		{
			key: 'REG-003',
			fullName: 'Lê Đức Minh',
			email: 'minh.le@ptit.edu.vn',
			phone: '0909988776',
			gender: 'Nam',
			address: 'Văn Quán, Hà Đông',
			strength: 'Thiết kế poster',
			clubName: 'CLB Truyền thông',
			registrationReason: 'Muốn phát triển kỹ năng thiết kế.',
			status: 'Rejected',
			note: 'Không phù hợp lịch sinh hoạt hiện tại.',
			appliedAt: '08/03/2026 08:45',
			histories: [
				createHistory('CREATED', 'System'),
				createHistory('REJECTED', 'Admin', 'Không phù hợp lịch sinh hoạt hiện tại.'),
			],
		},
	]);

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [editingRecord, setEditingRecord] = useState<IRegistrationItem | null>(null);
	const [activeRecord, setActiveRecord] = useState<IRegistrationItem | null>(null);
	const [rejectMode, setRejectMode] = useState<'single' | 'bulk'>('single');

	const openCreateModal = () => {
		setEditingRecord(null);
		form.resetFields();
		setIsFormModalOpen(true);
	};

	const openEditModal = (record: IRegistrationItem) => {
		setEditingRecord(record);
		form.setFieldsValue({
			fullName: record.fullName,
			email: record.email,
			phone: record.phone,
			gender: record.gender,
			address: record.address,
			strength: record.strength,
			clubName: record.clubName,
			registrationReason: record.registrationReason,
			note: record.note,
		});
		setIsFormModalOpen(true);
	};

	const saveForm = async () => {
		const values = await form.validateFields();

		if (editingRecord) {
			setDataSource((prev) =>
				prev.map((item) =>
					item.key === editingRecord.key
						? {
								...item,
								...values,
								histories: [...item.histories, createHistory('UPDATED', 'Admin')],
						  }
						: item,
				),
			);
			message.success('Cập nhật đơn đăng ký thành công');
		} else {
			const newItem: IRegistrationItem = {
				key: `REG-${String(dataSource.length + 1).padStart(3, '0')}`,
				status: 'Pending',
				appliedAt: getNowText(),
				histories: [createHistory('CREATED', 'Admin')],
				...values,
			};
			setDataSource((prev) => [newItem, ...prev]);
			message.success('Thêm mới đơn đăng ký thành công');
		}

		setIsFormModalOpen(false);
		form.resetFields();
	};

	const deleteRecord = (recordKey: string) => {
		setDataSource((prev) => prev.filter((item) => item.key !== recordKey));
		setSelectedRowKeys((prev) => prev.filter((key) => key !== recordKey));
		message.success('Đã xóa đơn đăng ký');
	};

	const applyStatus = (keys: React.Key[], status: RegistrationStatus, rejectReason?: string) => {
		const actor = 'Admin';
		setDataSource((prev) =>
			prev.map((item) => {
				if (!keys.includes(item.key)) {
					return item;
				}

				return {
					...item,
					status,
					note: status === 'Rejected' ? rejectReason : item.note,
					histories: [
						...item.histories,
						createHistory(status === 'Approved' ? 'APPROVED' : 'REJECTED', actor, rejectReason),
					],
				};
			}),
		);
	};

	const approveSingle = (record: IRegistrationItem) => {
		Modal.confirm({
			title: 'Xác nhận duyệt đơn',
			content: `Bạn có chắc muốn duyệt đơn của ${record.fullName}?`,
			okText: 'Duyệt',
			cancelText: 'Hủy',
			onOk: () => {
				applyStatus([record.key], 'Approved');
				message.success('Đã duyệt đơn');
			},
		});
	};

	const approveBulk = () => {
		if (!selectedRowKeys.length) {
			message.warning('Vui lòng chọn ít nhất 1 đơn đăng ký');
			return;
		}

		Modal.confirm({
			title: 'Xác nhận duyệt hàng loạt',
			content: `Bạn có chắc muốn duyệt ${selectedRowKeys.length} đơn đã chọn?`,
			okText: 'Duyệt',
			cancelText: 'Hủy',
			onOk: () => {
				applyStatus(selectedRowKeys, 'Approved');
				message.success(`Đã duyệt ${selectedRowKeys.length} đơn`);
				setSelectedRowKeys([]);
			},
		});
	};

	const openRejectSingleModal = (record: IRegistrationItem) => {
		setRejectMode('single');
		setActiveRecord(record);
		rejectForm.resetFields();
		setIsRejectModalOpen(true);
	};

	const openRejectBulkModal = () => {
		if (!selectedRowKeys.length) {
			message.warning('Vui lòng chọn ít nhất 1 đơn đăng ký');
			return;
		}
		setRejectMode('bulk');
		setActiveRecord(null);
		rejectForm.resetFields();
		setIsRejectModalOpen(true);
	};

	const submitReject = async () => {
		const values = await rejectForm.validateFields();
		const reason = values.reason?.trim();

		if (rejectMode === 'single' && activeRecord) {
			applyStatus([activeRecord.key], 'Rejected', reason);
			message.success('Đã từ chối đơn đăng ký');
		}

		if (rejectMode === 'bulk') {
			applyStatus(selectedRowKeys, 'Rejected', reason);
			message.success(`Đã từ chối ${selectedRowKeys.length} đơn`);
			setSelectedRowKeys([]);
		}

		setIsRejectModalOpen(false);
		rejectForm.resetFields();
	};

	const columns = [
		{ title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'SĐT', dataIndex: 'phone', key: 'phone' },
		{ title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
		{ title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
		{ title: 'Sở trường', dataIndex: 'strength', key: 'strength' },
		{ title: 'Câu lạc bộ', dataIndex: 'clubName', key: 'clubName' },
		{
			title: 'Lý do đăng ký',
			dataIndex: 'registrationReason',
			key: 'registrationReason',
			ellipsis: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: RegistrationStatus) => <Tag color={statusColorMap[status]}>{statusLabelMap[status]}</Tag>,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			key: 'note',
			render: (note: string) => note || '-',
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 360,
			render: (_: unknown, record: IRegistrationItem) => (
				<Space size='small' wrap>
					<Button
						type='link'
						icon={<EyeOutlined />}
						onClick={() => {
							setActiveRecord(record);
							setIsDetailModalOpen(true);
						}}
					>
						Chi tiết
					</Button>
					<Button type='link' icon={<EditOutlined />} onClick={() => openEditModal(record)}>
						Sửa
					</Button>
					<Popconfirm
						title='Bạn có chắc muốn xóa đơn này?'
						okText='Xóa'
						cancelText='Hủy'
						onConfirm={() => deleteRecord(record.key)}
					>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
					<Button type='link' style={{ color: 'green' }} onClick={() => approveSingle(record)}>
						Duyệt
					</Button>
					<Button type='link' danger onClick={() => openRejectSingleModal(record)}>
						Từ chối
					</Button>
					<Button
						type='link'
						icon={<HistoryOutlined />}
						onClick={() => {
							setActiveRecord(record);
							setIsHistoryModalOpen(true);
						}}
					>
						Lịch sử
					</Button>
				</Space>
			),
		},
	];

	return (
		<PageContainer title='Quản lý Đơn đăng ký'>
			<Card>
				<div
					style={{
						marginBottom: 16,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 12,
						flexWrap: 'wrap',
					}}
				>
					<Space>
						<Button type='primary' icon={<PlusOutlined />} onClick={openCreateModal}>
							Thêm đơn đăng ký
						</Button>
						<Button type='primary' icon={<CheckOutlined />} disabled={!selectedRowKeys.length} onClick={approveBulk}>
							Duyệt {selectedRowKeys.length} đơn đã chọn
						</Button>
						<Button danger icon={<CloseOutlined />} disabled={!selectedRowKeys.length} onClick={openRejectBulkModal}>
							Không duyệt {selectedRowKeys.length} đơn đã chọn
						</Button>
					</Space>
					<Typography.Text type='secondary'>
						Đã chọn: {selectedRowKeys.length} / {dataSource.length}
					</Typography.Text>
				</div>
				<Table
					rowSelection={{
						type: 'checkbox',
						selectedRowKeys,
						onChange: (keys) => setSelectedRowKeys(keys),
					}}
					columns={columns}
					dataSource={dataSource}
					pagination={{ pageSize: 8 }}
					scroll={{ x: 1600 }}
					rowKey='key'
				/>
			</Card>

			<Modal
				title={editingRecord ? 'Chỉnh sửa đơn đăng ký' : 'Thêm mới đơn đăng ký'}
				visible={isFormModalOpen}
				onCancel={() => {
					setIsFormModalOpen(false);
					form.resetFields();
				}}
				onOk={saveForm}
				okText={editingRecord ? 'Lưu' : 'Tạo mới'}
				cancelText='Hủy'
				width={820}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
						<Form.Item label='Họ tên' name='fullName' rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
							<Input />
						</Form.Item>
						<Form.Item
							label='Email'
							name='email'
							rules={[
								{ required: true, message: 'Vui lòng nhập email' },
								{ type: 'email', message: 'Email không hợp lệ' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item label='SĐT' name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
							<Input />
						</Form.Item>
						<Form.Item label='Giới tính' name='gender' rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
							<Select
								options={[
									{ label: 'Nam', value: 'Nam' },
									{ label: 'Nữ', value: 'Nữ' },
									{ label: 'Khác', value: 'Khác' },
								]}
							/>
						</Form.Item>
						<Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
							<Input />
						</Form.Item>
						<Form.Item
							label='Sở trường'
							name='strength'
							rules={[{ required: true, message: 'Vui lòng nhập sở trường' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Câu lạc bộ'
							name='clubName'
							rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ' }]}
						>
							<Select options={CLUB_OPTIONS} />
						</Form.Item>
						<Form.Item label='Ghi chú' name='note'>
							<Input />
						</Form.Item>
					</div>

					<Form.Item
						label='Lý do đăng ký'
						name='registrationReason'
						rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký' }]}
					>
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Chi tiết đơn đăng ký'
				visible={isDetailModalOpen}
				onCancel={() => setIsDetailModalOpen(false)}
				footer={null}
				width={900}
			>
				{activeRecord && (
					<Descriptions bordered column={2} size='small'>
						<Descriptions.Item label='Mã đơn'>{activeRecord.key}</Descriptions.Item>
						<Descriptions.Item label='Ngày đăng ký'>{activeRecord.appliedAt}</Descriptions.Item>
						<Descriptions.Item label='Họ tên'>{activeRecord.fullName}</Descriptions.Item>
						<Descriptions.Item label='Email'>{activeRecord.email}</Descriptions.Item>
						<Descriptions.Item label='SĐT'>{activeRecord.phone}</Descriptions.Item>
						<Descriptions.Item label='Giới tính'>{activeRecord.gender}</Descriptions.Item>
						<Descriptions.Item label='Địa chỉ'>{activeRecord.address}</Descriptions.Item>
						<Descriptions.Item label='Sở trường'>{activeRecord.strength}</Descriptions.Item>
						<Descriptions.Item label='Câu lạc bộ'>{activeRecord.clubName}</Descriptions.Item>
						<Descriptions.Item label='Trạng thái'>
							<Tag color={statusColorMap[activeRecord.status]}>{statusLabelMap[activeRecord.status]}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label='Lý do đăng ký' span={2}>
							{activeRecord.registrationReason}
						</Descriptions.Item>
						<Descriptions.Item label='Ghi chú' span={2}>
							{activeRecord.note || '-'}
						</Descriptions.Item>
					</Descriptions>
				)}
			</Modal>

			<Modal
				title={rejectMode === 'single' ? 'Từ chối đơn đăng ký' : `Từ chối ${selectedRowKeys.length} đơn đã chọn`}
				visible={isRejectModalOpen}
				onCancel={() => setIsRejectModalOpen(false)}
				onOk={submitReject}
				okText='Xác nhận từ chối'
				cancelText='Hủy'
			>
				<Form form={rejectForm} layout='vertical'>
					<Form.Item
						label='Lý do từ chối'
						name='reason'
						rules={[{ required: true, message: 'Bắt buộc nhập lý do khi từ chối' }]}
					>
						<Input.TextArea rows={4} placeholder='Nhập lý do từ chối...' />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={`Lịch sử thao tác - ${activeRecord?.fullName || ''}`}
				visible={isHistoryModalOpen}
				onCancel={() => setIsHistoryModalOpen(false)}
				footer={null}
			>
				<Timeline>
					{(activeRecord?.histories || []).map((history) => (
						<Timeline.Item
							key={history.id}
							color={history.action === 'APPROVED' ? 'green' : history.action === 'REJECTED' ? 'red' : 'blue'}
						>
							<Typography.Text strong>
								{history.actor} đã {history.action}
							</Typography.Text>
							<br />
							<Typography.Text type='secondary'>{history.timestamp}</Typography.Text>
							{history.reason ? (
								<>
									<br />
									<Typography.Text>Lý do: {history.reason}</Typography.Text>
								</>
							) : null}
						</Timeline.Item>
					))}
				</Timeline>
			</Modal>
		</PageContainer>
	);
};

export default QuanLyDonDangKy;
