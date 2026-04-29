declare module ChucVu {
  export interface IRecord {
    _id: string;
    ma: string;
    ten: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export enum ColumnKey {
    MA = 'ma',
    TEN = 'ten',
    CREATED_AT = 'createdAt',
    ACTION = 'action',
  }
}
