import React, { useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Divider, List, message, Progress, Row, Select, Space, Tag, Typography } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  PlusOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { mockDestinations, mockItinerary } from '@/services/mockData';
import { Destination, Itinerary } from '@/types/travel';

const { Title, Text } = Typography;

const ItineraryPage: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary>(mockItinerary);
  const [selectedDestination, setSelectedDestination] = useState<string>(mockDestinations[0]?.id || '');

  const updateItinerary = (next: Itinerary) => {
    setItinerary(next);
  };

  const addDay = () => {
    const nextDays = [...itinerary.days, { dayNumber: itinerary.days.length + 1, activities: [] }];
    updateItinerary({ ...itinerary, days: nextDays });
    message.success(`Đã thêm ngày ${nextDays.length}`);
  };

  const removeDay = (dayNumber: number) => {
    const nextDays = itinerary.days.filter((d) => d.dayNumber !== dayNumber).map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    updateItinerary({ ...itinerary, days: nextDays });
    message.info(`Đã xóa ngày ${dayNumber}`);
  };

  const addDestinationToDay = (dayNumber: number) => {
    const destination = mockDestinations.find((dest) => dest.id === selectedDestination);
    if (!destination) {
      message.error('Vui lòng chọn một điểm đến hợp lệ.');
      return;
    }
    const nextDays = itinerary.days.map((day) => {
      if (day.dayNumber !== dayNumber) return day;
      return { ...day, activities: [...day.activities, destination] };
    });
    updateItinerary({ ...itinerary, days: nextDays });
    message.success(`Đã thêm ${destination.name} vào ngày ${dayNumber}`);
  };

  const removeDestination = (dayNumber: number, destinationId: string) => {
    const nextDays = itinerary.days.map((day) => {
      if (day.dayNumber !== dayNumber) return day;
      return { ...day, activities: day.activities.filter((a) => a.id !== destinationId) };
    });
    updateItinerary({ ...itinerary, days: nextDays });
  };

  const moveDestination = (dayNumber: number, index: number, amount: number) => {
    const nextDays = itinerary.days.map((day) => {
      if (day.dayNumber !== dayNumber) return day;
      const activities = [...day.activities];
      const targetIndex = index + amount;
      if (targetIndex < 0 || targetIndex >= activities.length) return day;
      const temp = activities[index];
      activities[index] = activities[targetIndex];
      activities[targetIndex] = temp;
      return { ...day, activities };
    });
    updateItinerary({ ...itinerary, days: nextDays });
  };

  const moveDay = (dayNumber: number, amount: number) => {
    const index = itinerary.days.findIndex((d) => d.dayNumber === dayNumber);
    const targetIndex = index + amount;
    if (targetIndex < 0 || targetIndex >= itinerary.days.length) return;
    const nextDays = [...itinerary.days];
    const tmp = nextDays[index];
    nextDays[index] = nextDays[targetIndex];
    nextDays[targetIndex] = tmp;
    const normalized = nextDays.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    updateItinerary({ ...itinerary, days: normalized });
  };

  const stats = useMemo(() => {
    const allActivities = itinerary.days.flatMap((day) => day.activities);
    const totalVisitTime = allActivities.reduce((sum, dest) => sum + dest.visitTime, 0);
    const totalSpent = allActivities.reduce((sum, dest) => sum + dest.price + dest.costs.food + dest.costs.accommodation + dest.costs.transport, 0);
    const totalTravelTime = itinerary.days.reduce((sum, day) => sum + Math.max(0, day.activities.length - 1) * 1.5, 0);
    const totalDays = itinerary.days.length;

    return {
      totalVisitTime,
      totalTravelTime,
      totalDays,
      totalSpent,
      remainingBudget: itinerary.totalBudgetLimit - totalSpent,
      budgetUsage: Math.round((totalSpent / itinerary.totalBudgetLimit) * 100),
    };
  }, [itinerary]);

  return (
    <PageContainer title="Tạo lịch trình du lịch" subTitle="(Person 2: Thêm/xóa/sắp xếp và tính toán tổng quan)">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Kế hoạch chuyến đi">
            <Space wrap direction="vertical" style={{ width: '100%' }}>
              <Row justify="space-between" gutter={[8, 8]}>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />} onClick={addDay}>
                    Thêm ngày
                  </Button>
                </Col>
                <Col>
                  <Text strong>Chọn điểm đến chuẩn bị thêm:</Text>{' '}
                  <Select value={selectedDestination} onChange={(id) => setSelectedDestination(id)} style={{ minWidth: 220 }}>
                    {mockDestinations.map((dest) => (
                      <Select.Option key={dest.id} value={dest.id}>
                        {dest.name} ({dest.type})
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              {itinerary.days.length === 0 && <Text>Không có ngày nào. Bấm "Thêm ngày" để bắt đầu.</Text>}

              {itinerary.days.map((day) => (
                <Card
                  key={day.dayNumber}
                  size="small"
                  title={`Ngày ${day.dayNumber}`}
                  extra={
                    <Space>
                      <Button size="small" icon={<ArrowUpOutlined />} onClick={() => moveDay(day.dayNumber, -1)} disabled={day.dayNumber === 1} />
                      <Button size="small" icon={<ArrowDownOutlined />} onClick={() => moveDay(day.dayNumber, 1)} disabled={day.dayNumber === itinerary.days.length} />
                      <Button danger size="small" icon={<DeleteOutlined />} onClick={() => removeDay(day.dayNumber)}>
                        Xóa ngày
                      </Button>
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space wrap>
                      <Select value={selectedDestination} onChange={(id) => setSelectedDestination(id)} style={{ width: 220 }}>
                        {mockDestinations.map((dest) => (
                          <Select.Option key={dest.id} value={dest.id}>
                            {dest.name}
                          </Select.Option>
                        ))}
                      </Select>
                      <Button type="primary" icon={<PlusOutlined />} onClick={() => addDestinationToDay(day.dayNumber)}>
                        Thêm địa điểm
                      </Button>
                    </Space>

                    <List
                      bordered
                      size="small"
                      locale={{ emptyText: 'Chưa có điểm đến cho ngày này' }}
                      dataSource={day.activities}
                      renderItem={(dest, index) => (
                        <List.Item
                          actions={[
                            <Button key="move-up" size="small" icon={<SwapLeftOutlined />} onClick={() => moveDestination(day.dayNumber, index, -1)} disabled={index === 0} />,
                            <Button key="move-down" size="small" icon={<SwapRightOutlined />} onClick={() => moveDestination(day.dayNumber, index, 1)} disabled={index === day.activities.length - 1} />,
                            <Button key="del" danger size="small" icon={<DeleteOutlined />} onClick={() => removeDestination(day.dayNumber, dest.id)} />,
                          ]}
                        >
                          <List.Item.Meta
                            title={dest.name}
                            description={dest.description}
                          />
                          <Space size="small">
                            <Tag color="blue">Loại: {dest.type}</Tag>
                            <Tag>Giá gốc: {dest.price.toLocaleString()} VND</Tag>
                            <Tag>Visit: {dest.visitTime}h</Tag>
                          </Space>
                        </List.Item>
                      )}
                    />
                    <Text type="secondary">
                      Thời gian di chuyển giả định ngày {day.dayNumber}: {Math.max(0, day.activities.length - 1) * 1.5} giờ
                    </Text>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Tóm tắt ngân sách & thời gian">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={5}>{itinerary.title}</Title>
              <Text>
                Ngân sách giới hạn: <strong>{itinerary.totalBudgetLimit.toLocaleString()} VND</strong>
              </Text>
              <Text>
                Đã dùng: <strong>{stats.totalSpent.toLocaleString()} VND</strong>
              </Text>
              <Text>
                Còn lại: <strong>{stats.remainingBudget.toLocaleString()} VND</strong>
              </Text>
              <Progress percent={Math.min(100, stats.budgetUsage)} status={stats.budgetUsage > 100 ? 'exception' : 'active'} />
              <Text type={stats.budgetUsage > 100 ? 'danger' : 'success'}>
                Sử dụng {stats.budgetUsage}% ngân sách{stats.budgetUsage > 100 ? ' (quá ngân sách)' : ''}
              </Text>
              <Divider />
              <Text>Ngày: {stats.totalDays}</Text>
              <Text>Thời gian tham quan tổng: {stats.totalVisitTime} giờ</Text>
              <Text>Thời gian di chuyển ước tính: {stats.totalTravelTime.toFixed(1)} giờ</Text>
              <Text>
                Thời gian dự kiến tổng: <strong>{(stats.totalVisitTime + stats.totalTravelTime).toFixed(1)} giờ</strong>
              </Text>
            </Space>
          </Card>

          <Card title="Danh sách điểm đến mẫu" style={{ marginTop: 16 }}>
            <List
              size="small"
              dataSource={mockDestinations}
              renderItem={(dest: Destination) => (
                <List.Item>
                  <List.Item.Meta
                    title={dest.name}
                    description={`Loại: ${dest.type}, Rating: ${dest.rating}, SD: ${dest.visitTime}h`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ItineraryPage;
