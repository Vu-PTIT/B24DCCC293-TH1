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
	{
		path: '/guess-number',
		name: 'GuessNumber',
		component: './GuessNumber',
		icon: 'SmileOutlined',
	},
	{
		path: '/todo-list',
		name: 'Todo List',
		component: './TodoList',
		icon: 'OrderedListOutlined',
	},

	// TRAVEL APPLICATION MODULES
	{
		path: '/explore',
		name: 'Khám phá',
		component: './Explore',
		icon: 'CompassOutlined',
	},
	{
		path: '/itinerary',
		name: 'Lịch trình',
		component: './Itinerary',
		icon: 'CalendarOutlined',
	},
	{
		path: '/budget',
		name: 'Ngân sách',
		component: './Budget',
		icon: 'DollarOutlined',
	},
	{
		name: 'Quản trị',
		path: '/admin',
		icon: 'SettingOutlined',
		routes: [
			{
				name: 'Quản lý điểm đến',
				path: '/admin/destinations',
				component: './Admin/Destinations',
			},
			{
				name: 'Thống kê',
				path: '/admin/statistics',
				component: './Admin/Statistics',
			},
		],
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
