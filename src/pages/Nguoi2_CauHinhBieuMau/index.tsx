import { Card } from 'antd';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';

/*
 * Nhiệm vụ Người 2:
 * - Sử dụng Model: QuanLyVanBang.TruongDuLieu (Cấu hình biểu mẫu)
 * - API: GET /api/quan-ly-van-bang/cau-hinh-bieu-mau
 */

const CauHinhBieuMau = () => {
    return (
        <Card title="Cấu hình biểu mẫu phụ lục văn bằng">
            <p>Người phụ trách: Người 2</p>
            <div>
                <p>Nhiệm vụ: Xây dựng trình quản lý các trường thông tin động.</p>
                <p>Base Model đã sẵn sàng trong: <code>@/services/QuanLyVanBang/typing</code></p>
            </div>
        </Card>
    );
};

export default CauHinhBieuMau;
