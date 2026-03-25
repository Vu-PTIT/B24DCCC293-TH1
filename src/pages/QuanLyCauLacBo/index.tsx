import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Input, Space, Modal, Form, DatePicker, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import moment from 'moment';

interface Club {
  id: string;
  image: string;
  name: string;
  createdAt: string;
  description: string;
  leader: string;
  active: boolean;
}

const QuanLyCauLacBo = () => {
  const [data, setData] = useState<Club[]>([]);
  const [filteredData, setFilteredData] = useState<Club[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Club | null>(null);
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    // Mock data
    const mockData: Club[] = [
      {
        id: '1',
        image: 'https://via.placeholder.com/50',
        name: 'CLB Tin học',
        createdAt: '2020-01-01',
        description: 'CLB về tin học và công nghệ.',
        leader: 'Nguyễn Văn A',
        active: true,
      },
      {
        id: '2',
        image: 'https://via.placeholder.com/50',
        name: 'CLB Văn hóa',
        createdAt: '2019-05-15',
        description: 'CLB văn hóa và nghệ thuật.',
        leader: 'Trần Thị B',
        active: false,
      },
    ];
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.leader.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchText]);

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setDescription('');
    setModalVisible(true);
  };

  const handleEdit = (record: Club) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      createdAt: moment(record.createdAt),
    });
    setDescription(record.description);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    message.success('Xóa câu lạc bộ thành công');
  };

  const handleViewMembers = (clubId: string) => {
    // Navigate to QuanLyThanhVien with filter
    message.info(`Xem danh sách thành viên của CLB ${clubId}`);
  };

  const handleModalOk = () => {
    form.validateFields().then((values: any) => {
      const newRecord: Club = {
        ...values,
        id: editingRecord ? editingRecord.id : Date.now().toString(),
        createdAt: values.createdAt.format('YYYY-MM-DD'),
        description: description,
        image: values.image || 'https://via.placeholder.com/50',
      };
      if (editingRecord) {
        setData(data.map(item => item.id === editingRecord.id ? newRecord : item));
        message.success('Cập nhật câu lạc bộ thành công');
      } else {
        setData([...data, newRecord]);
        message.success('Thêm câu lạc bộ thành công');
      }
      setModalVisible(false);
    });
  };

  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="avatar" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Club, b: Club) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Chủ nhiệm CLB',
      dataIndex: 'leader',
      key: 'leader',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => active ? 'Có' : 'Không',
      filters: [
        { text: 'Có', value: true },
        { text: 'Không', value: false },
      ],
      onFilter: (value: string | number | boolean, record: Club) => record.active === (value as boolean),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Club) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewMembers(record.id)}>
            Xem danh sách thành viên
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Quản lý Câu lạc bộ">
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm câu lạc bộ..."
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Câu lạc bộ
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
        />
      </Card>
      <Modal
        title={editingRecord ? 'Chỉnh sửa Câu lạc bộ' : 'Thêm Câu lạc bộ'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="image" label="Ảnh đại diện">
            <Input placeholder="Nhập URL ảnh" />
          </Form.Item>
          <Form.Item name="name" label="Tên câu lạc bộ" rules={[{ required: true, message: 'Vui lòng nhập tên CLB' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="createdAt" label="Ngày thành lập" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </Form.Item>
          <Form.Item name="leader" label="Chủ nhiệm CLB" rules={[{ required: true, message: 'Vui lòng nhập chủ nhiệm' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="active" label="Hoạt động" valuePropName="checked">
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QuanLyCauLacBo;
