import "./App.css";
import starwarsLogo from "./assets/svg/star-wars.svg";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img
        src={starwarsLogo}
        alt="Star Wars Logo"
        className="max-w-full max-h-full"
      />
    </div>
  );
}

export default App;
