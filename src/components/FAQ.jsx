import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What services does StudyWisdom offer?",
      answer:
        "StudyWisdom connects you with experienced mentors who provide personalized guidance for your studies and career. We also offer a platform where you can buy and sell notes, modules, and other study materials with ease.",
    },
    {
      id: 2,
      question: "How do I find a mentor on StudyWisdom?",
      answer:"It's simple! Just browse through our list of mentors, check their profiles for expertise areas, and book a session with the mentor that fits your needs."    },
    {
      id: 3,
      question: "Can I sell my old notes on StudyWisdom?",
      answer:"Yes! StudyWisdom allows you to list your old notes, modules, and other study materials for sale. Simply upload the material and set your price to help others in their studies."    },
    {
      id: 4,
      question: " Is there a fee for mentorship or selling notes?",
      answer:"Mentorship sessions are priced by the individual mentors, and StudyWisdom takes a small service fee. For selling notes, we charge a minimal platform fee to keep things running smoothly."    },
    {
      id: 5,
      question: " How can I ensure the quality of mentors or study materials?",
      answer:"We carefully vet all our mentors and allow users to rate and review them based on their experiences. For study materials, users can also leave reviews to help others make informed decisions."    },
  ];
  const [show, setShow] = useState(1);

  return (
    <div className="space-y-5 w-full bg-neutral-200  dark:bg-gray-900 dark:text-gray-200  px-2 lg:px-4  py-3 m-auto">
      <h5 className="text-[30px] sm:ps-4">FAQ's</h5>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          return (
            <button
              key={index}
              className=" md:px-3 block  w-full text-xs hover:scale-[1.01] duration-300 md:text-xl"
            >
              <div
                onClick={() => {
                  setShow(faq.id == show ? 0 : faq.id);
                }}
                className={`bg-neutral-300 dark:bg-gray-950 ${
                  faq.id == show ? "rounded-t-md" : "rounded-md "
                }  flex items-center justify-between py-2 px-3 `}
              >
                <p>{faq.question}</p>
                <IoIosArrowDown
                  className={`${
                    faq.id == show ? "-rotate-180" : "rotate-0"
                  } duration-300`}
                />
              </div>
              <div
                className={`${
                  faq.id == show
                    ? "h-fit py-5 visible rounded-b-md "
                    : "h-0 py-0 invisible rounded-md "
                } bg-neutral-300 dark:bg-gray-950 duration-300  flex items-center justify-between px-3 `}
              >
                <p
                  className={`${
                    faq.id == show ? "visible" : " invisible"
                  } text-start`}
                >
                  {faq.answer}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
