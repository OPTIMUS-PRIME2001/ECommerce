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
    const { name, value } = body;

    // if current user does not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if name does not exist throw error with status code 400
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // if value does not exist throw error with status code 400
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    // if found , then create a new size for the store with relevant details as requested
    //for the current user under the existing store
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      }
    });

     // return with new creation confirmation
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_POST]', error);
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

    // with store id , find the all colors under a particular store
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    // if found return with all the colors confirmation
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};