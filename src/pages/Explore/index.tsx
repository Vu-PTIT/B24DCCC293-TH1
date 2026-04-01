import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { mockDestinations } from '@/services/mockData';
import { Destination } from '@/types/travel';

const Explore: React.FC = () => {
  // Person 1: Sử dụng mockDestinations để hiển thị danh sách địa điểm
  console.log('Mock Data for Person 1:', mockDestinations);

  return (
    <PageContainer title="Khám phá điểm đến (Person 1)">
      <div>Nội dung trang Khám phá điểm đến - Đang phát triển</div>
      <p>Mock data đã được import sẵn. Kiểm tra Console Log để xem cấu trúc dữ liệu.</p>
    </PageContainer>
  );
};

export default Explore;
