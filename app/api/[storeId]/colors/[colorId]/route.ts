import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    // if colorId not exists inside params
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    // with color id , find the particular color details
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
    });

    // return with the details of color
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS DELETE REQUEST
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {

    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // if current user doesn not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // from params get colorId and if does not exist then throw error
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    // with store id querry to database for store details belongs to current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: currentUser.id,
      }
    });

    // if no stores exists for current user then restrict next process 
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // if found , then delete the existing size for the store
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      }
    });

    // return with deleted confirmation
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS PATCH REQUEST
export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
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
      return new NextResponse("value is required", { status: 400 });
    }

    // from params get colorId and if does not exist then throw error
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    // with store id querry to database for store details belongs to current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: currentUser.id,
      }
    });

    // if no stores exists for current user then restrict next process 
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // if found , then update the existing color for the store with relevant details as requested
    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value
      }
    });

    // return with updatation confirmation
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};