import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // if productId not exists inside params
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // with product id , find the particular product details
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true
      }
    });

    // return with the details of product
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS DELETE REQUEST
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {

    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // if current user doesn not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // from params get productId and if does not exist then throw error
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    // if found , then delete the existing product for the store
    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      }
    });

    // return with deleted confirmation
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// HTTPS PATCH REQUEST
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    // get the currentUser currently in the session
    const currentUser = await getCurrentUser();

    // retrieve the data requested for action from the file
    const body = await req.json();

    // spread the body and store in variables
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = body;

    // if current user does not exist throw error with status code 403
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if name does not exist throw error with status code 400
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // if price does not exist throw error with status code 400
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    // if categoryId does not exist throw error with status code 400
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // if colorId does not exist throw error with status code 400
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    // if sizeId does not exist throw error with status code 400
    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    // if images does not exist throw error with status code 400
    if (!images || !images.length) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // from params get productId and if does not exist then throw error
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    // if found , then update the existing product for the store with relevant details as requested
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,        
        isFeatured,
        isArchived,
        images:{
          deleteMany: {}
        }
      }
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {             
        images: {
          createMany:{
            data:[
              ...images.map((image:{url:string}) => image)
            ]
          }
        }
      }
    });

    // return with updatation confirmation
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};