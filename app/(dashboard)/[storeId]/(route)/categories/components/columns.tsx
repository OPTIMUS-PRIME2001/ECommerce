"use client"
//Global imports
import { ColumnDef } from "@tanstack/react-table"

// Local imports
import { CellAction } from "./cellActions"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

// Columns of the data table
export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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