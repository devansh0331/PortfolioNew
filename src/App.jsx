import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Research from "./components/Research";
import Experience from "./components/Experience";
import QuoteSection from "./components/QuoteSection";
import SendETH from "./components/SendETH";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-off">
      <div className="">
        <Navbar />
        <About />
        <Research />
        <QuoteSection />
        <Experience />
        <SendETH />
        <Gallery />
        <Contact />
        <Footer />
        <Routes>
          {/* <Route path="/" element={<TodoList />} /> */}
          {/* <Route path="/" element={<Navbar />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
