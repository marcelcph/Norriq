import "./App.css";
import StarsCanvas from "./components/Hero/Stars";
import Hero from "./components/Hero/Hero";
import Cards from "./components/Cards/Cards";

function App() {
  return (
    <>
      <StarsCanvas />
      <div className="w-screen h-screen ">
        <Hero />
      </div>
      <div className="md:mx-32">
        <Cards id="stjernerne" />
      </div>
    </>
  );
}

export default App;
