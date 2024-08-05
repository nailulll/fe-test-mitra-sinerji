import customerService from "@/services/customer-service";
import productService from "@/services/product-service";
import transactionService from "@/services/transaction-service";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
  });

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });

export const useTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getAll,
  });

export const useTransaction = (id: string) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transactionService.findOne(id),
    retry: false,
  });
