import UserButton from "./UserButton";
import getCurrentUser from "@/actions/getUser";
import NavSearch from "./NavSearch";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-full h-10 border-b mb-5 flex items-center p-8 rounded-md shadow-md bg-card">
      <NavSearch />
      <UserButton user={user} />
    </div>
  );
};

export default Navbar;
