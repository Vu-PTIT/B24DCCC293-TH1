import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useDichVuModel from '@/models/danhmuc/dichvu';

const DichVuManagement = () => {
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
  } = useDichVuModel();

  const [form] = Form.useForm();

  useEffect(() => {
    getModel();
  }, []);

  const handleOpenForm = (record?: DichVu.IRecord) => {
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

  const handleSave = async (values: DichVu.IRecord) => {
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
      content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
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
      title: 'Tên dịch vụ',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
      render: (gia: number) => `${gia.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Giá khuyến mại',
      dataIndex: 'giaKhuyenMai',
      key: 'giaKhuyenMai',
      render: (gia?: number) => gia ? `${gia.toLocaleString('vi-VN')} ₫` : '-',
    },
    {
      title: 'Thời gian thực hiện',
      dataIndex: 'thoiGianThucHien',
      key: 'thoiGianThucHien',
      render: (time: number) => `${time} phút`,
    },
    {
      title: 'Hạn mức',
      dataIndex: 'hanMuc',
      key: 'hanMuc',
      render: (hanMuc?: number) => hanMuc ?? '-',
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
      render: (_: any, record: DichVu.IRecord) => (
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
          Thêm dịch vụ
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
        title={edit ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}
        visible={visibleForm}
        onCancel={() => setVisibleForm(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            label="Tên dịch vụ"
            name="ten"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
          >
            <Input placeholder="Nhập tên dịch vụ" />
          </Form.Item>

          <Form.Item
            label="Giá (₫)"
            name="gia"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber min={0} placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item
            label="Giá khuyến mại (₫)"
            name="giaKhuyenMai"
          >
            <InputNumber min={0} placeholder="Nhập giá khuyến mại (tùy chọn)" />
          </Form.Item>

          <Form.Item
            label="Thời gian thực hiện (phút)"
            name="thoiGianThucHien"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
          >
            <InputNumber min={1} placeholder="Nhập thời gian (phút)" />
          </Form.Item>

          <Form.Item
            label="Hạn mức"
            name="hanMuc"
          >
            <InputNumber min={0} placeholder="Nhập hạn mức (tùy chọn)" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="danh_muc"
          >
            <Input placeholder="Nhập danh mục" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="moTa"
          >
            <Input.TextArea placeholder="Nhập mô tả dịch vụ" rows={3} />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
          >
            <Input placeholder="Nhập URL hình ảnh hoặc upload" />
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

export default DichVuManagement;
