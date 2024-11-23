import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import TermOfUse from "./pages/TermOfUse";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import MakeDeposit from "./pages/MakeDeposit";
import Deposits from "./pages/Deposits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/term-of-use" element={<TermOfUse />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="account" />} />
          <Route path="account" element={<Account />} />
          <Route path="make-deposit" element={<MakeDeposit />} />
          <Route path="your-deposits" element={<Deposits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
