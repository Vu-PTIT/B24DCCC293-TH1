import React, { useState, useMemo } from 'react';
import { Table, Button, Modal, Select, Input, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { clubs, IClub } from '@/interfaces/clubs';

const { Option } = Select;
const { Search } = Input;

interface IMember {
	id: number;
	name: string;
	email: string;
	phone: string;
	gender: string;
	address: string;
	clubId: number;
	clubName: string;
	status: 'Pending' | 'Approved' | 'Rejected';
}

const MembersPage: React.FC = () => {
	const [members, setMembers] = useState<IMember[]>([
		{
			id: 1,
			name: 'Nguyễn Văn A',
			email: 'a@gmail.com',
			phone: '012345678',
			gender: 'Nam',
			address: 'Hà Nội',
			clubId: 1,
			clubName: 'CLB Bóng đá',
			status: 'Approved',
		},
		{
			id: 2,
			name: 'Trần Thị B',
			email: 'b@gmail.com',
			phone: '098888888',
			gender: 'Nữ',
			address: 'Hà Nội',
			clubId: 2,
			clubName: 'CLB Âm nhạc',
			status: 'Approved',
		},
		{
			id: 3,
			name: 'Lê Văn C',
			email: 'c@gmail.com',
			phone: '011111111',
			gender: 'Nam',
			address: 'HCM',
			clubId: 3,
			clubName: 'CLB Lập trình',
			status: 'Pending',
		},
	]);

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [newClubId, setNewClubId] = useState<number>();
	const [searchText, setSearchText] = useState('');

	// chỉ hiển thị Approved
	const approvedMembers = useMemo(() => {
		return members.filter((m) => m.status === 'Approved' && m.name.toLowerCase().includes(searchText.toLowerCase()));
	}, [members, searchText]);

	const columns: ColumnsType<IMember> = [
		{
			title: 'Họ tên',
			dataIndex: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'phone',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
		},
		{
			title: 'CLB',
			dataIndex: 'clubName',
			filters: clubs.map((club: IClub) => ({
				text: club.name,
				value: club.name,
			})),
			onFilter: (value, record) => record.clubName === value,
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => {
			setSelectedRowKeys(keys);
		},
	};

	const handleChangeClub = () => {
		const club = clubs.find((c: IClub) => c.id === newClubId);

		const updatedMembers = members.map((member) => {
			if (selectedRowKeys.includes(member.id)) {
				return {
					...member,
					clubId: club?.id || member.clubId,
					clubName: club?.name || member.clubName,
				};
			}
			return member;
		});

		setMembers(updatedMembers);
		setSelectedRowKeys([]);
		setModalOpen(false);
	};

	return (
		<>
			<Space style={{ marginBottom: 16 }}>
				<Search placeholder='Tìm thành viên' onSearch={(value) => setSearchText(value)} allowClear />

				<Button type='primary' disabled={selectedRowKeys.length === 0} onClick={() => setModalOpen(true)}>
					Chuyển CLB ({selectedRowKeys.length})
				</Button>
			</Space>

			<Table rowSelection={rowSelection} columns={columns} dataSource={approvedMembers} rowKey='id' />

			<Modal
				title={`Chuyển CLB cho ${selectedRowKeys.length} thành viên`}
				visible={modalOpen}
				onCancel={() => setModalOpen(false)}
				onOk={handleChangeClub}
			>
				<Select placeholder='Chọn CLB mới' style={{ width: '100%' }} onChange={(value: number) => setNewClubId(value)}>
					{clubs.map((club: IClub) => (
						<Option key={club.id} value={club.id}>
							{club.name}
						</Option>
					))}
				</Select>
			</Modal>
		</>
	);
};

export default MembersPage;
