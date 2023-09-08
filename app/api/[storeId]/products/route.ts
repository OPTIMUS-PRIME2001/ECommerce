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

    // if found , then create a new product for the store with relevant details as requested
    //for the current user under the existing store
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,        
        storeId: params.storeId,
        images: {
          createMany:{
            data:[
              ...images.map((image:{url:string}) => image)
            ]
          }
        }
      }
    });

     // return with new creation confirmation
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    // from params get storeId and if does not exist then throw error
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // with store id , find the all products under a particular store
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured? true: undefined,
        isArchived: false 
      },
      include:{
        images: true,
        category: true,
        color: true,
        size:true
      },
      orderBy : {
        createdAt: 'desc'
      }
    });
  
    // if found return with all the products confirmation
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};