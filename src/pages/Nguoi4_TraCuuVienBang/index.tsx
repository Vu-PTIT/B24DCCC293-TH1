import { Card, Form, Input, Button, DatePicker, Table, Modal, message, Descriptions, Space } from 'antd';
import { useState, useEffect } from 'react';
import { QuanLyVanBangAPI } from '@/services/QuanLyVanBang';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import moment from 'moment';
import { useModel } from 'umi';

const TraCuuVienBang = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<QuanLyVanBang.VanBang[]>([]);
    const [detailVisible, setDetailVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<QuanLyVanBang.VanBang | null>(null);
    const [quyetDinhs, setQuyetDinhs] = useState<QuanLyVanBang.QuyetDinh[]>([]);
    const { danhSach: danhSachCauHinh, getModel: getCauHinh } = useModel('quanlyvanbang.cauhinhbieumau' as any);

    useEffect(() => {
        getCauHinh();
        QuanLyVanBangAPI.getQuyetDinh().then(res => {
            setQuyetDinhs(res.data.data || []);
        });
    }, []);

    const onSearch = async (values: any) => {
        // Kiểm tra ít nhất 2 tham số
        const filledFields = Object.keys(values).filter(key => {
            const val = values[key];
            if (val instanceof moment) return true;
            return val !== undefined && val !== '';
        });

        if (filledFields.length < 2) {
            message.warning('Vui lòng nhập ít nhất 2 tham số tìm kiếm!');
            return;
        }

        setLoading(true);
        try {
            const params = {
                ...values,
                ngaySinh: values.ngaySinh ? values.ngaySinh.format('YYYY-MM-DD') : undefined,
            };
            const res = await QuanLyVanBangAPI.searchVanBang(params);
            setResults(res.data.data || []);
        } catch (error) {
            message.error('Lỗi khi tìm kiếm!');
        } finally {
            setLoading(false);
        }
    };

    const viewDetail = (record: QuanLyVanBang.VanBang) => {
        setCurrentRecord(record);
        setDetailVisible(true);
        // Ghi nhận lượt tra cứu
        if (record.idQuyetDinh) {
            QuanLyVanBangAPI.recordTraCuu(record.idQuyetDinh);
        }
    };

    const columns = [
        { title: 'Số hiệu văn bằng', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
        { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
        { title: 'Mã SV', dataIndex: 'maSinhVien', key: 'maSinhVien' },
        { title: 'Họ và tên', dataIndex: 'hoTen', key: 'hoTen' },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            render: (text: string) => text ? moment(text).format('DD/MM/YYYY') : '--'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: QuanLyVanBang.VanBang) => (
                <Button type="link" onClick={() => viewDetail(record)}>Xem chi tiết</Button>
            ),
        },
    ];

    const renderDetail = () => {
        if (!currentRecord) return null;
        const qd = quyetDinhs.find(q => q.id === currentRecord.idQuyetDinh);

        return (
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Descriptions title="Thông tin văn bằng" bordered column={2}>
                    <Descriptions.Item label="Họ và tên">{currentRecord.hoTen}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">{moment(currentRecord.ngaySinh).format('DD/MM/YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Mã sinh viên">{currentRecord.maSinhVien}</Descriptions.Item>
                    <Descriptions.Item label="Số hiệu văn bằng">{currentRecord.soHieuVanBang}</Descriptions.Item>
                    <Descriptions.Item label="Số vào sổ">{currentRecord.soVaoSo}</Descriptions.Item>
                    {danhSachCauHinh.map((field: QuanLyVanBang.TruongDuLieu) => (
                        <Descriptions.Item key={field.id} label={field.label}>
                            {field.kieuDuLieu === 'Date' && currentRecord.duLieuBoSung?.[field.tenTruong]
                                ? moment(currentRecord.duLieuBoSung[field.tenTruong]).format('DD/MM/YYYY')
                                : currentRecord.duLieuBoSung?.[field.tenTruong] || '--'}
                        </Descriptions.Item>
                    ))}
                </Descriptions>

                {qd && (
                    <Descriptions title="Quyết định tốt nghiệp" bordered column={1}>
                        <Descriptions.Item label="Số quyết định">{qd.soQuyetDinh}</Descriptions.Item>
                        <Descriptions.Item label="Ngày ban hành">{moment(qd.ngayBanHanh).format('DD/MM/YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="Trích yếu">{qd.trichYeu}</Descriptions.Item>
                    </Descriptions>
                )}
            </Space>
        );
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Card title="Tra cứu văn bằng">
                <Form form={form} layout="vertical" onFinish={onSearch}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        <Form.Item name="soHieuVanBang" label="Số hiệu văn bằng">
                            <Input placeholder="Nhập số hiệu" />
                        </Form.Item>
                        <Form.Item name="soVaoSo" label="Số vào sổ">
                            <Input placeholder="Nhập số vào sổ" />
                        </Form.Item>
                        <Form.Item name="maSinhVien" label="Mã sinh viên">
                            <Input placeholder="Nhập mã sinh viên" />
                        </Form.Item>
                        <Form.Item name="hoTen" label="Họ và tên">
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                        <Form.Item name="ngaySinh" label="Ngày sinh">
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Tìm kiếm
                        </Button>
                        <Button onClick={() => form.resetFields()} style={{ marginLeft: '10px' }}>
                            Làm mới
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title="Kết quả tìm kiếm">
                <Table
                    columns={columns}
                    dataSource={results}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Chi tiết văn bằng"
                visible={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={800}
            >
                {renderDetail()}
            </Modal>
        </Space>
    );
};

export default TraCuuVienBang;
