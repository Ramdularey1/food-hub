import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const FAQItem = ({ index, question, answer, activeIndex, handleClick }) => {
  return (
    <div
      key={index}
      className="border rounded-md shadow-sm group border-gray-500 bg-slate-950  max- mx-auto hover:border-orange-950 overflow-hidden w-full max-w-4xl"
    >
      <button
        className="flex justify-between items-center p-4 text-left font-medium focus:outline-none w-full"
        onClick={() => handleClick(index)}
      >
        <h3 className="text-gray-200 text-sm sm:text-base font-light">
          {question}
        </h3>
        <span>
          {activeIndex === index ? (
            <IoIosArrowDropdown
              className="text-gray-400 group-hover:translate-x-1 transition-transform delay-100 ease-in-out"
              fontSize={"1.5rem"}
            />
          ) : (
            <IoIosArrowDropup
              className="text-gray-400 group-hover:translate-x-1 transition-transform delay-100 ease-in-out"
              fontSize={"1.5rem"}
            />
          )}
        </span>
      </button>
      {activeIndex === index && (
        <div className="p-4 text-gray-300 text-sm sm:text-base font-light bg-slate-900 border-t border-gray-500 ">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
