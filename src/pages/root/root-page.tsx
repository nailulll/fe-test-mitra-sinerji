import { DataTable } from "./data-table";
import { columns } from "./column";
import { useTransactions } from "@/hooks";

const RootPage = () => {
  const { data, isLoading } = useTransactions();

  return (
    <>
      <DataTable data={data || []} columns={columns} loading={isLoading} />
    </>
  );
};

export default RootPage;
