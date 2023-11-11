import useCart from '@/hooks/use-cart'
import React from 'react'

const Close = ({id}) => {
    const cart = useCart()
  return (
    <div onClick={() => cart.removeItem(id)} className='cursor-pointer'>X</div>
  )
}

export default Close