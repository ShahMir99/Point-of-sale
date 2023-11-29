"use client"

import { formatter } from '@/lib/utils'
import { Button } from './ui/button'

const YealySection = ({stock}) => {

const investedPrice = stock.reduce((acc , item) => {
    return acc + item.actualPrice * item.stock
},0)

  return (
    <div className="bg-card w-full p-7 rounded-md shadow-md flex flex-col gap-y-5">
        <div>
          <h4 className="font-semibold text-muted-foreground pb-2 tracking-wider">
            Products Details
          </h4>
          <Button className="h-8 uppercase font-[600] tracking-wider bg-[#ffebc0] text-[#ffc23d] shadow-none hover:bg-primary">
          available stock Amount
          </Button>
        </div>
        <div>
          <h3 className="text-2xl text-muted-foreground font-[600] tracking-wider mt-1">
          {formatter.format(investedPrice)}
          </h3>
        </div>
      </div>
  )
}

export default YealySection