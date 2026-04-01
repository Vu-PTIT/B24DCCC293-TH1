import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { mockBudgetStats, mockDestinations } from '@/services/mockData';
import { BudgetStatistic, Destination } from '@/types/travel';

const StatisticsAdmin: React.FC = () => {
    // Person 4: Sử dụng mockBudgetStats và mockDestinations để tính toán thống kê
    console.log('Mock Data for Person 4 (Statistics):', { mockBudgetStats, mockDestinations });

    return (
        <PageContainer title="Thống kê (Person 4)">
            <div>Nội dung trang Thống kê - Đang phát triển</div>
            <p>Mock data đã được import sẵn. Kiểm tra Console Log để xem cấu trúc dữ liệu.</p>
        </PageContainer>
    );
};

export default StatisticsAdmin;
