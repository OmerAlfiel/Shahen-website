"use client"

import { useState, useCallback } from "react"
import * as api from "@/services/api"

export function useApi<T extends (...args: any[]) => Promise<any>>(apiFunction: T) {
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setLoading(true)
      setError(null)

      try {
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred")
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [apiFunction],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}

// Specific hooks for common API calls
export function useCreateOrder() {
  return useApi(api.createOrder)
}

export function useGetQuote() {
  return useApi(api.getQuote)
}

export function useTrackOrder() {
  return useApi(api.trackOrder)
}

export function useTruckTypes() {
  return useApi(api.getTruckTypes)
}
