import getCurrentUser from "@/actions/getUser";
import Prisma from "@/lib/db-Provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const { data, totalPrice, Received, Discount, custName } = body.order;


    if (!user) {
      return new NextRequest("Unauthenticated", { status: 401 });
    }

    data.forEach(async (element) => {
      console.log(element)
      await UpdateStock(element.id , element.quantity);
    });


    const order = await Prisma.order.create({
      data: {
        totalPrice,
        Received,
        Discount,
        custName,
        isPaid: true,
        orderitems: {
          create: data.map((item) => ({
            productId : item.id,
            name : item.name,
            code : item.code,
            price : item.price,
            actualPrice : item.actualPrice,
            quantity : item.quantity
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log(err);
    return new NextRequest("internal server error", { status: 500 });
  }
}

async function UpdateStock(productId , quantity) {

  try {
    const Findproduct = await Prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    await Prisma.product.update({
      where: {
        id: Findproduct.id,
      },
      data: {
        stock: Findproduct.stock - quantity,
      },
    });


  } catch (err) {
    console.log(err);
  }
}