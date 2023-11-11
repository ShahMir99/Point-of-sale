"use client";

import {
  ArrowDown,
  ArrowUp,
  Folder,
  LineChart,
  MoreVertical,
  Package,
  PieChart,
} from "lucide-react";
import { Button } from "./ui/button";
import YealySection from "./Yealy-section";

const AnalyticSection = ({ stock, GraphData, orders }) => {
  let date = new Date();
  let month = date.getMonth();
  let lastmonth = date.getMonth() - 1;

  // To calculate sale percentage Compare to previos Month
  const TotalLastMonthSale = GraphData[lastmonth].total || 1;
  const TotalThisMonthSale = GraphData[month].total || 1;

  const SalePercentage =((TotalThisMonthSale - TotalLastMonthSale) / TotalLastMonthSale) * 100;
  const SPValue = Math.min(SalePercentage, 100);

  // To calculate Profit percentage Compare to previos Month

  const TotalLastMonthProfit = GraphData[lastmonth].profit || 1;
  const TotalThisMonthProfit = GraphData[month].profit || 1;

  const ProfitPercentage =
    ((TotalThisMonthProfit - TotalLastMonthProfit) / TotalLastMonthProfit) *
    100;
  const PPValue = Math.min(ProfitPercentage, 100);

  return (
    <div className="row-span-3 col-span-full lg:col-span-4 p-2 ">
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
        {/* firs Box */}

        <div className="bg-card p-5 flex flex-col gap-y-3 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#04c3ec] p-3">
              <LineChart className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Sales</p>
            <h3 className="text-lg text-muted-foreground font-semibold  tracking-wide">
              {GraphData[month].total} PKR
            </h3>
          </div>
          {PPValue > -1 ? (
            <div className="flex gap-2 text-[#8bd663] text-sm">
              <ArrowUp className="h-4 w-4" />
              <p>{PPValue.toFixed(1)} %</p>
            </div>
          ) : (
            <div className="flex gap-2 text-[#e43c3c] text-sm">
              <ArrowDown className="h-4 w-4" />
              <p>{PPValue.toFixed(1)} %</p>
            </div>
          )}
        </div>
        
        {/* Second Box */}

        <div className="bg-card p-5 flex flex-col gap-y-3 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#a1da83] p-3">
              <PieChart className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Profit</p>
            <h3 className="text-lg text-muted-foreground font-semibold tracking-wide">
              {GraphData[month].profit} PKR
            </h3>
          </div>
          {SPValue > -1 ? (
            <div className="flex gap-2 text-[#8bd663] text-sm">
              <ArrowUp className="h-4 w-4" />
              <p>{SPValue.toFixed(1)} %</p>
            </div>
          ) : (
            <div className="flex gap-2 text-[#e43c3c] text-sm">
              <ArrowDown className="h-4 w-4" />
              <p>{SPValue.toFixed(1)} %</p>
            </div>
          )}
        </div>
        
        {/* Third Box */}

        <div className="bg-card p-5 flex flex-col gap-y-3 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#ff3e1d] p-3">
              <Package className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Products</p>
            <h3 className="text-xl text-muted-foreground font-semibold  tracking-wide">
              {stock}
            </h3>
          </div>
        </div>
        {/* Fouth Box */}

        <div className="bg-card p-5 flex flex-col gap-y-3 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#696cff] p-3">
              <Folder className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Orders</p>
            <h3 className="text-xl text-muted-foreground font-semibold  tracking-wide">
              {orders.length}
            </h3>
          </div>
        </div>
      </div>
      <YealySection GraphData={GraphData} />
    </div>
  );
};

export default AnalyticSection;
