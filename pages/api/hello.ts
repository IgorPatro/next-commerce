import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10).then((hash) => hash)

const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash).then((result) => result)

const handler = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      Cart: true,
      EmailVerificationRequest: true,
      PasswordVerificationRequest: true,
    },
  })

  const carts = await prisma.cart.findMany({
    include: {
      User: true,
    },
  })

  // await prisma.user.create({
  //   data: {
  //     email: "i.patro@wp.pl",
  //     passwordHash: await hashPassword("pass123"),
  //     Cart: {
  //       create: {
  //         products: [
  //           {
  //             productId: "prod_4OANwRGnjkovYL",
  //             productPrice: 14.99,
  //             productQuantity: 2,
  //           },
  //         ],
  //         sum: 29.98,
  //       },
  //     },
  //   },
  // })

  res.status(200).json({ users, carts })
}

export default handler
