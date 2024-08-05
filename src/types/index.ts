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

export type Product = {
  kode: string;
  nama: string;
  harga: number;
  diskon: number;
  price_discount: number;
};

export type Cart = {
  kode: string;
  nama: string;
  harga: number;
  diskon: number;
  price_discount: number;
  qty: number;
  total: number;
};
