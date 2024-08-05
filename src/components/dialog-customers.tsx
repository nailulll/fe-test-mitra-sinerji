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
import { Customer } from "@/types";
import { useEffect, useRef, useState } from "react";

const DialogCustomers = () => {
  const form = useFormInput();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query) {
      const regex = new RegExp(query, "i");
      const filter = form.customers?.filter((customer) =>
        regex.test(customer.name)
      );
      setCustomers(filter);
    } else {
      setCustomers(form.customers || []);
    }
  };

  const setCustomer = (customer: Customer) => {
    form.setCustomer(customer);
    form.form.setValue("customer", customer.kode);
    closeButtonRef.current?.click();
  };

  useEffect(() => {
    setCustomers(form.customers || []);
  }, [form.customers]);

  return (
    <>
      <DialogHeader className="w-full h-full bg-popover text-popover-foreground overflow-hidden">
        <DialogTitle>
          <div className="flex items-center">
            <Input
              placeholder="Cari customer"
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
        {customers?.map((customer) => (
          <div
            key={customer.kode}
            className="px-3 py-3 hover:bg-slate-100 flex justify-between"
          >
            <p>{customer.name}</p>
            <Button size="sm" onClick={() => setCustomer(customer)}>
              Pilih
            </Button>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default DialogCustomers;
