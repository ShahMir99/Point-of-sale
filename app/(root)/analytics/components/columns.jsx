"use client";

import ProductArray from "./ProductArray";
import DateComp from "./DateComp";
import { formatter } from "@/lib/utils";
import CellActions from "./CellAction";


export const columns = [
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "product",
    header: "Product",
    cell : ({row}) => <ProductArray data={row.original.product}/>
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell : ({row}) => (
      <div>
        {formatter.format(row.original.totalPrice)}
      </div>
    )
  },
  {
    accessorKey: "actual",
    header: "Profit",
    cell : ({row}) => (
      <div>
        {formatter.format(row.original.totalPrice - row.original.actual)}
      </div>
    )
  },
  {
    accessorKey: "isPaid",
    header: "Paid Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell : ({row}) => <DateComp data={row.original}/>
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell : ({row}) => <CellActions data={row.original}/>
  }
];
