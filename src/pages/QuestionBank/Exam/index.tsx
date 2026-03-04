import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Space, Card, Row, Col, message, Divider, Popconfirm, Tag, List } from 'antd';
import { PlusOutlined, DeleteOutlined, FileTextOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ĐỂ TEST LOGIC TẠO ĐỀ THI ---
const mockSubjects = [
    { id: '1', name: 'Lập trình Web' },
    { id: '2', name: 'Cơ sở dữ liệu' },
];

const mockKnowledgeBlocks = [
    { id: '1', name: 'Tổng quan' },
    { id: '2', name: 'Chuyên sâu' },
    { id: '3', name: 'Thực hành' },
];

const difficultyLevels = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];

interface IQuestion {
    id: string;
    monHocId: string;
    noiDung: string;
    mucDoKho: string;
    khoiKienThucId: string;
}

// Ngân hàng câu hỏi giả lập (Phải đủ số lượng để test random)
const mockQuestionBank: IQuestion[] = [
    { id: 'Q1', monHocId: '1', noiDung: 'Định nghĩa HTML là gì?', mucDoKho: 'Dễ', khoiKienThucId: '1' },
    { id: 'Q2', monHocId: '1', noiDung: 'CSS dùng để làm gì?', mucDoKho: 'Dễ', khoiKienThucId: '1' },
    { id: 'Q3', monHocId: '1', noiDung: 'Sự khác biệt giữa Let và Var trong JS?', mucDoKho: 'Trung bình', khoiKienThucId: '2' },
    { id: 'Q4', monHocId: '1', noiDung: 'Mô tả mô hình DOM?', mucDoKho: 'Trung bình', khoiKienThucId: '2' },
    { id: 'Q5', monHocId: '1', noiDung: 'Làm sao để bảo mật XSS?', mucDoKho: 'Khó', khoiKienThucId: '2' },
    { id: 'Q6', monHocId: '1', noiDung: 'Cấu hình Webpack cơ bản?', mucDoKho: 'Rất khó', khoiKienThucId: '3' },
    { id: 'Q7', monHocId: '2', noiDung: 'Khóa chính (Primary Key) là gì?', mucDoKho: 'Dễ', khoiKienThucId: '1' },
    { id: 'Q8', monHocId: '2', noiDung: 'Phân biệt dạng chuẩn 1NF và 2NF?', mucDoKho: 'Trung bình', khoiKienThucId: '2' },
    { id: 'Q9', monHocId: '2', noiDung: 'Viết procedure cập nhật số lượng tồn kho?', mucDoKho: 'Khó', khoiKienThucId: '3' },
    { id: 'Q10', monHocId: '2', noiDung: 'Tối ưu hóa truy vấn có hàng triệu bản ghi?', mucDoKho: 'Rất khó', khoiKienThucId: '2' },
];

// --- CÁC INTERFACE DỮ LIỆU ĐỀ THI ---
interface IExamStructureItem {
    khoiKienThucId: string;
    mucDoKho: string;
    soLuong: number;
}

interface IExam {
    _id: string;
    tenDeThi: string;
    monHocId: string;
    cauTruc: IExamStructureItem[];
    danhSachCauHoi: IQuestion[];
    ngayTao: string;
}

export default function ExamManagePage() {
    const [form] = Form.useForm();
    const [exams, setExams] = useState<IExam[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Lưu ý: Dưới đây dùng để xem chi tiết đề thi đã tạo
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedExam, setSelectedExam] = useState<IExam | null>(null);

    const handleOpenCreateModal = () => {
        form.resetFields();
        // Mặc định tạo sẵn 1 điều kiện (1 cấu trúc)
        form.setFieldsValue({
            cauTruc: [{ khoiKienThucId: undefined, mucDoKho: undefined, soLuong: 1 }]
        });
        setModalVisible(true);
    };

    const handleDeleteExam = (id: string) => {
        setExams(exams.filter((e) => e._id !== id));
        message.success('Đã xóa đề thi');
    };

    const handleViewExam = (exam: IExam) => {
        setSelectedExam(exam);
        setViewModalVisible(true);
    };

    // --- LOGIC SINH ĐỀ THI TỰ ĐỘNG THEO CẤU TRÚC ---
    const handleGenerateExam = async () => {
        try {
            const values = await form.validateFields();
            const monHocId = values.monHocId;
            const tenDeThi = values.tenDeThi;
            const cauTruc: IExamStructureItem[] = values.cauTruc;

            let genQuestions: IQuestion[] = [];
            let missingErrors: string[] = [];

            // Lọc ngân hàng câu hỏi theo Môn học
            const questionsOfSubject = mockQuestionBank.filter((q) => q.monHocId === monHocId);

            // Duyệt qua từng yêu cầu cấu trúc đề thi
            cauTruc.forEach((dk: IExamStructureItem, index: number) => {
                // Tìm các câu hỏi thỏa mãn (Môn học + Khối kiến thức + Mức độ khó) và chưa được chọn
                const suitableQuestions = questionsOfSubject.filter(
                    (q) => q.khoiKienThucId === dk.khoiKienThucId
                        && q.mucDoKho === dk.mucDoKho
                        && !genQuestions.find(selected => selected.id === q.id)
                );

                if (suitableQuestions.length < dk.soLuong) {
                    const blockName = mockKnowledgeBlocks.find(b => b.id === dk.khoiKienThucId)?.name;
                    missingErrors.push(`Dòng ${index + 1} (${blockName} - ${dk.mucDoKho}): Yêu cầu ${dk.soLuong} câu nhưng ngân hàng chỉ có ${suitableQuestions.length} câu phù hợp.`);
                } else {
                    // Xáo trộn (Shuffle) và lấy đủ số lượng câu hỏi
                    const shuffled = suitableQuestions.sort(() => 0.5 - Math.random());
                    const selected = shuffled.slice(0, dk.soLuong);
                    genQuestions = [...genQuestions, ...selected];
                }
            });

            if (missingErrors.length > 0) {
                Modal.error({
                    title: 'Không thể tạo đề thi!',
                    content: (
                        <div>
                            <p>Ngân hàng câu hỏi không đủ số lượng để trộn theo cấu trúc này:</p>
                            <ul>
                                {missingErrors.map((err, i) => <li key={i} style={{ color: 'red' }}>{err}</li>)}
                            </ul>
                            <p>Vui lòng chọn cấu trúc khác hoặc bổ sung thêm câu hỏi vào ngân hàng!</p>
                        </div>
                    ),
                });
                return;
            }

            // Nếu thành công -> Lưu đề thi
            const newExam: IExam = {
                _id: Date.now().toString(),
                tenDeThi: tenDeThi,
                monHocId: monHocId,
                cauTruc: cauTruc,
                danhSachCauHoi: genQuestions,
                ngayTao: new Date().toLocaleString('vi-VN'),
            };

            setExams([newExam, ...exams]);
            message.success('Tạo đề thi mới thành công!');
            setModalVisible(false);

        } catch (error) {
            message.error('Vui lòng điền đầy đủ các thông tin quy định cho cấu trúc đề!');
        }
    };

    const columns = [
        { title: 'Tên Đề Thi', dataIndex: 'tenDeThi', key: 'tenDeThi', width: 250 },
        {
            title: 'Môn Học',
            dataIndex: 'monHocId',
            key: 'monHocId',
            width: 150,
            render: (id: string) => mockSubjects.find((s) => s.id === id)?.name || id,
        },
        {
            title: 'Số Câu Hỏi',
            key: 'totalQuestions',
            width: 120,
            align: 'center' as const,
            render: (_: any, record: IExam) => <Tag color="blue">{record.danhSachCauHoi.length} câu</Tag>,
        },
        { title: 'Ngày Tạo', dataIndex: 'ngayTao', key: 'ngayTao', width: 180 },
        {
            title: 'Thao Tác',
            key: 'action',
            width: 180,
            render: (_: any, record: IExam) => (
                <Space>
                    <Button type="default" size="small" icon={<FileTextOutlined />} onClick={() => handleViewExam(record)}>
                        Xem chi tiết
                    </Button>
                    <Popconfirm title='Xác nhận xóa đề thi này?' onConfirm={() => handleDeleteExam(record._id)}>
                        <Button type='primary' danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col>
                        <h1>Quản Lý & Tạo Đề Thi Tự Động</h1>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }}>
                        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={handleOpenCreateModal}>
                            Tạo Đề Thi Mới
                        </Button>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={exams}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: 'Chưa có đề thi nào được tạo' }}
                />
            </Card>

            {/* MODAL TẠO ĐỀ THI VÀ CẤU TRÚC */}
            <Modal
                title="Sinh Đề Thi Theo Cấu Trúc"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                width={800}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" icon={<ReloadOutlined />} onClick={handleGenerateExam}>
                        Bắt đầu tạo Đề
                    </Button>,
                ]}
                destroyOnClose
            >
                <Form form={form} layout='vertical'>
                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item
                                label='Tên Đề Thi'
                                name='tenDeThi'
                                rules={[{ required: true, message: 'Nhập tên đề thi. VD: Thi Cuối Kỳ Lần 1' }]}
                            >
                                <Input placeholder='Nhập tên mô tả đề thi này...' />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label='Môn Học'
                                name='monHocId'
                                rules={[{ required: true, message: 'Vui lòng chọn môn' }]}
                            >
                                <Select placeholder='Chọn Môn Học'>
                                    {mockSubjects.map((s) => (
                                        <Option key={s.id} value={s.id}>{s.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left">Thiết Tùy chỉnh Cấu trúc Đề (Số câu, độ khó, kiến thức)</Divider>

                    {/* Form List là component của Ant Design dùng cho mảng động (Thêm/Bớt các dòng nhập liệu) */}
                    <Form.List name="cauTruc">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Row key={field.key} gutter={16} style={{ marginBottom: 8, alignItems: 'baseline' }}>
                                        <Col span={8}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'khoiKienThucId']}
                                                rules={[{ required: true, message: 'Chọn khối' }]}
                                            >
                                                <Select placeholder="Chọn Khối Kiến thức">
                                                    {mockKnowledgeBlocks.map(b => (
                                                        <Option key={b.id} value={b.id}>{b.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'mucDoKho']}
                                                rules={[{ required: true, message: 'Chọn mức' }]}
                                            >
                                                <Select placeholder="Độ khó">
                                                    {difficultyLevels.map(lvl => (
                                                        <Option key={lvl} value={lvl}>{lvl}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'soLuong']}
                                                rules={[{ required: true, message: 'Số lượng trống' }]}
                                                labelCol={{ span: 0 }}
                                            >
                                                <InputNumber min={1} max={50} addonAfter="câu" placeholder="SL" style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            {fields.length > 1 ? (
                                                <Button danger onClick={() => remove(field.name)} icon={<DeleteOutlined />} shape="circle" />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm điều kiện cấu trúc
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>

            {/* MODAL XEM CHI TIẾT ĐỀ THI ĐÃ TẠO */}
            <Modal
                title={`Chi Tiết Đề: ${selectedExam?.tenDeThi || ''}`}
                visible={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setViewModalVisible(false)}>
                        Đóng lại
                    </Button>,
                    <Button key="save" type="primary" icon={<SaveOutlined />}>
                        Xuất / Lưu cấu trúc (Ví dụ)
                    </Button>
                ]}
                width={700}
            >
                {selectedExam && (
                    <div>
                        <p><b>Môn học:</b> {mockSubjects.find(s => s.id === selectedExam.monHocId)?.name}</p>
                        <p><b>Tổng số câu:</b> {selectedExam.danhSachCauHoi.length}</p>
                        <Divider />
                        <List
                            itemLayout="horizontal"
                            dataSource={selectedExam.danhSachCauHoi}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<span><b>Câu {index + 1}:</b> {item.noiDung}</span>}
                                        description={
                                            <Space>
                                                <Tag color="cyan">Khối: {mockKnowledgeBlocks.find(k => k.id === item.khoiKienThucId)?.name}</Tag>
                                                <Tag color={
                                                    item.mucDoKho === 'Dễ' ? 'green' :
                                                        item.mucDoKho === 'Khó' ? 'orange' :
                                                            item.mucDoKho === 'Rất khó' ? 'red' : 'blue'
                                                }>
                                                    Độ khó: {item.mucDoKho}
                                                </Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}
