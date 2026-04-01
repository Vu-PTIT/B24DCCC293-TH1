import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { mockDestinations } from '@/services/mockData';
import { Destination } from '@/types/travel';

const DestinationsActive: React.FC = () => {
    // Person 4: Sử dụng mockDestinations để quản lý danh sách địa điểm (CRUD)
    console.log('Mock Data for Person 4 (Destinations):', mockDestinations);

    return (
        <PageContainer title="Quản lý điểm đến (Person 4)">
            <div>Nội dung trang Quản lý điểm đến - Đang phát triển</div>
            <p>Mock data đã được import sẵn. Kiểm tra Console Log để xem cấu trúc dữ liệu.</p>
        </PageContainer>
    );
};

export default DestinationsActive;
