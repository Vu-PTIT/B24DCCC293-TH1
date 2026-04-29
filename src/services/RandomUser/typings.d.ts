declare module RandomUser {
	export interface Record {
		first: string;
		last: string;
		email: string;
		address: string;
		created: string;
		balance: string;
	}

	export enum ColumnKey {
		ADDRESS = 'address',
		BALANCE = 'balance',
		ACTION = 'action',
	}
}
