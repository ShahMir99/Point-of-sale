import Prisma from "@/lib/db-Provider";

export const getOrders = async () => {
  const orders = await Prisma.order.findMany({
    include: {
      orderitems : true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const monthlyRevenue = {};
  const monthlyProfit = {};

  for (const order of orders) {
    const months = order.createdAt.getMonth();

    let revenueForOrder = 0;

    revenueForOrder += order.Received;

    let ActualOrderPrice = 0;

    for (const orderitems of order.orderitems) {
      ActualOrderPrice += orderitems.quantity * orderitems.actualPrice;
    }

    monthlyRevenue[months] = (monthlyRevenue[months] || 0) + revenueForOrder;
    monthlyProfit[months] = (monthlyProfit[months] || 0) + ActualOrderPrice;
  }

  const GraphData = [
    { name: "Jan", total: 0, profit: 0 },
    { name: "Feb", total: 0, profit: 0 },
    { name: "March", total: 0, profit: 0 },
    { name: "April", total: 0, profit: 0 },
    { name: "May", total: 0, profit: 0 },
    { name: "June", total: 0, profit: 0 },
    { name: "July", total: 0, profit: 0 },
    { name: "Aug", total: 0, profit: 0 },
    { name: "Sep", total: 0, profit: 0 },
    { name: "Oct", total: 0, profit: 0 },
    { name: "Nov", total: 0, profit: 0 },
    { name: "Dec", total: 0, profit: 0 },
  ];

  for (const month in monthlyRevenue) {

    GraphData[month].total = monthlyRevenue[month];

    for (const month in monthlyProfit) {
      GraphData[month].profit = monthlyRevenue[month] - monthlyProfit[month];
    }
  }

  return { orders, GraphData };
};
