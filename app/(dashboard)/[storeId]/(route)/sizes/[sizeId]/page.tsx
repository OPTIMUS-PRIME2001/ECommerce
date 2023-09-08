import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/sizeForm";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {

  // To find if sizes already exits or not , if not then we create new billboard
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;