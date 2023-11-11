"use client";

import { signOut } from "next-auth/react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Github, LogOut, Settings } from "lucide-react";
import { ModeToggle } from "./Toggle-mode";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserButton = ({ user }) => {

  const router = useRouter()

  return (
    <div className="ml-auto flex items-center gap-5">
      <div>
      <Link href="https://github.com/ShahMir99" target="_blank">
        <Github className="w-6 h-6 text-muted-foreground cursor-pointer"/>
      </Link>
      </div>

      <div>
        <ModeToggle />
      </div>

      <div className="text-muted-foreground cursor-pointer">
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-muted-foreground">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80 flex-col bg-card mr-10 space-y-3 pb-10 text-muted-foreground">
            <div className="flex items-center justify-start gap-3">
              <div>
                <Avatar className="w-11 h-11">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="text-black text-xl">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div>
                  <h2 className="text-lg font-semibold">Shah Mir</h2>
                  <p className=" text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div onClick={() => router.push("/settings")} className="hover:bg-card-foreground rounded-md p-3 flex gap-7 cursor-pointer">
                <Settings className="w-5 h-5" />
                <p className="text-[14px] ">Manage account</p>
              </div>
              <div
                onClick={() => signOut()}
                className="hover:bg-card-foreground rounded-md p-3 flex gap-7 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <p className="text-[14px] ">Sign out</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserButton;
