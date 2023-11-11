import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server";


export async function POST (request , {params}){
 
    const body = await request.json()
    const {name , email , password , confirmPass , imageUrl} = body;
    
    if(!name){
        return new NextResponse("name is required" , {status : 400})
    }
    if(!email){
        return new NextResponse("email is required" , {status : 400})
    }
    if(!password){
        return new NextResponse("password is required" , {status : 400})
    }

    if(password !== confirmPass){
        return new NextResponse("password and confirm password are not same" , {status : 400})
    }

    const user = await Prisma.user.update({
        where : {
            id : params.userId
        },
        data : {
            email,
            name,
            password,
            confirmPass,
            imageUrl
        }
    })

    return NextResponse.json(user)

}