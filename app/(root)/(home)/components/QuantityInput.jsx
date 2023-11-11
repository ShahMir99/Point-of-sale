"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/use-cart";
import { Minus, Plus } from "lucide-react";

const QuantityInput = ({ data }) => {

  const cart = useCart()

  const IncrementQauntity = () => {
    if(data.stock === 1){
      return null;
    }
    if(data.stock < data.quantity + 1 ){
      return null;
    }
    cart.increaseQuantity(data.id)
  }
  
  const DecrementQauntity = () => {
    if(data.quantity < 2){
      return null;
    }

    cart.DecreaseQuantity(data.id)
  }

  return (
    <div className="flex flex-row gap-2">
      <Button variant="ghost" className="p-1" onClick={DecrementQauntity}>
        <Minus className="w-4 h-4"/>
      </Button>
      <Input value={data.quantity} className="w-12 text-center" />
      <Button variant="ghost" className="p-1" onClick={IncrementQauntity}>
        <Plus className="w-4 h-4"/>
      </Button>
    </div>
  );
};

export default QuantityInput;
