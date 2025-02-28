
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L0 25V75L50 100L100 75V25L50 0Z" fill="#FF3E4C"/>
          <path d="M50 50L0 75L50 100L100 75L50 50Z" fill="#1BBDD4"/>
          <path d="M50 50L0 25L0 75L50 50Z" fill="#1E3F76"/>
        </svg>
        <span className="ml-2 text-xl font-medium text-gray-900">Offer Portal</span>
      </div>
    </motion.div>
  );
};

export default Logo;
