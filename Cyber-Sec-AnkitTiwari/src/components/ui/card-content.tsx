import { ReactNode } from 'react'

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
