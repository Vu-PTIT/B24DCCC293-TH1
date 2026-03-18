import { Request, Response } from 'express';

const soVanBang = [{ id: '1', tenSo: 'Sổ 2023', nam: 2023, soVaoSoHienTai: 100, trangThai: 'dang_su_dung' }];

const quyetDinh = [
	{
		id: 'qd1',
		soQuyetDinh: '123/QD-DH',
		ngayBanHanh: '2023-01-01',
		trichYeu: 'Quyết định tốt nghiệp đợt 1',
		idSoVanBang: '1',
	},
];

let cauHinhBieuMau = [
	{
		_id: 'f1',
		id: 'f1',
		tenTruong: 'dan_toc',
		kieuDuLieu: 'String',
		label: 'Dân tộc',
		createdAt: '2025-01-01T08:00:00.000Z',
		updatedAt: '2025-01-01T08:00:00.000Z',
	},
	{
		_id: 'f2',
		id: 'f2',
		tenTruong: 'diem_tb',
		kieuDuLieu: 'Number',
		label: 'Điểm trung bình',
		createdAt: '2025-01-01T08:00:00.000Z',
		updatedAt: '2025-01-01T08:00:00.000Z',
	},
];

const toNumber = (value: any, defaultValue: number) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : defaultValue;
};

const getPagedData = (req: Request) => {
	const page = Math.max(1, toNumber(req.query.page, 1));
	const limit = Math.max(1, toNumber(req.query.limit, 10));
	const start = (page - 1) * limit;
	const end = start + limit;

	return {
		result: cauHinhBieuMau.slice(start, end),
		total: cauHinhBieuMau.length,
	};
};

const createId = () => `f${Date.now()}`;

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
	'GET /api/quan-ly-van-bang/cau-hinh-bieu-mau/page': (req: Request, res: Response) => {
		res.send({ data: getPagedData(req) });
	},
	'GET /api/quan-ly-van-bang/cau-hinh-bieu-mau/many': (req: Request, res: Response) => {
		res.send({ data: cauHinhBieuMau });
	},
	'GET /api/quan-ly-van-bang/cau-hinh-bieu-mau/:id': (req: Request, res: Response) => {
		const rec = cauHinhBieuMau.find((item) => item._id === req.params.id);
		res.send({ data: rec ?? null });
	},
	'POST /api/quan-ly-van-bang/cau-hinh-bieu-mau': (req: Request, res: Response) => {
		const now = new Date().toISOString();
		const _id = createId();
		const payload = {
			_id,
			id: _id,
			tenTruong: req.body?.tenTruong,
			kieuDuLieu: req.body?.kieuDuLieu,
			label: req.body?.label,
			createdAt: now,
			updatedAt: now,
		};

		cauHinhBieuMau = [payload, ...cauHinhBieuMau];
		res.send({ data: payload });
	},
	'PUT /api/quan-ly-van-bang/cau-hinh-bieu-mau/:id': (req: Request, res: Response) => {
		const now = new Date().toISOString();
		let updated: any = null;

		cauHinhBieuMau = cauHinhBieuMau.map((item) => {
			if (item._id !== req.params.id) return item;
			updated = {
				...item,
				...req.body,
				updatedAt: now,
			};
			return updated;
		});

		res.send({ data: updated });
	},
	'DELETE /api/quan-ly-van-bang/cau-hinh-bieu-mau/:id': (req: Request, res: Response) => {
		cauHinhBieuMau = cauHinhBieuMau.filter((item) => item._id !== req.params.id);
		res.send({ data: true });
	},
};
