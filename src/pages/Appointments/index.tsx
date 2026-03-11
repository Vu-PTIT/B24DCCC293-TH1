import React, { useMemo, useEffect } from 'react';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	message,
	Row,
	Select,
	Space,
	Table,
	Tag,
	TimePicker,
	Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import type { Moment } from 'moment';
import useNhanVienModel from '@/models/danhmuc/nhanvien';
import useDichVuModel from '@/models/danhmuc/dichvu';
import useLichHenModel from '@/models/danhmuc/lichhen';

type AppointmentStatus = 'CHO_DUYET' | 'XAC_NHAN' | 'HOAN_THANH' | 'HUY';

interface AppointmentForm {
	customerName: string;
	employeeId: string;
	serviceId: string;
	date: Moment;
	time: Moment;
}

const statusLabel: Record<AppointmentStatus, string> = {
	CHO_DUYET: 'Chờ duyệt',
	XAC_NHAN: 'Xác nhận',
	HOAN_THANH: 'Hoàn thành',
	HUY: 'Hủy',
};

const statusColor: Record<AppointmentStatus, string> = {
	CHO_DUYET: 'gold',
	XAC_NHAN: 'blue',
	HOAN_THANH: 'green',
	HUY: 'red',
};

const AppointmentsPage: React.FC = () => {
	const [form] = Form.useForm<AppointmentForm>();
	const { danhSach: danhSachNhanVien, getModel: getNhanVien } = useNhanVienModel();
	const { danhSach: danhSachDichVu, getModel: getDichVu } = useDichVuModel();
	const { danhSach: danhSachLichHen, getModel: getLichHen, postModel, putModel, loading } = useLichHenModel();

	useEffect(() => {
		getNhanVien();
		getDichVu();
		getLichHen();
	}, []);

	const employeeMap = useMemo(() => Object.fromEntries(danhSachNhanVien.map((item) => [item._id || item.id, item.ten])), [danhSachNhanVien]);

	const serviceMap = useMemo(() => Object.fromEntries(danhSachDichVu.map((item) => [item._id || item.id, item])), [danhSachDichVu]);

	const isConflict = (employeeId: string, startTime: moment.Moment, endTime: moment.Moment) => {
		return danhSachLichHen.some((item) => {
			if (item.employeeId !== employeeId || item.status === 'HUY') {
				return false;
			}

			const existingStart = moment(item.startTime);
			const existingEnd = moment(item.endTime);

			return startTime.isBefore(existingEnd) && endTime.isAfter(existingStart);
		});
	};

	const handleCreateAppointment = async (values: AppointmentForm) => {
		const service = serviceMap[values.serviceId];
		if (!service) {
			message.error('Dịch vụ không hợp lệ.');
			return;
		}

		const startTime = values.date
			.clone()
			.hour(values.time.hour())
			.minute(values.time.minute())
			.second(0)
			.millisecond(0);

		const endTime = startTime.clone().add(service.thoiGianThucHien, 'minutes');

		if (isConflict(values.employeeId, startTime, endTime)) {
			message.error('Lịch bị trùng với lịch đã có của nhân viên này.');
			return;
		}

		const newAppointment: LichHen.IRecord = {
			customerName: values.customerName.trim(),
			employeeId: values.employeeId,
			serviceId: values.serviceId,
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
			status: 'CHO_DUYET',
		};

		try {
			await postModel(newAppointment);
			form.resetFields();
			message.success('Đặt lịch thành công.');
		} catch (error) {
			message.error('Có lỗi xảy ra khi đặt lịch.');
		}
	};

	const handleStatusChange = async (id: string, status: AppointmentStatus) => {
		try {
			await putModel(id, { status });
			message.success('Cập nhật trạng thái thành công.');
		} catch (error) {
			message.error('Lỗi khi cập nhật trạng thái.');
		}
	};

	const columns: ColumnsType<LichHen.IRecord> = [
		{
			title: 'Mã lịch',
			dataIndex: '_id',
			key: '_id',
			width: 140,
			render: (val, record) => val || record.id || '-',
		},
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
			width: 180,
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'serviceId',
			key: 'serviceId',
			width: 200,
			render: (serviceId: string) => {
				const service = serviceMap[serviceId];
				if (!service) {
					return '-';
				}

				return `${service.ten} (${service.thoiGianThucHien} phút)`;
			},
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employeeId',
			key: 'employeeId',
			width: 180,
			render: (employeeId: string) => employeeMap[employeeId] || employeeId,
		},
		{
			title: 'Thời gian',
			key: 'time',
			width: 280,
			render: (_, record) => {
				const start = moment(record.startTime).format('DD/MM/YYYY HH:mm');
				const end = moment(record.endTime).format('HH:mm');
				return `${start} - ${end}`;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			width: 220,
			render: (status: AppointmentStatus, record) => (
				<Space>
					<Tag color={statusColor[status]}>{statusLabel[status]}</Tag>
					<Select<AppointmentStatus>
						value={status}
						style={{ width: 130 }}
						onChange={(value) => handleStatusChange(record._id!, value)}
						options={Object.entries(statusLabel).map(([value, label]) => ({
							value: value as AppointmentStatus,
							label,
						}))}
					/>
				</Space>
			),
		},
	];

	return (
		<Space direction='vertical' size={16} style={{ width: '100%' }}>
			<Card>
				<Typography.Title level={4} style={{ marginTop: 0 }}>
					Đặt lịch hẹn
				</Typography.Title>

				<Form<AppointmentForm> layout='vertical' form={form} onFinish={handleCreateAppointment}>
					<Row gutter={16}>
						<Col xs={24} md={8}>
							<Form.Item
								label='Khách hàng'
								name='customerName'
								rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng.' }]}
							>
								<Input placeholder='Nhập tên khách hàng' />
							</Form.Item>
						</Col>

						<Col xs={24} md={8}>
							<Form.Item
								label='Dịch vụ'
								name='serviceId'
								rules={[{ required: true, message: 'Vui lòng chọn dịch vụ.' }]}
							>
								<Select
									placeholder='Chọn dịch vụ'
									options={danhSachDichVu.map((item) => ({
										value: item._id || item.id,
										label: `${item.ten} (${item.thoiGianThucHien} phút)`,
									}))}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={8}>
							<Form.Item
								label='Nhân viên'
								name='employeeId'
								rules={[{ required: true, message: 'Vui lòng chọn nhân viên.' }]}
							>
								<Select
									placeholder='Chọn nhân viên'
									options={danhSachNhanVien.map((item) => ({
										value: item._id || item.id,
										label: item.ten,
									}))}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col xs={24} md={8}>
							<Form.Item label='Ngày hẹn' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn.' }]}>
								<DatePicker
									style={{ width: '100%' }}
									format='DD/MM/YYYY'
									disabledDate={(current) => !!current && current.startOf('day').isBefore(moment().startOf('day'))}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={8}>
							<Form.Item label='Giờ hẹn' name='time' rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn.' }]}>
								<TimePicker style={{ width: '100%' }} format='HH:mm' minuteStep={5} />
							</Form.Item>
						</Col>

						<Col xs={24} md={8} style={{ display: 'flex', alignItems: 'end' }}>
							<Button type='primary' htmlType='submit' loading={loading}>
								Đặt lịch
							</Button>
						</Col>
					</Row>
				</Form>
			</Card>

			<Card>
				<Typography.Title level={4} style={{ marginTop: 0 }}>
					Danh sách lịch hẹn
				</Typography.Title>
				<Table<LichHen.IRecord>
					rowKey={(record) => record._id || record.id || ''}
					columns={columns}
					dataSource={danhSachLichHen}
					loading={loading}
					pagination={{ pageSize: 8 }}
					locale={{ emptyText: 'Chưa có lịch hẹn nào.' }}
					scroll={{ x: 1200 }}
				/>
			</Card>
		</Space>
	);
};

export default AppointmentsPage;
