import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    // if billboardId not exists inside params
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // with billboard id , find the particular billboard details
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    });
  
    // return with the details of billboard
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS DELETE REQUEST
export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
) {
  try {

    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // if current user doesn not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // from params get billboardId and if does not exist then throw error
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    // if found , then delete the existing billboard for the store
    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      }
    });
  
    // return with deleted confirmation
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS PATCH REQUEST
export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
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

    // from params get billboardId and if does not exist then throw error
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    // if found , then update the existing billboard for the store with relevant details as requested
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl
      }
    });
  
    // return with updatation confirmation
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};