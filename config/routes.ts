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
	// --- BÀI 1 ---
	{
		path: '/rock-paper-scissors',
		name: 'Oẳn Tù Tì',
		component: './RockPaperScissors',
		icon: 'TrophyOutlined',
	},
	// --- BÀI 2 ---
	{
		name: 'Ngân Hàng Câu Hỏi',
		path: '/question-bank',
		icon: 'BookOutlined',
		routes: [
			{
				name: 'Khối kiến thức',
				path: 'knowledge-block',
				component: './QuestionBank/KnowledgeBlock',
			},
			{
				name: 'Môn học',
				path: 'subject',
				component: './QuestionBank/Subject',
			},
			{
				name: 'Quản lý Câu hỏi',
				path: 'question',
				component: './QuestionBank/Question',
			},
			{
				name: 'Quản lý Đề thi',
				path: 'exam',
				component: './QuestionBank/Exam',
			},
			{
				// Route phụ để tạo đề thi mới (ẩn khỏi menu)
				name: 'Tạo đề thi mới',
				path: 'exam/create',
				component: './QuestionBank/Exam/CreateExam',
				hideInMenu: true,
			}
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
