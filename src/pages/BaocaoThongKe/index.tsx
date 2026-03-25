import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';

const BaocaoThongKe = () => {
  return (
    <PageContainer title="Báo cáo & Thống kê (Module 4 - Dev 4)">
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" icon={<FileExcelOutlined />}>Xuất Excel</Button>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card><Statistic title="Tổng số CLB" value={0} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Đơn đang chờ" value={0} valueStyle={{ color: '#cf1322' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Tổng thành viên" value={0} valueStyle={{ color: '#3f8600' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Đơn đã từ chối" value={0} /></Card>
        </Col>
      </Row>
      <Card title="Biểu đồ thống kê" style={{ marginTop: 16 }}>
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
          Biểu đồ (Cần tích hợp Recharts/Chart.js)
        </div>
      </Card>
    </PageContainer>
  );
};

export default BaocaoThongKe;
