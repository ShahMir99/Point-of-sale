"use client";

import { BoxIcon, Computer, DollarSign, FolderPlus, Settings } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import SidebarItems from "./SidebarItems";

const SideMenu = () => {
  const params = useParams();
  const pathName = usePathname();

  const route = [
    {
      href: `/`,
      label: "Pos",
      icon: Computer,
      pathname: pathName === "/",
    },
    {
      href: `/analytics`,
      label: "Analytic",
      icon: DollarSign,
      pathname: pathName === "/analytics",
    },
    {
      href: `/products`,
      label: "Products",
      icon: BoxIcon,
      pathname: pathName === "/products",
    },
    {
      href: `/products/new`,
      label: "Add product",
      icon: FolderPlus,
      pathname: pathName === "/products/new",
    },
    {
      href: `/settings`,
      label: "Account Settings",
      icon: Settings,
      pathname: pathName === "/settings",
    },
  ];
  return (
    <div className="w-full flex-col space-y-2">
    <h2 className="my-3 text-2xl font-bold text-center text-muted-foreground">Point of sale</h2>
    <p className="text-sm pb-3 px-2 text-muted-foreground">Menu</p>
      {route.map((route) => (
        <SidebarItems
          key={route.href}
          href={route.href}
          label={route.label}
          pathname={route.pathname}
          Icon={route.icon}
        />
      ))}
    </div>
  );
};

export default SideMenu;
