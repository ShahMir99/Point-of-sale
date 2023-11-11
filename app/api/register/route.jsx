import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server";


export async function POST (request){
 
    const body = await request.json()
    const {name , email , password , confirmPass} = body;
    
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

    const user = await Prisma.user.create({
        data : {
            email,
            name,
            password,
            confirmPass,
        }
    })

    return NextResponse.json(user)

}