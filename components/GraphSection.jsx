"use client";
import { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";;

const GraphSection = ({GraphData}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AreaChart width={650} height={250} data={GraphData}>
      <XAxis dataKey="name" fontSize={12}/>
      <YAxis fontSize={12}/>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#696cff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#696cff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#03c3ec" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#03c3ec" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip />
      <Area
        type="monotone"
        dataKey="total"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="profit"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

export default GraphSection;
