import Link from "next/link";
import React from "react";

const SidebarItems = ({ href, label, Icon, pathname }) => {
  return (
    <div className={` transition ${pathname ? "rounded-md bg-primary-foreground  hover:none" : "hover:bg-primary-foreground  rounded-md"} p-3`}>
      <Link className="flex gap-x-2 items-center justify-start" href={href}>
        <Icon className={`h-5 w-5 ${pathname ? "text-white" : "text-muted-foreground"}`}/>
        <p className={`text-[16px] ${pathname ? "text-white" : " text-muted-foreground"}`}>{label}</p>
      </Link>
    </div>
  );
};

export default SidebarItems;