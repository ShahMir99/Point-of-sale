import getCurrentUser from "@/actions/getUser";
import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server";


export async function PATCH (req , {params}){
    try{
        const user = await getCurrentUser()
        const body = await req.json();
        const {name, code, price, actualPrice, stock} = body;

        if(!user.id){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("name is reuired" , {status : 400})
        }

        if(!code){
            return new NextResponse("name is reuired" , {status : 400})
        }

        if(!price){
            return new NextResponse("price is reuired" , {status : 400})
        }

        if(!actualPrice){
            return new NextResponse("actualPrice is reuired" , {status : 400})
        }

        const product = await Prisma.product.update({
            where : {
                id : params.productId
            },
            data : {
                name,
                code,
                price,
                actualPrice,
                stock
            }
        })

        return NextResponse.json(product)


    }catch(err){
        console.log(err)
        return new NextResponse("Internal Server Error" , {status : 500})
    }
}


export async function DELETE (req , {params}){
    try{
        const user = await getCurrentUser()

        if(!user.id){
            return new NextResponse("unauthenticated" , {status : 401})
        }

        const deletedProduct = await Prisma.product.deleteMany({
            where : {
                id : params.productId
            }
        })

        return NextResponse.json(deletedProduct)

    }catch(err){
        console.log(err)
        return new NextResponse("internal Server Error" , {status : 500})
    }
}