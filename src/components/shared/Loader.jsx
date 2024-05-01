import { TbLoader3 } from "react-icons/tb";

const Loader = () => {
  return (
    <section className="w-screen h-screen bg-black flex justify-center items-center">
      <TbLoader3 className="animate-spin text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 " />
    </section>
  );
};

export default Loader;
