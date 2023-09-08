import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import {formatter} from "@/lib/utils";

// Components for Data Table
import { OrdersColumn } from "./components/columns"
import { OrdersClient } from "./components/client";

const OrderPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // find all the orders and show them in the datatable we create
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
      orderItems:{
        include:{
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format the orders object array into new arraw according to data table column
  const formattedOrders: OrdersColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(','),
    totalPrice: formatter.format(item.orderItems.reduce((total, item)=>{
        return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;