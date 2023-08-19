"use client"
//Global imports
import { ColumnDef } from "@tanstack/react-table"

// Local imports
import { CellAction } from "./cellActions"

export type BillboardColumn = {
  id: string
  label: string;
  createdAt: string;
}

// Columns of the data table
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];