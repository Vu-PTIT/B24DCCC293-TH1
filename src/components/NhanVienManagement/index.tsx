import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useNhanVienModel from '@/models/danhmuc/nhanvien';

const NhanVienManagement = () => {
  const {
    danhSach,
    loading,
    visibleForm,
    setVisibleForm,
    edit,
    setEdit,
    record,
    setRecord,
    getModel,
    postModel,
    putModel,
    deleteModel,
  } = useNhanVienModel();

  const [form] = Form.useForm();

  const ngayTrongTuan = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  useEffect(() => {
    getModel();
  }, []);

  const handleOpenForm = (record?: NhanVien.IRecord) => {
    if (record) {
      form.setFieldsValue(record);
      setEdit(true);
      setRecord(record);
    } else {
      form.resetFields();
      setEdit(false);
      setRecord(undefined);
    }
    setVisibleForm(true);
  };

  const handleSave = async (values: NhanVien.IRecord) => {
    try {
      if (edit && record?._id) {
        await putModel(record._id, values);
      } else {
        await postModel(values);
      }
      setVisibleForm(false);
      form.resetFields();
    } catch (error) {
      message.error('Lỗi khi lưu dữ liệu');
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteModel(id);
        } catch (error) {
          message.error('Lỗi khi xóa dữ liệu');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Giờ làm việc',
      key: 'gioLamViec',
      render: (_: any, record: NhanVien.IRecord) => (
        <span>{record.gioBatDau} - {record.gioKetThuc}</span>
      ),
    },
    {
      title: 'Khách tối đa/ngày',
      dataIndex: 'khachToidaMotNgay',
      key: 'khachToidaMotNgay',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: NhanVien.IRecord) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenForm(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id!)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenForm()}
        >
          Thêm nhân viên
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={danhSach}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={edit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
        visible={visibleForm}
        onCancel={() => setVisibleForm(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            label="Tên nhân viên"
            name="ten"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Điện thoại"
            name="sdt"
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Giờ bắt đầu"
            name="gioBatDau"
          >
            <Input placeholder="VD: 09:00" />
          </Form.Item>

          <Form.Item
            label="Giờ kết thúc"
            name="gioKetThuc"
          >
            <Input placeholder="VD: 17:00" />
          </Form.Item>

          <Form.Item
            label="Ngày làm việc"
            name="ngayLamViec"
          >
            <Select
              mode="multiple"
              placeholder="Chọn ngày làm việc"
              options={ngayTrongTuan.map((day) => ({ label: day, value: day }))}
            />
          </Form.Item>

          <Form.Item
            label="Khách tối đa một ngày"
            name="khachToidaMotNgay"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber min={1} placeholder="Nhập số lượng khách tối đa" />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="trangThai"
            initialValue="active"
          >
            <Select
              options={[
                { label: 'Hoạt động', value: 'active' },
                { label: 'Tạm dừng', value: 'inactive' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="ghiChu"
          >
            <Input.TextArea placeholder="Nhập ghi chú" rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {edit ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NhanVienManagement;
