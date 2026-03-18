import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import type { QuanLyVanBang } from '@/services/QuanLyVanBang/typing';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Popconfirm, Select, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

type TLoaiDuLieu = QuanLyVanBang.TruongDuLieu['kieuDuLieu'];
type TRecord = QuanLyVanBang.TruongDuLieu & {
	_id: string;
	createdAt?: string;
	updatedAt?: string;
};

type TQuanLyVanBangModel = {
	record?: TRecord;
	setVisibleForm: (visible: boolean) => void;
	edit: boolean;
	postModel: (values: Partial<TRecord>) => Promise<any>;
	putModel: (id: string | number, values: Partial<TRecord>) => Promise<any>;
	formSubmiting: boolean;
	visibleForm: boolean;
	getModel: () => Promise<TRecord[]>;
	page: number;
	limit: number;
	deleteModel: (id: string | number, getData?: () => void) => Promise<any>;
	handleEdit: (record: TRecord) => void;
};

const optionsLoaiDuLieu: { label: string; value: TLoaiDuLieu }[] = [
	{ label: 'Chuỗi (String)', value: 'String' },
	{ label: 'Số (Number)', value: 'Number' },
	{ label: 'Ngày (Date)', value: 'Date' },
];

const FormCauHinhBieuMau = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel(
		'quanlyvanbang.cauhinhbieumau' as any,
	) as unknown as TQuanLyVanBangModel;

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?._id) form.setFieldsValue(record);
	}, [record?._id, visibleForm]);

	const onFinish = async (values: TRecord) => {
		if (edit) {
			putModel(record?._id ?? '', values)
				.then()
				.catch((er: any) => console.log(er));
		} else {
			postModel(values)
				.then(() => form.resetFields())
				.catch((er: any) => console.log(er));
		}
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + (props.title ?? '').toLowerCase()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='label' label='Nhãn hiển thị' rules={[...rules.required, ...rules.text, ...rules.length(100)]}>
					<Input placeholder='Ví dụ: Dân tộc, Điểm trung bình, Nơi sinh' />
				</Form.Item>

				<Form.Item
					name='tenTruong'
					label='Tên trường lưu dữ liệu'
					extra='Dùng để lưu dữ liệu động, nên đặt theo kiểu snake_case.'
					rules={[
						...rules.required,
						{
							pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
							message: 'Tên trường chỉ gồm chữ, số, dấu gạch dưới và không bắt đầu bằng số',
						},
						...rules.length(100),
					]}
				>
					<Input placeholder='Ví dụ: dan_toc, diem_trung_binh' />
				</Form.Item>

				<Form.Item name='kieuDuLieu' label='Kiểu dữ liệu' rules={[...rules.required]}>
					<Select options={optionsLoaiDuLieu} placeholder='Chọn kiểu dữ liệu' />
				</Form.Item>

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

const CauHinhBieuMau = () => {
	const { getModel, page, limit, deleteModel, handleEdit } = useModel(
		'quanlyvanbang.cauhinhbieumau' as any,
	) as unknown as TQuanLyVanBangModel;

	const columns: IColumn<TRecord>[] = [
		{
			title: 'Nhãn hiển thị',
			dataIndex: 'label',
			width: 240,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Tên trường',
			dataIndex: 'tenTruong',
			width: 240,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Kiểu dữ liệu',
			dataIndex: 'kieuDuLieu',
			width: 150,
			filterType: 'select',
			filterData: optionsLoaiDuLieu.map((item) => item.value),
			sortable: true,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			align: 'center',
			width: 160,
			sortable: true,
			render: (value: string) => (value ? moment(value).format('HH:mm DD/MM/YYYY') : '--'),
		},
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
							title='Bạn có chắc chắn muốn xóa trường thông tin này?'
							placement='topLeft'
							onConfirm={() => deleteModel(record._id, getModel)}
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
			dependencies={[page, limit]}
			modelName='quanlyvanbang.cauhinhbieumau'
			title='Cấu hình biểu mẫu'
			Form={FormCauHinhBieuMau}
			buttons={{ import: false, export: false }}
		/>
	);
};

export default CauHinhBieuMau;
