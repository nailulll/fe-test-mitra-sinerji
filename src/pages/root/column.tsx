import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "number",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kode",
    header: "Kode",
  },
  {
    accessorKey: "tgl",
    header: "Tgl",
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Jumlah Barang",
    cell: ({ row }) => row.original.products.length,
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
  },
  {
    accessorKey: "diskon",
    header: "Diskon",
  },
  {
    accessorKey: "ongkir",
    header: "Ongkir",
  },
  {
    accessorKey: "total_bayar",
    header: "Total Bayar",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const payment = row.original;

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <InfoCircledIcon className="h-4 w-4" />
        </Button>
      );
    },
  },
];
