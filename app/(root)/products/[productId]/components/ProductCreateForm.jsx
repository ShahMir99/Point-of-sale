"use client"

import * as z from "zod"

import Heading from "@/components/ui/Heading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name : z.string().min(1),
  code : z.string().min(1),
  price : z.coerce.number().min(1),
  actualPrice : z.coerce.number().min(1),
  stock : z.coerce.number(),
})

const ProductCreateForm = ({productById}) => {

  const [Loading , setLoading] = useState(false)

  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()

  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : productById || {
      name : "",
      code : "",
      price : 0,
      actualPrice : 0,
      stock : 0
    }
  })

  const Title = productById ? "Update product" : "Create product";
  const Toast = productById ? "Product updated" : "Product created";
  const BtnAction = productById ? "Save changes" : "Created product";

  const onsubmit = async (values) => {
      try{ 
        setLoading(true)
        if(productById){
          await axios.patch(`/api/product/${params.productId}` , values)
        }else{
          await axios.post('/api/product' , values)
        }
        router.refresh()
        router.push("/products")
        
        toast({
          title : Toast
        })
        
      }catch(err){
        toast({
          variant : "destructive",
          title : "Warning",
          description : err?.response?.data
        })
        setLoading(false)
      }
  }


  return (
    <div className="flex-col space-y-5">
        <Heading title={Title} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Product Name</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="code"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Product Code</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Product Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="actualPrice"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Actual Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="stock"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Product Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <Button className="text-white" disabled={Loading}>{BtnAction}</Button>
          </form>
        </Form>
    </div>
  )
}

export default ProductCreateForm