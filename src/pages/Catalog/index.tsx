import { useState } from 'react';
import { Tabs } from 'antd';
import NhanVienManagement from '@/components/NhanVienManagement';
import DichVuManagement from '@/components/DichVuManagement';

export default () => {
  const [activeTab, setActiveTab] = useState('nhanvien');

  return (
    <div style={{ padding: '24px' }}>
      <h1>Danh mục quản lý</h1>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Quản lý Nhân viên" key="nhanvien">
          <NhanVienManagement />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quản lý Dịch vụ" key="dichvu">
          <DichVuManagement />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
