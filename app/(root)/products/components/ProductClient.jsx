import React from 'react'
import { columns } from './columns'
import Heading from '@/components/ui/Heading'
import { DataTable } from './table-data'


const ProductClient = ({data}) => {
  return (
    <div className='flex-col space-y-5'>
        <Heading title={`Products (${data?.length})`} />
        <DataTable searchKey="name" columns={columns} data={data}/>
    </div>
  )
}

export default ProductClient