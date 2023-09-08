import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/productForm";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  // To find if products already exits or not , if not then we create new product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true
    }
  });

  // List all existing categories by below querry to db
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  // List all existing sizes by below querry to db
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // List all existing colors by below querry to db
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories} 
          colors={colors}
          sizes={sizes}
          initialData={product} />
      </div>
    </div>
  );
}

export default ProductPage;