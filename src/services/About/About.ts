export interface AuthorInfo {
	name: string;
	avatar: string;
	bio: string;
	skills: string[];
	social: {
		facebook?: string;
		github?: string;
		linkedin?: string;
	};
}

const KEY = 'author_info';

export const getAuthor = (): AuthorInfo => {
	const data = localStorage.getItem(KEY);
	if (data) return JSON.parse(data);

	const defaultData: AuthorInfo = {
		name: 'Thùy Nguyễn',
		avatar: 'https://i.pravatar.cc/150',
		bio: 'Sinh viên CNTT, lập trình web.',
		skills: ['React', 'TypeScript', 'UmiJS', 'Ant Design'],
		social: {
			facebook: '',
			github: '',
			linkedin: '',
		},
	};

	localStorage.setItem(KEY, JSON.stringify(defaultData));
	return defaultData;
};

export const updateAuthor = (data: AuthorInfo) => {
	localStorage.setItem(KEY, JSON.stringify(data));
};
