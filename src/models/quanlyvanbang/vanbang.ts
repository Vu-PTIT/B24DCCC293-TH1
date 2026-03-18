import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import useInitModel from '@/hooks/useInitModel';
import { useState } from 'react';
import { message } from 'antd';

type TRecord = QuanLyVanBang.VanBang & {
	_id: string;
};

export default () => {
	const objInit = useInitModel<TRecord>('api/quan-ly-van-bang/van-bang');
	const [localRows, setLocalRows] = useState<TRecord[]>([
		{
			id: 'vb1',
			_id: 'vb1',
			soVaoSo: 101,
			soHieuVanBang: 'B2023-001',
			maSinhVien: 'SV001',
			hoTen: 'Nguyễn Văn A',
			ngaySinh: '2001-05-15',
			idQuyetDinh: 'qd1',
			duLieuBoSung: {
				dan_toc: 'Kinh',
				diem_tb: 8.5,
			},
		},
	]);

	const mapRecord = (item: any, index: number): TRecord => ({
		...item,
		_id: item?._id ?? item?.id ?? `tmp-vb-${index}`,
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
			const newId = `vb${Date.now()}`;
			const newRecord: TRecord = {
				...payload,
				_id: newId,
				id: newId,
			} as TRecord;

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
			setLocalRows((prev) =>
				prev.map((item) => {
					if (item._id !== id && item.id !== id) return item;
					updatedRecord = { ...item, ...payload } as TRecord;
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
			setLocalRows((prev) => prev.filter((item) => item._id !== id && item.id !== id));
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
