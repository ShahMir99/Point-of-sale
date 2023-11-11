"use client"

import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'

const YealySection = ({GraphData}) => {

  const CurrentYear = new Date().getFullYear()

  const YealySale = GraphData.reduce((acc , item) => {
    return acc + item.total
},0)

  return (
    <div className="bg-card w-full p-7 rounded-md shadow-md flex flex-col gap-y-5">
        <div>
          <h4 className="font-semibold text-black pb-2 tracking-wider">
            Profile Report
          </h4>
          <Button className="rounded-full h-8 uppercase font-[600] tracking-wider bg-[#fff6e2] text-[#ffc23d] shadow-none hover:bg-primary">
            Year {CurrentYear}
          </Button>
        </div>
        <div>
          <h3 className="text-2xl text-muted-foreground font-[600] tracking-wider mt-2">
          {YealySale} PKR
          </h3>
        </div>
      </div>
  )
}

export default YealySection