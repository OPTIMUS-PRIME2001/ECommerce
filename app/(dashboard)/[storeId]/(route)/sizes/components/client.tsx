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

import { columns, SizeColumn } from "./columns";


interface SizesClientProps {
    data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    subtitle="Manage sizes for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading
                title="API"
                subtitle="API Calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    );
};