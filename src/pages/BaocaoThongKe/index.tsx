import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, Button, message } from 'antd';
import { FileExcelOutlined, TeamOutlined, HourglassOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import { mockMembers, mockClubs } from './mockData';

const BaocaoThongKe = () => {
  // Statistics CALCULATION
  const totalClubs = mockClubs.length;
  const totalMembers = mockMembers.filter(m => m.status === 'Approved').length;
  const pendingCount = mockMembers.filter(m => m.status === 'Pending').length;
  const rejectedCount = mockMembers.filter(m => m.status === 'Rejected').length;

  // Chart data preparation
  const clubNames = mockClubs.map(c => c.name);
  const chartSeries = [
    {
      name: 'Approved',
      data: mockClubs.map(c => mockMembers.filter(m => m.clubId === c.id && m.status === 'Approved').length),
    },
    {
      name: 'Pending',
      data: mockClubs.map(c => mockMembers.filter(m => m.clubId === c.id && m.status === 'Pending').length),
    },
    {
      name: 'Rejected',
      data: mockClubs.map(c => mockMembers.filter(m => m.clubId === c.id && m.status === 'Rejected').length),
    },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: clubNames,
    },
    yaxis: {
      title: { text: 'Số lượng đơn' },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `${val} đơn`,
      },
    },
    colors: ['#52c41a', '#faad14', '#f5222d'], // Green, Gold, Red match statuses
  };

  // EXCEL Export logic
  const handleExportExcel = () => {
    try {
      const approvedMembers = mockMembers.filter(m => m.status === 'Approved');
      
      if (approvedMembers.length === 0) {
        message.warning('Không có thành viên đã duyệt để xuất file');
        return;
      }

      // Format data for Excel
      const excelData = approvedMembers.map(m => ({
        'Họ tên': m.name,
        'Email': m.email,
        'Số điện thoại': m.phone,
        'Giới tính': m.gender,
        'Địa chỉ': m.address,
        'Câu lạc bộ': m.clubName,
        'Trạng thái': m.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Thành viên Approved');

      // Generate filename
      const filename = `Danh_sach_thanh_vien_Approved_${new Date().getTime()}.xlsx`;
      
      // Write and download
      XLSX.writeFile(workbook, filename);
      message.success('Xuất file Excel thành công');
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi xuất file Excel');
    }
  };

  return (
    <PageContainer title="Báo cáo & Thống kê">
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<FileExcelOutlined />} 
          onClick={handleExportExcel}
          style={{ backgroundColor: '#1d7344', borderColor: '#1d7344' }}
        >
          Xuất Danh Sách Thành Viên (Approved)
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Tổng số CLB" 
              value={totalClubs} 
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Đơn đang chờ" 
              value={pendingCount} 
              valueStyle={{ color: '#faad14' }} 
              prefix={<HourglassOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Thành viên đã duyệt" 
              value={totalMembers} 
              valueStyle={{ color: '#52c41a' }} 
              prefix={<CheckCircleOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Đơn đã từ chối" 
              value={rejectedCount} 
              valueStyle={{ color: '#f5222d' }} 
              prefix={<CloseCircleOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Thống kê đơn đăng ký theo từng Câu lạc bộ" bordered={false}>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default BaocaoThongKe;
