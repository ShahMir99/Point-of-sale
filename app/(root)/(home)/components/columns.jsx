"use client";

import Close from "./Close";
import PriceInput from "./PriceInput";
import QuantityInput from "./QuantityInput";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <PriceInput data={row.original}/>
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <QuantityInput data={row.original}/>
  },
  {
    id: "delete",
    cell : ({row}) => <Close id={row.original.id}/>
  },
];
