import { Card } from 'antd';

/*
 * Nhiệm vụ Người 3:
 * - Quản lý Thông tin văn bằng (Số hiệu, Số vào sổ, MSV, Họ tên...).
 * - Hiển thị và nhập liệu các trường động đã cấu hình ở Người 2.
 */

const ThongTinVanBang = () => {
    return (
        <Card title="Quản lý Thông tin văn bằng">
            <p>Người phụ trách: Người 3</p>
            <div>
                {/* Giao diện nhập liệu và danh sách văn bằng sinh viên */}
                <p>Nhiệm vụ: Render form nhập liệu dựa trên cấu hình biểu mẫu.</p>
            </div>
        </Card>
    );
};

export default ThongTinVanBang;
