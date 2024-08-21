import starwarsLogo from "../../assets/svg/star-wars.svg";
import { motion } from "framer-motion";

function Hero() {
  return (
    <>
      <div className="flex justify-center items-center">
        <motion.img
          src={starwarsLogo}
          alt="Star Wars Logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </>
  );
}

export default Hero;
