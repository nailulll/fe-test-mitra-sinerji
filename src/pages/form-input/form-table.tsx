import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormInput } from "@/contexts/form-input-context";
import { toIdr } from "@/lib/utils";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const FormTable = () => {
  const { carts, setCarts, form } = useFormInput();
  const [fee, setFee] = useState(0);

  const removeFromCart = (code: string) => {
    setCarts((prevCarts) => prevCarts.filter((item) => item.kode !== code));
  };

  const updateQuantity = (code: string, type: "PLUS" | "MINUS") => {
    const item = carts.find((item) => item.kode === code);

    if (item?.qty === 1 && type === "MINUS") {
      removeFromCart(code);
    }

    setCarts((prevCarts) =>
      prevCarts.map((item) =>
        item.kode === code
          ? {
              ...item,
              qty: type === "PLUS" ? item.qty + 1 : item.qty - 1,
              total:
                item.diskon > 0
                  ? item.price_discount *
                    (type === "PLUS" ? item.qty + 1 : item.qty - 1)
                  : item.harga *
                    (type === "PLUS" ? item.qty + 1 : item.qty - 1),
            }
          : item
      )
    );
  };

  useEffect(() => {
    form.setValue("feeTransport", 0);
    setFee(0);
  }, []);

  const subTotal = () =>
    carts.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const discount = () =>
    carts.reduce(
      (acc, item) => acc + item.harga * (item.diskon / 100) * item.qty,
      0
    );
  const totalPay = () => subTotal() - discount() + fee;

  return (
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
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carts.map((cart, index) => (
          <TableRow key={index}>
            <TableCell className="w-[50px]">{index + 1}</TableCell>
            <TableCell>{cart.kode}</TableCell>
            <TableCell>{cart.nama}</TableCell>
            <TableCell className="text-center">{cart.qty}</TableCell>
            <TableCell>{toIdr(cart.harga)}</TableCell>
            <TableCell className="text-red-500 font-semibold">
              {cart.diskon > 0 ? (
                <>
                  {cart.diskon}%{"/"}
                  {toIdr(cart.price_discount)}
                </>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>{toIdr(cart.total)}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button
                size="icon"
                type="button"
                onClick={() => updateQuantity(cart.kode, "PLUS")}
              >
                <PlusIcon />
              </Button>
              <Button
                size="icon"
                type="button"
                onClick={() => updateQuantity(cart.kode, "MINUS")}
              >
                <MinusIcon />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                type="button"
                onClick={() => removeFromCart(cart.kode)}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7} className="text-right">
            Sub Total
          </TableCell>
          <TableCell className="text-right">{toIdr(subTotal())}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={7} className="text-right">
            Diskon
          </TableCell>
          <TableCell className="text-right text-red-500">
            - {toIdr(discount())}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={7} className="text-right">
            Ongkir
          </TableCell>
          <TableCell className="flex justify-end">
            <Input
              type="number"
              value={fee}
              className="w-32"
              onChange={(e) => {
                setFee(Number(e.target.value));
                form.setValue("feeTransport", Number(e.target.value));
              }}
              min={0}
            />
          </TableCell>
        </TableRow>
        <TableRow className="font-bold text-lg">
          <TableCell colSpan={7} className="text-right">
            Total Bayar
          </TableCell>
          <TableCell className="text-right">{toIdr(totalPay())}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default FormTable;
