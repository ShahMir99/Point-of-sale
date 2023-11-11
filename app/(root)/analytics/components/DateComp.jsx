"use client"

import { format } from "date-fns"

const DateComp = ({data}) => {

  return (
    <div>
        {
            format(data.createdAt , "MMMM do, yyyy")
        }
    </div>
  )
}

export default DateComp