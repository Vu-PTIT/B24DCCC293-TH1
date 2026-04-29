import React from 'react';
import { Input, Select, Space } from 'antd';
import { PostStatus } from '@/services/blog/typings';

interface PostSearchFilterProps {
	searchTitle: string;
	onSearchChange: (value: string) => void;
	statusFilter: PostStatus | 'ALL';
	onStatusChange: (value: PostStatus | 'ALL') => void;
}

const PostSearchFilter: React.FC<PostSearchFilterProps> = ({ searchTitle, onSearchChange, statusFilter, onStatusChange }) => {
	const isMobile = window.innerWidth < 768;

	return (
		<Space size={12} style={{ marginBottom: 16, width: isMobile ? '100%' : 'auto' }} wrap>
			<Input.Search
				allowClear
				placeholder='Tim kiem theo tieu de'
				value={searchTitle}
				onChange={(e) => onSearchChange(e.target.value)}
				style={{ width: isMobile ? '100%' : 300 }}
			/>
			<Select
				style={{ width: isMobile ? '100%' : 180, minWidth: 150 }}
				value={statusFilter}
				onChange={(value) => onStatusChange(value)}
				options={[
					{ label: 'Tat ca trang thai', value: 'ALL' },
					{ label: 'Nhap', value: PostStatus.DRAFT },
					{ label: 'Da dang', value: PostStatus.PUBLISHED },
				]}
			/>
		</Space>
	);
};

export default PostSearchFilter;
