import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

// Components for Data Table
import { ColorColumn } from "./components/columns"
import { ColorsClient } from "./components/client";

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // find all the Colors and show them in the datatable we create
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format the Color object array into new arraw according to data table column
  const formattedsizes: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedsizes} />
      </div>
    </div>
  );
};

export default ColorsPage;