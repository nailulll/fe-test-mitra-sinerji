import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toIdr } from "@/lib/utils";

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useTransaction(id!);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <ReloadIcon className="mr-2 h-10 w-10 animate-spin my-5" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl font-semibold">
          Detail Transaksi #{data?.kode}
        </h1>
        <Button asChild size="icon">
          <Link to="/">
            <ChevronRightIcon />
          </Link>
        </Button>
      </div>
      <div className="my-10 max-w-80">
        <div className="grid grid-cols-2">
          <p className="font-bold">Customer</p>
          <p>{data?.customer.name}</p>
          <p className="font-bold">No Telp.</p>
          <p>{data?.kode}</p>
          <p className="font-bold">Tanggal Transaksi</p>
          <p>{format(data?.tgl || "", "dd-MMM-yyyy")}</p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Kode Barang</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead className="text-center">Kuantitas</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Diskon</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.details.map((detail, index) => (
            <TableRow key={index}>
              <TableCell className="w-[50px]">{index + 1}</TableCell>
              <TableCell>{detail.barang.kode}</TableCell>
              <TableCell>{detail.barang.nama}</TableCell>
              <TableCell className="text-center">{detail.qty}</TableCell>
              <TableCell>{toIdr(detail.barang.harga)}</TableCell>
              <TableCell>
                {detail.barang.diskon}%/{toIdr(detail.barang.price_discount)}
              </TableCell>
              <TableCell className="text-right">
                {detail.barang.diskon > 0
                  ? toIdr(detail.barang.price_discount * detail.qty)
                  : toIdr(detail.barang.harga * detail.qty)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right">
              Sub Total
            </TableCell>
            <TableCell className="text-right">
              {toIdr(data?.subtotal || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className="text-right">
              Diskon
            </TableCell>
            <TableCell className="text-right text-red-500">
              - {toIdr(data?.diskon || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className="text-right">
              Ongkir
            </TableCell>
            <TableCell className="flex justify-end">
              {toIdr(data?.ongkir || 0)}
            </TableCell>
          </TableRow>
          <TableRow className="font-bold text-lg">
            <TableCell colSpan={6} className="text-right">
              Total Bayar
            </TableCell>
            <TableCell className="text-right">
              {toIdr(data?.totalBayar || 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DetailPage;
