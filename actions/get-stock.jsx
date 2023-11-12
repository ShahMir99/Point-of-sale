import Prisma from "@/lib/db-Provider";



export const getStockCount = async () => {
    const orderCount = await Prisma.product.findMany({
        where : {
            stock : {
                gt : 0
            }
        }
    })

    return orderCount;
}