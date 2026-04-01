import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, Alert, Progress, Typography, List } from 'antd';
import { WarningOutlined, DollarOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import { mockBudgetStats } from '@/services/mockData';

const { Text } = Typography;

const Budget: React.FC = () => {
    // ApexCharts data
    const chartOptions: any = {
        chart: {
            type: 'donut',
        },
        labels: mockBudgetStats.map(s => s.category.toUpperCase()),
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chartSeries = mockBudgetStats.map(s => s.spent);

    const totalPlanned = mockBudgetStats.reduce((acc, curr) => acc + curr.planned, 0);
    const totalSpent = mockBudgetStats.reduce((acc, curr) => acc + curr.spent, 0);
    const overBudget = mockBudgetStats.filter(s => s.spent > s.planned);

    return (
        <PageContainer title="Quản lý ngân sách (Person 3)">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Tổng ngân sách dự kiến"
                            value={totalPlanned}
                            precision={0}
                            prefix={<DollarOutlined />}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Tổng đã chi"
                            value={totalSpent}
                            precision={0}
                            valueStyle={{ color: totalSpent > totalPlanned ? '#cf1322' : '#3f8600' }}
                            prefix={totalSpent > totalPlanned ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Ngân sách còn lại"
                            value={totalPlanned - totalSpent}
                            precision={0}
                            valueStyle={{ color: (totalPlanned - totalSpent) < 0 ? '#cf1322' : '#1890ff' }}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
            </Row>

            {overBudget.length > 0 && (
                <Card style={{ marginTop: 16 }}>
                    <Alert
                        message="Cảnh báo ngân sách"
                        description={`Bạn đã chi vượt mức ở các hạng mục: ${overBudget.map(s => s.category).join(', ')}.`}
                        type="error"
                        showIcon
                        icon={<WarningOutlined />}
                    />
                </Card>
            )}

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={12}>
                    <Card title="Phân bổ chi tiêu thực tế">
                        <div id="chart">
                            <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={350} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Chi tiết hạng mục (Spent vs Planned)">
                        <List
                            dataSource={mockBudgetStats}
                            renderItem={item => (
                                <List.Item>
                                    <div style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <Text strong>{item.category.toUpperCase()}</Text>
                                            <Text type="secondary">{item.spent.toLocaleString()} / {item.planned.toLocaleString()} VNĐ</Text>
                                        </div>
                                        <Progress 
                                            percent={Math.round((item.spent / item.planned) * 100)} 
                                            status={item.spent > item.planned ? 'exception' : 'active'} 
                                            strokeColor={item.spent > item.planned ? '#ff4d4f' : '#52c41a'}
                                        />
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Budget;
