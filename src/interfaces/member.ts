export interface IMember {
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
