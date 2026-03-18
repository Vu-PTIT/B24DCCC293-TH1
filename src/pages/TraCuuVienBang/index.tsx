import { Card } from 'antd';

/*
 * Nhiệm vụ Người 4:
 * - Tra cứu văn bằng (Tìm kiếm theo ít nhất 2 tham số).
 * - Xem chi tiết văn bằng và quyết định liên quan.
 * - Thống kê tổng số lượt tra cứu theo quyết định.
 */

const TraCuuVanBang = () => {
    return (
        <Card title="Tra cứu văn bằng">
            <p>Người phụ trách: Người 4</p>
            <div>
                {/* Giao diện tìm kiếm và hiển thị kết quả công khai */}
                <p>Nhiệm vụ: Xây dựng trang tra cứu và logic thống kê lượt xem.</p>
            </div>
        </Card>
    );
};

export default TraCuuVanBang;
