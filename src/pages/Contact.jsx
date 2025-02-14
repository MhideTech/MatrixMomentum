import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://jwt-auth-5.onrender.com/api/contact-us/",
        formData
      );
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="h-60 bg-[url('src/assets/images/about-img.png')] bg-right bg-no-repeat flex flex-col justify-center font-bold">
        <div className="md:w-9/12 mx-auto">
          <h1 className="font-main text-6xl text-white">Contact Us</h1>
          <p className="text-white font-sub text-lg">
            <Link to="/">Home</Link> /{" "}
            <span className="text-[#04CB94]">Contact Us</span>
          </p>
        </div>
      </section>

      <main className="w-11/12 md:w-9/12 mx-auto flex flex-wrap mt-20">
        <div className="w-6/6 lg:w-2/6">
          <h1 className="font-main text-3xl text-white font-bold">
            Let&#39;s Get In Touch
          </h1>
          <div className="my-7 flex items-center gap-5 pe-5">
            <div className="w-14 h-14 text-xl rounded-full bg-[#002A1E] text-white flex justify-center items-center">
              <IoLocationOutline />
            </div>
            <div className="text-[#FFFFFF99] font-bold font-sub">
              <p>
                903/50 Clarence St, <br />
                Sydney NSW 2000, Australia
              </p>
            </div>
          </div>
          <div className="my-7 flex items-center gap-5">
            <div className="w-14 h-14 text-xl rounded-full bg-[#002A1E] text-white flex justify-center items-center">
              <BsTelephone />
            </div>
            <div className="text-[#FFFFFF99] font-bold font-sub">
              <p></p>
              <p></p>
            </div>
          </div>
          <div className="my-7 flex items-center gap-5">
            <div className="w-14 h-14 text-xl rounded-full bg-[#002A1E] text-white flex justify-center items-center">
              <GoMail />
            </div>
            <div className="text-[#FFFFFF99] font-bold font-sub">
              <p>support@matrixmomentum.com</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full lg:w-3/6 mt-10 md:mt-0">
          <div className="mb-3">
            <label className="block text-white font-bold font-main text-xl" htmlFor="name">
              Name
            </label>
            <input
              className="px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094]"
              type="text"
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-7">
            <label className="block text-white font-bold font-main text-xl" htmlFor="email">
              Email
            </label>
            <input
              className="block px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094]"
              type="email"
              id="email"
              placeholder="Email here"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-7">
            <label className="block text-white font-bold font-main text-xl" htmlFor="subject">
              Subject
            </label>
            <input
              className="block px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094]"
              type="text"
              id="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-7">
            <label className="block text-white font-bold font-main text-xl" htmlFor="message">
              Message
            </label>
            <textarea
              className="block px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094] h-60"
              id="message"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          {loading ? (
            <button
              disabled
              className="bg-[#00D094] text-white font-bold py-3 px-6 rounded-lg w-full opacity-50 cursor-not-allowed"
            >
              Sending...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#00D094] text-white font-bold py-3 px-6 rounded-lg w-full"
            >
              Send Message
            </button>
          )}

          {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
        </form>
      </main>

      <div className="h-96 my-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=...your-map-url"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
