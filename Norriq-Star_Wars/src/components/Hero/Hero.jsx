import starwarsLogo from "../../assets/svg/star-wars.svg";
import { motion } from "framer-motion"; // Importer Framer Motion

function Hero() {
  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.img
          src={starwarsLogo}
          alt="Star Wars Logo"
          className="max-w-full max-h-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <div className="absolute bottom-0 w-full p-8">
        <a href="#stjernerne">
          <button className="btn btn-block btn-outline text-primary hover:bg-secondary hover:border-none">
            Se stjernerne
          </button>
        </a>
      </div>
    </>
  );
}

export default Hero;
