import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPES) ---

export interface Task {
	id: string | number;
	title: string;
	assignedTo: string;
	priority: 'Thấp' | 'Trung bình' | 'Cao';
	deadline: string; // Định dạng chuẩn: "YYYY-MM-DD"
	status: 'Chưa làm' | 'Đang làm' | 'Đã xong';
}

interface TaskDashboardProps {
	tasks: Task[];
	currentUser: string;
}

interface CalendarEvent extends Event {
	id: string | number;
	title: string;
	start: Date;
	end: Date;
	allDay: boolean;
}

// --- CẤU HÌNH LỊCH TIẾNG VIỆT ---

const locales = {
	vi: vi,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

// --- COMPONENT CHÍNH ---

const TaskDashboard: React.FC<TaskDashboardProps> = ({ tasks = [], currentUser = '' }) => {
	// Mock data nếu không có tasks
	const mockTasks: Task[] = [
		{
			id: 1,
			title: 'Hoàn thành báo cáo',
			assignedTo: 'user1',
			priority: 'Cao',
			deadline: '2024-12-01',
			status: 'Đã xong',
		},
		{
			id: 2,
			title: 'Thiết kế giao diện',
			assignedTo: 'user2',
			priority: 'Trung bình',
			deadline: '2024-12-05',
			status: 'Đang làm',
		},
	];

	const actualTasks = tasks.length > 0 ? tasks : mockTasks;

	// 1. Logic Thống kê (Statistics)
	const stats = useMemo(() => {
		const total = actualTasks.length;
		const completed = actualTasks.filter((t) => t.status === 'Đã xong').length;
		const rate = total > 0 ? ((completed / total) * 100).toFixed(1) : '0';
		return { total, completed, rate };
	}, [actualTasks]);

	// 2. Logic Lọc việc của tôi (My Assigned Tasks)
	const myTasks = useMemo(() => {
		return actualTasks.filter((task) => task.assignedTo === currentUser);
	}, [actualTasks, currentUser]);

	// 3. Logic Chuyển đổi dữ liệu cho Lịch (Calendar Events)
	const calendarEvents = useMemo((): CalendarEvent[] => {
		return actualTasks.map((task) => ({
			id: task.id,
			title: `[${task.assignedTo}] ${task.title}`,
			start: new Date(task.deadline),
			end: new Date(task.deadline),
			allDay: true,
		}));
	}, [actualTasks]);

	return (
		<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			{/* KHỐI THỐNG KÊ */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '20px',
					marginBottom: '30px',
				}}
			>
				<div style={cardStyle('#3b82f6')}>
					<p style={{ margin: 0, color: '#666' }}>Tổng công việc</p>
					<h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{stats.total}</h2>
				</div>
				<div style={cardStyle('#10b981')}>
					<p style={{ margin: 0, color: '#666' }}>Hoàn thành</p>
					<h2 style={{ fontSize: '2.5rem', color: '#10b981', margin: '10px 0' }}>{stats.completed}</h2>
				</div>
				<div style={cardStyle('#f59e0b')}>
					<p style={{ margin: 0, color: '#666' }}>Tỉ lệ</p>
					<h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{stats.rate}%</h2>
				</div>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
				{/* KHỐI VIỆC ĐƯỢC GIAO CHO TÔI */}
				<div
					style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
				>
					<h3 style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '10px', marginTop: 0 }}>
						Việc của: {currentUser}
					</h3>
					<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
						{myTasks.length > 0 ? (
							<ul style={{ listStyle: 'none', padding: 0 }}>
								{myTasks.map((task) => (
									<li key={task.id} style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
										<div style={{ fontWeight: 'bold' }}>{task.title}</div>
										<div style={{ fontSize: '0.8rem', color: '#888' }}>Deadline: {task.deadline}</div>
										<div style={{ marginTop: '8px' }}>
											<span style={statusBadge(task.status)}>{task.status}</span>
										</div>
									</li>
								))}
							</ul>
						) : (
							<p style={{ color: '#999', textAlign: 'center' }}>Không có việc được giao.</p>
						)}
					</div>
				</div>

				{/* KHỐI LỊCH CÔNG VIỆC */}
				<div
					style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
				>
					<h3 style={{ marginTop: 0, marginBottom: '20px' }}>Lịch thời hạn hoàn thành</h3>
					<div style={{ height: '500px' }}>
						<Calendar
							localizer={localizer}
							events={calendarEvents}
							startAccessor='start'
							endAccessor='end'
							culture='vi'
							messages={{
								next: 'Sau',
								previous: 'Trước',
								today: 'Hôm nay',
								month: 'Tháng',
								week: 'Tuần',
								day: 'Ngày',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// --- STYLES ---

const cardStyle = (color: string) => ({
	background: '#fff',
	padding: '20px',
	borderRadius: '12px',
	borderLeft: `6px solid ${color}`,
	boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
	textAlign: 'center' as const,
});

const statusBadge = (status: string) => {
	let bg = '#eee';
	if (status === 'Đã xong') bg = '#d1fae5';
	if (status === 'Đang làm') bg = '#fef3c7';
	return {
		fontSize: '0.7rem',
		padding: '4px 10px',
		borderRadius: '20px',
		backgroundColor: bg,
		fontWeight: 'bold' as const,
	};
};

export default TaskDashboard;
