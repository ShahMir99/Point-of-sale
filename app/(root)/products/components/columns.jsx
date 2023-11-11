"use client";

import { Checkbox } from "@/components/ui/checkbox";
import CellActions from "./CellActions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  },
  {
    accessorKey: "actualPrice",
    header: "Actual Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
