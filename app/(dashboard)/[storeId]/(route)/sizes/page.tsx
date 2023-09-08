import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

// Components for Data Table
import { SizeColumn } from "./components/columns"
import { SizesClient } from "./components/client";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // find all the Sizes and show them in the datatable we create
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format the billboard object array into new arraw according to data table column
  const formattedsizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedsizes} />
      </div>
    </div>
  );
};

export default SizesPage;