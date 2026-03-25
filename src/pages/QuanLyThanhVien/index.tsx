import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Space } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

const QuanLyThanhVien = () => {
  return (
    <PageContainer title="Quản lý Thành viên (Module 3 - Dev 3)">
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
          <Select
            placeholder="Lọc theo Câu lạc bộ"
            style={{ width: 200 }}
            options={[]}
          />
          <Button icon={<SwapOutlined />}>Chuyển CLB hàng loạt</Button>
        </div>
        <Table
          rowSelection={{ type: 'checkbox' }}
          columns={[
            { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
            { title: 'Câu lạc bộ hiện tại', dataIndex: 'clubName', key: 'clubName' },
            { title: 'Ngày tham gia', dataIndex: 'joinedAt', key: 'joinedAt' },
            { title: 'Vai trò', dataIndex: 'role', key: 'role' },
            {
              title: 'Thao tác',
              key: 'action',
              render: () => (
                <Space size="middle">
                  <a>Chi tiết</a>
                  <a style={{ color: 'blue' }}>Chuyển CLB</a>
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

export default QuanLyThanhVien;
