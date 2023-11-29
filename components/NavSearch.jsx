"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useCart from "@/hooks/use-cart";
import { toast } from "./ui/use-toast";

const NavSearch = () => {
  const [products, setProducts] = useState([]);
  const cart = useCart()


  const searchByKey = async (e) => {
    try {
      const { data } = await axios.get(`/api/product?search=${e}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelect = (product) => {
    if(product.stock < 1){
      toast({
        variant : "destructive",
        title : "This product is out of Stock"
      })
      return null
    }
    const cartItem = {
      id : product.id,
      name : product.name,
      code : product.code,
      stock : product.stock,
      quantity : 1,
      price : product.price,
      actualPrice : product.actualPrice
    }
    cart.addItems(cartItem)
    setProducts([]);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <Search className="w-6 h-6 text-muted-foreground" />
      <div className=" md:w-[50%] w-[80%] relative text-muted-foreground">
        <Input
          className="w-full text-md placeholder:text-md "
          placeholder="Search"
          onChange={(e) => searchByKey(e.target.value)}
        />
        {products.length ? (
          <div className="absolute z-10 bg-card w-full mt-1 shadow-md rounded-md max-h-[300px] overflow-y-auto">
            <div className=" p-2 flex items-center justify-between font-semibold">
              <h2>Name</h2>
              <h2>Code</h2>
            </div>
            {products.map((item) => (
              <div key={item.id}>
                <div
                  onClick={() => onSelect(item)}
                  className="p-2 hover:bg-card-foreground hover:rounded-md flex items-center justify-between cursor-pointer py-3"
                >
                  <h2 className="text-sm text-muted-foreground ">
                    {item.name}
                  </h2>
                  <h2 className="text-sm text-muted-foreground ">
                    {item.code}
                  </h2>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavSearch;
