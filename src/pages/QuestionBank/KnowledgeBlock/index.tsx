import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface KnowledgeBlock {
    key: string;
    name: string;
    description?: string;
}

const Page = () => {
    const [data, setData] = useState<KnowledgeBlock[]>([]);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState<KnowledgeBlock | null>(null);
    const [form] = Form.useForm();

    const openForm = (record?: KnowledgeBlock) => {
        if (record) {
            setEditing(record);
            form.setFieldsValue(record);
        } else {
            setEditing(null);
            form.resetFields();
        }
        setVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editing) {
                setData(prev =>
                    prev.map(item => (item.key === editing.key ? { ...item, ...values } : item)),
                );
            } else {
                setData(prev => [...prev, { key: Date.now().toString(), ...values }]);
            }
            setVisible(false);
        });
    };

    const handleDelete = (key: string) => {
        setData(prev => prev.filter(item => item.key !== key));
    };

    const columns = [
        {
            title: 'Tên khối kiến thức',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: KnowledgeBlock) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openForm(record)} />
                    <Popconfirm title="Xóa khối kiến thức này?" onConfirm={() => handleDelete(record.key)}>
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Danh mục Khối kiến thức</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => openForm()}>
                Thêm khối
            </Button>
            <Table dataSource={data} columns={columns} style={{ marginTop: 16 }} />
            <Modal
                visible={visible}
                title={editing ? 'Sửa khối kiến thức' : 'Thêm khối kiến thức'}
                onCancel={() => setVisible(false)}
                onOk={handleOk}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Page;
