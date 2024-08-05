import { useCustomers, useProducts } from "@/hooks";
import { formSchema } from "@/lib/validations/form-schema";
import { Cart, Customer, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type Props = {
  children: React.ReactNode;
};

type FormReturn = UseFormReturn<
  {
    customer: string;
    date: Date;
    products: {
      code: string;
      qty: number;
    }[];
    feeTransport: number;
  },
  any,
  undefined
>;

type State = {
  customers: Customer[];
  customer: Customer | undefined;
  setCustomer: (props: Customer) => void;
  products: Product[];
  form: FormReturn;
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
};

const initialState: State = {
  customer: undefined,
  customers: [],
  setCustomer: () => {},
  products: [],
  form: {} as unknown as FormReturn,
  carts: [],
  setCarts: () => {},
};

const FormInputProviderContext = createContext<State>(initialState);

export function FormInputProvider({ children }: Props) {
  const [customer, setCustomer] = useState<Customer>();
  const [carts, setCarts] = useState<Cart[]>([]);
  const { data: customers } = useCustomers();
  const { data: products } = useProducts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      customer: "",
    },
  });

  return (
    <FormInputProviderContext.Provider
      value={{
        customer: customer,
        setCustomer: setCustomer,
        customers: customers || [],
        products: products || [],
        form: form,
        carts,
        setCarts,
      }}
    >
      {children}
    </FormInputProviderContext.Provider>
  );
}

export const useFormInput = () => {
  const context = useContext(FormInputProviderContext);
  return context;
};
