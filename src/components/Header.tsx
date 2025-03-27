
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { House, Flame } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Flame className="h-6 w-6 text-fire" />
          <span className="text-xl font-medium">FireWise</span>
        </motion.div>
        
        <motion.nav 
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.a 
            href="#" 
            className="text-sm font-medium relative px-1 py-2 text-foreground/80 hover:text-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            О Проекте
          </motion.a>
          <motion.a 
            href="#" 
            className="text-sm font-medium relative px-1 py-2 text-foreground/80 hover:text-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Сценарии
          </motion.a>
          <motion.a 
            href="#" 
            className="text-sm font-medium relative px-1 py-2 text-foreground/80 hover:text-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Советы
          </motion.a>
        </motion.nav>
        
        <motion.a
          href="#start-game"
          className="bg-fire hover:bg-fire-dark text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <House className="h-4 w-4" />
          <span>Начать Игру</span>
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;
