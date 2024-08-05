import { Button } from "@/components/ui/button";
import { toIdr } from "@/lib/utils";
import { Transaction } from "@/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "number",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "kode",
    accessorKey: "kode",
    header: "Kode",
  },
  {
    accessorKey: "tgl",
    header: "Tgl",
    cell: ({ row }) => {
      return format(row.original.tgl, "dd-MMM-yyyy");
    },
  },
  {
    id: "customer.name",
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Jumlah Barang",
    cell: ({ row }) => row.original.details.length,
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      return toIdr(row.original.subtotal);
    },
  },
  {
    accessorKey: "diskon",
    header: "Diskon",
    cell: ({ row }) => {
      return toIdr(row.original.diskon);
    },
  },
  {
    accessorKey: "ongkir",
    header: "Ongkir",
    cell: ({ row }) => {
      return toIdr(row.original.ongkir);
    },
  },
  {
    accessorKey: "totalBayar",
    header: "Total Bayar",
    cell: ({ row }) => {
      return toIdr(row.original.totalBayar);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const code = row.original.kode;

      return (
        <Button variant="ghost" className="h-8 w-8 p-0" asChild>
          <Link to={`/detail/${code}`}>
            <InfoCircledIcon className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
];
