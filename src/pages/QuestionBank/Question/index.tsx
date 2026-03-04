import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Popconfirm, Card, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

// Dữ liệu giả lập (Mock data) cho Môn học và Khối kiến thức
const mockSubjects = [
    { id: '1', name: 'Lập trình Web' },
    { id: '2', name: 'Cơ sở dữ liệu' },
    { id: '3', name: 'Lập trình hướng đối tượng' },
];

const mockKnowledgeBlocks = [
    { id: '1', name: 'Tổng quan' },
    { id: '2', name: 'Chuyên sâu' },
    { id: '3', name: 'Thực hành' },
];

const difficultyLevels = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];

interface IQuestion {
    _id?: string;
    maCauHoi: string;
    monHocId: string;
    noiDung: string;
    mucDoKho: string;
    khoiKienThucId: string;
}

const initialQuestions: IQuestion[] = [
    {
        _id: '1',
        maCauHoi: 'CH001',
        monHocId: '1',
        noiDung: 'Mô tả nguyên lý hoạt động của Single Page Application (SPA).',
        mucDoKho: 'Trung bình',
        khoiKienThucId: '1',
    },
    {
        _id: '2',
        maCauHoi: 'CH002',
        monHocId: '2',
        noiDung: 'Hãy phân biệt sự khác nhau giữa INNER JOIN và LEFT JOIN trong SQL.',
        mucDoKho: 'Dễ',
        khoiKienThucId: '2',
    },
];

export default function QuestionPage() {
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [questions, setQuestions] = useState<IQuestion[]>(initialQuestions);
    const [filteredQuestions, setFilteredQuestions] = useState<IQuestion[]>(initialQuestions);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Hàm Tìm Kiếm / Lọc
    const handleSearch = (values: any) => {
        let result = [...questions];
        if (values.monHocId) {
            result = result.filter((q) => q.monHocId === values.monHocId);
        }
        if (values.mucDoKho) {
            result = result.filter((q) => q.mucDoKho === values.mucDoKho);
        }
        if (values.khoiKienThucId) {
            result = result.filter((q) => q.khoiKienThucId === values.khoiKienThucId);
        }
        setFilteredQuestions(result);
    };

    // Khôi phục lại kết quả tìm kiếm mặc định (hiển thị tất cả)
    const handleResetSearch = () => {
        searchForm.resetFields();
        setFilteredQuestions(questions);
    };

    const handleAdd = () => {
        form.resetFields();
        setEditingId(null);
        setModalVisible(true);
    };

    const handleEdit = (record: IQuestion) => {
        form.setFieldsValue({
            maCauHoi: record.maCauHoi,
            monHocId: record.monHocId,
            noiDung: record.noiDung,
            mucDoKho: record.mucDoKho,
            khoiKienThucId: record.khoiKienThucId,
        });
        setEditingId(record._id || null);
        setModalVisible(true);
    };

    const handleDelete = (id: string | undefined) => {
        if (!id) return;
        const newQuestions = questions.filter((q) => q._id !== id);
        setQuestions(newQuestions);

        // Áp dụng lại bộ lọc hiện tại sau khi xóa
        const searchValues = searchForm.getFieldsValue();
        let result = [...newQuestions];
        if (searchValues.monHocId) result = result.filter((q) => q.monHocId === searchValues.monHocId);
        if (searchValues.mucDoKho) result = result.filter((q) => q.mucDoKho === searchValues.mucDoKho);
        if (searchValues.khoiKienThucId) result = result.filter((q) => q.khoiKienThucId === searchValues.khoiKienThucId);
        setFilteredQuestions(result);

        message.success('Xóa câu hỏi thành công');
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            let newQuestions = [...questions];

            if (editingId) {
                newQuestions = questions.map((q) => (q._id === editingId ? { ...q, ...values } : q));
                message.success('Cập nhật câu hỏi thành công');
            } else {
                const newId = String(Math.max(...questions.map((q) => parseInt(q._id || '0')), 0) + 1);
                newQuestions = [...questions, { _id: newId, ...values }];
                message.success('Thêm câu hỏi thành công');
            }
            setQuestions(newQuestions);

            // Áp dụng lại bộ lọc sau khi lưu
            const searchValues = searchForm.getFieldsValue();
            let result = [...newQuestions];
            if (searchValues.monHocId) result = result.filter((q) => q.monHocId === searchValues.monHocId);
            if (searchValues.mucDoKho) result = result.filter((q) => q.mucDoKho === searchValues.mucDoKho);
            if (searchValues.khoiKienThucId) result = result.filter((q) => q.khoiKienThucId === searchValues.khoiKienThucId);
            setFilteredQuestions(result);

            setModalVisible(false);
        } catch (error) {
            message.error('Vui lòng kiểm tra lại cấu trúc form nhập');
        }
    };

    const columns = [
        { title: 'Mã CH', dataIndex: 'maCauHoi', key: 'maCauHoi', width: 100 },
        {
            title: 'Môn Học',
            dataIndex: 'monHocId',
            key: 'monHocId',
            width: 180,
            render: (id: string) => mockSubjects.find((s) => s.id === id)?.name || id,
        },
        {
            title: 'Khối Kiến Thức',
            dataIndex: 'khoiKienThucId',
            key: 'khoiKienThucId',
            width: 150,
            render: (id: string) => mockKnowledgeBlocks.find((k) => k.id === id)?.name || id,
        },
        {
            title: 'Mức Độ Khó',
            dataIndex: 'mucDoKho',
            key: 'mucDoKho',
            width: 120,
        },
        { title: 'Nội Dung', dataIndex: 'noiDung', key: 'noiDung', ellipsis: true },
        {
            title: 'Thao Tác',
            key: 'action',
            width: 160,
            render: (_: any, record: IQuestion) => (
                <Space>
                    <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Popconfirm title='Xác nhận xóa câu hỏi này?' onConfirm={() => handleDelete(record._id)} okText='Xóa' cancelText='Hủy'>
                        <Button type='primary' danger size='small' icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {/* Khung tìm kiếm / Lọc */}
            <Card style={{ marginBottom: '16px' }} title="Bộ Lọc Tìm Kiếm Câu Hỏi" size="small">
                <Form form={searchForm} layout='inline' onFinish={handleSearch}>
                    <Form.Item name='monHocId' label='Môn Học'>
                        <Select placeholder='Tất cả môn học' style={{ width: 180 }} allowClear>
                            {mockSubjects.map((s) => (
                                <Option key={s.id} value={s.id}>
                                    {s.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='khoiKienThucId' label='Khối Kiến Thức'>
                        <Select placeholder='Tất cả khối' style={{ width: 150 }} allowClear>
                            {mockKnowledgeBlocks.map((k) => (
                                <Option key={k.id} value={k.id}>
                                    {k.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='mucDoKho' label='Mức Độ Khó'>
                        <Select placeholder='Tất cả mức độ' style={{ width: 150 }} allowClear>
                            {difficultyLevels.map((level) => (
                                <Option key={level} value={level}>
                                    {level}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleResetSearch}>
                            Xóa bộ lọc
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Khung dữ liệu */}
            <Card>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col>
                        <h1>Ngân Hàng Câu Hỏi Tự Luận</h1>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={handleAdd}>
                            Thêm Câu Hỏi Mới
                        </Button>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={filteredQuestions}
                    rowKey={(record) => record._id || ''}
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Tổng số: ${total} câu hỏi` }}
                />
            </Card>

            {/* Modal Thêm / Sửa */}
            <Modal
                title={editingId ? 'Chỉnh sửa Câu Hỏi' : 'Thêm Mới Câu Hỏi Tự Luận'}
                visible={modalVisible}
                onOk={handleSave}
                onCancel={() => setModalVisible(false)}
                okText='Lưu Thông Tin'
                cancelText='Hủy'
                width={700}
                destroyOnClose
            >
                <Form form={form} layout='vertical'>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label='Mã Câu Hỏi'
                                name='maCauHoi'
                                rules={[{ required: true, message: 'Vui lòng nhập mã câu hỏi' }]}
                            >
                                <Input placeholder='Ví dụ: CH001' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Mức Độ Khó'
                                name='mucDoKho'
                                rules={[{ required: true, message: 'Vui lòng chọn mức độ khó' }]}
                            >
                                <Select placeholder='Chọn mức độ khó'>
                                    {difficultyLevels.map((level) => (
                                        <Option key={level} value={level}>
                                            {level}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label='Môn Học'
                                name='monHocId'
                                rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
                            >
                                <Select placeholder='Chọn môn học'>
                                    {mockSubjects.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Khối Kiến Thức'
                                name='khoiKienThucId'
                                rules={[{ required: true, message: 'Vui lòng chọn khối kiến thức' }]}
                            >
                                <Select placeholder='Chọn khối kiến thức'>
                                    {mockKnowledgeBlocks.map((k) => (
                                        <Option key={k.id} value={k.id}>
                                            {k.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label='Nội Dung Câu Hỏi'
                        name='noiDung'
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi' }]}
                    >
                        <Input.TextArea rows={4} placeholder='Nhập nội dung câu hỏi tự luận...' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
