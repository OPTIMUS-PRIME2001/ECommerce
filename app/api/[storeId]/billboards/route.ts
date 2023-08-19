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
    const { label, imageUrl } = body;

    // if current user does not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if label does not exist throw error with status code 400
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    // if imageurl does not exist throw error with status code 400
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
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

    // if found , then create a new billboard for the store with relevant details as requested
    //for the current user under the existing store
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      }
    });

     // return with new creation confirmation
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
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

    // with store id , find the all billboard under a particular store
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    // if found return with all the billboards confirmation
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};