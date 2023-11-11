"use client"

import { Input } from "@/components/ui/input"

const PriceInput = ({data}) => {

  return (
    <Input 
        value={data.price}
        className="w-20"
    />
  )
}

export default PriceInput