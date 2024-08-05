import DialogCustomers from "@/components/dialog-customers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formSchema } from "@/lib/validations/form-schema";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { useFormInput } from "@/contexts/form-input-context";
import DialogProducts from "@/components/dialog-products";
import FormTable from "./form-table";
import { useMutation } from "@tanstack/react-query";
import transactionService from "@/services/transaction-service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FormHandler = () => {
  const { customer, form, carts } = useFormInput();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      transactionService.create(values),
    onSuccess: () => {
      form.reset();
      toast.success("Transaction created successfully", {
        duration: 1000,
      });
      navigate("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const pushToForm = () => {
    const items: {
      code: string;
      qty: number;
    }[] = [];
    for (const element of carts) {
      items.push({
        code: element.kode,
        qty: element.qty,
      });
    }
    form.setValue("products", items);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
        <div className="grid grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="customer"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Pilih Customer</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogCustomers />
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex flex-col">
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input value={customer?.name || ""} disabled />
            </FormControl>
          </FormItem>
          <FormItem className="flex flex-col">
            <FormLabel>No Telp</FormLabel>
            <FormControl>
              <Input value={customer?.telp || ""} disabled />
            </FormControl>
          </FormItem>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Transaksi</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="products"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>Barang</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Pilih Barang</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogProducts />
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormTable />
        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={() => pushToForm()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormHandler;
