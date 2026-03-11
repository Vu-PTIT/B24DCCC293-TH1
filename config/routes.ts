export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },
	{
		path: '/dashboard-booking',
		name: 'Báo cáo thống kê',
		icon: 'DashboardOutlined',
		component: './Dashboard',
	},
	{
		path: '/catalog',
		name: 'Danh mục quản lý',
		icon: 'AppstoreOutlined',
		routes: [
			{
				path: '/catalog/services',
				name: 'Dịch vụ',
				component: './Catalog/Services',
			},
			{
				path: '/catalog/staffs',
				name: 'Nhân viên',
				component: './Catalog/Staffs',
			},
			{
				path: '/catalog/staffs/:id/schedule',
				name: 'Chi tiết lịch làm việc',
				component: './Catalog/Staffs/Schedule',
				hideInMenu: true,
			},
		],
	},
	{
		path: '/appointments',
		name: 'Quản lý lịch hẹn',
		icon: 'CalendarOutlined',
		routes: [
			{
				path: '/appointments/list',
				name: 'Danh sách lịch hẹn',
				component: './Appointments/List',
			},
			{
				path: '/appointments/calendar',
				name: 'Lịch trực quan',
				component: './Appointments/CalendarView',
			},
		],
	},
	{
		path: '/reviews',
		name: 'Đánh giá & Phản hồi',
		icon: 'StarOutlined',
		component: './Reviews',
	},

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
