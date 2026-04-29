import React, { useEffect, useMemo, useState } from 'react';
import { Card, Form, message } from 'antd';
import { MOCK_POSTS, MOCK_TAGS } from '@/services/blog/mock';
import { Post, PostStatus, DeveloperRole, Tag as BlogTag } from '@/services/blog/typings';
import PostActionBar from './components/PostActionBar';
import PostSearchFilter from './components/PostSearchFilter';
import PostTableComponent from './components/PostTableComponent';
import PostFormModal from './components/PostFormModal';

const BLOG_POSTS_STORAGE_KEY = 'blog_posts';
const BLOG_TAGS_STORAGE_KEY = 'blog_tags';

type PostFormValues = Pick<Post, 'title' | 'slug' | 'content' | 'coverUrl' | 'status'> & {
	tags: string[];
};

const readFromStorage = <T,>(key: string, fallback: T): T => {
	if (typeof window === 'undefined') {
		return fallback;
	}

	const raw = localStorage.getItem(key);
	if (!raw) {
		return fallback;
	}

	try {
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
};

const PostManagement: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>(() => readFromStorage<Post[]>(BLOG_POSTS_STORAGE_KEY, MOCK_POSTS));
	const [tags, setTags] = useState<BlogTag[]>(() => readFromStorage<BlogTag[]>(BLOG_TAGS_STORAGE_KEY, MOCK_TAGS));
	const [searchTitle, setSearchTitle] = useState('');
	const [statusFilter, setStatusFilter] = useState<PostStatus | 'ALL'>('ALL');
	const [visible, setVisible] = useState(false);
	const [editingPost, setEditingPost] = useState<Post | null>(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [form] = Form.useForm<PostFormValues>();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(posts));
	}, [posts]);

	useEffect(() => {
		const usageMap = posts.reduce<Record<string, number>>((acc, post) => {
			post.tags.forEach((tagName) => {
				acc[tagName] = (acc[tagName] || 0) + 1;
			});
			return acc;
		}, {});

		setTags((prev) => {
			const next = prev.map((tag) => ({
				...tag,
				postCount: usageMap[tag.name] || 0,
			}));
			localStorage.setItem(BLOG_TAGS_STORAGE_KEY, JSON.stringify(next));
			return next;
		});
	}, [posts]);

	const filteredPosts = useMemo(
		() =>
			posts.filter((post) => {
				const byTitle = post.title.toLowerCase().includes(searchTitle.trim().toLowerCase());
				const byStatus = statusFilter === 'ALL' ? true : post.status === statusFilter;
				return byTitle && byStatus;
			}),
		[posts, searchTitle, statusFilter],
	);

	const tagOptions = useMemo(() => tags.map((item) => ({ label: item.name, value: item.name })), [tags]);

	const handleOpenAddModal = () => {
		setEditingPost(null);
		form.resetFields();
		form.setFieldsValue({ status: PostStatus.DRAFT, tags: [] });
		setVisible(true);
	};

	const handleOpenEditModal = (post: Post) => {
		setEditingPost(post);
		form.setFieldsValue({
			title: post.title,
			slug: post.slug,
			content: post.content,
			coverUrl: post.coverUrl,
			tags: post.tags,
			status: post.status,
		});
		setVisible(true);
	};

	const handleCloseModal = () => {
		setVisible(false);
		setEditingPost(null);
		form.resetFields();
	};

	const handleDeletePost = (postId: string) => {
		setPosts((prev) => prev.filter((item) => item.id !== postId));
		message.success('Da xoa bai viet.');
	};

	const handleFormSubmit = async () => {
		const values = await form.validateFields();
		const now = new Date().toISOString();

		if (editingPost) {
			setPosts((prev) =>
				prev.map((item) =>
					item.id === editingPost.id
						? {
								...item,
								...values,
								summary: values.content.slice(0, 140),
								updatedAt: now,
						  }
						: item,
				),
			);
			message.success('Cap nhat bai viet thanh cong.');
		} else {
			const newPost: Post = {
				id: Date.now().toString(),
				title: values.title,
				slug: values.slug,
				summary: values.content.slice(0, 140),
				content: values.content,
				coverUrl: values.coverUrl,
				tags: values.tags,
				status: values.status,
				author: 'Admin',
				viewCount: 0,
				createdAt: now,
				updatedAt: now,
			};
			setPosts((prev) => [newPost, ...prev]);
			message.success('Them bai viet thanh cong.');
		}

		handleCloseModal();
	};

	return (
		<div style={{ padding: isMobile ? 12 : 24 }}>
			<Card
				style={{
					overflow: 'auto',
					boxShadow: isMobile ? '0 1px 4px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.12)',
				}}
			>
				<PostActionBar onAddClick={handleOpenAddModal} />
				<PostSearchFilter
					searchTitle={searchTitle}
					onSearchChange={setSearchTitle}
					statusFilter={statusFilter}
					onStatusChange={setStatusFilter}
				/>
				<PostTableComponent posts={filteredPosts} onEdit={handleOpenEditModal} onDelete={handleDeletePost} />

				<PostFormModal
					visible={visible}
					form={form}
					onCancel={handleCloseModal}
					onSubmit={handleFormSubmit}
					editingPost={editingPost}
					tagOptions={tagOptions}
				/>

				<div style={{ marginTop: 24, color: '#999', textAlign: 'right' }}>
					Assigned to: {DeveloperRole.P3_ADMIN_POST}
				</div>
			</Card>
		</div>
	);
};

export default PostManagement;
