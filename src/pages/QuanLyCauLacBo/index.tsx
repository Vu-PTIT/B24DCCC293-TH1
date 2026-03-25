import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const QuanLyCauLacBo = () => {
  return (
    <PageContainer title="Quản lý Câu lạc bộ (Module 1 - Dev 1)">
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm câu lạc bộ..."
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm Câu lạc bộ
          </Button>
        </div>
        <Table
          columns={[
            { title: 'Ảnh', dataIndex: 'image', key: 'image' },
            { title: 'Tên CLB', dataIndex: 'name', key: 'name', sorter: true },
            { title: 'Ngày thành lập', dataIndex: 'createdAt', key: 'createdAt', sorter: true },
            { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
            {
              title: 'Thao tác',
              key: 'action',
              render: () => (
                <Space size="middle">
                  <a>Chỉnh sửa</a>
                  <a>Xóa</a>
                  <a style={{ color: 'green' }}>Xem danh sách thành viên</a>
                </Space>
              ),
            },
          ]}
          dataSource={[]}
        />
      </Card>
    </PageContainer>
  );
};

export default QuanLyCauLacBo;
