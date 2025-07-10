"use client"

import React, { createContext, useContext, ReactNode, useState } from 'react'

type PageHeader = {
  title: string
  subtitle?: string
}

type PageHeaderContextType = {
  pageHeader: PageHeader
  setPageHeader: React.Dispatch<React.SetStateAction<PageHeader>>
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined)

export function usePageHeader() {
  const context = useContext(PageHeaderContext)
  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider')
  }
  return context
}

interface PageHeaderProviderProps {
  children: ReactNode
  initialHeader?: PageHeader
}

export function PageHeaderProvider({ children, initialHeader }: PageHeaderProviderProps) {
  const [pageHeader, setPageHeader] = useState<PageHeader>(
    initialHeader || {
      title: "Dashboard",
      subtitle: "Welcome back! Here's what's happening today."
    }
  )

  return (
    <PageHeaderContext.Provider value={{ pageHeader, setPageHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}
