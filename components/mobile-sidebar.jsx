"use client"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import SideMenu from "./SideMenu"


const MobileSidebar = () => {

  const [isOpen , setIsOpen] = useState(false)

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
        <Menu onClick={() => setIsOpen(true)} className="lg:hidden flex-shrink-0 h-5 cursor-pointer w-5 mr-4 text-black dark:text-white" />
        </SheetTrigger>
        <SheetContent side="left" className="text-black dark:text-white h-full py-5 bg-card">
            <SideMenu/>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar