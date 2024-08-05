import { DataTable } from "./data-table";
import { columns } from "./column";
import { useTransactions } from "@/hooks";

const RootPage = () => {
  const { data } = useTransactions();

  return (
    <>
      <DataTable data={data || []} columns={columns} />
    </>
  );
};

export default RootPage;
