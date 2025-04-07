
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get order status badge props
export function getOrderStatusProps(status: string): { variant: "outline", className: string, children: string } {
  switch (status) {
    case "processing":
      return {
        variant: "outline",
        className: "bg-blue-100 text-blue-800 border-blue-300",
        children: "Processing"
      };
    case "completed":
      return {
        variant: "outline",
        className: "bg-green-100 text-green-800 border-green-300",
        children: "Completed"
      };
    case "pending":
      return {
        variant: "outline",
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        children: "Pending"
      };
    case "cancelled":
      return {
        variant: "outline",
        className: "bg-red-100 text-red-800 border-red-300",
        children: "Cancelled"
      };
    default:
      return {
        variant: "outline",
        className: "",
        children: status
      };
  }
}
