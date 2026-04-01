import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, DatePicker, Space, Button } from 'antd';
import { ArrowUpOutlined, UserOutlined, CalendarOutlined, LineChartOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import { mockBudgetStats, mockDestinations } from '@/services/mockData';

const { RangePicker } = DatePicker;

const StatisticsAdmin: React.FC = () => {
    // Line Chart: Itineraries Created by Month
    const lineChartOptions: any = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: { show: false }
        },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        },
        tooltip: { y: { formatter: (val: number) => `${val} Lịch trình` } },
        title: { text: 'Số lượng lịch trình được tạo theo tháng', align: 'left' }
    };

    const lineChartSeries = [{
        name: 'Lịch trình',
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    }];

    // Bar Chart: Popular Destinations (Based on Ratings/Price)
    const barChartOptions: any = {
        chart: { type: 'bar', height: 350 },
        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
        dataLabels: { enabled: false },
        xaxis: {
            categories: mockDestinations.map(d => d.name),
        },
        title: { text: 'Xếp hạng điểm đến phổ biến', align: 'left' }
    };

    const barChartSeries = [{
        name: 'Lượt tham quan',
        data: [450, 320, 190, 560, 230].slice(0, mockDestinations.length) // Mock values for the bar chart
    }];

    return (
        <PageContainer title="Thống kê hệ thống (Person 4)">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng lượt người dùng"
                            value={5682}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Lịch trình đã tạo"
                            value={1054}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Doanh thu dự kiến"
                            value={158000000}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Phát sinh chi phí"
                            value={12}
                            suffix="%"
                            prefix={<LineChartOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: 24 }} extra={
                <Space>
                    <RangePicker />
                    <Button type="primary">Lọc</Button>
                </Space>
            }>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                        <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={350} />
                    </Col>
                    <Col xs={24} lg={10}>
                         <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
                    </Col>
                </Row>
            </Card>

            <Card title="Thống kê ngân sách tổng quát" style={{ marginTop: 24 }}>
                <Row gutter={[16, 16]}>
                    {mockBudgetStats.map(stat => (
                         <Col key={stat.category} xs={24} sm={6}>
                             <Statistic 
                                title={`Hạng mục: ${stat.category.toUpperCase()}`} 
                                value={stat.spent} 
                                suffix={`/ ${stat.planned}`} 
                                valueStyle={{ fontSize: 16 }}
                            />
                         </Col>
                    ))}
                </Row>
            </Card>
        </PageContainer>
    );
};

export default StatisticsAdmin;
