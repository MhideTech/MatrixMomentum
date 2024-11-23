import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <section className="w-9/12 mx-auto grid md:grid-cols-3 gap-x-10 mt-20">
        <Sidebar />
        <section className="col-span-2 bg-[#1B2D29] p-10">
          <Outlet />
        </section>
      </section>
    </>
  );
}

export default Dashboard;
