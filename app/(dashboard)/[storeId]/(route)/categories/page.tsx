import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

// Components for Data Table
import { CategoryColumn } from "./components/columns"
import { CategoryClient } from "./components/client";

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // find all the categories and show them in the datatable we create
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
      billboard:true,// when we create categories we have to select which billboard we have to select
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format the Category object array into new arraw according to data table column
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;