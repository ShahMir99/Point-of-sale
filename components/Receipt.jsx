import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatter } from "@/lib/utils";

const Receipt = ({ componentToPrint, cart, totalPrice, Received, Discount }) => {
  return (
    <div ref={componentToPrint} className="space-y-3 flex flex-col w-full flex-1">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-muted-foreground">INVOICE</h1>
        <h3 className="font-semibold text-muted-foreground">
          <span className="text-blue-500">Computer</span> Surgeon
        </h3>
      </div>
      <div>
        <h3 className="font-semibold">Shop Adress</h3>
        <p className="text-xs">Pull anwar shaheed coloney</p>
        <p className="text-xs">Renala Khurd, Okara</p>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[170px]">Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-end">
          <p className="text-xs">Total Amount :</p>&nbsp;
          <h3 className="text-xs font-semibold text-muted-foreground">
            {formatter.format(totalPrice)}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Received :</p>&nbsp;
          <h3 className="text-xs font-semibold text-muted-foreground">
            {formatter.format(Received)}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Discount :</p>&nbsp;
          <h3 className="text-xs font-semibold text-muted-foreground">
            {formatter.format(Discount)}
          </h3>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-[#dddddd] rounded-md">
        <p className="text-xs text-black">
          Thanks for shopping from computer surgeon
        </p>
      </div>
    </div>
  );
};

export default Receipt;
