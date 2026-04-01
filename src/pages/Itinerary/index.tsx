import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { mockItinerary } from '@/services/mockData';
import { Itinerary } from '@/types/travel';

const ItineraryPage: React.FC = () => {
    // Person 2: Sử dụng mockItinerary để hiển thị lịch trình dự kiến
    console.log('Mock Data for Person 2:', mockItinerary);

    return (
        <PageContainer title="Tạo lịch trình du lịch (Person 2)">
            <div>Nội dung trang Tạo lịch trình du lịch - Đang phát triển</div>
            <p>Mock data đã được import sẵn. Kiểm tra Console Log để xem cấu trúc dữ liệu.</p>
        </PageContainer>
    );
};

export default ItineraryPage;
