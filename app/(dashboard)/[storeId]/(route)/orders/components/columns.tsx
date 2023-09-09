"use client"
//Global imports
import { ColumnDef } from "@tanstack/react-table"


export type OrdersColumn = {
  id: string;
  phone : string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

// Columns of the data table
export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />
  // },
];