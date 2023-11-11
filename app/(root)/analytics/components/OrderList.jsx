"use client"

import Heading from "@/components/ui/Heading"
import { DataTable } from "../../products/components/table-data"
import { columns } from "./columns"

const OrderList = ({formatedOrders}) => {

  return (
    <div className=" flex flex-col text-muted-foreground space-y-4">
    <Heading title="Order Details" />
      <DataTable searchKey="customerName" data={formatedOrders} columns={columns}/>
    </div>
  )
}

export default OrderList