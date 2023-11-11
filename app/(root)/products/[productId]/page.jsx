import Prisma from '@/lib/db-Provider'
import ProductCreateForm from './components/ProductCreateForm'

const ProductId = async ({params}) => {
  
  const ProductById = await Prisma.product.findFirst({
    where : {
      id : params.productId
    }
  })


  return (


    <div className="p-5 bg-card shadow-md rounded-md">
        <ProductCreateForm productById={ProductById}/>
    </div>
  )
}

export default ProductId