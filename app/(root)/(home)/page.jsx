import ClientHome from "./components/ClientHome";

export const metadata = {
  title: "Home",
};

const page = async () => {
  return (
    <div className="w-full grid grid-cols-5 gap-5 ">
      <ClientHome />
    </div>
  );
};

export default page;
