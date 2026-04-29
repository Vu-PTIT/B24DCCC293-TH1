import React from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tag, TagColumnKey } from '@/services/blog/typings';

interface TagTableProps {
  data: Tag[];
  onEdit: (record: Tag) => void;
  onDelete: (record: Tag) => void;
}

const TagTable: React.FC<TagTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Tên thẻ',
      dataIndex: TagColumnKey.NAME,
      key: TagColumnKey.NAME,
      sorter: (a: Tag, b: Tag) => a.name.localeCompare(b.name),
<<<<<<< HEAD
=======
      render: (value: string) => <span style={{ fontWeight: 600 }}>{value}</span>,
>>>>>>> ccd7a019c41f09a5a16f95c67a87824c7c3daac4
    },
    {
      title: 'Số bài viết',
      dataIndex: TagColumnKey.POST_COUNT,
      key: TagColumnKey.POST_COUNT,
      sorter: (a: Tag, b: Tag) => a.postCount - b.postCount,
      width: 140,
<<<<<<< HEAD
=======
      align: 'center' as const,
>>>>>>> ccd7a019c41f09a5a16f95c67a87824c7c3daac4
    },
    {
      title: 'Hành động',
      key: TagColumnKey.ACTION,
      render: (_: any, record: Tag) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>
            Sửa
          </Button>
<<<<<<< HEAD
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => onDelete(record)}>
            Xóa
          </Button>
=======
          <Popconfirm
            title={`Xóa thẻ "${record.name}"?`}
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
>>>>>>> ccd7a019c41f09a5a16f95c67a87824c7c3daac4
        </Space>
      ),
      width: 180,
    },
  ];

<<<<<<< HEAD
  return <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 8 }} />;
=======
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      size="middle"
      bordered
      pagination={{ pageSize: 8, showSizeChanger: false, position: ['bottomCenter'] }}
      locale={{ emptyText: 'Không có thẻ phù hợp' }}
    />
  );
>>>>>>> ccd7a019c41f09a5a16f95c67a87824c7c3daac4
};

export default TagTable;
