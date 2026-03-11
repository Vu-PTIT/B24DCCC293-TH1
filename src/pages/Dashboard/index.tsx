import React, { useEffect, useMemo } from 'react';
import { Card, Col, Row, Statistic, Space, Typography, Table } from 'antd';
import {
	CalendarOutlined,
	CheckCircleOutlined,
	DollarOutlined,
	UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import useLichHenModel from '@/models/danhmuc/lichhen';
import useNhanVienModel from '@/models/danhmuc/nhanvien';
import useDichVuModel from '@/models/danhmuc/dichvu';
import ColumnChart from '@/components/Chart/ColumnChart';
import DonutChart from '@/components/Chart/DonutChart';
import { tienVietNam } from '@/utils/utils';

const Dashboard: React.FC = () => {
	const { danhSach: lichHen, getModel: getLichHen, loading: loadingLH } = useLichHenModel();
	const { danhSach: nhanVien, getModel: getNhanVien } = useNhanVienModel();
	const { danhSach: dichVu, getModel: getDichVu } = useDichVuModel();

	useEffect(() => {
		getLichHen();
		getNhanVien();
		getDichVu();
	}, []);

	// Mapping
	const serviceMap = useMemo(() => Object.fromEntries(dichVu.map(s => [s._id || s.id, s])), [dichVu]);
	const employeeMap = useMemo(() => Object.fromEntries(nhanVien.map(e => [e._id || e.id, e.ten])), [nhanVien]);

	// Basic Stats
	const stats = useMemo(() => {
		const total = lichHen.length;
		const completed = lichHen.filter(l => l.status === 'HOAN_THANH').length;
		const canceled = lichHen.filter(l => l.status === 'HUY').length;
		const ongoing = total - completed - canceled;
		
		let totalRevenue = 0;
		lichHen.forEach(l => {
			if (l.status === 'HOAN_THANH') {
				const s = serviceMap[l.serviceId];
				if (s) totalRevenue += s.gia;
			}
		});

		return { total, completed, ongoing, totalRevenue };
	}, [lichHen, serviceMap]);

	// Charts Data: Appointments by Date (Last 7 days)
	const appointmentsByDate = useMemo(() => {
		const last7Days = Array.from({ length: 7 }, (_, i) => moment().subtract(6 - i, 'days').format('DD/MM'));
		const counts = last7Days.map(date => {
			return lichHen.filter(l => moment(l.startTime).format('DD/MM') === date).length;
		});

		return {
			xAxis: last7Days,
			yAxis: [counts],
			yLabel: ['Số lượng lịch hẹn'],
		};
	}, [lichHen]);

	// Revenue by Service
	const revenueByService = useMemo(() => {
		const revMap: Record<string, number> = {};
		lichHen.forEach(l => {
			if (l.status === 'HOAN_THANH') {
				const s = serviceMap[l.serviceId];
				if (s) {
					revMap[s.ten] = (revMap[s.ten] || 0) + s.gia;
				}
			}
		});

		const sorted = Object.entries(revMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
		return {
			xAxis: sorted.map(i => i[0]),
			yAxis: [sorted.map(i => i[1])],
			yLabel: ['Doanh thu'],
		};
	}, [lichHen, serviceMap]);

	// Revenue by Employee
	const revenueByEmployee = useMemo(() => {
		const revMap: Record<string, number> = {};
		lichHen.forEach(l => {
			if (l.status === 'HOAN_THANH') {
				const empName = employeeMap[l.employeeId] || 'Không xác định';
				const s = serviceMap[l.serviceId];
				if (s) {
					revMap[empName] = (revMap[empName] || 0) + s.gia;
				}
			}
		});

		const sorted = Object.entries(revMap).sort((a, b) => b[1] - a[1]);
		return sorted.map(([name, revenue]) => ({ name, revenue }));
	}, [lichHen, employeeMap, serviceMap]);

	return (
		<div style={{ padding: '24px' }}>
			<Typography.Title level={2}>Tổng quan hệ thống</Typography.Title>
			
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Tổng lịch hẹn"
							value={stats.total}
							prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Đã hoàn thành"
							value={stats.completed}
							valueStyle={{ color: '#3f8600' }}
							prefix={<CheckCircleOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Đang xử lý"
							value={stats.ongoing}
							valueStyle={{ color: '#cf1322' }}
							prefix={<CalendarOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Tổng doanh thu"
							value={stats.totalRevenue}
							prefix={<DollarOutlined style={{ color: '#faad14' }} />}
							formatter={(val) => tienVietNam(val as number)}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
				<Col xs={24} lg={16}>
					<Card title="Thống kê lịch hẹn 7 ngày qua">
						<ColumnChart
							xAxis={appointmentsByDate.xAxis}
							yAxis={appointmentsByDate.yAxis}
							yLabel={appointmentsByDate.yLabel}
							height={300}
							formatY={(val) => `${val} lịch`}
						/>
					</Card>
				</Col>
				<Col xs={24} lg={8}>
					<Card title="Doanh thu theo dịch vụ (Top 5)">
						<DonutChart
							xAxis={revenueByService.xAxis}
							yAxis={revenueByService.yAxis}
							yLabel={revenueByService.yLabel}
							height={300}
							showTotal
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
				<Col span={24}>
					<Card title="Doanh thu theo nhân viên">
						<Table
							dataSource={revenueByEmployee}
							columns={[
								{
									title: 'Nhân viên',
									dataIndex: 'name',
									key: 'name',
									render: (text) => <span><UserOutlined /> {text}</span>
								},
								{
									title: 'Tổng doanh thu',
									dataIndex: 'revenue',
									key: 'revenue',
									render: (val) => <b>{tienVietNam(val)}</b>,
									sorter: (a, b) => a.revenue - b.revenue,
								}
							]}
							pagination={false}
							rowKey="name"
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
