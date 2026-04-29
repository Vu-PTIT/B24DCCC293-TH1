import type { ELogAction } from './constant';

declare module AuditLog {
	export interface IRecord {
		_id: string;
		uId: string;
		uCode: string;
		uEmail: string;
		uName: string;
		requestType: string;
		action: ELogAction;
		logResponse: true;
		ip: string;
		data: any;
		query: any;
		param: any;
		ua: any;
		userAgent: string;
		response: any;
		createdAt: string;
	}
	export enum ColumnKey {
		INDEX = 'index',
		UCODE = 'uCode',
		UNAME = 'uName',
		ACTION = 'action',
		CREATED_AT = 'createdAt',
	}
}
