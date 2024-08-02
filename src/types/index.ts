export type Transaction = {
  no: number;
  kode: string;
  tgl: Date;
  customer: Customer;
  products: TransactionDetail[];
  subtotal: number;
  diskon: number;
  ongkir: number;
  total_bayar: number;
};

export type Customer = {
  kode: string;
  name: string;
  telp: string;
};

export type TransactionDetail = {
  sales_id: number;
  barang_id: number;
};
