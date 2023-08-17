import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/lib/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    //our providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {

                //To check if user provided the required field values
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please fill all the required fields ');
                }

                // Now in the database , find for the unique user by the provided email id
                // and store its value in user , user may be empty if not found by credential
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // Now check whether the user exist or not
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // used to compare between the password provided and stored in database
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                
                // if password don't match
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
                // if the credential provided match , simply return the user details
                return user;
            }
        })
    ],

    // whenever any error occured or any weired callbacks occurs redirect to sign in page
    // pages: {
    //     signIn: '/signIn',
    //   },

    debug: process.env.NODE_ENV === 'development',
    
    session: {strategy: "jwt", },
    
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };