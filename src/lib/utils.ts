
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Badge } from "@/components/ui/badge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Component to render order status badge
export function GetOrderStatus({ status }: { status: string }) {
  switch (status) {
    case "processing":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processing</Badge>
    case "completed":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
    case "cancelled":
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
