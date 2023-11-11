import Register from "@/components/register";
import Prisma from "@/lib/db-Provider";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Register',
}

const Auth = async () => {

  const checkUser = await Prisma.user.findFirst({
    where : {
      role : "admin"
    }
  })

  if(checkUser){
    return redirect("/");
  }

  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-[30%] bg-card p-8 rounded-md">
       <Register />
      </div>
    </div>
  );
};

export default Auth;
