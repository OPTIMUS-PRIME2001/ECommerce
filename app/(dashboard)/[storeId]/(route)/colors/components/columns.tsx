"use client"
//Global imports
import { ColumnDef } from "@tanstack/react-table"

// Local imports
import { CellAction } from "./cellActions"

export type ColorColumn = {
  id: string
  name: string;
  value:string;
  createdAt: string;
}

// Columns of the data table
export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}}/>
      </div>
    )
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