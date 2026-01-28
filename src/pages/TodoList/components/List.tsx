
import React from 'react';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Định nghĩa interface cho dữ liệu Todo
export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
    createdAt: string;
}

// Định nghĩa props cho component TodoListTable
interface TodoListTableProps {
    data: TodoItem[];
    onEdit: (record: TodoItem) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

const TodoListTable: React.FC<TodoListTableProps> = ({ data, onEdit, onDelete, onToggleStatus }) => {

    // Định nghĩa các cột cho bảng
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: TodoItem) => (
                <span style={{ textDecoration: record.completed ? 'line-through' : 'none', color: record.completed ? '#999' : 'inherit' }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority: string) => {
                let color = 'blue';
                let label = 'Trung bình';
                if (priority === 'high') {
                    color = 'red';
                    label = 'Cao';
                } else if (priority === 'low') {
                    color = 'green';
                    label = 'Thấp';
                }
                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'completed',
            key: 'completed',
            width: 120,
            render: (completed: boolean, record: TodoItem) => (
                <Button
                    size="small"
                    onClick={() => onToggleStatus(record.id)}
                    type={completed ? 'default' : 'primary'}
                    ghost={!completed}
                >
                    {completed ? 'Hoàn thành' : 'Đang làm'}
                </Button>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_: any, record: TodoItem) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                        style={{ color: '#faad14' }}
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa công việc này?"
                        onConfirm={() => onDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 5 }}
        />
    );
};

export default TodoListTable;
