export namespace QuanLyVanBang {
  export interface SoVanBang {
    id: string;
    tenSo: string;
    nam: number;
    soVaoSoHienTai: number;
    trangThai: 'dang_su_dung' | 'da_khoa';
  }

  export interface QuyetDinh {
    id: string;
    soQuyetDinh: string;
    ngayBanHanh: string;
    trichYeu: string;
    idSoVanBang: string; // Liên kết với sổ văn bằng
  }

  export interface TruongDuLieu {
    id: string;
    tenTruong: string;
    kieuDuLieu: 'String' | 'Number' | 'Date';
    label: string;
  }

  export interface VanBang {
    id: string;
    soVaoSo: number; // Tự động tăng
    soHieuVanBang: string;
    maSinhVien: string;
    hoTen: string;
    ngaySinh: string;
    idQuyetDinh: string;
    duLieuBoSung: Record<string, any>; // Lưu các trường động từ CauHinhBieuMau
  }

  export interface ThongKeTraCuu {
    idQuyetDinh: string;
    tongLuotTraCuu: number;
  }
}
