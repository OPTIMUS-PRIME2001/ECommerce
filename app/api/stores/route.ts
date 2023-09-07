import { NextResponse } from "next/server";

// Local imports
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// we no longer have to use request methods in a switch method
// we can create out custom POST request method
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
    
        // if current user exits or not
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
    
        // retrieve the name of store from body
        const body = await request.json();
        const {
            name,
        } = body; //spream body content into the variables

        // To check if value inside name variable or not
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        
        const userId = currentUser.id;
        
        // Now insert into database table market as a new market with some credentials
        const store = await prisma.store.create({
            data: {
              name,
              userId,
            },
          });

          // Problem at line 32 : npx prisma migrate reset
                               // npx prisma generate
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}