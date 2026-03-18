import { Request, Response } from 'express';

const soVanBang = [
  { id: '1', tenSo: 'Sổ 2023', nam: 2023, soVaoSoHienTai: 100, trangThai: 'dang_su_dung' },
];

const quyetDinh = [
  { id: 'qd1', soQuyetDinh: '123/QD-DH', ngayBanHanh: '2023-01-01', trichYeu: 'Quyết định tốt nghiệp đợt 1', idSoVanBang: '1' },
];

const cauHinhBieuMau = [
  { id: 'f1', tenTruong: 'dan_toc', kieuDuLieu: 'String', label: 'Dân tộc' },
  { id: 'f2', tenTruong: 'diem_tb', kieuDuLieu: 'Number', label: 'Điểm trung bình' },
];

export default {
  'GET /api/quan-ly-van-bang/so-van-bang': (req: Request, res: Response) => {
    res.send({ data: soVanBang });
  },
  'GET /api/quan-ly-van-bang/quyet-dinh': (req: Request, res: Response) => {
    res.send({ data: quyetDinh });
  },
  'GET /api/quan-ly-van-bang/cau-hinh-bieu-mau': (req: Request, res: Response) => {
    res.send({ data: cauHinhBieuMau });
  },
};
