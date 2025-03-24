"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '800'],
  display: 'swap',
});


const FAQ = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8  font-montserrat md:bg-[url('/iconsFaq/imgFundo.png')] bg-cover bg-center">
      <div className="flex flex-col items-start pt-11 pb-5 md:pl-8">
        <h2 className="text-[18px] md:text-2xl font-bold text-gray-800 mb-10 border-b-2 border-[#702632] pb-2 md:w-72 text-left lg:ml-20">
          {title}
        </h2>
      </div>
      <div className="pt-3 w-5xl">
        <h2 className="font-extralight  text-[20px] md:text-[28px] text-gray pb-5 text-center mb-3">
          Como podemos ajudar?
        </h2>
      </div>
      <div className="flex flex-col items-center min-h-screen ">
        <div className="relative w-full max-w-xl mb-6">
          <input
            type="text"
            placeholder="Descreva o problema"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src="/iconsFaq/Vector.png"
            alt="Ícone"
            className="absolute left-3 top-4 w-5 h-5 text-gray-500"
          />
        </div>
        <div className="pt-8 w-5xl">
          <h2 className="text-[17px] font-semibold text-gray-800 pb-5">
            Pesquisar tópicos de ajuda
          </h2>
        </div>
        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 bg-white border rounded-lg text-left flex justify-between items-center shadow-md hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-l-4 border-[#702632] bg-white shadow-md rounded-b-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
