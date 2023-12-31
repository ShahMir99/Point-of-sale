"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const CellActions = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();

  const OnDelete = async () => {
    try {
      await axios.delete(`/api/product/${data.id}`);
      toast({
        title: "Product Deleted Successfully",
      });
      router.refresh();
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          <Copy className="w-4 h-4 mr-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/products/${data.id}`)}>
          <Pencil className="w-4 h-4 mr-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={OnDelete}>
          <Trash className="w-4 h-4 mr-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
