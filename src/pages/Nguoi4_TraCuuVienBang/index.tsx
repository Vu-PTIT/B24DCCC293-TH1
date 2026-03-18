import { Card } from 'antd';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';

/*
 * Nhiệm vụ Người 4:
 * - Sử dụng Model: QuanLyVanBang.VanBang, QuanLyVanBang.QuyetDinh, QuanLyVanBang.ThongKeTraCuu
 * - Xây dựng trang tra cứu và thống kê.
 */

const TraCuuVanBang = () => {
    return (
        <Card title="Tra cứu văn bằng">
            <p>Người phụ trách: Người 4</p>
            <div>
                <p>Nhiệm vụ: Xây dựng trang tra cứu và logic thống kê lượt xem.</p>
                <p>Base Model đã sẵn sàng trong: <code>@/services/QuanLyVanBang/typing</code></p>
            </div>
        </Card>
    );
};

export default TraCuuVanBang;
