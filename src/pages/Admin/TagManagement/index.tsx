import React from 'react';
import { Table, Button, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MOCK_TAGS } from '@/services/blog/mock';
import { Tag, DeveloperRole, TagColumnKey } from '@/services/blog/typings';

const { Title } = Typography;

const TagManagement: React.FC = () => {
  const columns = [
    {
      title: 'Tên thẻ',
      dataIndex: TagColumnKey.NAME,
      key: TagColumnKey.NAME,
    },
    {
      title: 'Số bài viết',
      dataIndex: TagColumnKey.POST_COUNT,
      key: TagColumnKey.POST_COUNT,
    },
    {
      title: 'Hành động',
      key: TagColumnKey.ACTION,
      render: (_: any, record: Tag) => (
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
        <Title level={3}>Quản lý thẻ</Title>
        <Button type="primary" icon={<PlusOutlined />}>Thêm thẻ mới</Button>
      </div>

      <Table columns={columns} dataSource={MOCK_TAGS} rowKey="id" />

      <div style={{ marginTop: '24px', color: '#ccc', textAlign: 'right' }}>
        Assigned to: {DeveloperRole.P4_ADMIN_TAG}
      </div>
    </div>
  );
};

export default TagManagement;


