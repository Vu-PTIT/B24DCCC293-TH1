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

	// --- MODULES FOR 4 DEVS ---
	{
		path: '/quan-ly-clb',
		name: 'Quản lý Câu lạc bộ',
		component: './QuanLyCauLacBo',
		icon: 'TeamOutlined',
	},
	{
		path: '/quan-ly-don',
		name: 'Quản lý Đơn đăng ký',
		component: './QuanLyDonDangKy',
		icon: 'FileProtectOutlined',
	},
	{
		path: '/quan-ly-thanh-vien',
		name: 'Quản lý Thành viên',
		component: './QuanLyThanhVien',
		icon: 'UsergroupAddOutlined',
	},
	{
		path: '/thong-ke',
		name: 'Báo cáo Thống kê',
		component: './BaocaoThongKe',
		icon: 'BarChartOutlined',
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
