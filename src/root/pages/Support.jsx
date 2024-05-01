import React, { useState, useEffect } from "react";
import { swiggyFaqs } from "../../utils/constants";
import FAQItem from "../../components/shared/FAQItem";
import { v4 as uuidv4 } from "uuid";

const Support = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(index);
  };

  return(
    <div className="flex justify-center flex-col space-y-5 w-full px-2 mx-auto place-items-center mt-[130px]">
      <div className="select-none text-2xl sm:text-3xl flex gap-3 items-center font-light text-white p-2 rounded-md md:text-4xl">
        <span className="font-berkshire text-[#d74112]">Help & Support</span>
      </div>
      {swiggyFaqs.map((faq, index) => (
        <FAQItem
          key={uuidv4()}
          index={index}
          question={faq.question}
          answer={faq.answer}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Support;