import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

     // retrieve the data requested for action from the file
    const body = await req.json();

    // spread the body and store in variables
    const { name, billboardId } = body;

    // if current user does not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if name does not exist throw error with status code 400
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // if billboardId does not exist throw error with status code 400
    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
    }

    // from params get storeId and if does not exist then throw error
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // with store id querry to database for store details belongs to current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: currentUser?.id,
      }
    });

    // if no stores exists for current user then restrict next process
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // if found , then create a new category for the store with relevant details as requested
    //for the current user under the existing store
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      }
    });

     // return with new creation confirmation
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATRGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // from params get storeId and if does not exist then throw error
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // with store id , find the all category under a particular store
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    // if found return with all the categorys confirmation
    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};