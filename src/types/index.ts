export type Transaction = {
  no: number;
  kode: string;
  tgl: Date;
  customer: Customer;
  details: TransactionDetail[];
  subtotal: number;
  diskon: number;
  ongkir: number;
  totalBayar: number;
};

export type Customer = {
  kode: string;
  name: string;
  telp: string;
};

export type TransactionDetail = {
  hargaBandrol: string;
  qty: number;
  diskonPct: string;
  diskonNilai: string;
  hargaDiskon: string;
  total: string;
  barang: Product;
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
