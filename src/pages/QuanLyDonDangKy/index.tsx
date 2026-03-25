import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Tag, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const QuanLyDonDangKy = () => {
  return (
    <PageContainer title="Quản lý Đơn đăng ký (Module 2 - Dev 2)">
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<CheckOutlined />}>Duyệt hàng loạt</Button>
            <Button danger icon={<CloseOutlined />}>Từ chối hàng loạt</Button>
          </Space>
        </div>
        <Table
          rowSelection={{ type: 'checkbox' }}
          columns={[
            { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
            { title: 'Câu lạc bộ', dataIndex: 'clubName', key: 'clubName' },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
              key: 'status',
              render: (status: string) => {
                let color = 'gold';
                if (status === 'Approved') color = 'green';
                if (status === 'Rejected') color = 'red';
                return <Tag color={color}>{status}</Tag>;
              },
            },
            { title: 'Ngày đăng ký', dataIndex: 'appliedAt', key: 'appliedAt' },
            {
              title: 'Thao tác',
              key: 'action',
              render: () => (
                <Space size="middle">
                  <a>Chi tiết</a>
                  <a style={{ color: 'green' }}>Duyệt</a>
                  <a style={{ color: 'red' }}>Từ chối</a>
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

export default QuanLyDonDangKy;
