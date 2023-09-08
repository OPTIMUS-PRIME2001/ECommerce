"use client";

//icons
import { Plus } from "lucide-react";
// Global imports
import { useParams, useRouter } from "next/navigation";

// Local imports
//components
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/customUi/apiList";

import { columns, ProductsColumn } from "./columns";


interface ProductsClientProps {
    data: ProductsColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    subtitle="Manage products for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading
                title="API"
                subtitle="API Calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
};