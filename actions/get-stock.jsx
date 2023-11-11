import Prisma from "@/lib/db-Provider";



export const getStockCount = async () => {
    const orderCount = await Prisma.product.count({
        where : {
            stock : {
                gt : 0
            }
        }
    })

    return orderCount;
}