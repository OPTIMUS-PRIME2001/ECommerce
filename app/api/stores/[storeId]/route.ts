import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH (
    request: Request,
    {params} : {params : {storeId: string}}
){
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { name } = body;

        // if current user exits or not
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!name){
            return new NextResponse("Name is required",{status:400});
        }

        if(!params.storeId){
            return new NextResponse("Store Id is required",{status:400});
        }


        const store = await prismadb.store.updateMany({
            where:{
                id: params.storeId,
                userId: currentUser?.id
            },
            data:{
                name
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_PATCH]',error);
        return new NextResponse("Internal error", {status: 500});
    }
}

export async function DELETE (
    request: Request,
    {params} : {params : {storeId: string}}
){
    try {
        const currentUser = await getCurrentUser();

        // if current user exits or not
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!params.storeId){
            return new NextResponse("Store Id is required",{status:400});
        }

        const delstore = await prismadb.store.deleteMany({
            where:{
                id: params.storeId,
                userId: currentUser?.id
            }
        });

        return NextResponse.json(delstore);
    } catch (error) {
        console.log('[STORE_DELETE]',error);
        return new NextResponse("Internal error", {status: 500});
    }
}