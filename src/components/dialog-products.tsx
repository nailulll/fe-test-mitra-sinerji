import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useFormInput } from "@/contexts/form-input-context";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import { toIdr } from "@/lib/utils";

const DialogProducts = () => {
  const form = useFormInput();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query) {
      const regex = new RegExp(query, "i");
      const filter = form.products?.filter((product) =>
        regex.test(product.nama)
      );
      setProducts(filter);
    } else {
      setProducts(form.products || []);
    }
  };

  const addToCart = (product: Product) => {
    form.setCarts((prev) => {
      const existingItem = prev.find((p) => p.kode === product.kode);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.kode === product.kode
            ? {
                ...cartItem,
                qty: cartItem.qty + 1,
                total:
                  cartItem.diskon > 0
                    ? cartItem.price_discount * (cartItem.qty + 1)
                    : cartItem.harga * (cartItem.qty + 1),
              }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          kode: product.kode,
          nama: product.nama,
          diskon: product.diskon,
          harga: product.harga,
          price_discount: product.price_discount,
          qty: 1,
          total:
            product.diskon > 0 ? product.price_discount * 1 : product.harga * 1,
        },
      ];
    });
  };

  useEffect(() => {
    setProducts(form.products || []);
  }, [form.products]);

  return (
    <>
      <DialogHeader className="w-full h-full bg-popover text-popover-foreground overflow-hidden">
        <DialogTitle>
          <div className="flex items-center">
            <Input
              placeholder="Cari produk"
              className="rounded-md bg-transparent focus-visible:ring-0 border-0 focus-visible:ring-offset-0"
              onChange={handleSearch}
            />
            <DialogClose asChild ref={closeButtonRef}>
              <Button size="icon" variant="outline" className="w-7 h-7">
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogTitle>
        <DialogDescription className="hidden" />
      </DialogHeader>
      <ScrollArea className="w-full h-72 bg-popover text-popover-foreground">
        {products?.map((product) => (
          <div
            key={product.kode}
            className="px-3 py-3 hover:bg-slate-100 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{product.nama}</p>
              {product.diskon > 0 ? (
                <>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-slate-500 line-through">
                      {toIdr(product.harga)}{" "}
                    </p>
                    <span className="text-red-500 font-semibold">
                      {product.diskon}%
                    </span>
                  </div>
                  <p className="font-semibold">
                    {toIdr(product.price_discount)}
                  </p>
                </>
              ) : (
                <p className="font-semibold">{toIdr(product.harga)}</p>
              )}
            </div>
            <Button size="sm" onClick={() => addToCart(product)}>
              Tambah ke Keranjang
            </Button>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default DialogProducts;
