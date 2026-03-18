import { Card } from 'antd';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';

/*
 * Nhiệm vụ Người 3:
 * - Sử dụng Model: QuanLyVanBang.VanBang, QuanLyVanBang.TruongDuLieu
 * - Tích hợp các trường động từ cấu hình biểu mẫu của Người 2.
 */

const ThongTinVanBang = () => {
    return (
        <Card title="Quản lý Thông tin văn bằng">
            <p>Người phụ trách: Người 3</p>
            <div>
                <p>Nhiệm vụ: Render form nhập liệu dựa trên cấu hình biểu mẫu.</p>
                <p>Base Model đã sẵn sàng trong: <code>@/services/QuanLyVanBang/typing</code></p>
            </div>
        </Card>
    );
};

export default ThongTinVanBang;
