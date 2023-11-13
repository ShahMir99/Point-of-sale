import getCurrentUser from "@/actions/getUser";
import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server"


export async function DELETE(req , {params}){
    try{ 


        const user = await getCurrentUser();

        if(!user.id){
            return new NextResponse("unauthenticated" , {status : 401})
        }

        const orderItems = await Prisma.orderItems.deleteMany({
                where : {
                    orderId : params.orderId
                }
        })

        const order = await Prisma.order.delete({
            where : {
                id : params.orderId
            }
        })

        return NextResponse.json(order)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}