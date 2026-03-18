import { Card } from 'antd';

/*
 * Nhiệm vụ Người 2:
 * - Cấu hình biểu mẫu phụ lục văn bằng (String, Number, Date).
 * - Hệ thống cho phép thêm, sửa, xóa các trường thông tin.
 */

const CauHinhBieuMau = () => {
    return (
        <Card title="Cấu hình biểu mẫu phụ lục văn bằng">
            <p>Người phụ trách: Người 2</p>
            <div>
                {/* Giao diện cấu hình các trường động (Dân tộc, Nơi sinh, GPA...) */}
                <p>Nhiệm vụ: Xây dựng trình quản lý các trường thông tin động.</p>
            </div>
        </Card>
    );
};

export default CauHinhBieuMau;
