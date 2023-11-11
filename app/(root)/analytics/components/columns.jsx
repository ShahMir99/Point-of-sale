"use client";

import ProductArray from "./ProductArray";
import DateComp from "./DateComp";


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
  },
  {
    accessorKey: "actual",
    header: "Profit",
    cell : ({row}) => (
      <div>
        {row.original.totalPrice - row.original.actual}
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
  }
];
