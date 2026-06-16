import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";

export default function Landing() {
  return (
    <div className="bg-[#09090B] min-h-screen text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute top-[400px] right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
    </div>
  );
}
