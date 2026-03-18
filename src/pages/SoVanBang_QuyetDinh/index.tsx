import { Card } from 'antd';

/*
 * Nhiệm vụ Người 1:
 * - Quản lý Sổ văn bằng (mỗi năm 1 sổ, tự động tăng số, reset theo năm).
 * - Quản lý Quyết định tốt nghiệp (Số QĐ, ngày ban hành, trích yếu, liên kết sổ).
 */

const SoVanBangQuyetDinh = () => {
    return (
        <Card title="Quản lý Sổ văn bằng & Quyết định tốt nghiệp">
            <p>Người phụ trách: Người 1</p>
            <div>
                {/* Nội dung quản lý sổ và quyết định sẽ được phát triển ở đây */}
                <p>Nhiệm vụ: Thiết kế logic tăng số vào sổ và quản lý QĐ tốt nghiệp.</p>
            </div>
        </Card>
    );
};

export default SoVanBangQuyetDinh;
