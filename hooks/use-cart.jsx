import { toast } from "@/components/ui/use-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItems: (data) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          return toast({
            title: "i'm Already in the cart.",
          });
        }

        set({
          items: [...get().items, data],
        });

        toast({
          title: "Product added to Cart",
        });
      },

      increaseQuantity : (itemId) => {
        set((state) => ({
         items : state.items.map((item) => (
          item.id === itemId ? {...item , quantity : item.quantity + 1 } : {...item}
         ))
        }))
      },

      DecreaseQuantity : (itemId) => {
        set((state) => ({
         items : state.items.map((item) => (
          item.id === itemId ? {...item , quantity : item.quantity - 1 } : {...item}
         ))
        }))
      },

      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast({
          title : "Item Remove from cart."
        });
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
