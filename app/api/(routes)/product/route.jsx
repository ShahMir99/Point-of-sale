import getCurrentUser from "@/actions/getUser";
import Prisma from "@/lib/db-Provider";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { name, code, price, actualPrice, stock } = body;

    if (!user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is reuired", { status: 400 });
    }

    if (!code) {
      return new NextResponse("name is reuired", { status: 400 });
    }

    if (!price) {
      return new NextResponse("price is reuired", { status: 400 });
    }

    if (!actualPrice) {
      return new NextResponse("actualPrice is reuired", { status: 400 });
    }

    const product = await Prisma.product.create({
      data: {
        name,
        code,
        price,
        actualPrice,
        stock,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchByWord = searchParams.get("search");


    if(!searchByWord){
      return NextResponse.json([])
    }


    const products = await Prisma.product.findMany({
      where: {
        OR: [
          {
            code: {
              contains: searchByWord,
            },
          },
          {
            name: {
              contains: searchByWord,
            },
          },
        ],
      },
    });


    return NextResponse.json(products);
  } catch (err) {
    console.log(err)
    return new NextResponse("Internal server error", { status: 500 });
  }
}
