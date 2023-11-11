"use client";

import useCart from "@/hooks/use-cart";
import React, { useEffect, useRef, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Receipt from "@/components/Receipt";
import { useReactToPrint } from "react-to-print";

const ClientHome = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [Received, setReceived] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [custName, setcustName] = useState("Random Buyer");

  const cart = useCart();
  const router = useRouter();
  const componentToPrint = useRef();

  const totalPrice = cart.items.reduce((acc, items) => {
    return acc + items.price * items.quantity;
  }, 0);

  const setdiscount = (e) => {
    setReceived(Number(e));
    const result = totalPrice - e;
    setDiscount(result);
  };

  const placeOrder = async () => {
    const data = cart?.items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const order = {
      data,
      totalPrice,
      Received,
      Discount,
      custName,
    };

    try {
      await axios.post("/api/order", { order });
      cart.removeAll();
      setReceived(0);
      setDiscount(0);
      router.refresh();
      toast({
        title: "Receipt Saved Successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
    pageStyle: '@page { size: A4; margin: 0; }',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="col-span-3 bg-card border text-muted-foreground shadow-md rounded-md p-3">
        <div className="mt-5 min-h-[270px] max-h-[270px] overflow-y-auto">
          <DataTable columns={columns} data={cart.items} />
        </div>
        <div className="mt-5 w-full grid grid-cols-5 gap-10">
          <div className="col-span-3 flex flex-col gap-5">
            <Input
              placeholder="Customer name"
              value={custName}
              onChange={(e) => setcustName(e.target.value)}
            />
            <Textarea
              className="bg-card"
              value="Thanks for shopping from computer surgeon"
            />
          </div>
          <div className="col-span-2 space-y-1">
            <div className="flex items-center gap-2 justify-between text-sm">
              <h3>Sub Total :</h3>
              <Input value={totalPrice} className="w-[100px]" type="number" />
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <h3>Received :</h3>
              <Input
                type="number"
                value={Received}
                className="w-[100px]"
                onChange={(e) => setdiscount(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <h3>Discount :</h3>
              <Input value={Discount} className="w-[100px]" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative p-5 col-span-2 min-h-[515px] max-h-[515px] overflow-y-auto bg-card border text-muted-foreground shadow-md rounded-md">
        <Receipt
          componentToPrint={componentToPrint}
          cart={cart}
          Discount={Discount}
          totalPrice={totalPrice}
          Received={Received}
        />
        <div className="flex flex-row gap-3 mt-3">
          <Button onClick={placeOrder}>Save</Button>
          <Button onClick={handlePrint}>Print and Save</Button>
        </div>
      </div>
    </>
  );
};

export default ClientHome;
