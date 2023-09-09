"use client";

//icons
import { Plus } from "lucide-react";

// Local imports
//components
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrdersColumn } from "./columns";


interface OrdersClientProps {
    data: OrdersColumn[];
}

export const OrdersClient: React.FC<OrdersClientProps> = ({
    data
}) => {

    return (
        <>

            <Heading
                title={`Orders (${data.length})`}
                subtitle="Manage Orders for your store" />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
            {/* <Heading title="API" subtitle="API Calls for orders" />
            <Separator />
            <ApiList entityName="orders" entityIdName="orderId" /> */}
        </>
    );
};