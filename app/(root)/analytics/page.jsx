import AnalyticSection from "@/components/Analytic-section";
import GraphSection from "@/components/GraphSection";
import InfoBox from "@/components/Info-box";
import OrderList from "./components/OrderList";
import { getOrders } from "@/actions/getOrders";
import { getStockCount } from "@/actions/get-stock";
import { formatter } from "@/lib/utils";

const page = async () => {
  const { orders, GraphData } = await getOrders();
  const stock = await getStockCount();

  const formatedOrders = orders.map((item) => ({
    id: item.id,
    customerName: item.custName,
    product: item.orderitems.map((orderitem) => ({
      items: orderitem.name,
      quantity: orderitem.quantity,
    })),
    totalPrice: item.Received,
    actual: item.orderitems.reduce((acc, item) => {
      return acc + item.actualPrice * item.quantity;
    }, 0),
    isPaid: item.isPaid,
    createdAt: item.createdAt,
  }));


  let todaySalesTotal = 0;
  let yesterdaySalesTotal = 0;

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();
  const currentDatePart = currentDateString.split("T")[0];

  const previousDate = new Date(currentDate.getTime() - 86400000);
  const previousDateString = previousDate.toISOString();
  const previousDatePart = previousDateString.split("T")[0];

  for (const order of orders) {
    const orderDate = order.createdAt.toISOString();
    const saleDatePart = orderDate.split("T")[0];

    if (currentDatePart === saleDatePart) {
      todaySalesTotal += order.Received;
    }
    if (previousDatePart === saleDatePart) {
      yesterdaySalesTotal += order.Received;
    }
  }

  return (
    <>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
        <InfoBox today={todaySalesTotal} lastday={yesterdaySalesTotal} />
        <AnalyticSection stock={stock} GraphData={GraphData} orders={orders} />
        <div className="bg-card col-span-full lg:col-span-8 shadow-md rounded-md">
          <div className="mb-2 p-5">
            <h3 className="text-xl text-muted-foreground font-semibold ">
              Total Revenue
            </h3>
          </div>
          <div className="overflow-x-auto lg:overflow-hidden">
            <GraphSection GraphData={GraphData} />
          </div>
        </div>
      </div>
      <div className="bg-card text-muted-foreground p-5 shadow-md rounded-md">
        <OrderList formatedOrders={formatedOrders} />
      </div>
    </>
  );
};

export default page;
