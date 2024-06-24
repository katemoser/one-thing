import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

//uncommenting for now due to TS errors; don't need to worry about production yet
//
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

prisma = new PrismaClient()
export default prisma;