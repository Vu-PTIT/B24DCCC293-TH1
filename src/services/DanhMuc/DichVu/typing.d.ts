declare namespace DichVu {
  interface IRecord {
    _id?: string;
    id?: string;
    ten: string;
    gia: number;
    giaKhuyenMai?: number;
    thoiGianThucHien: number; // in minutes
    moTa?: string;
    hinhAnh?: string;
    danh_muc?: string;
    hanMuc?: number;
    isActive?: boolean;
    trangThai?: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
  }
}
