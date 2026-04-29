import React, { useMemo, useState } from 'react';
import { Button, Card, Input, message, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MOCK_POSTS, MOCK_TAGS } from '@/services/blog/mock';
import { DeveloperRole, Post, Tag } from '@/services/blog/typings';
import TagForm from './components/TagForm';
import TagTable from './components/TagTable';

const { Title } = Typography;
const BLOG_TAGS_STORAGE_KEY = 'blog_tags';
const BLOG_POSTS_STORAGE_KEY = 'blog_posts';

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

const TagManagement: React.FC = () => {
	const [tags, setTags] = useState<Tag[]>(() => readFromStorage<Tag[]>(BLOG_TAGS_STORAGE_KEY, MOCK_TAGS));
	const [visible, setVisible] = useState(false);
	const [editingTag, setEditingTag] = useState<Tag | null>(null);
	const [searchText, setSearchText] = useState('');
	const [posts] = useState<Post[]>(() => readFromStorage<Post[]>(BLOG_POSTS_STORAGE_KEY, MOCK_POSTS));

	const tagsWithCount = useMemo(() => {
		const usageMap = posts.reduce<Record<string, number>>((acc, post) => {
			post.tags.forEach((tagName) => {
				acc[tagName] = (acc[tagName] || 0) + 1;
			});
			return acc;
		}, {});

		return tags.map((tag) => ({
			...tag,
			postCount: usageMap[tag.name] || 0,
		}));
	}, [posts, tags]);

	const filteredTags = useMemo(
		() => tagsWithCount.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())),
		[searchText, tagsWithCount],
	);

	const persistTags = (nextTags: Tag[]) => {
		setTags(nextTags);
		localStorage.setItem(BLOG_TAGS_STORAGE_KEY, JSON.stringify(nextTags));
	};

	const handleAddNew = () => {
		setEditingTag(null);
		setVisible(true);
	};

	const handleEdit = (tag: Tag) => {
		setEditingTag(tag);
		setVisible(true);
	};

	const handleDelete = (tag: Tag) => {
		Modal.confirm({
			title: `Xóa thẻ "${tag.name}"?`,
			content: 'Hành động này sẽ xóa thẻ khỏi danh sách.',
			okText: 'Xóa',
			cancelText: 'Hủy',
			okType: 'danger',
			onOk: () => {
				const nextTags = tags.filter((item) => item.id !== tag.id);
				persistTags(nextTags);

				const nextPosts = posts.map((post) => ({
					...post,
					tags: post.tags.filter((tagName) => tagName !== tag.name),
				}));
				localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(nextPosts));

				message.success('Đã xóa thẻ thành công.');
			},
		});
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleSave = (values: { name: string }) => {
		if (editingTag) {
			const nextTags = tags.map((item) => (item.id === editingTag.id ? { ...item, name: values.name } : item));
			persistTags(nextTags);

			if (editingTag.name !== values.name) {
				const nextPosts = posts.map((post) => ({
					...post,
					tags: post.tags.map((tagName) => (tagName === editingTag.name ? values.name : tagName)),
				}));
				localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(nextPosts));
			}

			message.success('Cập nhật thẻ thành công.');
		} else {
			const newTag: Tag = {
				id: Date.now().toString(),
				name: values.name,
				postCount: 0,
			};
			persistTags([newTag, ...tags]);
			message.success('Thêm thẻ mới thành công.');
		}
		setVisible(false);
	};

	return (
		<div style={{ padding: 24 }}>
			<Card>
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
					<div>
						<Title level={4} style={{ margin: 0 }}>
							Quản lý thẻ
						</Title>
						<div style={{ color: '#666', marginTop: 6 }}>Danh sách thẻ với tên và số bài viết đang sử dụng.</div>
					</div>

					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
						<Input.Search
							placeholder='Tìm kiếm thẻ'
							allowClear
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							style={{ width: 260 }}
						/>
						<Button type='primary' icon={<PlusOutlined />} onClick={handleAddNew}>
							Thêm thẻ mới
						</Button>
					</div>
				</div>

				<TagTable data={filteredTags} onEdit={handleEdit} onDelete={handleDelete} />

				<div style={{ marginTop: 24, textAlign: 'right', color: '#999' }}>
					Assigned to: {DeveloperRole.P4_ADMIN_TAG}
				</div>
			</Card>

			<TagForm visible={visible} initialValues={editingTag} onCancel={handleCancel} onSave={handleSave} />
		</div>
	);
};

export default TagManagement;
