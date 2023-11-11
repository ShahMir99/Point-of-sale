import getCurrentUser from "@/actions/getUser";
import Login from "@/components/Login";
import Prisma from "@/lib/db-Provider";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Auth',
}

const Auth = async () => {

  const checkUser = await Prisma.user.findFirst({
    where : {
      role : "admin"
    }
  })

  if(!checkUser){
    return redirect("/auth/register");
  }

  const user = await getCurrentUser()

  if(user){
    return redirect("/")
  }

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <div className="w-[30%] bg-card p-8 rounded-md">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
