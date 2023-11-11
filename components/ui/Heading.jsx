import { cn } from '@/lib/utils'
import React from 'react'

const Heading = ({title ,className}) => {
  return (
    <h3 className={cn("text-2xl font-semibold tracking-wide text-muted-foreground",
    className)}
    >
    {title}
    </h3>
  )
}

export default Heading