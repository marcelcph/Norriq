import "./App.css";
import StarsCanvas from "./components/Canvas/Stars";
import Hero from "./components/Hero/Hero";
import Cards from "./components/Cards/Cards";

function App() {
  return (
    <>
      <StarsCanvas />
      <div className="">
        <Hero />
      </div>
      <div className="md:mx-32">
        <Cards />
      </div>
    </>
  );
}

export default App;
