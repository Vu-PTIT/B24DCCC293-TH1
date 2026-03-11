import React, { useMemo, useState } from 'react';
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

type AppointmentStatus = 'CHO_DUYET' | 'XAC_NHAN' | 'HOAN_THANH' | 'HUY';

interface Employee {
	id: string;
	name: string;
}

interface Service {
	id: string;
	name: string;
	durationMinutes: number;
}

interface Appointment {
	id: string;
	customerName: string;
	employeeId: string;
	serviceId: string;
	startTime: string;
	endTime: string;
	status: AppointmentStatus;
}

interface AppointmentForm {
	customerName: string;
	employeeId: string;
	serviceId: string;
	date: Moment;
	time: Moment;
}

const employees: Employee[] = [
	{ id: 'NV01', name: 'Nguyễn An' },
	{ id: 'NV02', name: 'Trần Bình' },
	{ id: 'NV03', name: 'Lê Cường' },
];

const services: Service[] = [
	{ id: 'DV01', name: 'Cắt tóc', durationMinutes: 30 },
	{ id: 'DV02', name: 'Spa cơ bản', durationMinutes: 60 },
	{ id: 'DV03', name: 'Khám tổng quát', durationMinutes: 45 },
	{ id: 'DV04', name: 'Sửa chữa thiết bị', durationMinutes: 90 },
];

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
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	const employeeMap = useMemo(() => Object.fromEntries(employees.map((item) => [item.id, item.name])), []);

	const serviceMap = useMemo(() => Object.fromEntries(services.map((item) => [item.id, item])), []);

	const isConflict = (employeeId: string, startTime: moment.Moment, endTime: moment.Moment) => {
		return appointments.some((item) => {
			if (item.employeeId !== employeeId || item.status === 'HUY') {
				return false;
			}

			const existingStart = moment(item.startTime);
			const existingEnd = moment(item.endTime);

			return startTime.isBefore(existingEnd) && endTime.isAfter(existingStart);
		});
	};

	const handleCreateAppointment = (values: AppointmentForm) => {
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

		const endTime = startTime.clone().add(service.durationMinutes, 'minutes');

		if (isConflict(values.employeeId, startTime, endTime)) {
			message.error('Lịch bị trùng với lịch đã có của nhân viên này.');
			return;
		}

		const newAppointment: Appointment = {
			id: `LH${Date.now()}`,
			customerName: values.customerName.trim(),
			employeeId: values.employeeId,
			serviceId: values.serviceId,
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
			status: 'CHO_DUYET',
		};

		setAppointments((prev) =>
			[...prev, newAppointment].sort((a, b) => moment(a.startTime).valueOf() - moment(b.startTime).valueOf()),
		);

		form.resetFields();
		message.success('Đặt lịch thành công.');
	};

	const handleStatusChange = (id: string, status: AppointmentStatus) => {
		setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
	};

	const columns: ColumnsType<Appointment> = [
		{
			title: 'Mã lịch',
			dataIndex: 'id',
			key: 'id',
			width: 140,
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

				return `${service.name} (${service.durationMinutes} phút)`;
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
						onChange={(value) => handleStatusChange(record.id, value)}
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
									options={services.map((item) => ({
										value: item.id,
										label: `${item.name} (${item.durationMinutes} phút)`,
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
									options={employees.map((item) => ({
										value: item.id,
										label: item.name,
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
							<Button type='primary' htmlType='submit'>
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
				<Table<Appointment>
					rowKey='id'
					columns={columns}
					dataSource={appointments}
					pagination={{ pageSize: 8 }}
					locale={{ emptyText: 'Chưa có lịch hẹn nào.' }}
					scroll={{ x: 1200 }}
				/>
			</Card>
		</Space>
	);
};

export default AppointmentsPage;
