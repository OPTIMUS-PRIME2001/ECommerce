// we created this because nextjs13 hot reloading will create bunch of prisma client 
//results in warning and stack overflow. To avoid this we check for existing client

import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client