import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { mockBudgetStats } from '@/services/mockData';
import { BudgetStatistic } from '@/types/travel';

const Budget: React.FC = () => {
    // Person 3: Sử dụng mockBudgetStats để hiển thị biểu đồ ngân sách
    console.log('Mock Data for Person 3:', mockBudgetStats);

    return (
        <PageContainer title="Quản lý ngân sách (Person 3)">
            <div>Nội dung trang Quản lý ngân sách - Đang phát triển</div>
            <p>Mock data đã được import sẵn. Kiểm tra Console Log để xem cấu trúc dữ liệu.</p>
        </PageContainer>
    );
};

export default Budget;
