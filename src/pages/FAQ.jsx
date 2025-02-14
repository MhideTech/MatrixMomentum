import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaMinus, FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";

function FAQ() {
  const [faq, setFaq] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await axios.get(
          "https://jwt-auth-5.onrender.com/api/faqs/"
        );
        setFaq(response.data);
      } catch (err) {
        setError("Failed to fetch FAQs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, []);

  function handleClick(index) {
    setActiveIndex(index === activeIndex ? null : index);
  }

  return (
    <>
      <Navbar />
      <section className="mb-32 mt-20">
        <h1 className="text-white text-4xl font-main font-semibold text-center">
          Most Common FAQ
        </h1>

        {loading && <p className="text-center text-white mt-5">Loading FAQs...</p>}
        {error && <p className="text-center text-red-500 mt-5">{error}</p>}

        {!loading && !error && faq.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-11/12 md:w-9/12 gap-5 mx-auto auto-rows-auto mt-20">
            {faq.map((item, index) => (
              <div
                className={`p-4 border rounded-lg transition-all duration-1000 text-white font-sub ${
                  activeIndex === index ? "h-auto" : "h-[120px] overflow-hidden"
                }`}
                key={item.id}
              >
                <div
                  className="flex justify-between items-center gap-3 cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  <p className="font-bold text-lg">{item.question}</p>
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
                <div
                  className={`transition-all duration-1000 mt-5 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  {activeIndex === index && <p>{item.answer}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default FAQ;
