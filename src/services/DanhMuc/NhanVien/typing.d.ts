declare namespace NhanVien {
  interface IRecord {
    _id?: string;
    id?: string;
    ten: string;
    email?: string;
    sdt?: string;
    gioBatDau?: string;
    gioKetThuc?: string;
    ngayLamViec?: string[];
    khachToidaMotNgay?: number;
    ghiChu?: string;
    isActive?: boolean;
    trangThai?: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
  }
}
