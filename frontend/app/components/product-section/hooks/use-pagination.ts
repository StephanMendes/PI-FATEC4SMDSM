"use client"

import { useState, useCallback } from "react"

interface PaginationProps {
  totalitems: number
  itemsPerPage: number
  initialPage?: number
}

export const usePagination = ({ totalitems, itemsPerPage, initialPage = 0 }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.max(1, Math.ceil(totalitems / itemsPerPage))

  if (currentPage >= totalPages) {
    setCurrentPage(totalPages - 1)
  }

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? prev : prev + 1))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev === 0 ? prev : prev - 1))
  }, [])

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages],
  )

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  }
}
