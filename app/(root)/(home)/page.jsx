import ClientHome from "./components/ClientHome";

export const metadata = {
  title: "Home",
};

const page = async () => {
  return (
    <div className="flex flex-col gap-y-5 w-full md:grid md:grid-cols-5 md:gap-5 ">
      <ClientHome />
    </div>
  );
};

export default page;
