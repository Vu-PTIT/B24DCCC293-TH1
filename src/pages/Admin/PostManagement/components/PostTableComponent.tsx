import React from 'react';
import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Post, PostColumnKey, PostStatus } from '@/services/blog/typings';

interface PostTableComponentProps {
	posts: Post[];
	onEdit: (post: Post) => void;
	onDelete: (postId: string) => void;
}

const PostTableComponent: React.FC<PostTableComponentProps> = ({ posts, onEdit, onDelete }) => {
	const isMobile = window.innerWidth < 768;

	const columns = [
		{
			title: 'Tieu de',
			dataIndex: PostColumnKey.TITLE,
			key: PostColumnKey.TITLE,
			responsive: ['md' as const],
		},
		{
			title: 'Trang thai',
			dataIndex: PostColumnKey.STATUS,
			key: PostColumnKey.STATUS,
			render: (status: PostStatus) => (
				<Tag color={status === PostStatus.PUBLISHED ? 'green' : 'orange'}>
					{status === PostStatus.PUBLISHED ? 'Da dang' : 'Nhap'}
				</Tag>
			),
			responsive: ['sm' as const],
		},
		{
			title: 'The',
			dataIndex: PostColumnKey.TAGS,
			key: PostColumnKey.TAGS,
			render: (postTags: string[]) => (
				<>
					{postTags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</>
			),
			responsive: ['lg' as const],
		},
		{
			title: 'Luot xem',
			dataIndex: PostColumnKey.VIEW_COUNT,
			key: PostColumnKey.VIEW_COUNT,
			responsive: ['lg' as const],
		},
		{
			title: 'Ngay tao',
			dataIndex: PostColumnKey.CREATED_AT,
			key: PostColumnKey.CREATED_AT,
			render: (date: string) => new Date(date).toLocaleDateString(),
			responsive: ['md' as const],
		},
		{
			title: 'Hanh dong',
			key: PostColumnKey.ACTION,
			render: (_: unknown, record: Post) => (
				<Space
					size='middle'
					direction={isMobile ? 'vertical' : 'horizontal'}
					style={{ width: isMobile ? '100%' : 'auto' }}
				>
					<Button
						type='link'
						icon={<EditOutlined />}
						onClick={() => onEdit(record)}
						style={{ width: isMobile ? '100%' : 'auto' }}
					>
						Sua
					</Button>
					<Popconfirm
						title='Ban co chac muon xoa bai viet nay?'
						okText='Xoa'
						cancelText='Huy'
						onConfirm={() => onDelete(record.id)}
					>
						<Button type='link' danger icon={<DeleteOutlined />} style={{ width: isMobile ? '100%' : 'auto' }}>
							Xoa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={posts}
			rowKey='id'
			pagination={{ pageSize: isMobile ? 5 : 8 }}
			scroll={{ x: isMobile ? 500 : 'auto' }}
			size={isMobile ? 'small' : 'middle'}
		/>
	);
};

export default PostTableComponent;
