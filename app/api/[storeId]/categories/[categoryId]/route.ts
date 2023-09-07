import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // if categoryId not exists inside params
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // with category id , find the particular category details
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId
      }
    });
  
    // return with the details of category
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS DELETE REQUEST
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {

    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // if current user doesn not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // from params get categoryId and if does not exist then throw error
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    // if found , then delete the existing category for the store
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    });
  
    // return with deleted confirmation
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS PATCH REQUEST
export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {   
    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // retrieve the data requested for action from the file
    const body = await req.json();
    
    // spread the body and store in variables
    const {name, billboardId } = body;
    
    // if current user does not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if label does not exist throw error with status code 400
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // if imageurl does not exist throw error with status code 400
    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // from params get categoryId and if does not exist then throw error
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    // if found , then update the existing category for the store with relevant details as requested
    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId
      }
    });
  
    // return with updatation confirmation
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};