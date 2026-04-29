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
	// BLOG APPLICATION
	{
		name: 'Blog',
		path: '/blog',
		icon: 'ReadOutlined',
		routes: [
			{
				path: '/blog',
				name: 'Feed',
				component: './Blog/Feed',
				hideInMenu: true,
			},
			{
				path: '/blog/:slug',
				name: 'Detail',
				component: './Blog/Detail',
				hideInMenu: true,
			},
		],
	},
	{
		name: 'About',
		path: '/about',
		icon: 'UserOutlined',
		component: './About',
	},
	{
		name: 'Blog Admin',
		path: '/admin',
		icon: 'SettingOutlined',
		routes: [
			{
				path: '/admin/posts',
				name: 'Manage Posts',
				component: './Admin/PostManagement',
			},
			{
				path: '/admin/tags',
				name: 'Manage Tags',
				component: './Admin/TagManagement',
			},
		],
	},

	{
		path: '/',
		redirect: '/blog',
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
