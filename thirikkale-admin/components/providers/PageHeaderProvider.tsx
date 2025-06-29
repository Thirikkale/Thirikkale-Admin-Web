"use client"

import React, { createContext, useContext, ReactNode } from 'react'

type PageHeader = {
  title: string
  subtitle?: string
}

type PageHeaderContextType = {
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
  setPageHeader: React.Dispatch<React.SetStateAction<PageHeader>>
}

export function PageHeaderProvider({ children, setPageHeader }: PageHeaderProviderProps) {
  return (
    <PageHeaderContext.Provider value={{ setPageHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}
