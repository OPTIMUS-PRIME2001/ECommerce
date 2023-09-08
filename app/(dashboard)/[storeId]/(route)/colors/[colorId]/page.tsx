import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/colorForm";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {

  // To find if colors already exits or not , if not then we create new colors
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

export default ColorPage;