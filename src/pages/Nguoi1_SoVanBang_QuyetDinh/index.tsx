import { Card, Tabs, Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import { QuanLyVanBangAPI } from '@/services/QuanLyVanBang';

const { TabPane } = Tabs;
const { Option } = Select;

/*
 * Nhiệm vụ Người 1:
 * - Sử dụng Model: QuanLyVanBang.SoVanBang, QuanLyVanBang.QuyetDinh
 * - API: GET /api/quan-ly-van-bang/so-van-bang, GET /api/quan-ly-van-bang/quyet-dinh
 */

const SoVanBangQuyetDinh = () => {
    const [soVanBang, setSoVanBang] = useState<QuanLyVanBang.SoVanBang[]>([]);
    const [quyetDinh, setQuyetDinh] = useState<QuanLyVanBang.QuyetDinh[]>([]);
    const [loading, setLoading] = useState(false);
    const [soModalVisible, setSoModalVisible] = useState(false);
    const [qdModalVisible, setQdModalVisible] = useState(false);
    const [soForm] = Form.useForm();
    const [qdForm] = Form.useForm();

    const loadData = async () => {
        setLoading(true);
        try {
            // Load from localStorage first, then API
            const localSo = localStorage.getItem('soVanBang');
            const localQd = localStorage.getItem('quyetDinh');
            if (localSo) setSoVanBang(JSON.parse(localSo) as QuanLyVanBang.SoVanBang[]);
            if (localQd) setQuyetDinh(JSON.parse(localQd) as QuanLyVanBang.QuyetDinh[]);

            // Try API
            const soRes = await QuanLyVanBangAPI.getSoVanBang();
            const qdRes = await QuanLyVanBangAPI.getQuyetDinh();
            const soData = soRes.data.data || [];
            const qdData = qdRes.data.data || [];
            setSoVanBang(soData);
            setQuyetDinh(qdData);
            localStorage.setItem('soVanBang', JSON.stringify(soData));
            localStorage.setItem('quyetDinh', JSON.stringify(qdData));
        } catch (error) {
            // If API fails, use localStorage or mock data
            if (!localStorage.getItem('soVanBang')) {
                const mockSo: QuanLyVanBang.SoVanBang[] = [{ id: '1', tenSo: 'Sổ 2023', nam: 2023, soVaoSoHienTai: 100, trangThai: 'dang_su_dung' }];
                setSoVanBang(mockSo);
                localStorage.setItem('soVanBang', JSON.stringify(mockSo));
            }
            if (!localStorage.getItem('quyetDinh')) {
                const mockQd: QuanLyVanBang.QuyetDinh[] = [{ id: 'qd1', soQuyetDinh: '123/QD-DH', ngayBanHanh: '2023-01-01', trichYeu: 'Quyết định tốt nghiệp đợt 1', idSoVanBang: '1' }];
                setQuyetDinh(mockQd);
                localStorage.setItem('quyetDinh', JSON.stringify(mockQd));
            }
            message.error('Lỗi khi tải dữ liệu từ API, sử dụng dữ liệu local!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddSo = async (values: any) => {
        const currentYear = new Date().getFullYear();
        const existing = soVanBang.find(s => s.nam === currentYear);
        if (existing) {
            message.error('Sổ văn bằng cho năm này đã tồn tại!');
            return;
        }
        const newSo: QuanLyVanBang.SoVanBang = {
            id: `so_${Date.now()}`,
            tenSo: values.tenSo,
            nam: currentYear,
            soVaoSoHienTai: 1,
            trangThai: 'dang_su_dung',
        };
        const updatedSo = [...soVanBang, newSo];
        setSoVanBang(updatedSo);
        localStorage.setItem('soVanBang', JSON.stringify(updatedSo));
        setSoModalVisible(false);
        soForm.resetFields();
        message.success('Thêm sổ văn bằng thành công!');
    };

    const handleAddQd = async (values: any) => {
        const newQd: QuanLyVanBang.QuyetDinh = {
            id: `qd_${Date.now()}`,
            soQuyetDinh: values.soQuyetDinh,
            ngayBanHanh: values.ngayBanHanh.format('YYYY-MM-DD'),
            trichYeu: values.trichYeu,
            idSoVanBang: values.idSoVanBang,
        };
        const updatedQd = [...quyetDinh, newQd];
        setQuyetDinh(updatedQd);
        localStorage.setItem('quyetDinh', JSON.stringify(updatedQd));
        setQdModalVisible(false);
        qdForm.resetFields();
        message.success('Thêm quyết định thành công!');
    };

    const soVanBangColumns = [
        { title: 'Tên sổ', dataIndex: 'tenSo', key: 'tenSo' },
        { title: 'Năm', dataIndex: 'nam', key: 'nam' },
        { title: 'Số vào sổ hiện tại', dataIndex: 'soVaoSoHienTai', key: 'soVaoSoHienTai' },
        { title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai', render: (text: string) => text === 'dang_su_dung' ? 'Đang sử dụng' : 'Đã khóa' },
    ];

    const quyetDinhColumns = [
        { title: 'Số quyết định', dataIndex: 'soQuyetDinh', key: 'soQuyetDinh' },
        { title: 'Ngày ban hành', dataIndex: 'ngayBanHanh', key: 'ngayBanHanh' },
        { title: 'Trích yếu', dataIndex: 'trichYeu', key: 'trichYeu' },
        { title: 'Sổ văn bằng', dataIndex: 'idSoVanBang', key: 'idSoVanBang', render: (id: string) => {
            const so = soVanBang.find(s => s.id === id);
            return so ? so.tenSo : id;
        }},
    ];

    return (
        <>
            <Card title="Quản lý Sổ văn bằng & Quyết định tốt nghiệp">
                <p>Người phụ trách: Người 1</p>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Sổ văn bằng" key="1">
                        <Button type="primary" onClick={() => setSoModalVisible(true)} style={{ marginBottom: 16 }}>
                            Thêm sổ mới
                        </Button>
                        <Table
                            columns={soVanBangColumns}
                            dataSource={soVanBang}
                            rowKey="id"
                            loading={loading}
                        />
                    </TabPane>
                    <TabPane tab="Quyết định tốt nghiệp" key="2">
                        <Button type="primary" onClick={() => setQdModalVisible(true)} style={{ marginBottom: 16 }}>
                            Thêm quyết định mới
                        </Button>
                        <Table
                            columns={quyetDinhColumns}
                            dataSource={quyetDinh}
                            rowKey="id"
                            loading={loading}
                        />
                    </TabPane>
                </Tabs>
            </Card>
            <Modal
                title="Thêm sổ văn bằng mới"
                visible={soModalVisible}
                onCancel={() => setSoModalVisible(false)}
                footer={null}
            >
                <Form form={soForm} onFinish={handleAddSo} layout="vertical">
                    <Form.Item name="tenSo" label="Tên sổ" rules={[{ required: true, message: 'Vui lòng nhập tên sổ!' }]}>
                        <Input placeholder="Ví dụ: Sổ văn bằng 2024" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Thêm quyết định tốt nghiệp"
                visible={qdModalVisible}
                onCancel={() => setQdModalVisible(false)}
                footer={null}
            >
                <Form form={qdForm} onFinish={handleAddQd} layout="vertical">
                    <Form.Item name="soQuyetDinh" label="Số quyết định" rules={[{ required: true, message: 'Vui lòng nhập số quyết định!' }]}>
                        <Input placeholder="Ví dụ: 123/QD-DH" />
                    </Form.Item>
                    <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={[{ required: true, message: 'Vui lòng chọn ngày ban hành!' }]}>
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item name="trichYeu" label="Trích yếu" rules={[{ required: true, message: 'Vui lòng nhập trích yếu!' }]}>
                        <Input.TextArea placeholder="Mô tả quyết định" />
                    </Form.Item>
                    <Form.Item name="idSoVanBang" label="Sổ văn bằng" rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng!' }]}>
                        <Select placeholder="Chọn sổ văn bằng">
                            {soVanBang.filter(s => s.trangThai === 'dang_su_dung').map(so => (
                                <Option key={so.id} value={so.id}>{so.tenSo}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SoVanBangQuyetDinh;
