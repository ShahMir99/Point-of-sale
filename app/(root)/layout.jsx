import getCurrentUser from "@/actions/getUser";
import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import Prisma from "@/lib/db-Provider";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  const checkUser = await Prisma.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (!checkUser) {
    return redirect("/auth/register");
  }

  if (!user?.id) {
    return redirect("/auth");
  }

  return (
    <>
      <div className="w-full h-screen bg-background overflow-hidden flex flex-row">
        <div className="hidden lg:block lg:w-72 h-full p-5 bg-card shadow-md">
          <SideMenu />
        </div>
        <div className="flex-1 w-full h-full p-5 overflow-y-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}
