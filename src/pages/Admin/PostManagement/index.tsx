import React from 'react';
import { Table, Button, Space, Tag, Input, Select, Popconfirm, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MOCK_POSTS } from '@/services/blog/mock';
import { Post, PostStatus, DeveloperRole, PostColumnKey } from '@/services/blog/typings';

const { Title } = Typography;

const PostManagement: React.FC = () => {
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: PostColumnKey.TITLE,
      key: PostColumnKey.TITLE,
    },
    {
      title: 'Trạng thái',
      dataIndex: PostColumnKey.STATUS,
      key: PostColumnKey.STATUS,
      render: (status: PostStatus) => (
        <Tag color={status === PostStatus.PUBLISHED ? 'green' : 'orange'}>
          {status === PostStatus.PUBLISHED ? 'Đã đăng' : 'Nháp'}
        </Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: PostColumnKey.TAGS,
      key: PostColumnKey.TAGS,
      render: (tags: string[]) => (
        <>
          {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: PostColumnKey.VIEW_COUNT,
      key: PostColumnKey.VIEW_COUNT,
    },
    {
      title: 'Ngày tạo',
      dataIndex: PostColumnKey.CREATED_AT,
      key: PostColumnKey.CREATED_AT,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Hành động',
      key: PostColumnKey.ACTION,
      render: (_: any, record: Post) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>Sửa</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Title level={3}>Quản lý bài viết</Title>
        <Button type="primary" icon={<PlusOutlined />}>Thêm bài viết</Button>
      </div>

      <Table columns={columns} dataSource={MOCK_POSTS} rowKey="id" />

      <div style={{ marginTop: '24px', color: '#ccc', textAlign: 'right' }}>
        Assigned to: {DeveloperRole.P3_ADMIN_POST}
      </div>
    </div>
  );
};

export default PostManagement;


