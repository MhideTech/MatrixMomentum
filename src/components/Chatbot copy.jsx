function Chatbot() {
  return (
    <div className="w-11/12 mx-auto md:w-96 h-[80vh] rounded-lg bg-red-100 fixed bottom-5 right-5">
      <div className="flex justify-between h-[10vh] px-4 bg-[#1B2D29] items-center gap-3">
        <div className="flex  items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-red-200"></div>
          <div className="text-white">
            <h1 className="font-bold text-lg">MatrixMomentum</h1>
            <p className="text-xs">
              <span>🟢</span> We reply immediately
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="p-1 rounded-full text-xl bg-blue-100">🚦</span>
          <span className="p-1 rounded-full text-xl bg-blue-50">🚦</span>
        </div>
      </div>
      <div className="h-[70vh] bg-white px-4 overflow-y-scroll overflow-x-hidden relative">
        <ul className="mt-1 flex flex-col gap-4">
          <li className="w-fit max-w-[200px] bg-[#1B2D29] text-white rounded-xl py-2 ms-auto px-3">
            Hello
          </li>
          <li className="flex content-baseline">
            <span>🤖</span>
            <p className="w-fit max-w-[250px] bg-[#1B2D29] text-white rounded-xl py-2 px-3">
              We’re busy at the moment. Sorry about that. Leave us your email,
              and we will contact you as soon as possible.
            </p>
          </li>
        </ul>
        <div className="absolute bottom-2 w-full flex w-full">
          <input type="text" placeholder="Type your message here" className="focus:outline-0 px-4 py-2 border-2 rounded-full text-base w-full" />
          <input type="submit" value="Submit" />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
