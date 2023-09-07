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

import { columns, CategoryColumn } from "./columns";


interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    subtitle="Manage categories for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading
                title="API"
                subtitle="API Calls for categories" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    );
};