import React, { useMemo, useState, useEffect } from 'react';
import { Card, Table, Input, Select, Tag, Row, Col, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface Task {
	id: string;
	name: string;
	assignee: string;
	priority: 'Thấp' | 'Trung bình' | 'Cao';
	deadline: string;
	status: 'Chưa làm' | 'Đang làm' | 'Đã xong';
}

const TASK_STORAGE_KEY = 'group-task-tasks';
const USER_STORAGE_KEY = 'group-task-user';

const statusOptions = ['Tất cả', 'Chưa làm', 'Đang làm', 'Đã xong'];

const priorityColor: Record<Task['priority'], string> = {
	Thấp: 'green',
	'Trung bình': 'gold',
	Cao: 'red',
};

const statusColor: Record<Task['status'], string> = {
	'Chưa làm': 'default',
	'Đang làm': 'processing',
	'Đã xong': 'success',
};

const defaultTasks: Task[] = [
	{
		id: '1',
		name: 'Lập kế hoạch dự án',
		assignee: 'Minh',
		priority: 'Cao',
		deadline: '2026-04-15',
		status: 'Đang làm',
	},
	{
		id: '2',
		name: 'Viết tài liệu hướng dẫn',
		assignee: 'Lan',
		priority: 'Trung bình',
		deadline: '2026-04-20',
		status: 'Chưa làm',
	},
	{
		id: '3',
		name: 'Kiểm thử chức năng lọc',
		assignee: 'Hòa',
		priority: 'Cao',
		deadline: '2026-04-18',
		status: 'Chưa làm',
	},
	{
		id: '4',
		name: 'Triển khai lên môi trường staging',
		assignee: 'Minh',
		priority: 'Thấp',
		deadline: '2026-04-25',
		status: 'Đã xong',
	},
];

const GroupTaskFilter: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [searchText, setSearchText] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('Tất cả');
	const [assigneeFilter, setAssigneeFilter] = useState<string>('Tất cả');
	const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem(USER_STORAGE_KEY));

	useEffect(() => {
		setCurrentUser(localStorage.getItem(USER_STORAGE_KEY));
		const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
		if (storedTasks) {
			try {
				setTasks(JSON.parse(storedTasks));
			} catch {
				setTasks(defaultTasks);
				localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(defaultTasks));
			}
		} else {
			setTasks(defaultTasks);
			localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(defaultTasks));
		}
	}, []);

	const assigneeOptions = useMemo(() => {
		const unique = Array.from(new Set(tasks.map((task) => task.assignee))).sort();
		return ['Tất cả', ...unique];
	}, [tasks]);

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			const nameMatch = task.name.toLowerCase().includes(searchText.trim().toLowerCase());
			const statusMatch = statusFilter === 'Tất cả' || task.status === statusFilter;
			const assigneeMatch = assigneeFilter === 'Tất cả' || task.assignee === assigneeFilter;
			return nameMatch && statusMatch && assigneeMatch;
		});
	}, [tasks, searchText, statusFilter, assigneeFilter]);

	const columns: ColumnsType<Task> = [
		{
			title: 'Tên công việc',
			dataIndex: 'name',
			key: 'name',
			responsive: ['xs', 'sm', 'md', 'lg'] as const,
		},
		{
			title: 'Người được giao',
			dataIndex: 'assignee',
			key: 'assignee',
			responsive: ['sm', 'md', 'lg'] as const,
		},
		{
			title: 'Mức độ ưu tiên',
			dataIndex: 'priority',
			key: 'priority',
			render: (priority: Task['priority']) => (
				<Tag color={priorityColor[priority]}>{priority}</Tag>
			),
			responsive: ['sm', 'md', 'lg'] as const,
		},
		{
			title: 'Thời hạn',
			dataIndex: 'deadline',
			key: 'deadline',
			responsive: ['xs', 'sm', 'md', 'lg'] as const,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: Task['status']) => (
				<Tag color={statusColor[status]}>{status}</Tag>
			),
			responsive: ['xs', 'sm', 'md', 'lg'] as const,
		},
	];

	return (
		<div style={{ padding: 24 }}>
			<Card
				title="Bộ lọc & Tìm kiếm Công việc"
				extra={currentUser ? <span>Người dùng: <b>{currentUser}</b></span> : null}
			>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={8}>
						<Input
							prefix={<SearchOutlined />}
							placeholder="Tìm theo tên công việc"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Select
							value={statusFilter}
							onChange={(value) => setStatusFilter(value)}
							options={statusOptions.map((status) => ({ label: status, value: status }))}
							style={{ width: '100%' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Select
							value={assigneeFilter}
							onChange={(value) => setAssigneeFilter(value)}
							options={assigneeOptions.map((assignee) => ({ label: assignee, value: assignee }))}
							style={{ width: '100%' }}
						/>
					</Col>
				</Row>

				<Row style={{ marginBottom: 16 }}>
					<Col>
						<Button
							icon={<FilterOutlined />}
							onClick={() => {
							setSearchText('');
							setStatusFilter('Tất cả');
							setAssigneeFilter('Tất cả');
						}}
						>
							Xóa bộ lọc
						</Button>
					</Col>
				</Row>

				<Table
					rowKey="id"
					columns={columns}
					dataSource={filteredTasks}
					pagination={{ pageSize: 6 }}
					locale={{ emptyText: 'Không có công việc phù hợp với điều kiện lọc.' }}
				/>
			</Card>
		</div>
	);
};

export default GroupTaskFilter;
