import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const GroupTaskLogin: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('group-task-user'));

	const onFinish = (values: { username: string }) => {
		localStorage.setItem('group-task-user', values.username);
		setCurrentUser(values.username);
		message.success(`Chào mừng ${values.username}!`);
	};

	const handleLogout = () => {
		localStorage.removeItem('group-task-user');
		setCurrentUser(null);
		message.info('Đã đăng xuất.');
	};

	return (
		<div style={{ padding: '20px' }}>
			<Card title="Đăng nhập Hệ thống Quản lý Công việc" style={{ maxWidth: 400, margin: '0 auto' }}>
				{currentUser ? (
					<div style={{ textAlign: 'center' }}>
						<p>Người dùng hiện tại: <b>{currentUser}</b></p>
						<Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
							Đăng xuất
						</Button>
					</div>
				) : (
					<Form onFinish={onFinish} layout="vertical">
						<Form.Item
							name="username"
							label="Tên người dùng"
							rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
						>
							<Input prefix={<UserOutlined />} placeholder="Nhập họ tên hoặc mã sinh viên" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block>
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
				)}
			</Card>

			<Card title="Ghi chú công việc - Thành viên 1" style={{ marginTop: '20px' }}>
				<ul>
					<li>Nhiệm vụ: Quản lý Đăng nhập/Đăng xuất.</li>
					<li>Lưu thông tin vào <code>localStorage</code> (key: <code>group-task-user</code>).</li>
					<li>Hiển thị tên người dùng sau khi đăng nhập.</li>
				</ul>
			</Card>
		</div>
	);
};

export default GroupTaskLogin;
