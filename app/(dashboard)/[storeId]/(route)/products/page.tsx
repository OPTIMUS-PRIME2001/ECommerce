import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
// Components for Data Table
import { ProductsColumn } from "./components/columns"
import { ProductsClient } from "./components/client";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // find all the products and show them in the datatable we create
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format the billboard object array into new arraw according to data table column
  const formattedProducts: ProductsColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()), //price in db is is in decimal so convert to Number
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;