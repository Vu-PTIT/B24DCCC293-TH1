import React, { useState, useEffect } from 'react';
import {
	Card,
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
	DatePicker,
	message,
	Space,
	Tag,
	Row,
	Col,
	Statistic,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

interface Task {
	id: string;
	name: string;
	assignee: string;
	priority: 'Thấp' | 'Trung bình' | 'Cao';
	deadline: string;
	status: 'Chưa làm' | 'Đang làm' | 'Đã xong';
}

const STORAGE_KEY = 'group-task-tasks';

const GroupTaskList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		const savedTasks = localStorage.getItem(STORAGE_KEY);
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
			return;
		}

		const defaultTasks: Task[] = [
			{
				id: '1',
				name: 'Thiết kế giao diện danh sách công việc',
				assignee: 'Thành viên 2',
				priority: 'Cao',
				deadline: moment().add(2, 'days').toISOString(),
				status: 'Đang làm',
			},
			{
				id: '2',
				name: 'Viết chức năng thêm/sửa/xóa công việc',
				assignee: 'Thành viên 2',
				priority: 'Trung bình',
				deadline: moment().add(4, 'days').toISOString(),
				status: 'Chưa làm',
			},
		];

		setTasks(defaultTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	}, [tasks]);

	const openCreateModal = () => {
		setEditingTask(null);
		form.resetFields();
		setModalVisible(true);
	};

	const openEditModal = (task: Task) => {
		setEditingTask(task);
		form.setFieldsValue({
			...task,
			deadline: moment(task.deadline),
		});
		setModalVisible(true);
	};

	const handleDelete = (taskId: string) => {
		Modal.confirm({
			title: 'Xác nhận xóa công việc',
			content: 'Bạn có chắc muốn xóa công việc này?',
			okText: 'Xóa',
			okButtonProps: { danger: true },
			cancelText: 'Hủy',
			onOk: () => {
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
				message.success('Đã xóa công việc');
			},
		});
	};

	const handleSubmit = async () => {
		const values = await form.validateFields();
		const normalizedTask: Task = {
			id: editingTask?.id || `${Date.now()}`,
			name: values.name,
			assignee: values.assignee,
			priority: values.priority,
			deadline: values.deadline.toISOString(),
			status: values.status,
		};

		if (editingTask) {
			setTasks((prevTasks) =>
				prevTasks.map((task) => (task.id === editingTask.id ? normalizedTask : task)),
			);
			message.success('Cập nhật công việc thành công');
		} else {
			setTasks((prevTasks) => [normalizedTask, ...prevTasks]);
			message.success('Thêm công việc thành công');
		}

		setModalVisible(false);
		form.resetFields();
	};

	const getPriorityColor = (priority: Task['priority']) => {
		switch (priority) {
			case 'Cao':
				return 'red';
			case 'Trung bình':
				return 'orange';
			default:
				return 'green';
		}
	};

	const getStatusColor = (status: Task['status']) => {
		switch (status) {
			case 'Đã xong':
				return 'green';
			case 'Đang làm':
				return 'blue';
			default:
				return 'default';
		}
	};

	const columns = [
		{
			title: 'Tên công việc',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Người được giao',
			dataIndex: 'assignee',
			key: 'assignee',
		},
		{
			title: 'Mức độ ưu tiên',
			dataIndex: 'priority',
			key: 'priority',
			render: (priority: Task['priority']) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
		},
		{
			title: 'Thời hạn hoàn thành',
			dataIndex: 'deadline',
			key: 'deadline',
			render: (deadline: string) => moment(deadline).format('DD/MM/YYYY'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: Task['status']) => <Tag color={getStatusColor(status)}>{status}</Tag>,
		},
		{
			title: 'Thao tác',
			key: 'actions',
			render: (_: unknown, record: Task) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
						Sửa
					</Button>
					<Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	const totalTasks = tasks.length;
	const doneTasks = tasks.filter((task) => task.status === 'Đã xong').length;
	const inProgressTasks = tasks.filter((task) => task.status === 'Đang làm').length;

	return (
		<div style={{ padding: 20 }}>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col xs={24} md={8}>
					<Card>
						<Statistic title="Tổng số công việc" value={totalTasks} />
					</Card>
				</Col>
				<Col xs={24} md={8}>
					<Card>
						<Statistic title="Đã hoàn thành" value={doneTasks} valueStyle={{ color: '#3f8600' }} />
					</Card>
				</Col>
				<Col xs={24} md={8}>
					<Card>
						<Statistic title="Đang làm" value={inProgressTasks} valueStyle={{ color: '#1677ff' }} />
					</Card>
				</Col>
			</Row>

			<Card
				title="Danh sách công việc nhóm"
				extra={
					<Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
						Thêm công việc
					</Button>
				}
			>
				<Table rowKey="id" dataSource={tasks} columns={columns} pagination={{ pageSize: 6 }} />
			</Card>

			<Modal
				title={editingTask ? 'Cập nhật công việc' : 'Thêm công việc mới'}
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={handleSubmit}
				okText={editingTask ? 'Cập nhật' : 'Thêm'}
				cancelText="Hủy"
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Tên công việc"
						rules={[{ required: true, message: 'Vui lòng nhập tên công việc' }]}
					>
						<Input placeholder="Ví dụ: Hoàn thiện báo cáo tuần" />
					</Form.Item>
					<Form.Item
						name="assignee"
						label="Người được giao"
						rules={[{ required: true, message: 'Vui lòng nhập người được giao' }]}
					>
						<Input placeholder="Nhập tên thành viên" />
					</Form.Item>
					<Form.Item
						name="priority"
						label="Mức độ ưu tiên"
						rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên' }]}
					>
						<Select
							options={[
								{ label: 'Thấp', value: 'Thấp' },
								{ label: 'Trung bình', value: 'Trung bình' },
								{ label: 'Cao', value: 'Cao' },
							]}
						/>
					</Form.Item>
					<Form.Item
						name="deadline"
						label="Hạn hoàn thành"
						rules={[{ required: true, message: 'Vui lòng chọn hạn hoàn thành' }]}
					>
						<DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
					</Form.Item>
					<Form.Item
						name="status"
						label="Trạng thái"
						rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
					>
						<Select
							options={[
								{ label: 'Chưa làm', value: 'Chưa làm' },
								{ label: 'Đang làm', value: 'Đang làm' },
								{ label: 'Đã xong', value: 'Đã xong' },
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);

};

export default GroupTaskList;
