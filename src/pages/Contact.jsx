import { BrowserRouter, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";

function Contact() {
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
          <div className="flex gap-5 mt-6">
            <div className="w-10 h-10 text-xl rounded-full border-2 border-[hsla(0,0%,100%,.1)] flex justify-center items-center">
              😂
            </div>
            <div className="w-10 h-10 text-xl rounded-full border-2 border-[hsla(0,0%,100%,.1)] flex justify-center items-center">
              🥹
            </div>
            <div className="w-10 h-10 text-xl rounded-full border-2 border-[hsla(0,0%,100%,.1)] flex justify-center items-center">
              🙏
            </div>
            <div className="w-10 h-10 text-xl rounded-full border-2 border-[hsla(0,0%,100%,.1)] flex justify-center items-center">
              🎉
            </div>
            <div className="w-10 h-10 text-xl rounded-full border-2 border-[hsla(0,0%,100%,.1)] flex justify-center items-center">
              🤲
            </div>
          </div>
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
              <p>+234843744594848</p>
              <p>+234843744594848</p>
            </div>
          </div>
          <div className="my-7 flex items-center gap-5">
            <div className="w-14 h-14 text-xl rounded-full bg-[#002A1E] text-white flex justify-center items-center">
              <GoMail />
            </div>
            <div className="text-[#FFFFFF99] font-bold font-sub">
              <p>mail@gmail.com</p>
              <p>mail@yahoo.com</p>
            </div>
          </div>
        </div>
        <form action="" className="w-full lg:w-3/6 mt-10 md:mt-0">
          <div className="mb-3">
            <label
              className="block text-white font-bold font-main text-xl"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094]"
              type="text"
              id="name"
              placeholder="Full Name"
            />
          </div>
          <div className="my-7">
            <label
              className="block text-white font-bold font-main text-xl"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094]"
              type="email"
              id="email"
              placeholder="Email here"
            />
          </div>
          <div className="my-7">
            <label
              className="block text-white font-bold font-main text-xl"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="block px-5 mt-2 text-white font-sub py-4 w-full rounded-lg bg-[#1B2D29] focus:outline-none border focus:border-[#00D094] h-60"
              type="text"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Contact;
