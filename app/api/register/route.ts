import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";

// we no longer have to use request methods in a switch method 
// we can create out custom POST request method
export async function POST(
    request: Request, 
  ) {
    // from the body , we retrieve the provided name, email and hashedpassword
    const body = await request.json();
    const { 
      email,
      name,
      password,
     } = body;
  
     const hashedPassword = await bcrypt.hash(password, 12);
    
     // Now insert into database table user as a new user and pass the retrieved crendentials
     const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });
  
    return NextResponse.json(user);
} 