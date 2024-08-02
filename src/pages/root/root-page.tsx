import { DataTable } from "./data-table";
import { columns } from "./column";

const RootPage = () => {
  return (
    <>
      <DataTable data={[]} columns={columns} />
    </>
  );
};

export default RootPage;
