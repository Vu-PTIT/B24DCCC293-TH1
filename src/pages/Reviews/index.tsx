import React, { useMemo, useState } from 'react';
import { Card, Table, Rate, Input, Button, Space, Typography, Tag } from 'antd';

type Review = {
	id: string;
	appointmentId: string;
	employeeId: string;
	serviceId: string;
	customerName: string;
	rating: number;
	comment: string;
	reply?: string;
};

type Employee = {
	id: string;
	name: string;
};

type Service = {
	id: string;
	name: string;
};

const employees: Employee[] = [
	{ id: 'NV01', name: 'Nguyễn An' },
	{ id: 'NV02', name: 'Trần Bình' },
	{ id: 'NV03', name: 'Lê Cường' },
];

const services: Service[] = [
	{ id: 'DV01', name: 'Cắt tóc' },
	{ id: 'DV02', name: 'Spa cơ bản' },
	{ id: 'DV03', name: 'Khám tổng quát' },
	{ id: 'DV04', name: 'Sửa chữa thiết bị' },
];

const ReviewsPage: React.FC = () => {
	const [reviews, setReviews] = useState<Review[]>([
		{
			id: 'RV01',
			appointmentId: 'LH01',
			employeeId: 'NV01',
			serviceId: 'DV01',
			customerName: 'Nguyễn Văn A',
			rating: 5,
			comment: 'Nhân viên rất nhiệt tình và chuyên nghiệp.',
		},
		{
			id: 'RV02',
			appointmentId: 'LH02',
			employeeId: 'NV02',
			serviceId: 'DV02',
			customerName: 'Trần Thị B',
			rating: 4,
			comment: 'Dịch vụ khá tốt, sẽ quay lại lần sau.',
		},
	]);

	const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

	const employeeMap = useMemo(() => Object.fromEntries(employees.map((e) => [e.id, e.name])), []);

	const serviceMap = useMemo(() => Object.fromEntries(services.map((s) => [s.id, s.name])), []);

	const handleReply = (id: string) => {
		setReviews((prev) => prev.map((item) => (item.id === id ? { ...item, reply: replyText[id] } : item)));

		setReplyText({
			...replyText,
			[id]: '',
		});
	};

	const getAverageRating = (employeeId: string) => {
		const employeeReviews = reviews.filter((item) => item.employeeId === employeeId);

		if (employeeReviews.length === 0) return '0';

		const total = employeeReviews.reduce((sum, item) => sum + item.rating, 0);

		return (total / employeeReviews.length).toFixed(1);
	};

	const columns = [
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employeeId',
			render: (id: string) => (
				<Space>
					{employeeMap[id]}
					<Tag color='blue'>⭐ {getAverageRating(id)}</Tag>
				</Space>
			),
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'serviceId',
			render: (id: string) => serviceMap[id],
		},
		{
			title: 'Đánh giá',
			dataIndex: 'rating',
			render: (rating: number) => <Rate disabled defaultValue={rating} />,
		},
		{
			title: 'Nhận xét',
			dataIndex: 'comment',
		},
		{
			title: 'Phản hồi nhân viên',
			render: (_: any, record: Review) => (
				<Space direction='vertical' style={{ width: 220 }}>
					<Input
						placeholder='Nhập phản hồi...'
						value={replyText[record.id] || ''}
						onChange={(e) =>
							setReplyText({
								...replyText,
								[record.id]: e.target.value,
							})
						}
					/>

					<Button type='primary' size='small' onClick={() => handleReply(record.id)}>
						Phản hồi
					</Button>

					{record.reply && <Typography.Text type='secondary'>NV: {record.reply}</Typography.Text>}
				</Space>
			),
		},
	];

	return (
		<Space direction='vertical' size={16} style={{ width: '100%' }}>
			<Card>
				<Typography.Title level={4} style={{ marginTop: 0 }}>
					Đánh giá dịch vụ & nhân viên
				</Typography.Title>

				<Table
					rowKey='id'
					columns={columns}
					dataSource={reviews}
					pagination={{ pageSize: 6 }}
					locale={{ emptyText: 'Chưa có đánh giá nào.' }}
				/>
			</Card>
		</Space>
	);
};

export default ReviewsPage;
