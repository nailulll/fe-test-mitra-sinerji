import customerService from "@/services/customer-service";
import productService from "@/services/product-service";
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
