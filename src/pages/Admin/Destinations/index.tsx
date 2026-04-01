import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, Rate, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Destination } from '@/types/travel';
import { mockDestinations } from '@/services/mockData';

const { confirm } = Modal;
const { Option } = Select;

const DestinationsActive: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
    const [form] = Form.useForm();

    const showModal = (destination?: Destination) => {
        if (destination) {
            setEditingDestination(destination);
            form.setFieldsValue(destination);
        } else {
            setEditingDestination(null);
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            message.success(editingDestination ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
            setIsModalVisible(false);
        });
    };

    const handleDelete = (id: string) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Dữ liệu không thể khôi phục sau khi xóa.',
            onOk() {
                message.warning('Đã xóa điểm đến (Mô phỏng)');
            },
        });
    };

    const columns = [
        { 
            title: 'Ảnh', 
            dataIndex: 'image', 
            key: 'image',
            render: (url: string) => <img src={url} alt="img" style={{ width: 80, borderRadius: 4 }} /> 
        },
        { title: 'Tên địa điểm', dataIndex: 'name', key: 'name' },
        { 
            title: 'Loại hình', 
            dataIndex: 'type', 
            key: 'type', 
            render: (type: string) => {
                const colors = { beach: 'blue', mountain: 'green', city: 'orange' };
                return <Tag color={colors[type as keyof typeof colors]}>{type.toUpperCase()}</Tag>;
            }
        },
        { 
            title: 'Đánh giá', 
            dataIndex: 'rating', 
            key: 'rating',
            render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: 12 }} />
        },
        { 
            title: 'Chi phí', 
            dataIndex: 'price', 
            key: 'price',
            render: (price: number) => <span>{price.toLocaleString()} VNĐ</span>
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Destination) => (
                <Space size="middle">
                    <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        onClick={() => showModal(record)}
                    >
                        Sửa
                    </Button>
                    <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <PageContainer title="Quản lý điểm đến (Person 4)">
            <Card extra={
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => showModal()}
                >
                    Thêm điểm đến
                </Button>
            }>
                <Table 
                    dataSource={mockDestinations} 
                    columns={columns} 
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>

            <Modal 
                title={editingDestination ? 'Sửa điểm đến' : 'Thêm điểm đến mới'} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={() => setIsModalVisible(false)}
                width={700}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Tên điểm đến" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Tên địa danh" />
                    </Form.Item>
                    <Form.Item name="type" label="Loại hình" rules={[{ required: true }]}>
                        <Select placeholder="Chọn loại hình">
                            <Option value="beach">Biển</Option>
                            <Option value="mountain">Núi</Option>
                            <Option value="city">Thành phố</Option>
                        </Select>
                    </Form.Item>
                    <Space style={{ width: '100%' }} size="large">
                        <Form.Item name="price" label="Chi phí dự kiến (VNĐ)" rules={[{ required: true }]}>
                            <InputNumber style={{ width: 300 }} min={0} />
                        </Form.Item>
                        <Form.Item name="visitTime" label="Thời gian tham quan (h)" rules={[{ required: true }]}>
                            <InputNumber style={{ width: 300 }} min={0} />
                        </Form.Item>
                    </Space>
                    <Form.Item name="rating" label="Đánh giá">
                        <Rate allowHalf />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={4} placeholder="Nhập mô tả về điểm đến..." />
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>
    );
};

export default DestinationsActive;
