import Prisma from "@/lib/db-Provider"
import ProductClient from "./components/ProductClient"


const Products = async () => {

  const Products = await Prisma.product.findMany({
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedProducts = Products?.map((item) => ({
    id : item.id,
    name : item.name,
    code : item.code,
    price : item.price,
    actualPrice : item.actualPrice,
    stock : item.stock
  }))
  
  return (
    <div className="p-5 bg-card shadow-md rounded-md">
      <ProductClient data={formattedProducts}/>
    </div>
  )
}

export default Products