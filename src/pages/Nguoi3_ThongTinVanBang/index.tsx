import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import { QuanLyVanBangAPI } from '@/services/QuanLyVanBang';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Popconfirm, Select, Tooltip, DatePicker, InputNumber, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

type TRecord = QuanLyVanBang.VanBang & {
	_id: string;
};

const { Option } = Select;

const FormThongTinVanBang = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel(
		'quanlyvanbang.vanbang' as any,
	);
	const { getModel: getCauHinh, danhSach: danhSachCauHinh } = useModel('quanlyvanbang.cauhinhbieumau' as any);
	
	const [quyetDinh, setQuyetDinh] = useState<QuanLyVanBang.QuyetDinh[]>([]);
	const [soVanBang, setSoVanBang] = useState<QuanLyVanBang.SoVanBang[]>([]);

	useEffect(() => {
		getCauHinh();
		const fetchData = async () => {
			try {
				const qdRes = await QuanLyVanBangAPI.getQuyetDinh();
				const soRes = await QuanLyVanBangAPI.getSoVanBang();
				setQuyetDinh(qdRes.data.data || []);
				setSoVanBang(soRes.data.data || []);
			} catch (error) {
				console.error('Lỗi khi tải dữ liệu bổ trợ:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
		} else if (edit && record?._id) {
			form.setFieldsValue({
				...record,
				ngaySinh: record.ngaySinh ? moment(record.ngaySinh) : undefined,
				...record.duLieuBoSung,
			});
			// Xử lý các trường Date trong duLieuBoSung
			danhSachCauHinh.forEach((field: QuanLyVanBang.TruongDuLieu) => {
				if (field.kieuDuLieu === 'Date' && record.duLieuBoSung?.[field.tenTruong]) {
					form.setFieldsValue({
						[field.tenTruong]: moment(record.duLieuBoSung[field.tenTruong]),
					});
				}
			});
		}
	}, [record?._id, visibleForm, edit]);

	const onFinish = async (values: any) => {
		const { idQuyetDinh, soVaoSo, soHieuVanBang, maSinhVien, hoTen, ngaySinh, ...otherValues } = values;
		
		// Tách dữ liệu bổ sung
		const duLieuBoSung: Record<string, any> = {};
		danhSachCauHinh.forEach((field: QuanLyVanBang.TruongDuLieu) => {
			const val = otherValues[field.tenTruong];
			if (field.kieuDuLieu === 'Date' && val) {
				duLieuBoSung[field.tenTruong] = val.format('YYYY-MM-DD');
			} else {
				duLieuBoSung[field.tenTruong] = val;
			}
		});

		const payload = {
			idQuyetDinh,
			soVaoSo,
			soHieuVanBang,
			maSinhVien,
			hoTen,
			ngaySinh: ngaySinh ? ngaySinh.format('YYYY-MM-DD') : undefined,
			duLieuBoSung,
		};

		if (edit) {
			putModel(record?._id ?? record?.id ?? '', payload)
				.then()
				.catch((er: any) => console.log(er));
		} else {
			postModel(payload)
				.then(() => form.resetFields())
				.catch((er: any) => console.log(er));
		}
	};

	const handleQuyetDinhChange = (idQD: string) => {
		if (edit) return; // Không cho đổi QĐ khi edit nếu làm chặt, ở đây ta cứ xử lý
		const qd = quyetDinh.find(q => q.id === idQD);
		if (qd) {
			const so = soVanBang.find(s => s.id === qd.idSoVanBang);
			if (so) {
				form.setFieldsValue({ soVaoSo: so.soVaoSoHienTai + 1 });
			}
		}
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + (props.title ?? '').toLowerCase()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='idQuyetDinh' label='Quyết định tốt nghiệp' rules={[...rules.required]}>
					<Select placeholder='Chọn quyết định' onChange={handleQuyetDinhChange}>
						{quyetDinh.map(qd => (
							<Option key={qd.id} value={qd.id}>{qd.soQuyetDinh} - {qd.trichYeu}</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name='soVaoSo' label='Số vào sổ' rules={[...rules.required]}>
					<InputNumber style={{ width: '100%' }} disabled placeholder='Tự động tăng theo sổ' />
				</Form.Item>

				<Form.Item name='soHieuVanBang' label='Số hiệu văn bằng' rules={[...rules.required, ...rules.length(50)]}>
					<Input placeholder='Ví dụ: B2024-001' />
				</Form.Item>

				<Form.Item name='maSinhVien' label='Mã sinh viên' rules={[...rules.required, ...rules.length(20)]}>
					<Input placeholder='Ví dụ: B21DCCN001' />
				</Form.Item>

				<Form.Item name='hoTen' label='Họ và tên' rules={[...rules.required, ...rules.length(100)]}>
					<Input placeholder='Ví dụ: Nguyễn Văn A' />
				</Form.Item>

				<Form.Item name='ngaySinh' label='Ngày sinh' rules={[...rules.required]}>
					<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
				</Form.Item>

				{/* Các trường động */}
				{danhSachCauHinh.map((field: QuanLyVanBang.TruongDuLieu) => (
					<Form.Item 
						key={field.id} 
						name={field.tenTruong} 
						label={field.label}
						rules={field.kieuDuLieu === 'Date' ? [] : [...rules.length(200)]}
					>
						{field.kieuDuLieu === 'String' && <Input placeholder={`Nhập ${field.label.toLowerCase()}`} />}
						{field.kieuDuLieu === 'Number' && <InputNumber style={{ width: '100%' }} placeholder={`Nhập ${field.label.toLowerCase()}`} />}
						{field.kieuDuLieu === 'Date' && <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />}
					</Form.Item>
				))}

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit ? 'Thêm mới' : 'Lưu lại'}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

const ThongTinVanBang = () => {
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('quanlyvanbang.vanbang' as any);
	const { danhSach: danhSachCauHinh, getModel: getCauHinh } = useModel('quanlyvanbang.cauhinhbieumau' as any);
	const [quyetDinh, setQuyetDinh] = useState<QuanLyVanBang.QuyetDinh[]>([]);

	useEffect(() => {
		getCauHinh();
		QuanLyVanBangAPI.getQuyetDinh().then(res => setQuyetDinh(res.data.data || []));
	}, []);

	const columns: IColumn<TRecord>[] = [
		{
			title: 'Số hiệu',
			dataIndex: 'soHieuVanBang',
			width: 150,
			filterType: 'string',
		},
		{
			title: 'Số vào sổ',
			dataIndex: 'soVaoSo',
			width: 100,
			align: 'center',
		},
		{
			title: 'Mã sinh viên',
			dataIndex: 'maSinhVien',
			width: 120,
			filterType: 'string',
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			width: 200,
			filterType: 'string',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'ngaySinh',
			width: 120,
			align: 'center',
			render: (val) => val ? moment(val).format('DD/MM/YYYY') : '--',
		},
		{
			title: 'Quyết định',
			dataIndex: 'idQuyetDinh',
			width: 180,
			render: (id) => {
				const qd = quyetDinh.find(q => q.id === id);
				return qd ? qd.soQuyetDinh : id;
			}
		},
		// Các cột động
		...danhSachCauHinh.map((field: QuanLyVanBang.TruongDuLieu) => ({
			title: field.label,
			dataIndex: ['duLieuBoSung', field.tenTruong],
			width: 150,
			render: (val: any) => {
				if (field.kieuDuLieu === 'Date' && val) return moment(val).format('DD/MM/YYYY');
				return val ?? '--';
			}
		})),
		{
			title: 'Thao tác',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (record: TRecord) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							title='Bạn có chắc chắn muốn xóa thông tin văn bằng này?'
							placement='topLeft'
							onConfirm={() => deleteModel(record._id || record.id, getModel)}
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit, danhSachCauHinh]}
			modelName='quanlyvanbang.vanbang'
			title='Thông tin văn bằng'
			Form={FormThongTinVanBang}
			buttons={{ import: false, export: false }}
		/>
	);
};

export default ThongTinVanBang;
