declare namespace LichHen {
  export interface IRecord {
    _id?: string;
    id?: string;
    customerName: string;
    employeeId: string;
    serviceId: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    status: 'CHO_DUYET' | 'XAC_NHAN' | 'HOAN_THANH' | 'HUY';
    createdAt?: string;
    updatedAt?: string;
  }
}
