import { Card } from 'antd';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';

/*
 * Nhiệm vụ Người 1:
 * - Sử dụng Model: QuanLyVanBang.SoVanBang, QuanLyVanBang.QuyetDinh
 * - API: GET /api/quan-ly-van-bang/so-van-bang, GET /api/quan-ly-van-bang/quyet-dinh
 */

const SoVanBangQuyetDinh = () => {
    return (
        <Card title="Quản lý Sổ văn bằng & Quyết định tốt nghiệp">
            <p>Người phụ trách: Người 1</p>
            <div>
                <p>Nhiệm vụ: Thiết kế logic tăng số vào sổ và quản lý QĐ tốt nghiệp.</p>
                <p>Base Model đã sẵn sàng trong: <code>@/services/QuanLyVanBang/typing</code></p>
            </div>
        </Card>
    );
};

export default SoVanBangQuyetDinh;
