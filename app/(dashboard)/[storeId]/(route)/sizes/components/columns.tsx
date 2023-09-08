"use client"
//Global imports
import { ColumnDef } from "@tanstack/react-table"

// Local imports
import { CellAction } from "./cellActions"

export type SizeColumn = {
  id: string
  name: string;
  value:string;
  createdAt: string;
}

// Columns of the data table
export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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