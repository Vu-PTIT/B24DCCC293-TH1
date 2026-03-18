import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import { message } from 'antd';
import { useState } from 'react';
import useInitModel from '@/hooks/useInitModel';

type TRecord = QuanLyVanBang.TruongDuLieu & {
	_id: string;
	createdAt?: string;
	updatedAt?: string;
};

export default () => {
	const objInit = useInitModel<TRecord>('api/quan-ly-van-bang/cau-hinh-bieu-mau');
	const [localRows, setLocalRows] = useState<TRecord[]>([
		{
			_id: 'f1',
			id: 'f1',
			tenTruong: 'dan_toc',
			kieuDuLieu: 'String',
			label: 'Dân tộc',
			createdAt: '2026-03-01T08:00:00.000Z',
			updatedAt: '2026-03-01T08:00:00.000Z',
		},
		{
			_id: 'f2',
			id: 'f2',
			tenTruong: 'diem_trung_binh',
			kieuDuLieu: 'Number',
			label: 'Điểm trung bình',
			createdAt: '2026-03-02T08:00:00.000Z',
			updatedAt: '2026-03-02T08:00:00.000Z',
		},
		{
			_id: 'f3',
			id: 'f3',
			tenTruong: 'ngay_nhap_hoc',
			kieuDuLieu: 'Date',
			label: 'Ngày nhập học',
			createdAt: '2026-03-03T08:00:00.000Z',
			updatedAt: '2026-03-03T08:00:00.000Z',
		},
	]);

	const mapRecord = (item: any, index: number): TRecord => ({
		...item,
		_id: item?._id ?? item?.id ?? `tmp-${index}`,
	});

	const getModel = async (
		_paramCondition?: Partial<TRecord>,
		_filterParams?: any[],
		_sortParam?: Record<string, 1 | -1>,
		paramPage?: number,
		paramLimit?: number,
	): Promise<TRecord[]> => {
		objInit.setLoading(true);
		const page = paramPage || objInit.page;
		const limit = paramLimit || objInit.limit;

		try {
			const normalized = localRows.map(mapRecord);
			const start = (page - 1) * limit;
			const finalData = normalized.slice(start, start + limit);

			objInit.setDanhSach(finalData);
			objInit.setTotal(normalized.length);

			return finalData;
		} catch (er) {
			return Promise.reject(er);
		} finally {
			objInit.setLoading(false);
		}
	};

	const postModel = async (payload: Partial<TRecord>): Promise<TRecord> => {
		if (objInit.formSubmiting) return Promise.reject('Form submiting');
		objInit.setFormSubmiting(true);
		try {
			const now = new Date().toISOString();
			const newId = `f${Date.now()}`;
			const newRecord: TRecord = {
				_id: newId,
				id: newId,
				tenTruong: payload.tenTruong || '',
				kieuDuLieu: (payload.kieuDuLieu as TRecord['kieuDuLieu']) || 'String',
				label: payload.label || '',
				createdAt: now,
				updatedAt: now,
			};

			setLocalRows((prev) => [newRecord, ...prev]);
			message.success('Thêm mới thành công');
			objInit.setVisibleForm(false);
			setTimeout(() => getModel(), 0);
			return newRecord;
		} finally {
			objInit.setFormSubmiting(false);
		}
	};

	const putModel = async (id: string | number, payload: Partial<TRecord>): Promise<TRecord> => {
		if (objInit.formSubmiting) return Promise.reject('Form submiting');
		objInit.setFormSubmiting(true);
		try {
			let updatedRecord: TRecord | undefined;
			const now = new Date().toISOString();

			setLocalRows((prev) =>
				prev.map((item) => {
					if (item._id !== id) return item;
					updatedRecord = { ...item, ...payload, updatedAt: now } as TRecord;
					return updatedRecord;
				}),
			);

			message.success('Lưu thành công');
			objInit.setVisibleForm(false);
			setTimeout(() => getModel(), 0);
			return updatedRecord as TRecord;
		} finally {
			objInit.setFormSubmiting(false);
		}
	};

	const deleteModel = async (id: string | number): Promise<any> => {
		objInit.setLoading(true);
		try {
			setLocalRows((prev) => prev.filter((item) => item._id !== id));
			message.success('Xóa thành công');
			setTimeout(() => getModel(), 0);
			return true;
		} finally {
			objInit.setLoading(false);
		}
	};

	return {
		...objInit,
		getModel,
		postModel,
		putModel,
		deleteModel,
	};
};
