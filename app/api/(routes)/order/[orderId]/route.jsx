import getCurrentUser from "@/actions/getUser";
import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server"


export async function DELETE(req , {params}){
    try{ 
        const user = await getCurrentUser();

        if(!user.id){
            return new NextResponse("unauthenticated" , {status : 401})
        }

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


export async function PATCH(req , {params}){
    try{ 
        const user = await getCurrentUser();

        if(!user.id){
            return new NextResponse("unauthenticated" , {status : 401})
        }

        const findOrder = await Prisma.order.findUnique({
            where : {
                id : params.orderId
            }
        })

        console.log(findOrder)

        const order = await Prisma.order.update({
            where : {
                id : params.orderId
            },
            data : {
                isPaid : !findOrder.isPaid
            }
        })

        console.log(order)

        return NextResponse.json(order)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}