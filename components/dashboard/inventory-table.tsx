"use client"

import { cn } from "@/lib/utils"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type BookStatus = "in_stock" | "reserved" | "out_of_stock"

interface InventoryBook {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  status: BookStatus
  copies: number
}

interface InventoryTableProps {
  books: InventoryBook[]
}

const statusConfig: Record<BookStatus, { label: string; className: string }> = {
  in_stock: {
    label: "In Stock",
    className: "bg-success/10 text-success",
  },
  reserved: {
    label: "Reserved",
    className: "bg-accent/10 text-accent",
  },
  out_of_stock: {
    label: "Out of Stock",
    className: "bg-destructive/10 text-destructive",
  },
}

export function InventoryTable({ books }: InventoryTableProps) {
  return (
    <div className="rounded-2xl bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="border-b border-border p-6">
        <h3 className="font-semibold text-foreground">Inventory Management</h3>
        <p className="text-sm text-muted-foreground">Manage your library&apos;s book inventory</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Book
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ISBN
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Copies
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {books.map((book) => (
              <tr key={book.id} className="transition-colors hover:bg-secondary/30">
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground">
                  {book.isbn}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                  {book.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                      statusConfig[book.status].className
                    )}
                  >
                    {statusConfig[book.status].label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                  {book.copies}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
